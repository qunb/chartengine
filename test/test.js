var ChartEngine = require('ChartEngine');
var DatasetFactory = require('DatasetFactory');

var chartParams = {
	anchorId: "#test",
	//chartType: "DoubleMarimekkoChart",
	//chartType: "MarimekkoChart",
	chartType: 'VerticalAvgBarChart',
	size: 'auto'
};

window.chart = ChartEngine.create(chartParams);

var dataset = {
	lines : [{
		id: 'ventes',
		name: 'Ventes',
		points: [{
			value: 603,
			id: '0',
			xAxis: 'Sep-14'
		},
		{
			value: 1076,
			id: '1',
			xAxis : 'Oct-14'
		},
		{
			value: 2907,
			id: '2',
			xAxis : 'Nov-14'
		},
		{
			value: 4459,
			id: '3',
			xAxis : 'Dec-14'
		}]
	}]
}

chart.draw(dataset);

setTimeout(function () {
	dataset = {
		lines : [{
			id: 'ventes',
			name: 'Ventes',
			points: [{
				value: 1703,
				id: '0',
				xAxis: 'Sep-14'
			},
			{
				value: 376,
				id: '1',
				xAxis : 'Oct-14'
			},
			{
				value: 1007,
				id: '2',
				xAxis : 'Nov-14'
			},
			{
				value: 4459,
				id: '3',
				xAxis : 'Dec-14'
			}]
		}]
	}

	console.log('Data Change');
	chart.draw(dataset);
}, 3000);

// dataset.lines[0].points.push({
// 	value: null,
// 	id: '4',
// 	xAxis : 'Jan-15'
// });

// chart.draw(dataset);

// dataset.lines[0].points[4].value = "";

// chart.draw(dataset);

// dataset.lines[0].points[4].value = 0;

// chart.draw(dataset);

// dataset.lines[0].points[4].value = 6000;

// chart.draw(dataset);

// dataset.lines[0].points = [
// 	{
// 		value: 603,
// 		id: '0',
// 		xAxis: 'Sep-14'
// 	},
// 	{
// 		value: 1076,
// 		id: '1',
// 		xAxis : 'Oct-14'
// 	},
// 	{
// 		value: 2907,
// 		id: '2',
// 		xAxis : 'Nov-14'
// 	}
// ]

// chart.draw(dataset);

// dataset.lines[0].points.push({
// 	value: 1500,
// 	id : '3',
// 	xAxis: 'Dec-14'
// });

// chart.draw(dataset);