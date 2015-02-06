/**
@module ChartEngine
@submodule Layer
@class CanvasAvgLineLayer
*/

var paper = require('paperjs');

var CanvasAvgLineLayer = {

	modes: ["large", "medium", "small"],

	dataBind: function(data) {
		console.log(data.avg);
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