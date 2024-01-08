<script>
	import P5 from 'p5-svelte';
	import PointCartesian from '$lib/network/training/PointCartesian';
	import Utility from '$lib/network/util/Utililty';
	import Perceptron from '$lib/network/Perceptron';

	const AMOUNT_OF_POINTS = 100;
	const brain = new Perceptron();
	let generation = 1;

	const sketch = (p5) => {
		const points = [];
		p5.setup = () => {
			p5.createCanvas(800, 800);
			p5.stroke(255, 0, 0);
			p5.smooth(8);

			const lineStart = new PointCartesian(-1, PointCartesian.f(-1), p5.width, p5.height);
			const lineStop = new PointCartesian(1, PointCartesian.f(1), p5.width, p5.height);

			p5.line(lineStart.pixelX(), lineStart.pixelY(), lineStop.pixelX(), lineStop.pixelY());

			for (let index = 0; index < AMOUNT_OF_POINTS; index++) {
				points.push(
					new PointCartesian(
						Utility.randomBetween(-1, 1),
						Utility.randomBetween(-1, 1),
						p5.width,
						p5.height
					)
				);
			}
		};
		p5.draw = () => {
			for (const point of points) {
				point.draw(p5);
				const inputs = [point.x, point.y, point.bias];
				const target = point.label;

				const guess = brain.guess(inputs);
				if (guess == target) {
					// Green
					p5.fill(0, 255, 0);
				} else {
					// Red
					p5.fill(255, 0, 0);
				}
				p5.noStroke();
				p5.ellipse(point.pixelX(), point.pixelY(), 16, 16);
			}
		};

		const train = () => {
			for (const point of points) {
				const inputs = [point.x, point.y, point.bias];
				const target = point.label;
				brain.train(inputs, target);
			}
		};

		const guessLine = () => {
			const guessLineStart = new PointCartesian(-1, brain.guessY(-1), p5.width, p5.height);
			const guessLineStop = new PointCartesian(1, brain.guessY(1), p5.width, p5.height);
			p5.stroke(0);
			p5.line(
				guessLineStart.pixelX(),
				guessLineStart.pixelY(),
				guessLineStop.pixelX(),
				guessLineStop.pixelY()
			);
		};

		p5.mousePressed = () => {
			train();
			guessLine();
			generation = generation + 1;
		};
	};
</script>

<h3>Click to train</h3>
<p>generation: {generation}</p>
<P5 {sketch} />
