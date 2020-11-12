import { writable } from "svelte/store";
import type { CollectionData } from "../shared/fs";

export const tags = writable<CollectionData["tags"]>({});
