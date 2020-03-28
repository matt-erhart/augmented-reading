export const unique = arr => {
  const uniq = [...new Set(arr)];
  return uniq.sort();
};

export const indexOfAll = (arr, val) =>
  arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

let mean = function(data) {
  return (
    data.reduce(function(a, b) {
      return Number(a) + Number(b);
    }) / data.length
  );
};

export let stdMean = function(data) {
  let m = mean(data);
  let std = Math.sqrt(
    data.reduce(function(sq, n) {
      return sq + Math.pow(n - m, 2);
    }, 0) /
      (data.length - 1)
  );
  return { mean: m, std };
};

export function intersect(a, b) {
  var setB = new Set(b);
  return [...new Set(a)].filter(x => setB.has(x));
}

export const range = (start = 1, length = 1, stride = 1) =>
  [...Array(length).keys()].map(x => x + start);

export function roundedToFixed(_float: number, _digits: number) {
  var rounder = Math.pow(10, _digits);
  return (Math.round(_float * rounder) / rounder).toFixed(_digits);
}

export const catColors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
  "#8dd3c7",
  "#bebada",
  "#fb8072",
  "#80b1d3",
  "#fdb462",
  "#b3de69",
  "#fccde5",
  "#d9d9d9",
  "#bc80bd",
  "#ccebc5",
  "#ffed6f"
];

export function getRegexIndexes(str: string, regex: RegExp): number[] {
  // fixed non global match inf loop with && match.index !== results[0])
  let match;
  let results = [];
  do {
    match = regex.exec(str);
    if (match) {
      results.push(match.index);
    }
  } while (match && match.index !== results[0]);
  return results;
}

export function regexMatchAll(regex, text) {
  if (regex.constructor !== RegExp) {
      throw new Error('not RegExp');
  }

  var res = [];
  var match = null;

  if (regex.global) {
      while (match = regex.exec(text)) {
          res.push(match);
      }
  }
  else {
      if (match = regex.exec(text)) {
          res.push(match);
      }
  }

  return res;
}