const app = angular.module('jlg-bubble', []);

function rand() {
	return Math.random() * Math.random() * Math.random();
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
		console.log('zones', zones);
		zones.splice(index, 1);
	}

	for (let i = 0; i < zones.length; i++) {
		const c = {
			x: (zones[i].x + Math.random()) * w,
			y: (zones[i].y + Math.random()) * h,
			r: Math.floor(rand() * 200 + options.radius),
			c: Math.floor(Math.random() * options.colors.length),
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
		controller: function JLGBubbleCtrl($element, $window) {
			this.$onInit = () => {
				this.bggen = document.createElement('bggen');
				const parent = $element[0];
				parent.appendChild(this.bggen);
				this.render();
			};


			this.render = () => {
				console.log('this', this);



				this.options.width = this.bggen.clientWidth;
				this.options.height = this.bggen.clientHeight;

				const colors = this.options.colors || [
					'hsla(0, 100%, 50%, 0.05)',
					'hsla(120, 100%, 50%, 0.05)',
					'hsla(240, 100%, 50%, 0.05)',
					'hsla(60, 100%, 50%, 0.1)',
				];

				this.options.radius = this.options.radius || 50;

				let content = '';
				const array = generateCircle(this.options);
				for (let i = 0; i < array.length; i++) {
					const c = array[i];
					const opacity = (this.options.opacity) ?
						`stroke-opacity="${this.options.opacity * 2}" fill-opacity="${this.options.opacity}"` : '';
					content += `<circle cx="${c.x}" cy="${c.y}" r="${c.r}"
					 stroke="${colors[c.c]}" stroke-width="1" fill="${colors[c.c]}" ${opacity} />`;
				}

				const svg = `<svg>${content}</svg>`;
				this.bggen.innerHTML = svg;
			};

			$window.onresize = () => {
				this.render();
			};
		}
	};
});