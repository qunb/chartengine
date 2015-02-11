/**
ChartEngine
@module ChartEngine
@exports ChartEngine
@version 0.1
@namespace ChartEngine
*/

// Import d3 home extended
require('d3extended');

// Import style
//require('allStyle');

// Import paper
//var paper = require('paperjs');

// Import infographies and charts
require('MarimekkoChart');
require('PieBarEvol');
require('IconChart');
require('PieChart');
require('HorizontalBarChart');
require('BigTextChart');
require('VerticalAvgBarChart');

var ChartEngine = {};

/**
Creates a new chart
@memberof ChartEngine
@arg {object} params - An object containing an anchor DOM id, a chart type, a width and a height
@return the created chart object
ChartEngine.create({anchorId: "#myChartContainer", chartType: "PieBarChart", width: 950, height: 400})
*/

ChartEngine.create = function(params) {
	var d3Dom = d3.select(params.anchorId);
	
	var canvas = d3Dom.append('canvas').style({
		position: 'absolute',
		top: d3Dom.offsetTop + 'px',
		left: d3Dom.offsetLeft + 'px'
	}).classed(params.chartType+'Canvas', true);

	//paper.setup(canvas.node());

	return d3Dom.append('svg')
		.classed(params.chartType, true)
		.chart(params.chartType, params);
};

module.exports = ChartEngine;