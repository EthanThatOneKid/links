// Refer to https://github.com/GoogleChromeLabs/text-editor/blob/main/src/inline-scripts/app-install.js
import { installPrompt } from "../stores/installPrompt";

export const showInstallPrompt = async () => {
  installPrompt.update((gimmeInstallPrompt) => {
    if (gimmeInstallPrompt !== null) {
      gimmeInstallPrompt.prompt();
    }
    return gimmeInstallPrompt;
  });
};
