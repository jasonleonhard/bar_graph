// var dataAry = [10, 70, 25, 145, 195, 23, 70, 15, 133, 80, 42, 22, 10, 46, 77, 25, 253, 32, 22, 222];

// create an array data values within a given range a random number of times
// var dataAry = [];
//     minimum = 10,   // 1  // 10  // 100
//     maximum = 100,  // 10 // 100 // 1000 // 10000 // 100000
// // Generating random whole numbers in JavaScript in a specific range
//     randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum,
// // random number of times
//     times   = Math.floor(Math.random() * 60) + 10, // *maximum + minimum);
// // round to the nearest 10
//     rounded   = Math.round(randomnumber/ 10) * 10;
// // set times now to that rounded amount to avoid the x scale failing to appear
//     times   = rounded
//     // console.log(randomnumber)
//     // console.log(times)

// // each refresh gives new values
// for (var i=0; i < times; i++) {
//     // random whole numbers, within given range
//     dataAry.push(Math.round(Math.random()*maximum)+minimum)
// }

var dataAry = [];
    d3.csv('data.csv', function(data) { // reading in data from data.csv
    // d3.tsv('data.tsv', function(data) { // reading in data from data.tsv
        console.log(data);
        for (key in data) {
            dataAry.push(data[key].value)
        }

var margin = { top: 30, right: 30, bottom: 40, left:50 }

var backgroundHeight = 400 - margin.top - margin.bottom,
    backgroundWidth = 600 - margin.left - margin.right,
    barWidth = 20,
    barSpacing = 0.15,
    setTempColor = '#f6f';                     // pinkish
    unsetTempColor = null,                     // none
    backgroundColor = 'rgba(192,192,192,0.3)'; // greyish background with 60% opacity

// change color of chart bars depending on horizontal position
var colors = d3.scale.linear()
    .domain([0, dataAry.length*(.33), dataAry.length*(.66), dataAry.length])
    .range(['yellow', 'orange', 'red', 'purple'])

// linear scaling y
// to make sure all data fits into the chart as the array grows in the y direction
// current implimentation gives up spacing bars in favor of dynamic sizing to fit chart width
var yScale = d3.scale.linear()
    .domain([0, d3.max(dataAry)])
    .range([0, backgroundHeight])

// ordinal scaling x deals with width fitting
var xScale = d3.scale.ordinal()
    .domain(d3.range(0, dataAry.length))          // generate an array 0-array length
    .rangeBands([0, backgroundWidth], barSpacing) // map values

// sort data in assending order by comparison
dataAry.sort(function sortAssendingOrder(a,b) {
    return a - b;
});

// sort data in Deassending order by comparison
// dataAry.sort(function sortDescendingOrder(a,b) {
//     return b - a;
// });


// showDataValue of rect on mouseover: part 1
var showDataValue = d3.select('body')
    .append('div')
        .style('font-weight', 'bold')
        .style('font-size', '20px')
        .style('padding', '2px')
        .style('position', 'absolute')                 // touching <rect>
        .style('background', 'rgba(255,255,255,0.6)')  // whitish background with 60% opacity

var svg = d3.select('#bar_graph')                  // targeting an id
    .append('svg')                                 // create <svg> tag
        .style('background', backgroundColor)      // style background color
        // .attr('height', backgroundHeight)          // set background height
        // .attr('width', backgroundWidth)            // set background width
        .attr('width', backgroundWidth + margin.left + margin.right)   // adding margins
        .attr('height', backgroundHeight + margin.top + margin.bottom) // ditto
    .append('g')                                                       // appending a new element // BEST: now can just moving the #bar_graph to where the scale is
        .attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
        .selectAll('rect')                         // svg <rect> are the bars in the graph
        .data(dataAry)                            // coming from selectAll rect, data will be the y axis
        .enter()                                   // switch to yet-to-be-added elements selection
    .append('rect')                                // <rect> ~ bars, as we go through the dataAry we append a rect
        .style('fill', function(d,i) {             // fill <rect> with color array colors
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
    .ease('elastic')  // nice bouncy effect, too long pulls back to short, and vica versa

var xGuideScale = d3.scale.linear()
    .domain([0, d3.max(dataAry)])
    .range([backgroundHeight, 0])

var xAxis = d3.svg.axis()
    .scale(xGuideScale)
    .orient('left')
    .ticks(10)

var xGuide = d3.select('svg').append('g')
    xAxis(xGuide)
    xGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
    xGuide.selectAll('path')
        .style({ fill: 'none', stroke: "#000"})
    xGuide.selectAll('line')
        .style({ stroke: "#000"})

var yAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickValues(xScale.domain().filter(function(d, i) {
        return !(i % (dataAry.length/5));
    }))

var yGuide = d3.select('svg').append('g')
    yAxis(yGuide)
    yGuide.attr('transform', 'translate(' + margin.left + ', ' + (backgroundHeight + margin.top) + ')')
    yGuide.selectAll('path')
        .style({ fill: 'none', stroke: "#000"})
    yGuide.selectAll('line')
        // .style({ stroke: "#000"})
});