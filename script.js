// create an array data values within a given range a random number of times
var data_ary = [];  // [10, 70, 25, 145, 195, 23, 70, 15, 133, 80, 42, 22, 10, 46, 77, 25, 253, 32, 22, 222];
// console.log(data_ary.length)
var minimum = 10   // 1  // 10  // 100
var maximum = 100 // 10 // 100 // 1000 // 10000 // 100000
// Generating random whole numbers in JavaScript in a specific range
var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

// each refresh gives new values
for (var i=0; i < randomnumber; i++) { 
    data_ary.push(Math.round(Math.random()*randomnumber)) // random whole numbers, within given range
}

var backgroundHeight = 400,
    backgroundWidth = 600,
    barWidth = 20,
    barSpacing = 10,
    setTempColor = '#f6f';                     // pinkish
    unsetTempColor = null,                     // none
    backgroundColor = 'rgba(192,192,192,0.3)'; // greyish background with 60% opacity

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

// sort data in assending order by comparison
data_ary.sort(function sortAssendingOrder(a,b) {
    return a - b;
});

// showDataValue of rect on mouseover: part 1
var showDataValue = d3.select('body').append('div')
        .style('font-weight', 'bold')
        .style('font-size', '20px')
        .style('position', 'absolute')             // touching <rect> 
        .style('padding', '2px')
        .style('background', 'rgba(255,255,255,0.6)')     // whitish background with 60% opacity

var svg = d3.select('#bar_graph')                  // targeting an id
    .append('svg')                                 // create svg tag
        .style('background', backgroundColor)      // style background color
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
        .attr('x', function(d,i) {
            return xScale(i);
        })
        .attr('height', 0)
        .attr('y', backgroundHeight)
    // events (like mouseover, mouseout, onhover...) now implimented
    .on('mouseover', function(d) {
        unsetTempColor = this.style.fill;
        d3.select(this)
            .style('opacity', .3)
            .style('fill', setTempColor)            // add a color, if desired
    })
    .on('mouseout', function(d) {
        d3.select(this)
            .style('opacity', 1)
            .style('fill', unsetTempColor)          // add a color, if desired
        // showDataValue of rect on mouseover: part 1
        showDataValue.transition()
            .style('opacity', .9)
        showDataValue.html(d)
                .style('left', (d3.event.pageX - 1) + 'px')
                .style('top',  (d3.event.pageY - 25) + 'px')
        // position the showDataValue on the x axis ~ below the <rect> element
        // showDataValue.html(d)
            // .style('left', (d3.event.pageX) + 'px')
        // position the showDataValue on the x,y axis of the <rect> element
        // offset by a few px to minimize cursor covering value as it appears
    })

// grow animate the chart height for each rect: part 2
svg.transition()
    .attr('height', function(d) {
        return yScale(d);
    })
    .attr('y', function(d) {
        return backgroundHeight - yScale(d);
    })
// was fast so adding a delay for the growing animation effect
    .delay(function(d, i) {
        return i * 15;                              // quicken speed of each rect element
    })
    .duration(500)                                  // adds delay
    .ease('elastic')                                // nice bouncy effect, too long pulls back to short, and vica versa
