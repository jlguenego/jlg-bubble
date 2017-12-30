'use strict';

(function () {
	'use strict';

	var app = angular.module('jlg-bubble', []);

	function rand6() {
		return Math.random() * Math.random() * Math.random() * Math.random() * Math.random() * Math.random();
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
				vx: 10 * options.speed * (Math.random() - 0.5),
				vy: 10 * options.speed * (Math.random() - 0.5),
				r: Math.floor(rand6() * 100 + options.radius),
				c: Math.floor(Math.random() * options.colors.length),
				duration: (1 + Math.random()) * options.duration
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
			controller: ['$scope', '$element', '$window', function JLGBubbleCtrl($scope, $element, $window) {
				var _this = this;

				this.$onInit = function () {
					_this.bggen = document.createElement('bggen');
					var parent = $element[0];
					parent.appendChild(_this.bggen);
					_this.render();
				};

				this.render = function () {
					_this.options.width = _this.bggen.clientWidth;
					_this.options.height = _this.bggen.clientHeight;
					_this.options.radius = _this.options.radius || 50;
					_this.options.duration = _this.options.duration || 10;
					_this.options.speed = _this.options.speed || 10;
					_this.options.count = Math.ceil(_this.options.density * _this.options.width * _this.options.height / 100000);
					console.log('count', _this.options.count);

					var colors = _this.options.colors || ['hsla(0, 100%, 50%, 0.05)', 'hsla(120, 100%, 50%, 0.05)', 'hsla(240, 100%, 50%, 0.05)', 'hsla(60, 100%, 50%, 0.1)'];

					var content = '';
					var array = generateCircle(_this.options);
					for (var i = 0; i < array.length; i++) {
						var c = array[i];
						var growAnimation = _this.options.grow ? '\n\t\t\t\t\t\t<animate attributeType="auto" attributeName="r" \n\t\t\t\t\t\tfrom="0" to="' + c.r + '" dur="' + c.duration + 's" repeatCount="indefinite" />\n\t\t\t\t\t\t' : '';
						var moveAnimation = _this.options.move ? '\n\t\t\t\t\t\t<animate attributeType="auto" attributeName="cx" \n\t\t\t\t\t\tfrom="' + c.x + '" to="' + (c.x + c.duration * c.vx) + '" dur="' + c.duration + 's" repeatCount="indefinite" />\n\t\t\t\t\t\t<animate attributeType="auto" attributeName="cy" \n\t\t\t\t\t\tfrom="' + c.y + '" to="' + (c.y + c.duration * c.vy) + '" dur="' + c.duration + 's" repeatCount="indefinite" />\n\t\t\t\t\t\t' : '';
						var radius = _this.options.grow ? 0 : c.r;

						var opacity = _this.options.opacity ? 'stroke-opacity="' + _this.options.opacity * 2 + '" fill-opacity="' + _this.options.opacity + '"' : '';
						content += '<circle cx="' + c.x + '" cy="' + c.y + '" r="' + radius + '"\n\t\t\t\t\t stroke="' + colors[c.c] + '" stroke-width="1" fill="' + colors[c.c] + '" ' + opacity + ' >\n\t\t\t\t\t ' + growAnimation + '\n\t\t\t\t\t ' + moveAnimation + '\n\t\t\t\t\t </circle>';
					}

					var svg = '<svg>' + content + '</svg>';
					_this.bggen.innerHTML = svg;
				};

				$window.onresize = function () {
					_this.render();
				};

				// $window.onscroll = () => {
				// 	this.render();
				// };

				// $window.ontouchmove = () => {
				// 	this.render();
				// };

				$scope.$watch('$ctrl.options', function () {
					_this.render();
				}, true);
			}]
		};
	});
})();