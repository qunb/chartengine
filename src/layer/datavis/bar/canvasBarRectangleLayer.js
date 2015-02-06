/**
@module ChartEngine
@submodule Layer
@class CanvasBarRectangleLayer
*/

var paper = require('paperjs');

var CanvasBarRectangleLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(points) {
		return this.selectAll('.barRect').data(points, function(point) {
			return point.id;
		});
	},

	insert: function() {
		return this.append('custom:rect').classed('barRect', true);
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
			var chart = this.chart(),
				height = chart.zones.ordinalXAxis.height;
			this.each(function(point){
				var rectangle = new paper.Rectangle( 
					new paper.Point(chart.xscale(point.id), chart.yscale(0)), 
					new paper.Point(chart.xscale(point.id) + chart.xscale.rangeBand(), chart.yscale(point.value))
				);
				var barPath = new paper.Path.Rectangle(rectangle);
				barPath.fillColor = '#999999';//point.color;

				//barPaths.push(barPath);

				console.log(point, rectangle);
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