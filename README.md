# Build Chrome Extension with React + Parcel + Typescript + Hot-Reloading

## Development

Install dependencies:

```bash
yarn
```

Start hot-reload compiling:

```bash
yarn dev
```

Install the unpacked extension:

See [Getting Started Tutorial](https://developer.chrome.com/extensions/getstarted)

go to e.g. https://www.arxiv-vanity.com/papers/1803.08494/
math symbols get random colors.
can click a symbol then highlight it's definition with its color. 
all instances of the symbol link back to the highlighted definition and add it as the title. 
other symbols greyed out on hover. 

![example interaction](https://github.com/matt-erhart/augmented-reading/blob/master/link_title_focus.gif "example interaction")



## Build

> *NOTE: For security reasons, you should remove or change `content_security_policy` field in manifest.json before you publish the extension*

```bash
yarn build
```