import { writable } from "svelte/store";
import type { BeforeInstallPromptEvent } from "../shared/BeforeInstallPromptEvent";

export const installPrompt = writable<BeforeInstallPromptEvent | null>(null);
