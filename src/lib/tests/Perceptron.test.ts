import Perceptron from '../network/Perceptron';

describe('Perceptron tests', () => {
	const NODES = 2;
	// const WEIGHTS = [1, 1];
	const INPUTS = [-1, 0.5];

	let perceptron: Perceptron;
	beforeEach(() => {
		perceptron = new Perceptron(NODES);
	});

	test('Perceptron is initialized', () => {
		expect(perceptron).toBeTruthy();
	});

	test('Weights have been initialized', () => {
		expect(perceptron.getWeights().length).toEqual(2);
	});
});
