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

var OrdinalAxisChart = require('OrdinalAxisChart');
var QuantitativeAxisChart = require('QuantitativeAxisChart');

var ordinalScale = d3.scale.ordinal();
var linearScale = d3.scale.linear();

var VerticalAvgBarChart = d3.chart("AbstractChart").extend("VerticalAvgBarChart", {

    zones: {
        ordinalXAxis: {
            type: 'OrdinalAxisChart',
            //type:'QuantitativeAxisChart',
            attach: 'ordinalXAxis',
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
            chart.xscale.rangeRoundBands([chart.width() * chart.zones.ordinalXAxis.width.end, chart.width()], .33, .25);
        };
        chart.on('change:width', changeOrdinalXscaleRange);
        changeOrdinalXscaleRange();

        this.yscale = linearScale;
        var changeLinearYscaleRange = function() {
            chart.yscale.range([chart.height() * chart.zones.ordinalXAxis.height.end, chart.height() * chart.zones.ordinalXAxis.height.start]);
        };
        chart.on('change:height', changeLinearYscaleRange);
        changeLinearYscaleRange();

        this.canvasBarRectangleLayer = this.base.append('custom:sketch').classed('barRectangleLayer', true);
        this.canvasBarRectangleLayerInstance = this.layer('canvasBarRectangleLayer', this.canvasBarRectangleLayer, CanvasBarRectangleLayer);

        //this.barLabelLayer = this.base.append('g').classed('barLabelLayer', true)
        //this.barLabelLayerInstance = this.layer('barLabelLayer', this.barLabelLayer, BarLabelLayer);
    },

    transform: function(data) {
        this.data = data;
        data = this.colorManager.attributesColors(data);
        data = BarAdapter.computeLines(data);
        /* X axis domain
        - Always start at 0 when all values are of the same sign
        - A padding of 1/10 the scale is added on both ends (it's visually better)
        */
        var extent = d3.extent(data.points, function(point) {
            return point.value;
        })

        var distance = extent[1] - extent[0]
        if (extent[0] >= 0) {
            extent[0] = 0
        } else {
            extent[0] = extent[0] - distance / 10
        }
        if (extent[1] <= 0) {
            extent[1] = 0
        } else {
            extent[1] = extent[1] + distance / 10
        }

        this.xscale.domain(_.pluck(data.points, function(point){
            return point.id;
        }));

        this.yscale.domain(extent);

        return data.points;
    },

    overEvent: function(params) {
        //this.barRectangleLayerInstance.over(params);
    },

    outEvent: function(params) {
        //this.barRectangleLayerInstance.out(params);
    }

});

module.exports = VerticalAvgBarChart;