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
			var chart = this.chart();
			var zoneX = chart.getZoneX('ordinalXAxis');
			// nice blue #3F84AD

			this.each(function(avg){
				this.linePath = new paper.Path();

				this.linePath.strokeColor = '#3F84AD';
				this.linePath.strokeWidth = 2;

				this.linePath.dashArray = [6, 3];

				this.linePath.add(new paper.Point(zoneX.start, chart.yscale(avg)));
				this.linePath.add(new paper.Point(zoneX.end, chart.yscale(avg)));

				this.lineLabel = new paper.PointText({
				    point: [zoneX.start-3, chart.yscale(avg)+4],
				    content: avg,
				    fillColor: '#3F84AD',
				    justification : 'right'
				});
			});

			return this;
		},
		'enter:transition': function() {
			return this;
		},

		update: function() {
			var chart = this.chart();
			var zoneX = chart.getZoneX('ordinalXAxis');

			this.each(function(avg){
				this.linePath.removeSegments();

				this.linePath.add(new paper.Point(zoneX.start, chart.yscale(avg)));
				this.linePath.add(new paper.Point(zoneX.end, chart.yscale(avg)));

				this.lineLabel.set({
					point: [zoneX.start-3, chart.yscale(avg)+4],
					content: avg
				});
			});

			return this;
		},
		'update:transition': function() {
			return this;
		},

		merge: function() {
			paper.view.draw();

			return this;
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