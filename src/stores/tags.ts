import { writable } from "svelte/store";
import type { CollectionData } from "../lib/fs";

export const tags = writable<CollectionData["tags"]>({});
