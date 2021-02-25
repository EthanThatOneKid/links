import { writable } from "svelte/store";
import type { CollectionData } from "../lib/fs";

export const links = writable<CollectionData["links"]>([]);
