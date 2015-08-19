'use strict';

describe('myApp.chartEditor', function() {
	
	var compile, scope, element, arrayUtils;
	
	beforeEach(function() {
		angular.module('ngHandsontable', []);
		angular.module('chart.js', []);
		module('handsontable-chart');
		module("chart-editor.html");  
		
		inject(function($compile, $rootScope, _arrayUtils_) {
			compile = $compile;
			scope = $rootScope.$new();
			arrayUtils = _arrayUtils_;
			scope.chart = {type: 'Line', data: [[1,2], [2,3]], labels: ['2011', '2012'], series: ['Sales', 'Profit']};		
		});
	
	   element = compileElement();
	});

	describe('Chart Editor directive', function() {	
		it('should have tabs element', function () {
		   var tabsElement = element.find('md-tabs');
		   expect(tabsElement).toBeDefined();
		});
		
		it('should have 6 chart types defined', function () {
			var isolatedScope = element.isolateScope();
			expect(isolatedScope.chartTypes.length).toEqual(6);
		});
		
		it('should convert data from array of arrays to array on change from Line, Radar and Bar to others', function() {
			var isolatedScope = element.isolateScope();
			isolatedScope.chart.type = 'Pie';
			scope.$digest();
			expect(scope.chart.type).toEqual('Pie');
			expect(scope.chart.data).toEqual([1,2]);
	    });
		
		it('should convert data from array to array of arrays on change to Line, Radar and Bar from others', function() {
			scope.chart.type = 'Pie';
			scope.$digest();
			var isolatedScope = element.isolateScope();
			isolatedScope.chart.type = 'Line';
			scope.$digest();
			expect(scope.chart.data).toEqual([[1,2]]);
	    });
		
		it('should set table data to match active chart data when chart type is Line, Radar, Bar', function() {
			var expected = [['2011', 1,2], ['2012', 2,3]];
			spyOn(arrayUtils, 'transposeMatrix').and.returnValue(expected);
			scope.chart = angular.extend({}, scope.chart);
			scope.$digest();
			expect(arrayUtils.transposeMatrix).toHaveBeenCalledWith([['2011', '2012'], [1,2], [2,3]]);
			var isolatedScope = element.isolateScope();
			expect(isolatedScope.table.data).toEqual(expected);
	    });
		
		it('should set table data to match active chart data when chart type is Pie, Doughnut, Polar', function() {
			var expected = [['2011', 1], ['2012', 2]];
			spyOn(arrayUtils, 'transposeMatrix').and.returnValue(expected);
			scope.chart = angular.extend({}, scope.chart);
			scope.chart.data = [1,2];
			scope.chart.type = 'Pie';
			scope.$digest();
			expect(arrayUtils.transposeMatrix).toHaveBeenCalledWith([['2011', '2012'], [1,2]]);
			var isolatedScope = element.isolateScope();
			expect(isolatedScope.table.data).toEqual(expected);
	    });
		
		it('should update chart data on table data change', function() {
			var expectedLabels = ['2010', '2015'];
			var expectedData =  [[1, 5], [8, 11]];
			var expected = [expectedLabels].concat(expectedData);
			var isolatedScope = element.isolateScope();
			isolatedScope.table.data = [['2010', 1, 8], ['2015', 5, 11]]; 
			spyOn(arrayUtils, 'transposeMatrix').and.returnValue(expected);
			scope.$digest();
			expect(arrayUtils.transposeMatrix).toHaveBeenCalledWith(isolatedScope.table.data);
			expect(scope.chart.labels).toEqual(expectedLabels);
			expect(scope.chart.data).toEqual(expectedData);
	    });
	});
	
	function compileElement() {	
	  var element = compile(angular.element('<htc-chart-editor chart="chart"></htc-chart-editor>'))(scope);
	  scope.$digest();
	  return element;
	}
});