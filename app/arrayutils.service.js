(function() {
	'use strict';

	angular.module('handsontable-chart').service('arrayUtils', arrayUtils);

	function arrayUtils() {
		this.transposeMatrix = function(array) {			
			var result = [], rows = array.length || 0,
			columns = array[0] instanceof Array && array[0].length || 0;

			if (rows === 0 || columns === 0) {
				return [];
			}

			for (var i = 0; i < columns; i++) {
				result.push([]);
				for (var j = 0; j < rows; j++) {
					result[i][j] = array[j][i];
				};
			};		
			return result;
		};
	};
})();