// Refer to https://github.com/GoogleChromeLabs/text-editor/blob/main/src/inline-scripts/fs-helpers.js

declare global {
  type FileSystemFileHandle = any;
  interface Window {
    showOpenFilePicker: () => FileSystemFileHandle;
  }
}

export const loadFileHandle = async (): Promise<FileSystemFileHandle | null> => {
  if (window.showOpenFilePicker !== undefined) {
    const [handle] = await window.showOpenFilePicker();
    return handle;
  }
  return null;
};

export interface CollectionEntry {
  link: string;
  title: string;
  description: string;
  tags: string[];
}

export interface CollectionData {
  links: CollectionEntry[];
  tags: Record<string, number>; // <TagValue, CorrespondingLinkIndex>
}

export const loadCollectionData = async (): Promise<CollectionData | null> => {
  let data: CollectionData | null;
  const handle = await loadFileHandle();
  if (handle !== null) {
    const file = await handle.getFile();
    const body = await file.text();
    try {
      data = JSON.parse(body);
    } catch {
      data = null;
    }
  }
  return data;
};
