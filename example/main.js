(function () {
	'use strict';

	const app = angular.module('main', ['jlg-bubble']);

	app.run(($rootScope) => {
		$rootScope.cfg = {
			count: 31,
			colors: ['blue', 'red', 'green', 'yellow'],
			opacity: 0.05,
			radius: 50
		};
		$rootScope.$watch('color', () => {
			$rootScope.cfg.colors = [];
			for (let color in $rootScope.color) {
				if ($rootScope.color[color]) {
					$rootScope.cfg.colors.push(color);
				}
			}

		}, true);
	});
})();