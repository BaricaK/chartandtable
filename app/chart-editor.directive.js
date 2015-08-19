(function() {
	'use strict';
	
	angular.module('handsontable-chart')
		.directive('htcChartEditor', chartEditor);

	/* @ngInject */
	function chartEditor(arrayUtils, $timeout) { 
		var directive = {	      
	        restrict: 'EA',
	        scope: {
	            chart: '='
	        },
	        templateUrl: 'chart-editor.html',
	        link: link
	    };
		
		return directive;
		
		function link(scope, el, attr) {
			scope.chartTypes = [
      		   {icon: 'bar-chart', value: 'Bar'},
      		   {icon: 'graph', value: 'Line'}, 		 
      		   {icon: 'pie-chart', value: 'Pie'},
      		   {icon: 'circle-line', value: 'Doughnut'},
      		   {icon: 'grid-lines-streamline', value: 'PolarArea'}, 		 
      		   {icon: 'radio-tower', value: 'Radar'}
      		];
			
			scope.table = {};
			
	        scope.$watch('chart', function() {
	        	console.log(scope.chart);
	        	setTableData();	        	
	        });
	        
	        scope.$watch('chart.type', function(newVal, oldVal) {	        	
	        	if(!scope.chart.data || newVal === oldVal) {
	        		return;
	        	} else if(['Line', 'Bar', 'Radar'].indexOf(newVal) < 0 && scope.chart.data[0] instanceof Array) {	        		
	        		scope.chart.data = scope.chart.data[0];
	        	} else if (['Line', 'Bar', 'Radar'].indexOf(newVal) > - 1 && !(scope.chart.data[0] instanceof Array)) {
	        		scope.chart.data = [scope.chart.data];
	        	}
	        	
	        	setTableData();
	        });
	        
	        scope.$watch('table.data', function(newVal, oldVal) {	        	
	        	var data = arrayUtils.transposeMatrix(scope.table.data);
	        	scope.chart.labels = data[0];	
	        	var chartData = data.slice(1, data.length);	  
	        	scope.chart.data = ['Line', 'Bar', 'Radar'].indexOf(scope.chart.type) > -1 && chartData || chartData[0];    	
	        }, true);
	        
	        function setTableData() {
	        	//Concatenate chart labels with data and transpose the resulting matrix
	        	//E.g: ['2011', '2012'] as labels (categories) and [[1, 2], [2, 3]] as series data in the chart
	        	//becomes [['2011', 1, 2], ['2012', 2, 3]] in the table
	        	var tableData = [scope.chart.labels || []]
	        		.concat(['Line', 'Bar', 'Radar'].indexOf(scope.chart.type) > -1 && scope.chart.data || [scope.chart.data]);	                	
	        	scope.table.data = arrayUtils.transposeMatrix(tableData);
	        };
	    }
	}
})();
