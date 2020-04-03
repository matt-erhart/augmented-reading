

# Augmented Reading Prototypes v0.0.2
![example interaction](https://github.com/matt-erhart/augmented-reading/blob/master/link_title_focus.gif "example interaction")
- Each math symbol gets a random color from d3-color
- Focus a symbol & grey out others (like https://github.com/allenai/scholar-reader)
- On Click Symbol
  - Greys out other symbols
  - Can now highlight text and it will be added to the title of all instances of the symbol
  - click any symbol again to reset colors
  - adds symbol to clipboard for easier ctrl-f 
- Clicking a symbol with a definition scrolls to that definition 
  - back button scrolls back 
- Hover also focuses the symbols
- refresh to get a new random set of colors
- symbol order number / total per symbol in title

# And then
- Try out different chunking and coloring defaults
  - color in order to reduce visual crowding
    - similar shaped symbols get very different colors
    - symbols likely to be neighbors get very different colors
  - color more like an IDEs syntax highlighting
  - color by some yet to be determined semantic math chunk 
- Menus of any kind ;)
  - human symbol sense disambiguation
    - turn [this wikipedia page](https://en.wikipedia.org/wiki/List_of_mathematical_symbols) in menues based on symbol. 
  - human symbol chunking/spliting
- Side bars of any kind ;)
  - show sentences with symbol (like https://github.com/allenai/scholar-reader)
  - show all symbols and their definitions. legend / glossary. 
- Virtualization for papers with a ton of symbols. Hawkings paper is pushing it. 
- try things that work for search as in https://github.com/allenai/scholar-reader
  - scroll bar highlighting
  - jump to first, prev, next
- delete/update/overlaping definitions
- manual input text for definitons  
- serializing & saving colors, symbol chunks, and annotations
- try things that work for data viz
- try things that work in IDEs
  - types as in typescript
    - matrix / scalar / set / random variable
    - sub/super script as matrix index vs different kinds of a general thing
  - tooltips
  - jump to dependency
  - list references
  - color by syntax
- non-math not-latex identifiers, e.g. condition-1, hypothesis-5, system-requirement-4, ELMO, BERT
- symbols with one meaning that are sometime latex styled, sometimes regular text
- symbols that change meaning throughout the paper
- [point and talk /localized narratives](https://ai.googleblog.com/2020/02/open-images-v6-now-featuring-localized.html)

## Development & Trying it out
Install dependencies:
```bash
yarn
```
Start hot-reload compiling:
```bash
yarn dev # this will create /dist. Point chrome to /dist to install. 
```
Install the unpacked extension in chrome:
- ... menu top right for chrome
- 'more tools'
  - 'extensions'
- 'load unpacked'
  - then select augmented-reading/dist folder
  - maybe refresh browser
  - [More Chrome Ext. Info if needed](https://developer.chrome.com/extensions/getstarted)
- view any paper via https://www.arxiv-vanity.com/, e.g. https://www.arxiv-vanity.com/papers/hep-th/9808085/
  - should see colors 
