import { writable } from "svelte/store";

export const currentlySelected = writable<Set<number>>(new Set([]));
