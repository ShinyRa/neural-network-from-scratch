import Utility from '../network/util/Utililty';

class Matrix {
	rows: number;
	columns: number;
	data;

	/**
	 * Create a matrix with given dimensions
	 *
	 * @param rows
	 * @param columns
	 */
	constructor(rows, columns) {
		this.rows = rows;
		this.columns = columns;

		// this.data = new Array(this.rows).fill(new Array(this.columns).fill(0));

		this.data = new Array(this.rows).fill(0).map(() => Array(this.columns).fill(0));
	}

	/**
	 * Set the values of the matrix
	 *
	 * @param values
	 */
	setValues(values) {
		this.data = values;
	}

	/**
	 * Randomize all the values in the matrix
	 */
	randomize() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
				this.data[i][j] = Utility.randomBetween(-1, 1);
			}
		}
	}

	/**
	 * Multiply the matrix by scaler.
	 *
	 * @param times
	 */
	multiply(scaler) {
		if (scaler instanceof Matrix) {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.columns; j++) {
					this.data[i][j] *= scaler.data[i][j];
				}
			}
		} else {
			this.data = this.data.map((row) => row.map((value) => (value *= scaler)));
		}
	}

	toArray() {
		return this.data.flat();
	}

	/**
	 * Build a Matrix with a given array
	 *
	 * @param array
	 * @returns
	 */
	static fromArray(array: number[]) {
		const matrix = new Matrix(array.length, 1);

		for (let i = 0; i < array.length; i++) {
			matrix.data[i][0] = array[i];
		}

		return matrix;
	}

	/**
	 * Subtract matrix a from matrix b
	 */
	static subtract(a: Matrix, b: Matrix): Matrix {
		const result = new Matrix(a.rows, a.columns);
		for (let i = 0; i < a.rows; i++) {
			for (let j = 0; j < a.columns; j++) {
				result.data[i][j] = a.data[i][j] - b.data[i][j];
			}
		}
		return result;
	}

	/**
	 * Matrices product.
	 *
	 * @param a
	 * @param b
	 * @returns
	 */
	static multiply(a: Matrix, b: Matrix) {
		if (a.columns !== b.rows) {
			return null;
		}
		const result = new Matrix(a.rows, b.columns);
		for (let i = 0; i < result.rows; i++) {
			for (let j = 0; j < result.columns; j++) {
				// Dot prouduct
				let sum = 0;
				for (let k = 0; k < a.columns; k++) {
					sum += a.data[i][k] * b.data[k][j];
				}

				result.data[i][j] = sum;
			}
		}

		return result;
	}

	/**
	 * Add the matrix by addition.
	 *
	 * @param times
	 */
	add(addition: number | Matrix): void {
		if (addition instanceof Matrix) {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.columns; j++) {
					this.data[i][j] += addition.data[i][j];
				}
			}
		} else {
			this.data = this.data.map((row) => row.map((value) => (value += addition)));
		}
	}

	/**
	 * Transpose matrix.
	 */
	static transpose(matrix: Matrix) {
		const transposed = new Matrix(matrix.columns, matrix.rows);

		for (let i = 0; i < matrix.rows; i++) {
			for (let j = 0; j < matrix.columns; j++) {
				transposed.data[j][i] = matrix.data[i][j];
			}
		}

		return transposed;
	}

	print() {
		console.table(this.data);
	}

	/**
	 * Apply a function to every element of the data
	 *
	 * @param fn
	 */
	map(fn) {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
				const value = this.data[i][j];
				this.data[i][j] = fn(value);
			}
		}
	}

	static map(matrix, fn) {
		const result = new Matrix(matrix.rows, matrix.columns);
		for (let i = 0; i < matrix.rows; i++) {
			for (let j = 0; j < matrix.columns; j++) {
				result.data[i][j] = fn(matrix.data[i][j]);
			}
		}

		return result;
	}
}

export default Matrix;
