/**
@module ChartEngine
@submodule Layer
@class CanvasBarRectangleLayer
*/

var paper = require('paperjs');

var CanvasBarRectangleLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(data) {
		return this.selectAll('.f-barRect').data(data.points, function(point) {
			return point.id;
		});
	},

	insert: function() {
		return this.append('custom:rect').classed('f-barRect', true);
	},

	over: function(params) {
		// var chart = this.chart();
		// this
		// 	.selectAll(".barRect")
		// // .attr('fill', 'black')
		// // 	function(point, i) {
		// // 	return (point.id == params.elId) ? highlight : colors[i];
		// // });
	},

	out: function(params) {
		// var chart = this.chart();
		// chart.tip.hide();
	},

	events: {
		enter: function() {
			var chart = this.chart();
			var zoneX = chart.getZoneX('ordinalXAxis');

			this.each(function(point){

				this.rect = new paper.Rectangle({
					x : chart.xscale(point.id),
					y : chart.yscale(point.value),
					width : chart.xscale.rangeBand() || 0.1,
					height : chart.yscale(0) - chart.yscale(point.value) || 0.1
				});

				this.path = new paper.Path.Rectangle({
					rectangle : this.rect,
					fillColor : '#999999'
				});

				// Labels
				var labelColor = '#999999';

				this.xLabel = new paper.PointText({
				    point: [chart.xscale(point.id)+(chart.xscale.rangeBand()/2), chart.yscale(0)+15],
				    content: point.xAxis,
				    fillColor: labelColor,
				    justification : 'center'
				});
				this.valueLabel = new paper.PointText({
				    point: [chart.xscale(point.id)+(chart.xscale.rangeBand()/2), chart.yscale(point.value)-5],
				    content: point.value,
				    fillColor: labelColor,
				    justification : 'center'
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

			this.each(function(point){
				// TODO create groups of items
				this.path.visible = true;
				this.xLabel.visible = true;
				this.valueLabel.visible = true;

				this.path.scale(
					chart.xscale.rangeBand()/this.path.bounds.width || 1, 
					(chart.yscale(0) - chart.yscale(point.value))/this.path.bounds.height || 1
				);

				this.path.pivot = this.path.bounds.topLeft;
				this.path.position = new paper.Point(chart.xscale(point.id), chart.yscale(point.value));

				this.xLabel.set({
					point: [chart.xscale(point.id)+(chart.xscale.rangeBand()/2), chart.yscale(0)+15],
				    content: point.xAxis
				});

				this.valueLabel.set({
					point: [chart.xscale(point.id)+(chart.xscale.rangeBand()/2), chart.yscale(point.value)-5],
				    content: point.value
				});
			});

			return this;
		},
		'update:transition': function() {
			return this;
		},

		merge: function() {
			var chart = this.chart();
			var zoneX = chart.getZoneX('ordinalXAxis');

			if(!chart.floorPath) {
				chart.floorPath = new paper.Path();
				chart.floorPath.strokeColor = '#999999';
				chart.floorPath.strokeWidth = 1;
			}

			chart.floorPath.removeSegments();
			chart.floorPath.add(new paper.Point(zoneX.start, chart.yscale(0)));
			chart.floorPath.add(new paper.Point(zoneX.end, chart.yscale(0)));

			paper.view.draw();

			return this;
		},
		'merge:transition': function() {
			return this;
		},

		exit: function() {
			var chart = this.chart();
			var zoneX = chart.getZoneX('ordinalXAxis');

			this.each(function(point){
				this.path.visible = false;
				this.xLabel.visible = false;
				this.valueLabel.visible = false;
			});

			//this.remove();
			return this;
		},
		'exit:transition': function() {
			return this;
		}
	}
};

module.exports = CanvasBarRectangleLayer;