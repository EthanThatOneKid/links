# Architecture

## Features

This project is a [PWA (Progressive Web Application)][pwa] utility for storing, categorizing, and looking up links to other websites.
Each link to a website is stored locally as a collection with the [IndexDB Web API][idb] (with help from [Dexie.js][storage_lib] [💡][dexie.js_example]).
Various file formats (PNG, GIF, JSON) will be acceptable for a lively drag-n-drop user experience.
The web application will work with all of these offline and as an installed PWA.

## [`manifest.json`](manifest.json)

The [`manifest.json`](manifest.json) file is responsible for orchestrating all of the information and assets needed for this project to be a valid PWA.

## Deploying to GitHub Pages

> 💡: https://dev.to/agustinl/deploy-sapper-pwa-on-github-pages-2ih1

---

See [ARCHITECTURE.md][architecture_article]

[pwa]: https://web.dev/pwa
[idb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[storage_lib]: https://github.com/dfahlander/Dexie.js
[dexie.js_example]: https://github.com/dfahlander/Dexie.js/blob/master/samples/typescript-simple/src/index.ts
[architecture_article]: https://matklad.github.io//2021/02/06/ARCHITECTURE.md.html
