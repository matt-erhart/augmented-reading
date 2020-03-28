import { MountReact } from "./index";
import { unique } from "./utils";
import * as d3Color from "d3-scale-chromatic";
MountReact();

Array.from(document.getElementsByClassName("mjx-char")).forEach(el => {
  el.style.color = d3Color.interpolateRainbow(0.9);
  el.style.fontWeight = "bold";
});

const allMathElements = Array.from(document.getElementsByClassName("mjx-char"));
const uniqueMathSymbols = unique(
  allMathElements
    .filter(x => x.textContent.length === 1)
    .map(x => x.textContent)
).reverse();
const nSymbols = uniqueMathSymbols.length;
const symbolColors = uniqueMathSymbols.reduce((state, val, ix) => {
  state = { ...state, [val]: d3Color.interpolateRainbow(Math.random()) };
  return state;
}, {});

let activeColor = ''

allMathElements
  .filter(x => x.textContent.length === 1)
  .forEach(el => {
    el.style.color = symbolColors[el.textContent];
    el.style.cursor = 'pointer'
    el.addEventListener('click', e=> {
      activeColor = symbolColors[el.textContent]
    })
  });

function surroundSelection() {
  var span = document.createElement("span");
  span.style.fontWeight = "bold";
  span.style.color = activeColor;

  if (window.getSelection) {
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var range = sel.getRangeAt(0).cloneRange();
      range.surroundContents(span);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
}

document.addEventListener('mouseup' e => {
  surroundSelection()
})

// const titles = Array.from(document.querySelectorAll("h3 a")).forEach(el => {
//   if (!el.parentElement) return;
//   const data = {
//     title: el.textContent,
//     id: el.id,
//     href: el.getAttribute("href")
//   };
//   const pubContainer = el.closest("div.gs_r");
//   let pdfDownload =
//     !!pubContainer && pubContainer.querySelector("div.gs_ggs div div a");
//   if (pdfDownload) {
//     // pdfDownload.setAttribute("download", data.title.replace(":", "--"));
//     pdfDownload.addEventListener("click", e => {
//       // cant fetch blob or use download attribute to rename bc of security
//       // need to send url to extension via message and download there, maybe
//       console.log("Downloaded ", data);
//     });
//   }

//   el.parentElement.prepend(makeSpan(data));
// });

// const citedBy = Array.from(document.querySelectorAll("div.gs_fl a"))
//   .filter(el => !!el.textContent && el.textContent.includes("Cited by"))
//   .forEach(el => {
//     const href = el.getAttribute("href");
//     const nCitations = !!el.textContent && el.textContent.split("Cited by ")[1];
//     el.before(makeSpan({ nCitations, href, type: "citedBy" }));
//   });

// const relatedArticles = Array.from(document.querySelectorAll("div.gs_fl a"))
//   .filter(el => !!el.textContent && el.textContent.includes("Related articles"))
//   .forEach(el => {
//     const href = el.getAttribute("href");
//     el.before(makeSpan({ href, type: "relatedArticles" }));
//   });

// function makeSpan(data = {}) {
//   const span = document.createElement("span");
//   addDataAttrs(data, span);
//   span.onclick = e => {
//     console.log(data);
//   };
//   span.textContent = "+";
//   span.style.marginRight = "5px";
//   span.style.border = "1px solid green";
//   span.style.padding = "0px 2px 0px 2px";
//   span.style.color = "green";
//   span.style.zIndex = "99";
//   span.style.cursor = "pointer";
//   span.style.height = "10px";
//   span.style.fontSize = "12px";
//   return span;
// }

// function addDataAttrs(data, el) {
//   const keys = Object.keys(data);
//   if (keys.length < 1) return;
//   Object.keys(data).forEach(key => {
//     el.setAttribute("data-" + key, data[key]);
//   });
// }

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log(
//     request,
//     sender
//   );
// //   if (request.greeting == "hello") sendResponse({ farewell: "goodbye" });
// });
