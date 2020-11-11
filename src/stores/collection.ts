import { writable } from "svelte/store";
import type { CollectionData } from "../shared/fs";

export const collection = writable<CollectionData | null>(null);
