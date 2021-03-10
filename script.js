let data = [
	{
		date: "Apr",
		sample: 21,
		score: 75,
		vsly: 0,
	},
	{
		date: "May",
		sample: 110,
		score: 71,
		vsly: 0,
	},
	{
		date: "Jun",
		sample: 2,
		score: 62,
		vsly: 0,
	},
	{
		date: "Jul",
		sample: 0,
		score: 0,
		vsly: 0,
	},
];

let dataX = data.map((item) => getMonthFromString(item.date));
console.log(dataX);
function getMonthFromString(mon) {
	let monthDateFormat = new Date(Date.parse(mon + " 1, 2020"));
	return monthDateFormat;
}

var margin = { top: 50, right: 50, bottom: 50, left: 50 },
	width = window.innerWidth - margin.left - margin.right, // Use the window's width
	height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

// The number of datapoints
var n = data.length;

// 5. X scale will use the index of our data
var xScale = d3
	.scaleTime()
	.domain([d3.min(dataX), d3.max(dataX)]) // input
	.range([0, width]); // output

	
// 6. Y scale will use the randomly generate number
var yScale = d3
	.scaleLinear()
	.domain([
		d3.min(data.map((month) => month.score)),
		d3.max(data.map((month) => month.score)),
	]) // input
	.range([height, 0]); // output

// 7. d3's line generator
var area = d3
	.area()
	//.x0(0)
	.x(function (d, i) {
		console.log(dataX[i]);
		return xScale(dataX[i]);
	}) // set the x values for the line generator
	.y0(height)
	.y1(function (d) {
		return yScale(d.y);
	}) // set the y values for the line generator
	.curve(d3.curveMonotoneX) // apply smoothing to the line\
	

var line = d3
	.line()
	//.x0(0)
	.x(function (d, i) {
		console.log(dataX[i]);
		return xScale(dataX[i]);
	}) // set the x values for the line generator
	.y(function (d) {
		return yScale(d.y);
	}) // set the y values for the line generator
	.curve(d3.curveMonotoneX); // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
var dataset = d3.range(n).map(function (d, i) {
	return { y: data[i].score };
});
console.log(dataset)


// 1. Add the SVG to the page and employ #2
var svg = d3
	.select("body")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

svg.selectAll("*").remove();
// 3. Call the x axis in a group tag
svg
	.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(xScale).tickValues(dataX)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g").attr("class", "y axis").call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft


// 9. Append the path, bind the data, and call the line generator
svg
	.append("path")
	.datum(dataset) // 10. Binds data to the line
	.attr("class", "line") // Assign a class for styling
	.attr("d", line); // 11. Calls the line generator

svg
	.append("path")
	.datum(dataset) // 10. Binds data to the line
	.attr("class", "area") // Assign a class for styling
	.attr("d", area) // 11. Calls the line generator
	.attr("fill", "url(#MyGradient)");

svg
	.selectAll(".dot")
	.data(dataset)
	.enter()
	.append("text")
	.attr("text-anchor", "top")
	.attr("x", function (d, i) {
		return xScale(dataX[i]);
	})
	.attr("y", function (d) {
		return yScale(d.y+2);
	})
	.text((d, i) => {
		return data[i].score;
	});

// 12. Appends a circle for each datapoint
svg
	.selectAll(".dot")
	.data(dataset)
	.enter()
	.append("circle") // Uses the enter().append() method
	.attr("class", "dot") // Assign a class for styling
	.attr("cx", function (d, i) {
		return xScale(dataX[i]);
	})
	.attr("cy", function (d) {
		return yScale(d.y);
	})
	.attr("r", 5);
	// .on("mouseover", function (a, b, c) {
	// 	console.log(a);
	// 	this.attr("class", "focus");
	// })
	// .on("mouseout", function () {})
  // .on("mousemove", mousemove);

  // var focus = svg.append("g")
  //     .attr("class", "focus")
  //     .style("display", "none");

  // focus.append("circle")
  //     .attr("r", 4.5);

  // focus.append("text")
  //     .attr("x", 9)
  //     .attr("dy", ".35em");

  // svg.append("rect")
  //     .attr("class", "overlay")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .on("mouseover", function() { focus.style("display", null); })
  //     .on("mouseout", function() { focus.style("display", "none"); })
  //     .on("mousemove", mousemove);

  // function mousemove() {
  //   var x0 = x.invert(d3.mouse(this)[0]),
  //       i = bisectDate(data, x0, 1),
  //       d0 = data[i - 1],
  //       d1 = data[i],
  //       d = x0 - d0.date > d1.date - x0 ? d1 : d0;
  //   focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
  //   focus.select("text").text(d);
  // }
