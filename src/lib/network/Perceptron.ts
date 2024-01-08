import ActivationFunction from './ActivationFunction';
import Utility from './util/Utililty';

class Perceptron {
	weights: number[];
	learningRate: number;

	constructor(nodes?: number) {
		// if no nodes are provided, use 3 nodes.
		nodes = nodes || 3;
		this.weights = new Array(nodes);
		this.learningRate = 0.1;

		// Initialise all weights with a random value between -1 and 1.
		for (let index = 0; index < nodes; index++) {
			this.weights[index] = Utility.randomBetween(-1, 1);
		}
	}

	/**
	 * Set the weights.
	 *
	 * @param inputs
	 *
	 * @returns Perceptron
	 */
	setWeights(inputs: number[]): Perceptron {
		this.weights = inputs;
		return this;
	}

	/**
	 * Get the weights.
	 *
	 * @returns number[]
	 */
	getWeights(): number[] {
		return this.weights;
	}

	/**
	 * Calculate a guess by taking the input values
	 * multiply it by the weights and returning
	 * the output processed by the activation function.
	 *
	 * @returns number
	 */
	guess(inputs: number[]): number {
		let sum = 0;

		for (let index = 0; index < this.weights.length; index++) {
			sum += inputs[index] * this.weights[index];
		}

		return ActivationFunction.sign(sum);
	}

	/**
	 * Make a guess for the Y coordinate based on an x coordinate
	 *
	 * @param x coordinate
	 *
	 * @returns number
	 */
	guessY(x: number): number {
		const w0 = this.weights[0];
		const w1 = this.weights[1];
		const w2 = this.weights[2];
		console.log(w0, w1, w2);

		// w1 * y = - (w2 * b) - (w0 * x)
		return -(w2 / w1) - (w0 / w1) * x;
	}

	/**
	 * Adjust the weights of the algorithm based on target value.
	 *
	 * @param inputs number[]
	 * @param target target   desired output
	 */
	train(inputs: number[], target: number): void {
		// Let the algorithm guess.
		const guess = this.guess(inputs);
		// Calculate the error between the guess and the target.
		const error = target - guess;

		// Adjust all the weights based on error.
		for (let index = 0; index < this.weights.length; index++) {
			this.weights[index] += error * inputs[index] * this.learningRate;
		}
	}
}

export default Perceptron;
