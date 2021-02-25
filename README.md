# Links 🔗

> An app for link collectors

## Development 👨‍💻

This project is powered by [Svelte][svelte] and utilizes [cutting-edge][web_dev] browser APIs.

To get started, clone this repository, run `npm i` to install the dependencies, and then run `npm run dev` to spin up the [development server][localhost].

## Features 💅

- [ ] Stores link collection on disk.
- [ ] Export link collection to Markdown. The save data is human-readable/editable for easy modifications.
- [ ] Toggle-able private links (can be accessed using password and are encrypted in the save file).
- [ ] Save data as an image (like [PICO-8](https://pico-8.fandom.com/wiki/P8PNGFileFormat)) and can be [encrypted](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt#syntax) with a password.
- [ ] Provides very simple, clean customization options (A primary and secondary color).

## Reference 📚

### File System API

- [File System Access Article](https://web.dev/file-system-access/)
- [File System Access Full Example](https://github.com/GoogleChromeLabs/text-editor)
- [Data URI Specification](https://tools.ietf.org/html/rfc2397)

### Accessibility

- [React Accessibility](https://reactjs.org/docs/accessibility.html)
- [Keyboard-navigable JavaScript widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets)
- ["Skip Navigation" Links](https://webaim.org/techniques/skipnav/)
- [Keyboard Controls Example](https://svelte.dev/repl/c6ad343f3ec2406aaae05cf8b4a20698?version=3.23.2)

---

Engineered with 💖 by [EthanThatOneKid][creator_url]

[creator_url]: http://ethandavidson.com/
[svelte]: https://svelte.dev/
[web_dev]: https://developers.google.com/web/updates/2020/10/nic86
[localhost]: http://localhost:5000
