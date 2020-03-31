import { MountReact } from "./index";
import { unique } from "./utils";
import * as d3Color from "d3-scale-chromatic";
MountReact();


const keepBlack = [...'0123456789,.()[];']
const allMathElements = Array.from(document.getElementsByClassName("mjx-char")).filter(x => x.textContent.length === 1)

const uniqueMathSymbols = unique(
  allMathElements
    .map(x => x.textContent)
).reverse();

const nSymbols = uniqueMathSymbols.length;
let symbolColors = uniqueMathSymbols.reduce((state, val, ix) => {
  const randColor = d3Color.interpolateRainbow(Math.random())
  const shouldSkip = keepBlack.includes(val)
  state = { ...state, [val]: shouldSkip?'black':randColor  };
  return state;
}, {});

let activeColor = ''
let activeSymbol = ''

function focusActive(el){
  allMathElements
  .filter(x => el.textContent !== x.textContent)
  .forEach(el => {
    el.style.color = 'lightgrey'
  })
}

function renderAllColors(){
  allMathElements
  .forEach(el => {
    el.style.color = symbolColors[el.textContent];
  })
}

const setActive = el => e => {
  activeColor = symbolColors[el.textContent]
  activeSymbol = activeSymbol === '' ? el.textContent: ''
  navigator.clipboard.writeText(activeSymbol).then()

  if (activeColor === '') {
    renderAllColors()
  } else {
    focusActive(el)
  } 
}

const onHoverSymbol = el => e => {
  if (!activeSymbol) focusActive(el)
}

const onExitSymbol = el => e => {
  if (!activeSymbol) renderAllColors()
}

// augment elements
allMathElements
  .filter(x => x.textContent.length === 1)
  .forEach(el => {
    el.style.color = symbolColors[el.textContent];
    el.style.cursor = 'pointer'
    el.style.fontWeight = 'bold'
    el.style.transition = 'color 300ms'
    el.addEventListener('click', setActive(el) )

    el.addEventListener('mouseenter', onHoverSymbol(el))
    el.addEventListener('mouseleave', onExitSymbol(el))
  });

let count = 0;
function surroundSelection() {
  var span = document.createElement("span");
  span.style.fontWeight = "bold";
  span.style.color = activeColor;
  span.id = count.toString()
  count++

  if (window.getSelection) {
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var range = sel.getRangeAt(0).cloneRange();
      range.surroundContents(span);
      sel.removeAllRanges();
      sel.addRange(range);

      if (sel?.toString().length > 0){
        allMathElements
        .filter(x => x.textContent.length === 1 && x.textContent === activeSymbol)
        .forEach(el => {
          el.title = sel?.toString()
          el.removeEventListener('click', setActive(el))
          let link = document.createElement('a')
          link.href = '#' + span.id
          surroundEl(el, link)        
        })
      }
      
    }
  }
}

function surroundEl(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

document.addEventListener('mouseup' e => {
  if (activeSymbol !== '') surroundSelection()
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
