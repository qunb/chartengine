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
			// var chart = this.chart();
			// this
			// 	.on('mouseover', function(d, i, j) {
			// 		chart.trigger('over', {
			// 			chart: chart.params,
			// 			elId: d.id
			// 		});
			// 	})
			// 	.on('mouseout', function(d, i, j) {
			// 		chart.trigger('out', {
			// 			chart: chart.params,
			// 			elId: d.id
			// 		});
			// 	});
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

			this.each(function(point){

				new paper.Path.Rectangle({
					rectangle : new paper.Rectangle( 
							new paper.Point(chart.xscale(point.id), chart.yscale(0)), 
							new paper.Point(chart.xscale(point.id) + chart.xscale.rangeBand(), chart.yscale(point.value))
						),
					fillColor : '#999999'
				});

				var floorPath = new paper.Path();

				floorPath.strokeColor = '#999999';
				floorPath.strokeWidth = 1;

				floorPath.add(new paper.Point(zoneX.start, chart.yscale(0)));
				floorPath.add(new paper.Point(zoneX.end, chart.yscale(0)));

				// Labels
				var labelColor = '#999999';

				new paper.PointText({
				    point: [chart.xscale(point.id)+(chart.xscale.rangeBand()/2), chart.yscale(0)+15],
				    content: point.id,
				    fillColor: labelColor,
				    justification : 'center'
				});
				new paper.PointText({
				    point: [chart.xscale(point.id)+(chart.xscale.rangeBand()/2), chart.yscale(point.value)-5],
				    content: point.value,
				    fillColor: labelColor,
				    justification : 'center'
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

module.exports = CanvasBarRectangleLayer;