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
      const filteredEntryIndices: Set<number> = settings.filters.reduce(
        (indices: Set<number>, filter: string) => {
          if (tags[filter] !== undefined) {
            for (const index of tags[filter]) {
              indices.add(index);
            }
          }
          if (!settings.isSearchingByTagsOnly) {
            for (let i = 0; i < links.length; i++) {
              const { title, description } = links[i];
              if (title.includes(filter) || description.includes(filter)) {
                indices.add(i);
              }
            }
          }
          return indices;
        },
        new Set([])
      );
      const filteredEntries: CollectionEntry[] = [...filteredEntryIndices]
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
