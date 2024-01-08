import Matrix from '../math/Matrix';

describe('Matrix datastructure tests', () => {
	test('Matrix is initialized', () => {
		expect(new Matrix(1, 1)).toBeTruthy();
	});

	test('Matrix randomization', () => {
		const matrix = new Matrix(3, 2);
		matrix.randomize();

		expect(matrix.data.flat().reduce((prev, curr) => (curr += prev), 0)).not.toBe(0);
	});

	test('Matrix scaler addition', () => {
		const matrix = new Matrix(3, 2);
		matrix.add(15);

		expect(matrix.data.flat().every((value) => value === 15)).toBe(true);
	});

	test('Matrix scaler multiplication', () => {
		const matrix = new Matrix(3, 2);
		matrix.add(3);
		matrix.multiply(5);

		expect(matrix.data.flat().every((value) => value === 15)).toBe(true);
	});

	test('Matrix by maxtrix addition', () => {
		const matrix = new Matrix(3, 2);
		const matrixAddition = new Matrix(3, 2);

		matrix.add(5);
		matrixAddition.add(5);

		matrix.add(matrixAddition);
		expect(matrix.data.flat().every((value) => value === 10)).toBe(true);
	});

	test('Matrix dot product multiplication', () => {
		const matrix = new Matrix(2, 3);
		const matrixMultiply = new Matrix(3, 2);

		matrix.setValues([
			[4, 8, 7],
			[4, 3, 5]
		]);
		matrixMultiply.setValues([
			[8, 5],
			[8, 4],
			[2, 2]
		]);

		const result = Matrix.multiply(matrix, matrixMultiply);

		expect(result?.data).toEqual([
			[110, 66],
			[66, 42]
		]);
	});

	test('Matrix transpose', () => {
		const matrix = new Matrix(3, 3);

		matrix.setValues([
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		]);

		const result = Matrix.transpose(matrix);

		expect(result.data).toEqual([
			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9]
		]);
	});

	test('Matrix builds from array', () => {
		const input = [1, 0];

		const inputMatrix = Matrix.fromArray(input);

		const matrix = new Matrix(2, 1);
		matrix.setValues([[1], [0]]);

		expect(matrix).toEqual(inputMatrix);
	});
});
