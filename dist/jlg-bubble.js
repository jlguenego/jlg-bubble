'use strict';

(function () {
	'use strict';

	var app = angular.module('jlg-bubble', []);

	function rand() {
		return Math.random() * Math.random() * Math.random();
	}

	function generateCircle(options) {
		var array = [];

		// nombre de secteurs horizontaux et verticaux sur l'ecran
		var dimension = Math.ceil(Math.sqrt(options.count));
		var w = options.width / dimension;
		var h = options.height / dimension;

		//generation du tableau et choix de zones au hasard
		var zones = [];

		for (var i = 0; i < dimension; i++) {
			for (var j = 0; j < dimension; j++) {
				zones.push({
					x: i,
					y: j
				});
			}
		}

		for (var _i = 0; _i < dimension * dimension - options.count; _i++) {
			var index = Math.random() * zones.length;
			zones.splice(index, 1);
		}

		for (var _i2 = 0; _i2 < zones.length; _i2++) {
			var c = {
				x: (zones[_i2].x + Math.random()) * w,
				y: (zones[_i2].y + Math.random()) * h,
				r: Math.floor(rand() * 200 + options.radius),
				c: Math.floor(Math.random() * options.colors.length)
			};
			array.push(c);
		}

		return array;
	}

	app.directive('jlgBubble', function () {
		return {
			scope: {
				options: '<jlgBubble'
			},
			bindToController: true,
			controllerAs: '$ctrl',
			controller: function JLGBubbleCtrl($scope, $element, $window) {
				var _this = this;

				this.$onInit = function () {
					_this.bggen = document.createElement('bggen');
					var parent = $element[0];
					parent.appendChild(_this.bggen);
					_this.render();
				};

				this.render = function () {
					_this.options.width = _this.options.width || _this.bggen.clientWidth;
					_this.options.height = _this.options.height || _this.bggen.clientHeight;

					var colors = _this.options.colors || ['hsla(0, 100%, 50%, 0.05)', 'hsla(120, 100%, 50%, 0.05)', 'hsla(240, 100%, 50%, 0.05)', 'hsla(60, 100%, 50%, 0.1)'];

					_this.options.radius = _this.options.radius || 50;

					var content = '';
					var array = generateCircle(_this.options);
					for (var i = 0; i < array.length; i++) {
						var c = array[i];
						var opacity = _this.options.opacity ? 'stroke-opacity="' + _this.options.opacity * 2 + '" fill-opacity="' + _this.options.opacity + '"' : '';
						content += '<circle cx="' + c.x + '" cy="' + c.y + '" r="' + c.r + '"\n\t\t\t\t\t stroke="' + colors[c.c] + '" stroke-width="1" fill="' + colors[c.c] + '" ' + opacity + ' />';
					}

					var svg = '<svg>' + content + '</svg>';
					_this.bggen.innerHTML = svg;
				};

				$window.onresize = function () {
					_this.render();
				};

				$scope.$watch('$ctrl.options', function () {
					_this.render();
				}, true);
			}
		};
	});
})();