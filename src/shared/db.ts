import PouchDB from "pouchdb";
import type { CollectionData } from "./fs";

export interface CollectionMetadata {
  title: string;
  slug: string;
}

export const convertCollectionTitleToSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/(\s|\-)+/g, "_")
    .replace(/[^a-zA-Z0-9]/g, "");
};

export const initCollectionDB = (slug: string) => {
  return new PouchDB<CollectionData>(`collection_${slug}`);
};

export const collections = new PouchDB<CollectionMetadata>("collections");
