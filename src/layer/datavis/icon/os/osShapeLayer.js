/**
Provides chart people mobile layer
@module ChartEngine
@submodule Layer
@class OsShapeLayer
*/

var OsShapeLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(points) {
		return this.selectAll('.os').data(points);
	},

	insert: function() {
		return this.append('g').classed('os', true);
	},

	events: {
		enter: function() {
			this.each(function(point) {
				var svgShape = d3.selectAll('#os-defs #os-shape-' + point.id).node();
				this.appendChild(svgShape.cloneNode(true));
			});
			return this;
		},
		merge: function() {
			var chart = this.chart();
			this
				.attr('transform', function(point, i, j) {
					var bbox = this.getBBox();
					// Scale width
					var bandWidth = chart.ordinalScale.rangeBand();
					var ratioWidth = bandWidth / bbox.width;
					// Scale height
					var ratioHeight = chart.height() / bbox.height;
					var ratio = _.min([ratioWidth, ratioHeight]);

					var scale = ' scale(' + ratio + ') ';

					var x = +chart.ordinalScale(i);
					var y = (chart.height() - (bbox.height * ratio)) / 2;
					//var y = +chart.height() / 2;
					var translate = ' translate(' + x + ',' + y + ') ';
					return translate + scale;
				});

			// Fill with highlight color
			this
				.selectAll('.highlight')
				.attr('fill', chart.colorManager.colors.highlight);
			this
				.selectAll('.highlightStroke')
				.attr('stroke', chart.colorManager.colors.highlight);

			return this;
		}
	}
};

module.exports = OsShapeLayer;