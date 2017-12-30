(function () {
	'use strict';

	const app = angular.module('main', ['jlg-bubble']);

	app.run(($rootScope) => {
		$rootScope.cfg = {
			density: 10,
			colors: ['blue', 'red', 'green', 'yellow'],
			opacity: 0.05,
			radius: 50,
			move: false,
		};
		$rootScope.$watch('color', () => {
			$rootScope.cfg.colors = [];
			for (const color in $rootScope.color) {
				if ($rootScope.color[color]) {
					$rootScope.cfg.colors.push(color);
				}
			}

		}, true);
	});

	app.directive('jlgState', function() {
		return {
			scope: {
				jlgState: '=',
			},
			bindToController: true,
			controller: function JLGState($element) {
				$element.on('click', () => {
					this.jlgState = !this.jlgState;
					if (this.jlgState) {
						$element.addClass('active');
					} else {
						$element.removeClass('active');
					}
				});
			}
		};
	});
})();