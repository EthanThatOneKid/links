import { writable } from "svelte/store";

export const currentPageNumber = writable<number>(0);
