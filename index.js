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

  w("./links.md", md.compile());

})();
