var data_ary = [10, 70, 25, 145, 195, 23, 70, 15, 133, 80, 42, 22, 10, 46, 77, 25, 253, 32, 22, 222];

var backgroundHeight = 400,
    backgroundWidth = 600,
    barWidth = 20,
    barSpacing = 10;

var svg = d3.select('#bar_graph')                  // targeting an id
    .append('svg')                                 // create svg tag
        .style('background', '#eee')               // style background color
        .attr('height', backgroundHeight)          // set background height
        .attr('width', backgroundWidth)            // set background width
        .selectAll('rect')                         // svg <rect> are the bars in the graph
        .data(data_ary)                            // coming from selectAll rect, data will be the y axis
        .enter()                                   // switch to yet-to-be-added elements selection
    .append('rect')                                // ~ bars, as we go through the data_ary we append a rect
        .style('fill', 'aqua')                     // style the rect color
        .attr('width', barWidth)                   // bars width
        .attr('height', function(d) {              // d ~ data, sets the height to the current data
            return d;                              // currently all on top of each other
        })
        .attr('x', function(d, i) {                // barSpacing x of barWidth, using data_ary index
            return i * (barWidth + barSpacing);    // each x (width + spacing) * total index to fit in x axis
        })
        .attr('y', function(d) {                   // barSpacing y of barWidth
            return backgroundHeight - d;           // begining height starts at the bottom
        })

// Circle with Drop Shadow
var w = 600, h = 600;
var svg = d3.select("#circle_with_drop_shadow")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
var defs = svg.append("defs");
// black drop shadow
var filter = defs.append("filter")
    .attr("id", "drop-shadow")
filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 2)
filter.append("feOffset")
    .attr("dx", 4) // x offset
    .attr("dy", 4) // y offset
var feMerge = filter.append("feMerge");
feMerge.append("feMergeNode")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");
svg.append("circle")
    .attr("r", 50)   // radius
    .attr("cx", 300) // x
    .attr("cy", 300) // y
    .style("filter", "url(#drop-shadow)")
    .style("fill", "aqua")
