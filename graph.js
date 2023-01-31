import * as d3 from "d3";

var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

const LineGraph = (
  container,
  data = [],
  {
    x = ([x]) => x,
    y = ([, y]) => y,
    defined, // for gaps in data
    curve = d3.curveLinear,
    marginTop = 20,
    marginRight = 30,
    marginBottom = 30,
    marginLeft = 40,
    width = 640,
    height = 400,
    xType = d3.scaleUtc,
    xDomain,
    title,
    xRange = [marginLeft, width - marginRight],
    yType = d3.scaleLinear,
    yDomain,
    yRange = [height - marginBottom, marginTop],
    yFormat,
    yLabel,
    color = "black",
    strokeLinecap = "round",
    strokeLinejoin = "round",
    strokeWidth = 5,
    strokeOpacity = 1,
  } = {}
) => {
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const I = d3.range(X.length);
  if (defined === undefined) {
    defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
  }
  const D = d3.map(data, defined);

  if (xDomain === undefined) {
    xDomain = d3.extent(X);
    console.log(xDomain);
  }
  if (yDomain === undefined) {
    yDomain = [0, d3.max(Y)];
  }

  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(width / 80)
    .tickSizeOuter(0);
  // .attr("style", "font-size: 100px;");
  const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

  const line = d3
    .line()
    .defined((i) => D[i])
    .curve(curve)
    .x((i) => xScale(X[i]))
    .y((i) => yScale(Y[i]));

  let svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr(
      "style",
      "max-width: 100%; height: auto; height: intrinsic; margin: auto; color: rgb(255, 255, 255, 1);"
    );

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(xAxis)
    .attr("style", "@media (400px) { font-size: 100px; }");

  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(yAxis)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .attr("stroke", "white")
        .clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1)
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "white")
        .attr("text-anchor", "start")
        .text(yLabel)
    )
    .call(
      (g) =>
        g
          .append("text")
          .attr("x", width / 2 - marginLeft)
          .attr("y", 20)
          .attr("fill", "white")
          .attr("text-anchor", "start")
      // .text(title ? title : "")
      // .style("font-size", "16px")
    );

  const p = d3.line()([
    [marginLeft, height - 30],
    [width - 30, marginTop],
    [marginLeft, marginTop],
  ]);

  svg
    .append("path")
    .attr("stroke-width", 1)
    .attr("stroke-linecap", strokeLinecap)
    .attr("stroke-linejoin", strokeLinejoin)
    .attr("stroke-opacity", strokeOpacity)
    .attr("d", line(I))
    .attr("fill", "none")
    .attr("stroke", color);

  container.innerHTML = "";
  container.append(svg.node());
};

export let aapl = [
  { date: "2007 - 04 - 23", close: 93.24 },
  { date: "2007 - 04 - 25", close: 93.24 },
  { date: "2007 - 04 - 24", close: 95.35 },
];

export const options = {
  x: (d) => new Date(d.date),
  y: (d) => d.price,
  yLabel: "↑ Daily close ($)",
  width: 1200,
  height: 500,
  // color: "steelblue",
  // color: "#9a5493",
  color: "rgb(192 132 252)",
};

// const LineChart1 = (container) => {
//   let width = 1000;
//   let height = 600;
//   let x = d3
//     .create("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("viewBox", [0, 0, width, height])
//     .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
//   const p = d3.line()([
//     [0, 0],
//     [500, 500],
//     [1000, 500],
//   ]);

//   x.append("path").attr("d", p).attr("stroke", "black").attr("fill", "none");
//   container.append(x.node());
// };

export default LineGraph;
