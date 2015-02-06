/**
@module ChartEngine
@submodule Layer
@class CanvasAvgLineLayer
*/

var paper = require('paperjs');

var CanvasAvgLineLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(data) {
		return this.selectAll('.f-line').data([data.avg]);
	},

	insert: function() {
		return this.append('custom:line').classed('f-line', true);
	},

	over: function(params) {

	},

	out: function(params) {

	},

	events: {
		enter: function() {
			return this;
		},
		'enter:transition': function() {
			return this;
		},

		update: function() {
			return this;
		},
		'update:transition': function() {
			return this;
		},

		merge: function() {
			var chart = this.chart();

			var zoneX = chart.getZoneX('ordinalXAxis');
			// nice blue #3F84AD
			this.each(function(avg){
				var linePath = new paper.Path();

				linePath.strokeColor = '#3F84AD';
				linePath.strokeWidth = 2;

				linePath.dashArray = [6, 3];

				linePath.add(new paper.Point(zoneX.start, chart.yscale(avg)));
				linePath.add(new paper.Point(zoneX.end, chart.yscale(avg)));

				new paper.PointText({
				    point: [zoneX.start-3, chart.yscale(avg)+4],
				    content: avg,
				    fillColor: '#3F84AD',
				    justification : 'right'
				});
			});

			paper.view.draw();
		},
		'merge:transition': function() {
			return this;
		},

		exit: function() {
			//this.remove();
		},
		'exit:transition': function() {
			return this;
		}
	}
};

module.exports = CanvasAvgLineLayer;