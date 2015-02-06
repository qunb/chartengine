/**
Provides a base for a horizontal bar chart
@module ChartEngine
@submodule Chart
@class HorizontalBarChart
*/

var AbstractChart = require('AbstractChart');
var Formatter = require('Formatter');

var BarAdapter = require('BarAdapter');

var CanvasBarRectangleLayer = require('CanvasBarRectangleLayer');
var CanvasAvgLineLayer = require('CanvasAvgLineLayer');

//var OrdinalAxisChart = require('OrdinalAxisChart');
//var QuantitativeAxisChart = require('QuantitativeAxisChart');

var ordinalScale = d3.scale.ordinal();
var linearScale = d3.scale.linear();

var VerticalAvgBarChart = d3.chart("AbstractChart").extend("VerticalAvgBarChart", {

    zones: {
        ordinalXAxis: {
            type: 'OrdinalAxisChart',
            //type:'QuantitativeAxisChart',
            //attach: 'ordinalXAxis',
            //attach:'linearXAxis',
            scale: ordinalScale,
            formatter: 'ShortValueFormatter',
            orientation: 'top',
            width: {
                start: .2,
                end: .8
            },
            height: {
                start: .2,
                end: .8
            },
            //isAxis: true,
            //grid: true
        }
    },

    initialize: function(options) {
        var chart = this;
        this.base.classed('barChart', true);

        // this.tip = d3.tip()
        //     .attr('class', 'd3-tip')
        //     .attr('id', 'horizontalBarChartTooltip-' + chart.params.attach || chart.params.anchorId)
        //     .html(function(point) {
        //         return point.name + ': ' + Formatter.format(point.value, 'ShortValueFormatter');
        //     })
        //     .offset([-12, 0]);
        // this.base.call(this.tip);

        // Scale generators
        this.xscale = ordinalScale;
        var changeOrdinalXscaleRange = function() {
            chart.xscale.rangeRoundBands([chart.width() * chart.zones.ordinalXAxis.width.start, chart.width() * chart.zones.ordinalXAxis.width.end], .33, .25);
        };
        //chart.on('change:width', changeOrdinalXscaleRange);
        changeOrdinalXscaleRange();

        this.yscale = linearScale;
        var changeLinearYscaleRange = function() {
            chart.yscale.range([chart.height() * chart.zones.ordinalXAxis.height.end, chart.height() * chart.zones.ordinalXAxis.height.start]);
        };
        //chart.on('change:height', changeLinearYscaleRange);
        changeLinearYscaleRange();

        this.canvasAvgLineLayer = this.base.append('custom:sketch').classed('barAvgLine', true);
        this.canvasAvgLineleLayerInstance = this.layer('canvasAvgLineLayer', this.canvasAvgLineLayer, CanvasAvgLineLayer);

        this.canvasBarRectangleLayer = this.base.append('custom:sketch').classed('barRectangleLayer', true);
        this.canvasBarRectangleLayerInstance = this.layer('canvasBarRectangleLayer', this.canvasBarRectangleLayer, CanvasBarRectangleLayer);

        //this.canvasAvgLineLayer = this.base.append('custom:sketch').classed('barAvgLine', true);
        //this.canvasAvgLineleLayerInstance = this.layer('canvasAvgLineLayer', this.canvasAvgLineLayer, CanvasAvgLineLayer);
    },

    transform: function(data) {
        var chart = this;

        this.data = data;
        data = this.colorManager.attributesColors(data);
        data = BarAdapter.computeLines(data);

        //console.log(data.points);

        var extent = d3.extent(data.points, function(point) {
            return point.value;
        });

        this.xscale.domain(_.pluck(data.points, function(point){
            return point.id;
        }));

        this.yscale.domain(extent);

        data.avg = Math.round(data.points.reduce(function(a, b){
            return (a.value || a) + b.value;
        })/data.points.length);

        return data;
    },

    overEvent: function(params) {
        //this.barRectangleLayerInstance.over(params);
    },

    outEvent: function(params) {
        //this.barRectangleLayerInstance.out(params);
    }

});

module.exports = VerticalAvgBarChart;