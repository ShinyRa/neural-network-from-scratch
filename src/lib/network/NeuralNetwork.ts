import Matrix from '../math/Matrix';
import ActivationFunction from './ActivationFunction';

class NeuralNetwork {
	inputNodes;
	hiddenNodes;
	outputNodes;
	weights_input_hidden;
	weights_hidden_output;
	learning_rate;

	bias_hidden;
	bias_output;

	/**
	 * Create a new neural network
	 *
	 * @param inputNodes
	 * @param hiddenNodes
	 * @param outputNodes
	 */
	constructor(inputNodes, hiddenNodes, outputNodes) {
		this.inputNodes = inputNodes;
		this.hiddenNodes = hiddenNodes;
		this.outputNodes = outputNodes;
		this.learning_rate = 0.1;

		this.initializeWeights();
		this.initializeBias();
		// this.weights_input_hidden = new Matrix(this.hiddenNodes, this.inputNodes);
		// this.weights_hidden_output = new Matrix(this.outputNodes, this.hiddenNodes);

		// this.weights_input_hidden.randomize();
		// this.weights_hidden_output.randomize();

		// this.bias_hidden = new Matrix(this.hiddenNodes, 1);
		// this.bias_output = new Matrix(this.outputNodes, 1);
		// this.bias_hidden.randomize();
		// this.bias_output.randomize();
	}

	/**
	 * Initialize the weights of the neural network
	 */
	initializeWeights() {
		this.weights_input_hidden = new Matrix(this.hiddenNodes, this.inputNodes);
		this.weights_hidden_output = new Matrix(this.outputNodes, this.hiddenNodes);

		this.weights_input_hidden.randomize();
		this.weights_hidden_output.randomize();
	}

	/**
	 * Initialize the biases of the neural network
	 */
	initializeBias() {
		this.bias_hidden = new Matrix(this.hiddenNodes, 1);
		this.bias_output = new Matrix(this.outputNodes, 1);
		this.bias_hidden.randomize();
		this.bias_output.randomize();
	}

	/**
	 * Feedforward the algorithm
	 *
	 * @param input
	 */
	feedForward(input: number[]): number[] {
		// Generate the hidden outputs
		const inputs = Matrix.fromArray(input);

		const hidden = Matrix.multiply(this.weights_input_hidden, inputs);
		hidden?.add(this.bias_hidden);
		hidden?.map(ActivationFunction.sigmoid);

		// Generate the output's output
		const output = Matrix.multiply(this.weights_hidden_output, hidden!);
		output?.add(this.bias_output);
		output?.map(ActivationFunction.sigmoid);

		return output!.toArray();
	}

	/**
	 * Train the algorithm by performing feed forward multiple times.
	 *
	 * @param inputs
	 * @param answer
	 */
	train(input_array: number[], target_array: number[]) {
		// Generate the hidden outputs
		const inputs = Matrix.fromArray(input_array);
		const hidden = Matrix.multiply(this.weights_input_hidden, inputs);

		hidden?.add(this.bias_hidden);
		hidden?.map(ActivationFunction.sigmoid);

		// Generate the output's output
		const outputs = Matrix.multiply(this.weights_hidden_output, hidden!);
		outputs?.add(this.bias_output);
		outputs?.map(ActivationFunction.sigmoid);

		const targets = Matrix.fromArray(target_array);

		// Calculate output errors
		// ERROR = TARGETS - OUTPUTS
		const output_errors = Matrix.subtract(targets, outputs!);

		// Calculate gradient
		const gradients = Matrix.map(outputs, ActivationFunction.derivativeSigmoid);
		gradients.multiply(output_errors);
		gradients.multiply(this.learning_rate);

		// Calculate deltas
		const hidden_transposed = Matrix.transpose(hidden!);
		const weights_hidden_output_deltas = Matrix.multiply(gradients, hidden_transposed);

		// Adjust weights
		this.weights_hidden_output.add(weights_hidden_output_deltas);

		// Adjust bias
		this.bias_output.add(gradients);

		// Calculate hidden layer errors
		const weights_hidden_layer_transposed = Matrix.transpose(this.weights_hidden_output);
		const hidden_errors = Matrix.multiply(weights_hidden_layer_transposed, output_errors);

		// Calculate hidden gradient
		const hidden_gradient = Matrix.map(hidden, ActivationFunction.derivativeSigmoid);
		hidden_gradient.multiply(hidden_errors);
		hidden_gradient.multiply(this.learning_rate);

		// Calculate input -> hidden deltas
		const inputs_transposed = Matrix.transpose(inputs);
		const weights_input_hidden_deltas = Matrix.multiply(hidden_gradient, inputs_transposed);

		// Adjust weights
		this.weights_input_hidden.add(weights_input_hidden_deltas);

		// Adjust bias
		this.bias_hidden.add(hidden_gradient);

		// this.weights_hidden_output.print();
		// weights_hidden_output_transposed.print();
		// hidden_error?.print();
		// outputsMatrix.print();
	}

	getInputNodes = () => this.inputNodes;
	getHiddenNodes = () => this.hiddenNodes;
	getOutputNodes = () => this.outputNodes;
}

export default NeuralNetwork;
