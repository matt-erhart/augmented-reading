import { MountReact } from "./index";
import { unique } from "./utils";
import * as d3 from "d3";
// MountReact();

// html regex
// scroll bar
let container = document.createElement("div");
container.style.position = "fixed";
container.style.height = "100vh";
container.style.width = "10px";
// container.style.border = "1px solid black";
container.style.right = "0px";
container.style.top = "0px";
let point = document.createElement("div");
point.style.position = "absolute";
point.style.height = "10px";
point.style.width = "10px";
point.style.borderRadius = "100%";



const keepBlack = [..."0123456789,.()[];"];

// all single math symbols
const allMathElements = Array.from(
  document.getElementsByClassName("mjx-char")
).filter(x => x.textContent.length === 1);

// papers symbol set
const uniqueMathSymbols = unique(
  allMathElements.map(x => x.textContent)
).reverse();

// look up for text to color
const nSymbols = uniqueMathSymbols.length;
let symbolColors = uniqueMathSymbols.reduce((state, val, ix) => {
  const randColor = d3.interpolateRainbow(Math.random());
  const shouldSkip = keepBlack.includes(val);
  state = { ...state, [val]: shouldSkip ? "black" : randColor };
  return state;
}, {});

// count for n/total in title
let counts = allMathElements.reduce((state, el, ix) => {
  const textContent = el?.textContent || "";
  if (state.hasOwnProperty(textContent)) {
    state[textContent]++;
  } else {
    state[textContent] = 1;
  }
  el.title = state[textContent];
  return state;
}, {});



// STATE
let activeColor = "";
let activeSymbol = "";
let scrollData = []

let d3Container = d3
.select("body")
.append(() => container)

function updateD3(scrollData){
  d3Container.selectAll("div")
  .data(scrollData.filter(sd => sd.text===activeSymbol)) // side effect
  .join("div")
  .style("position", "absolute")
  .style("height", "1px")
  .style("width", "100%")
  .style("background-color", ({ top, color }) => color)
  .style("top", ({ top, color }) => top * 100 + "vh");
}

// get location of symbols rel. to body
let prev = 0;
allMathElements.forEach(el => {
  let top = el.getBoundingClientRect().top + window.pageYOffset;
  // if (prev === top) top = top * 1.01;
  prev = top;
  scrollData.push({
    text: el.textContent,
    top: top / document.body.scrollHeight,
    color: symbolColors[el.textContent]
  });
  el.title = el.title + "/" + counts[el.textContent];
});


function focusActive(el) {
  allMathElements
    .filter(x => el.textContent !== x.textContent)
    .forEach(el => {
      el.style.color = "lightgrey";
    });
    
}

function renderAllColors() {
  allMathElements.forEach(el => {
    el.style.color = symbolColors[el.textContent];
  });
}

const setActive = el => e => {
  activeColor = symbolColors[el.textContent];
  activeSymbol = activeSymbol === "" ? el.textContent : "";
  navigator.clipboard.writeText(activeSymbol).then();
  

  if (activeColor === "") {
    renderAllColors();
  } else {
    focusActive(el);
  }
  updateD3(scrollData)
};

const onHoverSymbol = el => e => {
  if (!activeSymbol) focusActive(el);
};

const onExitSymbol = el => e => {
  if (!activeSymbol) renderAllColors();
};

// // augment elements
allMathElements
  .filter(x => x.textContent.length === 1)
  .forEach(el => {
    el.style.color = symbolColors[el.textContent];
    el.style.cursor = "pointer";
    el.style.fontWeight = "bold";
    el.style.transition = "color 300ms";
    el.addEventListener("click", setActive(el));

    el.addEventListener("mouseenter", onHoverSymbol(el));
    el.addEventListener("mouseleave", onExitSymbol(el));
  });

let count = 0;
function surroundSelection() {
  var span = document.createElement("span");
  span.style.fontWeight = "bold";
  span.style.color = activeColor;
  span.id = count.toString();
  count++;

  if (window.getSelection) {
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var range = sel.getRangeAt(0).cloneRange();
      range.surroundContents(span);
      sel.removeAllRanges();
      sel.addRange(range);

      if (sel?.toString().length > 0) {
        allMathElements
          .filter(
            x => x.textContent.length === 1 && x.textContent === activeSymbol
          )
          .forEach(el => {
            el.title = sel?.toString() + " " + el.title;
            el.removeEventListener("click", setActive(el));
            let link = document.createElement("a");
            link.href = "#" + span.id;
            surroundEl(el, link);
          });
      }
    }
  }
}

function surroundEl(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

document.addEventListener("mouseup", e => {
  if (activeSymbol !== "") surroundSelection();
});

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
//
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
//
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
