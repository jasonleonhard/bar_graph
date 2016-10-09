// create an array data values within a given range a random number of times
var data_ary = [];  // [10, 70, 25, 145, 195, 23, 70, 15, 133, 80, 42, 22, 10, 46, 77, 25, 253, 32, 22, 222];
var minimum = 10   // 1  // 10  // 100
var maximum = 1000 // 10 // 100 // 1000 // 10000 // 100000
// Generating random whole numbers in JavaScript in a specific range
var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
// console.log(randomnumber)

// each refresh gives new values
for (var i=0; i < randomnumber; i++) { data_ary.push(Math.random()) }
// for (var i=0; i < 100; i++) { data_ary.push(Math.random()) }

var backgroundHeight = 400,
    backgroundWidth = 600,
    barWidth = 20,
    barSpacing = 10;

// change color of chart bars depending on horizontal position
var colors = d3.scale.linear()
    // .domain([0, data_ary.length*.33, data_ary.length*.66, data_ary.length])
    .domain([0, data_ary.length*(1/3), data_ary.length*(2/3), data_ary.length])
    .range(['yellow', 'orange', 'red', 'purple'])
    // .domain([0, d3.max(data_ary)]) // if by height
    // .range(['aqua', 'red'])        // if hard coded

// linear scaling y
// to make sure all data fits into the chart as the array grows in the y direction
// current implimentation gives up spacing bars in favor of dynamic sizing to fit chart width
var yScale = d3.scale.linear()
    .domain([0, d3.max(data_ary)])
    .range([0, backgroundHeight])

// ordinal scaling x deals with width fitting
var xScale = d3.scale.ordinal()
    .domain(d3.range(0, data_ary.length))          // generate an array 0-array length
    .rangeBands([0, backgroundWidth])              // map values

var svg = d3.select('#bar_graph')                  // targeting an id
    .append('svg')                                 // create svg tag
        .style('background', '#eee')               // style background color
        .attr('height', backgroundHeight)          // set background height
        .attr('width', backgroundWidth)            // set background width
        .selectAll('rect')                         // svg <rect> are the bars in the graph
        .data(data_ary)                            // coming from selectAll rect, data will be the y axis
        .enter()                                   // switch to yet-to-be-added elements selection
    .append('rect')                                // ~ bars, as we go through the data_ary we append a rect
        // .style('fill', 'aqua')                     // if hard coded, style the rect color
        // .style('fill', colors)                     // if by height
        .style('fill', function(d,i) {             // if by
            return colors(i);
        })
        .attr('width', xScale.rangeBand())         // now scales
        .attr('height', function(d) {              // d ~ data, sets the height to the current data
            return yScale(d);                      // currently all on top of each other, y scaled to a max value
        })
        .attr('x', function(d, i) {                // barSpacing x of barWidth, using data_ary index
            return xScale(i) ;
            // return i * (barWidth + barSpacing);    // each x (width + spacing) * total index to fit in x axis
        })
        .attr('y', function(d) {                   // barSpacing y of barWidth
            return backgroundHeight - yScale(d);   // begining height starts at the bottom
        })

console.log(data_ary.length)
