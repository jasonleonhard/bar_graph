var data_ary = [10, 70, 25, 145, 195, 23, 70, 15, 133, 80, 42, 22, 10, 46, 77, 25, 253, 32, 22, 222];

var backgroundHeight = 400,
    backgroundWidth = 600,
    barWidth = 20,
    barSpacing = 10;

var svg = d3.select('#bar_graph')
    .append('svg')
        .style('background', '#eee')
        .attr('height', backgroundHeight)
        .attr('width', backgroundWidth)
        .selectAll('rect')
        .data(data_ary)
        .enter()
    .append('rect')
        .style('fill', 'aqua')
        .attr('width', barWidth)
        .attr('height', function(d) { return d; })
        .attr('x', function(d, i) {
            return i * (barWidth + barSpacing);
        })
        .attr('y', function(d) { return backgroundHeight - d; })

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
