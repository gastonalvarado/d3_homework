// @TODO: YOUR CODE HERE!

//Prepare Canvas and SVG
//=================================
//Store width and height parameters for the canvas
var svgWidth = 960;
var svgHeight = 500;

//Set margins
var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

//Create widht and height margins for the SVG. This space will hold the chart group
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

//Create the ChartGroup that will contain the data
//Use the transform attribute to make it fit within the canvas  
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
//=================================
var file= "data.csv"

//Call function  and pass csv data
  d3.csv(file).then(successHandle, errorHandle);

//Use error handling function to append data and SVG objects
//If there is an error it will only be visible in the console
function errorHandle(error) {
  throw error();
}

//Function takes in argument stateData
function successHandle(stateData) {

//loop through the data and pass argument data
// ==============================
    stateData.map(function(data) {
      data.poverty = +data.poverty;
      data.obesity = +data.obesity;
    });

//Create scale functions
// ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(stateData, d => d.poverty)])
      .range([0, width]);

    // Create y scale function
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(stateData, d => d.obesity)])
      .range([height, 0]);

//Create axis functions
// ==============================
    var bottomAxis = d3.axisBottom(xLinearScale)
      // Adjust the numbet of ticks for bottom axis
      .ticks(7);
    var leftAxis = d3.axisLeft(yLinearScale)
       .ticks(5);

//Append Axes to the chart
// ==============================
//Bottom axis moves using height
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

//left axis is already at 0,0
//Only append the left axis
    chartGroup.append("g")
        .call(leftAxis);

//Create Circles for the scatter plot
// ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "20")
    .attr("fill", "darkred")
    .attr("opacity", ".75");

//Append text to circles
//===============================
    var circlesGroup = chartGroup.selectAll()
      .data(stateData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d.poverty))
      .attr("y", d => yLinearScale(d.obesity))
      .style("font-size", "13px")
      .attr('text-anchor', 'middle')
      .style("fill","white")
      .text(d =>(d.abbr));

//Initialize tool tip
// ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Poverty: ${d.poverty}%<br>Obesity: ${d.obesity}%`);
      });

//Create tooltip in the chart
// ==============================
    chartGroup.call(toolTip);

//Create event listeners to display and hide the tooltip
// ==============================
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data) {
        toolTip.hide(data);
      });

// Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Obese (%)");

// append text 
    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");
  }

