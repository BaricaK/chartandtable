'use strict';

describe('handsontable-chart.arrayUtils', function() {
	
	var arrayUtils;
	
	beforeEach(function() {
		angular.module('ngHandsontable', []);
		angular.module('chart.js', []);
		module('handsontable-chart');
		
		inject(function(_arrayUtils_) {
			arrayUtils = _arrayUtils_;
		});
	});

	describe('Array utility methods', function() {	
		it('should transpose array', function () {
			var array = [[1,2,5], [5,4,1], [7,9,2]];
			var expected = [[1,5,7], [2,4,9], [5,1,2]];
			expect(arrayUtils.transposeMatrix(array)).toEqual(expected);
		});		
	});

});