// Dependencies
const {readFileSync: r} = require('fs');
const {MarkdownBuilder} = require('md-builder'); // https://github.com/yulric/md-builder
const {recursiveEntries, valueFromPath} = require('recursive-entries');

// Constants
const links = recursiveEntries(JSON.parse(r('./links.json')));

// Main Process
(() => {

  const md = MarkdownBuilder.h1("🔗 EthanThatOneKid's Links");

})();
