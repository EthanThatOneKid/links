// Dependencies
const {readFileSync: r} = require('fs');
const {MarkdownBuilder} = require('md-builder');
const {recursiveEntries, valueFromPath} = require('recursive-entries');

// Constants
const links = recursiveEntries(JSON.parse(r('./links.json')));

// Main Process
(() => {

  console.log(links);
  
})();
