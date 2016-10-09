// create an array data values within a given range a random number of times
var data_ary = [];  // [10, 70, 25, 145, 195, 23, 70, 15, 133, 80, 42, 22, 10, 46, 77, 25, 253, 32, 22, 222];
var minimum = 10   // 1  // 10  // 100
var maximum = 100 // 10 // 100 // 1000 // 10000 // 100000
// Generating random whole numbers in JavaScript in a specific range
var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

// each refresh gives new values
for (var i=0; i < randomnumber; i++) { data_ary.push(Math.random()) }

var backgroundHeight = 400,
    backgroundWidth = 600,
    barWidth = 20,
    barSpacing = 10,
    setTempColor = '#f6f';
    unsetTempColor = null;

// change color of chart bars depending on horizontal position
var colors = d3.scale.linear()
    .domain([0, data_ary.length*(1/3), data_ary.length*(2/3), data_ary.length])
    .range(['yellow', 'orange', 'red', 'purple'])

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
        .style('fill', function(d,i) {             // if by
            return colors(i);
        })
        .attr('width', xScale.rangeBand())         // now scales
        .attr('height', function(d) {              // d ~ data, sets the height to the current data
            return yScale(d);                      // currently all on top of each other, y scaled to a max value
        })
        .attr('x', function(d, i) {                // barSpacing x of barWidth, using data_ary index
            return xScale(i) ;
        })
        .attr('y', function(d) {                   // barSpacing y of barWidth
            return backgroundHeight - yScale(d);   // begining height starts at the bottom
        })
    // events (like mouseover, mouseout, onhover...) now implimented
    .on('mouseover', function(d) {
        unsetTempColor = this.style.fill;
        d3.select(this)
            .style('opacity', .3)
            .style('fill', setTempColor)            // add a color, if desired
    })
    .on('mouseout', function(d) {                   // similarly
        d3.select(this)
            .style('opacity', 1)
            .style('fill', unsetTempColor)          // add a color, if desired
    })

console.log(data_ary.length)
