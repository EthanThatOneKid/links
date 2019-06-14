// Dependencies
const {readFileSync: r, writeFileSync: w} = require('fs');
const {MarkdownBuilder: MDB} = require('md-builder'); // https://github.com/yulric/md-builder
const {recursiveEntries, valueFromPath} = require('recursive-entries');

// Constants
const links = recursiveEntries(JSON.parse(r('./links.json')));

// Main Process
(() => {

  const md = MDB.h1("🔗 EthanThatOneKid's Links");

  let gimmeList = [];
  for (let [path, value] of links) {

    const depth = ~~(path.length * 0.5 + 1);
    const endpoint = path[path.length - 1];

    if ("icon".includes(endpoint)) {

      if (!!gimmeList.length) {

        md.unorderedList(gimmeList);
        gimmeList = [];

      }

      const title = path[path.length - 2];
      md[`h${depth}`](`${value} ${title}`);

    } else if ("href".includes(endpoint)) {

      const linkTo = value;
      const linkLabel = path[path.length - 2];
      gimmeList.push(MDB.link({linkTo, linkLabel}));

    }

  }

  const serializedMarkdown = md.toMarkdown();
  w("./links.md");

})();
