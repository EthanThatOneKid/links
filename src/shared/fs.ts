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
  ts: number;
}

export interface CollectionData {
  links: CollectionEntry[];
  tags: Record<string, number[]>; // <TagValue, CorrespondingLinkIndex>
}

export const COLLECTION_EXTENTION = "cltn";

export const loadCollectionData = async (
  handle: FileSystemFileHandle
): Promise<CollectionData | null> => {
  let data: CollectionData | null = null;
  const file: File = await handle.getFile();
  const extention = file.name.split(".").pop();
  console.log({ extention });
  if (extention === COLLECTION_EXTENTION) {
    const body: string = await file.text();
    try {
      data = JSON.parse(body);
    } catch {}
  }
  return data;
};
