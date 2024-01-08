import Utility from '../util/Utililty';

class PointCartesian {
	x: number;
	y: number;
	bias: number;
	maxWidth: number;
	maxHeight: number;
	label: number;

	/**
	 * Create new 2D point.
	 *
	 * @param maxWidth
	 * @param maxHeight
	 */
	constructor(x: number, y: number, maxWidth: number, maxHeight: number) {
		this.x = x;
		this.y = y;
		this.bias = 1;
		this.maxWidth = maxWidth;
		this.maxHeight = maxHeight;

		const lineY = PointCartesian.f(this.x);
		this.label = this.y > lineY ? 1 : -1;
	}

	/**
	 * y = mx + b.
	 *
	 * @param x point
	 *
	 * @returns
	 */
	static f = (x: number) => 0.89 * x - 0.1;

	/**
	 * Map x coordinate (-1, 1) to the range of 0, width of canvas.
	 *
	 * @returns number
	 */
	pixelX = (): number => Utility.map(this.x, -1, 1, 0, this.maxWidth);

	/**
	 * Map y coordinate (-1, 1) to the range of 0, height of canvas.
	 *
	 * @returns number
	 */
	pixelY = (): number => Utility.map(this.y, -1, 1, this.maxHeight, 0);

	/**
	 * Draw point to p5 canvas.
	 * @param p5
	 */
	draw = (p5) => {
		p5.stroke(0);
		if (this.label == 1) {
			p5.fill(255);
		} else {
			p5.fill(0);
		}

		p5.ellipse(this.pixelX(), this.pixelY(), 32, 32);
	};
}

export default PointCartesian;
