class Utility {
	/**
	 * Get random float  value between
	 *
	 * @param min number
	 * @param max  number
	 *
	 * @returns number
	 */
	static randomBetween(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}

	/**
	 * Function to establish a proportion between two ranges of values
	 *
	 * @source https://stackoverflow.com/questions/17134839/how-does-the-map-function-in-processing-work
	 *
	 * @param value
	 * @param istart
	 * @param istop
	 * @param ostart
	 * @param ostop
	 *
	 * @returns
	 */
	static map(value: number, istart: number, istop: number, ostart: number, ostop: number) {
		return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
	}
}

export default Utility;
