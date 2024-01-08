<script>
	import NeuralNetwork from '$lib/network/NeuralNetwork';
	import P5 from 'p5-svelte';

	let INPUT_NODES = 2;
	let HIDDEN_NODES = 2;
	let OUTPUT_NODES = 1;

	let brain = new NeuralNetwork(INPUT_NODES, HIDDEN_NODES, OUTPUT_NODES);
	let training_data = [
		{ inputs: [0, 1], targets: [1] },
		{ inputs: [1, 0], targets: [1] },
		{ inputs: [0, 0], targets: [0] },
		{ inputs: [1, 1], targets: [0] }
	];

	for (let index = 0; index < 100; index++) {
		for (let data of training_data) {
			brain.train(data.inputs, data.targets);
		}
	}

	brain.feedForward([0, 0]);

	// console.log(brain);
	const sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(800, 800);
		};
		p5.draw = () => {};
	};
</script>

<h3>Fully connected neural network!</h3>

<P5 {sketch} />
