import type { CollectionEntry, CollectionData } from "./fs";
import { loadFileHandle, loadCollectionData } from "./fs";
import { handle } from "../stores/handle";
import { links } from "../stores/links";
import { tags } from "../stores/tags";
import { isLoading } from "../stores/isLoading";
import { isInLookupMode } from "../stores/isInLookupMode";

export interface SearchSettings {
  filters: string[];
  isSearchingByTagsOnly: boolean;
  isSortedAlphabetically: boolean;
  isSortedByRecency: boolean;
}

export const editTagsOfCollectionEntry = (
  collectionEntryIndex: number,
  updatedTagList: string[]
): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      let deletedTags = [],
        addedTags = [];
      links.subscribe((collectionEntries) => {
        const { tags: originalTags } = collectionEntries[collectionEntryIndex];
        const uniqueTags = getOneTimeOccurences<string>([
          ...originalTags,
          ...updatedTagList,
        ]);
        addedTags = uniqueTags.filter((tag) => updatedTagList.includes(tag));
        deletedTags = uniqueTags.filter((tag) => originalTags.includes(tag));
      });
      tags.update((tagList) => {
        for (let deletedTag of deletedTags) {
          if (tagList[deletedTag].length === 1) {
            delete tagList[deletedTag];
          } else {
            const tagIdIndex = tagList[deletedTag].indexOf(
              collectionEntryIndex
            );
            if (tagIdIndex > -1) {
              tagList[deletedTag].splice(tagIdIndex, 1);
            }
          }
        }
        for (let addedTag of addedTags) {
          // create a new tag key and arr with curr index as only item.
          // or update existing
        }
        return tagList;
      });
    });
  });
};

export const searchCollectionData = (
  { links, tags }: CollectionData,
  settings: SearchSettings = {
    filters: [],
    isSearchingByTagsOnly: true,
    isSortedAlphabetically: false,
    isSortedByRecency: true,
  }
): Promise<CollectionEntry[]> => {
  if (settings.filters.length === 0) {
    return Promise.resolve([]);
  }
  return new Promise<CollectionEntry[]>((resolve) => {
    setTimeout(() => {
      const filteredEntryIndices: number[] = [];
      for (let i = 0; i < links.length; i++) {
        const currentLink = links[i];
        const isComposedOfDesiredTags = settings.filters
          .filter((filter) => filter in tags)
          .every((tagId) => currentLink.tags.includes(tagId));
        const isMatchingTitleOrDescription = settings.filters.some(
          (searchQuery) =>
            currentLink.title.includes(searchQuery) ||
            currentLink.description.includes(searchQuery)
        );
        if (isMatchingTitleOrDescription || isComposedOfDesiredTags) {
          filteredEntryIndices.push(i);
        }
      }
      const filteredEntries: CollectionEntry[] = filteredEntryIndices
        .map((index) => links[index])
        .sort((a, b) => {
          if (settings.isSortedAlphabetically) {
            return a.title > b.title ? -1 : 1;
          }
          return a.ts > b.ts ? -1 : 1;
        });
      resolve(filteredEntries);
    });
  });
};

export const loadCollectionFile = async () => {
  isLoading.set(true);
  const tempHandle = await loadFileHandle();
  handle.set(tempHandle);
  if (tempHandle !== null) {
    const collection = await loadCollectionData(tempHandle);
    links.set(collection.links);
    tags.set(collection.tags);
  }
  isLoading.set(false);
};

export function getOneTimeOccurences<T>(list: T[]): T[] {
  const repeats = new Set<T>([]);
  const seenOnceBefore = new Set<T>([]);
  for (let item of list) {
    if (!repeats.has(item)) {
      if (seenOnceBefore.has(item)) {
        seenOnceBefore.delete(item);
        repeats.add(item);
      } else {
        seenOnceBefore.add(item);
      }
    }
  }
  return [...seenOnceBefore];
}

export const createCollectionFile = async () => {
  isLoading.set(true);
  const tempHandle = await loadFileHandle();
  handle.set(tempHandle);
  if (tempHandle !== null) {
    links.set([]);
    tags.set({});
  }
  isLoading.set(false);
};

export const toggleLookupMode = () => {
  isInLookupMode.update((value) => !value);
};

export const exportCollectionDataAsMarkdown = (
  fileName: string,
  { tags, links }: CollectionData
) => {
  const tagsMd = Object.keys(tags)
      .map((tag) => `[<kbd>${tag}</kbd>](#${tag})`)
      .join(", "),
    tagContentsMd = Object.entries(tags)
      .map(([tag, linkIndices]) => {
        const linkIndicesMd = linkIndices
          .map((linkIndex) => {
            const { title, description } = links[linkIndex],
              linkEntryId = title.toLowerCase().replace(/\s|\_/, "-");
            return `[${title}](#${linkEntryId} "${description}")`;
          })
          .join(", ");
        return [`### <kbd>${tag}</kbd>`, linkIndicesMd].join("\n");
      })
      .join("\n\n"),
    linkEntriesMd = links.map(({ title, description, link, tags, ts }) => {
      const entryTagsMd = tags
          .map((tag) => `[<kbd>${tag}</kbd>](#${tag})`)
          .join(", "),
        entryDescriptionMd =
          description.length === 0
            ? `**Last updated: ${new Date(ts)}**`
            : `> ${description} | **Last updated: ${new Date(ts)}**`;
      return [`### [${title}](${link})`, entryDescriptionMd, entryTagsMd].join(
        "\n\n"
      );
    });
  return [
    `# \`${fileName}\``,
    `> Generated: ${new Date()}`,
    "## Tags",
    tagsMd,
    "## Tag Contents",
    tagContentsMd,
    "## Link Entries",
    linkEntriesMd,
    "---",
    `Generated with ${chooseLoveIcon()} by [Links](https://github.com/EthanThatOneKid/links)`,
  ].join("\n\n");
};

export const chooseLoveIcon = () => {
  const selection = "💘💖💗💓💙💚💛💜🧡💝💞❤💕";
  const randomIndex = Math.floor(selection.length * Math.random());
  return selection[randomIndex];
};
