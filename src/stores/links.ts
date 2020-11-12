import { writable } from "svelte/store";
import type { CollectionData } from "../shared/fs";

export const links = writable<CollectionData["links"]>([]);
