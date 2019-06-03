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

<<<<<<< HEAD
// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

//Create the ChartGroup that will contain the data
//Use the transform attribute to make it fit within the canvas  
=======
// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
>>>>>>> b03685a426688470e13aa3996b17da010bd4a38d
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

<<<<<<< HEAD
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

//Function takes in argument statesData
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
      .domain([8.1, d3.max(stateData, d => d.poverty)])
      .range([0, width]);
=======
// Initial Params
var chosenXAxis = "poverty";

// function used for updating x-scale var upon click on axis label
function xScale(healthData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d => d[chosenXAxis]) * 0.8,
            d3.max(healthData, d => d[chosenXAxis]) * 1.2
        ])
        .range([0, width]);

    return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {
>>>>>>> b03685a426688470e13aa3996b17da010bd4a38d

    if (chosenXAxis === "poverty") {
        var label = "Poverty Level:";
    } else {
        var label = "Healthcare Index:";
    }

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
            toolTip.show(data);
        })
        // onmouseout event
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });

    return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.csv("data.csv").then(function(healthData) {
    //if (err) throw err;

    //parse data
    healthData.forEach(function(data) {

        //Convert string into numbers    
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.state = +data.state;
    });
    console.log(healthData)
        // xLinearScale function above csv import
    var xLinearScale = xScale(healthData, chosenXAxis);

    // Create y scale function
    var yLinearScale = d3.scaleLinear()
<<<<<<< HEAD
      .domain([20, d3.max(stateData, d => d.obesity)])
      .range([height, 0]);

//Create axis functions
// ==============================
    var bottomAxis = d3.axisBottom(xLinearScale)
      //adjust the number of ticks for the bottom axis
      .ticks(7);
    var leftAxis = d3.axisLeft(yLinearScale);

//Append Axes to the chart
// ==============================
//Bottom axis moves using height
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

//left axis is already at 0,0
//Only append the left axis
=======
        .domain([0, d3.max(healthData, d => d.healthcare)])
        .range([height, 0]);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // append y axis
>>>>>>> b03685a426688470e13aa3996b17da010bd4a38d
    chartGroup.append("g")
        .call(leftAxis);

<<<<<<< HEAD
//Create Circles for the scatter plot
// ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "13")
    .attr("fill", "#788dc2")
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
=======
    console.log(xAxis)
>>>>>>> b03685a426688470e13aa3996b17da010bd4a38d

    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 20)
        .attr("fill", "pink")
        .attr("opacity", ".5");

    console.log(circlesGroup)

    // Create group for  2 x- axis labels
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    console.log(labelsGroup)

    var hairLengthLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "poverty") // value to grab for event listener
        .classed("active", true)
        .text("Hair Metal Ban Hair Length (inches)");

    console.log(hairLengthLabel)

    var albumsLabel = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "state") // value to grab for event listener
        .classed("inactive", true)
        .text("# of Albums Released");

    console.log(albumsLabel)

    // append y axis
    chartGroup.append("text")
<<<<<<< HEAD
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .attr('text-anchor', 'middle')
      .text("In Poverty (%)");
  }

=======
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .text("Number of Billboard 500 Hits");



    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    // x axis labels event listener
    labelsGroup.selectAll("text")
        .on("click", function() {
            // get value of selection
            var value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {

                // replaces chosenXAxis with value
                chosenXAxis = value;

                console.log(chosenXAxis)

                // functions here found above csv import
                // updates x scale for new data
                xLinearScale = xScale(healthData, chosenXAxis);

                console.log(xLinearScale)

                // updates x axis with transition
                xAxis = renderAxes(xLinearScale, xAxis);

                console.log(xAxis)

                // updates circles with new x values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

                // updates tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

                console.log(circlesGroup)

                // changes classes to change bold text
                if (chosenXAxis === "num_albums") {
                    albumsLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    hairLengthLabel
                        .classed("active", false)
                        .classed("inactive", true);
                } else {
                    albumsLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    hairLengthLabel
                        .classed("active", true)
                        .classed("inactive", false);
                }
            }
        });
});
>>>>>>> b03685a426688470e13aa3996b17da010bd4a38d
