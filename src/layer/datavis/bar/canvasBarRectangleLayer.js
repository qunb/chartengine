/**
@module ChartEngine
@submodule Layer
@class CanvasBarRectangleLayer
*/

var paper = require('paperjs');

function animBar () {
	// Both action are going to be execute all the time at the end of the animation
	// Need to know when the animation is finish to break the onFrame event
	// console.log(this.bounds.height, chart.yscale(0) - chart.yscale(point.value));
	// if (point.value == 1703 || point.value == 603) console.log(point.value, chart.yscale(point.value), chart.yscale(0)); // Check Pivot
	if (this.bounds.height < chart.yscale(0) - chart.yscale(point.value)) {
		// console.log('toto1');
		this.scale(
			chart.xscale.rangeBand()/this.bounds.width || 1,
			1 + ((chart.yscale(0) - chart.yscale(point.value))/this.bounds.height)/100,
			this.bounds.bottomLeft
		);
	}

	if (this.bounds.height > chart.yscale(0) - chart.yscale(point.value)) {
		// console.log('toto2');
		this.scale(
			chart.xscale.rangeBand()/this.bounds.width || 1, 
			1 - ((chart.yscale(0) - chart.yscale(point.value))/this.bounds.height)/100,
			this.bounds.bottomLeft
		);
	}
}

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
					y : chart.yscale(0),
					width : chart.xscale.rangeBand() || 0.1,
					height : 1
				});

				this.path = new paper.Path.Rectangle({
					rectangle : this.rect,
					fillColor : '#999999'
				});

				this.path.pivot = this.path.bounds.bottomLeft;
				this.path.set({point: point});

				this.path.onFrame = function () {
					// Both action are going to be execute all the time at the end of the animation
					// Need to know when the animation is finish to break the onFrame event
					// console.log(this.bounds.height, chart.yscale(0) - chart.yscale(point.value));
					// if (point.value == 1703 || point.value == 603) console.log(point.value, chart.yscale(point.value), chart.yscale(0)); // Check Pivot
					if (this.bounds.height < chart.yscale(0) - chart.yscale(this.point.value)) {
						this.scale(
							chart.xscale.rangeBand()/this.bounds.width || 1,
							1 + ((chart.yscale(0) - chart.yscale(this.point.value))/this.bounds.height)/10,
							this.bounds.bottomLeft
						);
					}

					if (this.bounds.height > chart.yscale(0) - chart.yscale(this.point.value)) {
						this.scale(
							chart.xscale.rangeBand()/this.bounds.width || 1, 
							1 - ((chart.yscale(0) - chart.yscale(this.point.value))/this.bounds.height)/10,
							this.bounds.bottomLeft
						);
					}
				}

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

		update: function () {
			var chart = this.chart();
			var zoneX = chart.getZoneX('ordinalXAxis');

			this.each(function (point){
				// TODO create groups of items
				this.path.visible = true;
				this.xLabel.visible = true;
				this.valueLabel.visible = true;

				console.log(point.value, chart.yscale(point.value));

				this.path.scale(
					chart.xscale.rangeBand()/this.path.bounds.width || 1, 
					//(chart.yscale(0) - chart.yscale(point.value))/this.path.bounds.height || 1
					1
				);

				this.path.set({point: point});

				this.path.pivot = this.path.bounds.bottomLeft;
				this.path.position = new paper.Point(chart.xscale(point.id), chart.yscale(0));

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