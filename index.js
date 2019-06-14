// Dependencies
const {readFileSync: r, writeFileSync: w} = require('fs');
const {recursiveEntries, valueFromPath} = require('recursive-entries');

// Helpers
class MD {

  constructor() {
    this.stream = [];
  }

  txt(txt) {
    this.stream.push(txt);
  }

  compile() {
    return this.stream.join("\n");
  }

}

const getTitle = path => path[path.length - 2];

// Constants
const links = recursiveEntries(JSON.parse(r('./links.json')));

// Main Process
(() => {

  const md = new MD();
  md.txt("# 🔗 EthanThatOneKid's Links");

  // Creating Table of Contents
  md.txt("\n## 📜 Table of Contents");
  const toc = links
    .filter(([path, value]) => path[path.length - 1] == "icon")
    .reduce((acc, [path, value]) => {
      const linkLabel = path[path.length - 2];
      const cleanedLabel = linkLabel.replace(/\s/g, "-").replace(/\W/g, "");
      const linkTo = `#-${cleanedLabel}`;
      const depth = path.length * 0.5 - 1;
      const padding = "\t".repeat(depth);
      const nextLine = `${padding}* [${linkLabel}](${linkTo})\n`;
      return acc + nextLine;
    }, "");

  md.txt(toc);

  // Creating Document
  for (let [path, value] of links) {

    const endpoint = path[path.length - 1];

    if (endpoint == "icon") {

      const title = getTitle(path);
      const depth = path.length * 0.5 + 1;
      const heading = "#".repeat(depth);
      md.txt(`\n${heading} ${value} ${title}`);

    } else if (endpoint == "href") {

      const linkTo = value;
      const linkLabel = getTitle(path);
      md.txt(`* [${linkLabel}](${linkTo})`);

    }

  }

  w("./README.md", md.compile());

})();
