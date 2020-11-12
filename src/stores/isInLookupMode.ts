import { writable } from "svelte/store";

export const isInLookupMode = writable<boolean>(false);
