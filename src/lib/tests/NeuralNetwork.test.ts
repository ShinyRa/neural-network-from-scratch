import NeuralNetwork from '../network/NeuralNetwork';

describe('Neural network tests', () => {
	const INPUT_NODES = 2;
	const HIDDEN_NODES = 2;
	const OUTPUT_NODES = 1;

	let neuralNetwork;
	// beforeEach(() => {
	// 	neuralNetwork = new NeuralNetwork(INPUT_NODES, HIDDEN_NODES, OUTPUT_NODES);
	// });

	test('Neural network is initialized', () => {
		neuralNetwork = new NeuralNetwork(INPUT_NODES, HIDDEN_NODES, OUTPUT_NODES);
		expect(neuralNetwork).toBeTruthy();
	});

	test('Neural network nodes have been initialized', () => {
		neuralNetwork = new NeuralNetwork(INPUT_NODES, HIDDEN_NODES, OUTPUT_NODES);
		const input = neuralNetwork.getInputNodes();
		const hidden = neuralNetwork.getHiddenNodes();
		const output = neuralNetwork.getOutputNodes();

		expect(input).toEqual(INPUT_NODES);
		expect(hidden).toEqual(HIDDEN_NODES);
		expect(output).toEqual(OUTPUT_NODES);
	});

	test('Trains successfully', () => {
		const training_data = [
			{ inputs: [0, 1], targets: [1] },
			{ inputs: [1, 0], targets: [1] },
			{ inputs: [0, 0], targets: [0] },
			{ inputs: [1, 1], targets: [0] }
		];

		const brain = new NeuralNetwork(2, 2, 1);

		for (let index = 0; index < 10000; index++) {
			for (const data of training_data) {
				brain.train(data.inputs, data.targets);
			}
		}

		console.log(brain.feedForward([0, 0]));
		console.log(brain.feedForward([0, 1]));
		console.log(brain.feedForward([1, 0]));
		console.log(brain.feedForward([1, 1]));
	});
});
