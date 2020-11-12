import { writable } from "svelte/store";

export const handle = writable<FileSystemFileHandle | null>(null);
