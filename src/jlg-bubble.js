(function () {
	'use strict';

	const app = angular.module('jlg-bubble', []);

	function rand6() {
		return Math.random() * Math.random() * Math.random() * Math.random() * Math.random() * Math.random();
	}

	function generateCircle(options) {
		const array = [];

		// nombre de secteurs horizontaux et verticaux sur l'ecran
		const dimension = Math.ceil(Math.sqrt(options.count));
		const w = options.width / dimension;
		const h = options.height / dimension;

		//generation du tableau et choix de zones au hasard
		const zones = [];

		for (let i = 0; i < dimension; i++) {
			for (let j = 0; j < dimension; j++) {
				zones.push({
					x: i,
					y: j,
				});
			}
		}

		for (let i = 0; i < dimension * dimension - options.count; i++) {
			const index = Math.random() * zones.length;
			zones.splice(index, 1);
		}

		for (let i = 0; i < zones.length; i++) {
			const c = {
				x: (zones[i].x + Math.random()) * w,
				y: (zones[i].y + Math.random()) * h,
				vx: 10 * options.speed * (Math.random() - 0.5),
				vy: 10 * options.speed * (Math.random() - 0.5),
				r: Math.floor(rand6() * 100 + options.radius),
				c: Math.floor(Math.random() * options.colors.length),
				duration: (1 + Math.random()) * options.duration,
			};
			array.push(c);
		}

		return array;
	}

	app.directive('jlgBubble', () => {
		return {
			scope: {
				options: '<jlgBubble',
			},
			bindToController: true,
			controllerAs: '$ctrl',
			controller: function JLGBubbleCtrl($scope, $element, $window) {
				console.log('essai');
				this.$onInit = () => {
					this.bggen = document.createElement('bggen');
					const parent = $element[0];
					parent.appendChild(this.bggen);
					this.render();
				};


				this.render = () => {
					this.options.width = this.options.width || this.bggen.clientWidth;
					this.options.height = this.options.height || this.bggen.clientHeight;
					this.options.radius = this.options.radius || 50;
					this.options.duration = this.options.duration || 10;
					this.options.speed = this.options.speed || 10;

					const colors = this.options.colors || [
						'hsla(0, 100%, 50%, 0.05)',
						'hsla(120, 100%, 50%, 0.05)',
						'hsla(240, 100%, 50%, 0.05)',
						'hsla(60, 100%, 50%, 0.1)',
					];



					let content = '';
					const array = generateCircle(this.options);
					for (let i = 0; i < array.length; i++) {
						const c = array[i];
						const growAnimation = (this.options.grow) ? `
						<animate attributeType="auto" attributeName="r" 
						from="0" to="${c.r}" dur="${c.duration}s" repeatCount="indefinite" />
						` : '';
						const moveAnimation = (this.options.move) ? `
						<animate attributeType="auto" attributeName="cx" 
						from="${c.x}" to="${c.x+c.duration*c.vx}" dur="${c.duration}s" repeatCount="indefinite" />
						<animate attributeType="auto" attributeName="cy" 
						from="${c.y}" to="${c.y+c.duration*c.vy}" dur="${c.duration}s" repeatCount="indefinite" />
						` : '';
						const radius = (this.options.grow) ? 0 : c.r;

						const opacity = (this.options.opacity) ?
							`stroke-opacity="${this.options.opacity * 2}" fill-opacity="${this.options.opacity}"` : '';
						content += `<circle cx="${c.x}" cy="${c.y}" r="${radius}"
					 stroke="${colors[c.c]}" stroke-width="1" fill="${colors[c.c]}" ${opacity} >
					 ${growAnimation}
					 ${moveAnimation}
					 </circle>`;
					}

					const svg = `<svg>${content}</svg>`;
					this.bggen.innerHTML = svg;
				};

				$window.onresize = () => {
					this.render();
				};

				$scope.$watch('$ctrl.options', () => {
					this.render();
				}, true);
			}
		};
	});
})();