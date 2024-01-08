class ActivationFunction {
	static sign(num: number): number {
		return num >= 0 ? 1 : -1;
	}

	static sigmoid(x: number): number {
		return 1 / (1 + Math.exp(-x));
	}
	static derivativeSigmoid(y) {
		return y * (1 - y);
	}
}

export default ActivationFunction;
