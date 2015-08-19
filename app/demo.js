(function() {
	'use strict';
	
	angular.module('myApp')
    .controller('DemoController', DemoController);

	/* @ngInject */
	function DemoController($scope) { 
		/*jshint validthis: true */
		var vm = this;
		
		vm.addChart = addChart;
		vm.charts = [
  		   {type: 'Bar', data: [[400, 500, 1000], [200, 500, 1000]], labels:["2010", "2011", "2012"]}, 
  		   {type: 'Line', data: [[400, 500, 1000], [200, 500, 1000]], labels:["2010", "2011", "2012"]}
  		]
		
		vm.activeChart = vm.charts[0];
		
		vm.editChart = editChart;
		
		function addChart() {
			var newChart = {type: 'Bar', data:[[100, 100]], labels: ["1", "2"]};
			vm.charts.push(newChart);
			editChart(newChart)
		};
		
		function editChart(chart) {
			vm.activeChart = chart;
		};
	}
})();