import type { CollectionEntry, CollectionData } from "./fs";

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
