export default class ColorGenerator {
    /**
     * Constructor for ColorGenerator.
     * Initializes the generator with a base color. If no color is provided, it generates a random one.
     * @param {string} colorString - The base color in any valid p5.js color format (e.g., hex or RGB).
     * @param {number} [opacity=1] - The opacity of the color, defaults to 1.
     */
    constructor(p5, colorString, opacity = 1) {
        this.p5 = p5;
        this.opacity = opacity;
        this.p5.colorMode(this.p5.HSB, 360, 100, 100, 1); // Use this.p5 directly

        if (colorString === undefined) {
            let h = this.p5.random(0, 360);
            let s = this.p5.random(0, 100);
            let b = this.p5.random(0, 100);
            colorString = this.p5.color(h, s, b, this.opacity); // Opacity applied here!
        } else {
            let c = this.p5.color(colorString); // Get the color object first
            colorString = this.p5.color(this.p5.hue(c), this.p5.saturation(c), this.p5.brightness(c), this.opacity); // Opacity applied here!
        }

        // Store the color and its HSB components
        this.color = this.p5.color(colorString);
        this.h = this.p5.hue(this.color);
        this.s = this.p5.saturation(this.color);
        this.b = this.p5.brightness(this.color);
    }

    /**
     * Generates shades of the base color by decreasing brightness.
     * @param {number} nr - The number of shades to generate.
     * @param {number} limit - The minimum brightness value to limit the shades (default: 0).
     * @return {array} An array of colors in HSB format.
     */
    getShades(nr, limit = 0) {
        this.p5.push(); // Use this.p5 directly
        this.p5.colorMode(this.p5.HSB, 360, 100, 100, 1); // Use this.p5 directly
        let result = [];

        limit = this.p5.constrain(limit, 0, this.b); // Use this.p5 directly

        let equalDifference = (this.b - limit) / nr;
        for (let i = 0; i < nr; i++) {
            result.push(this.p5.color(this.h, this.s, this.b - (i * equalDifference), this.opacity)); 
        }
        this.p5.pop(); // Use this.p5 directly
        return result;
    }

    /**
     * Generates tints of the base color by increasing brightness.
     * @param {number} nr - The number of tints to generate.
     * @param {number} limit - The maximum brightness value to limit the tints (default: 100).
     * @return {array} An array of colors in HSB format.
     */
    getTints(nr, limit = 100) {
        this.p5.push();
        this.p5.colorMode(this.p5.HSB, 360, 100, 100, 1);
        let result = [];

        limit = this.p5.constrain(limit, this.b, 100);

        let equalDifferenceBrightness = (limit - this.b) / nr;
        let equalDifferenceSaturation = this.s / nr;

        for (let i = 0; i < nr; i++) {
            result.push(this.p5.color(this.h, this.s - (i * equalDifferenceSaturation), this.b + (i * equalDifferenceBrightness), this.opacity)); 
        }
        this.p5.pop();
        return result;
    }

    /**
     * Generates a monochromatic palette by adjusting saturation and brightness.
     * @param {number} nr - The number of monochromatic colors to generate.
     * @param {boolean} increaseSaturation - Whether to increase saturation for each color (default: false).
     * @param {boolean} increaseBrightness - Whether to increase brightness for each color (default: false).
     * @return {array} An array of colors in HSB format.
     */
    getMonochromatic(nr, increaseSaturation = false, increaseBrightness = false) {
        this.p5.push();
        this.p5.colorMode(this.p5.HSB, 360, 100, 100, 1);
        let result = [];

        // Calculate saturation and brightness steps
        let satDifference = this.s / nr;
        let brightDifference = (100 - this.b) / nr;

        for (let i = 0; i < nr; i++) {
            let currentSaturation, currentBrightness;

            // Adjust saturation based on the direction
            currentSaturation = increaseSaturation
                ? this.p5.constrain(this.s + (i * satDifference), 0, 100)
                : this.p5.constrain(this.s - (i * satDifference), 0, 100);

            // Adjust brightness based on the direction
            currentBrightness = increaseBrightness
                ? this.p5.constrain(this.b + (i * brightDifference), 0, 100)
                : this.p5.constrain(this.b - (i * brightDifference), 0, 100);

            result.push(this.p5.color(this.h, currentSaturation, currentBrightness, this.opacity)); 
        }

        this.p5.pop();
        return result;
    }

    /**
     * Generates the complementary color of the base color (180 degrees on the color wheel).
     * @return {array} An array with the base color and its complementary color.
     */
    getComplementary() {
        this.p5.push();
        this.p5.colorMode(this.p5.HSB, 360, 100, 100, 1);
        let complementaryColor = this.p5.color((this.h + 180) % 360, this.s, this.b, this.opacity); 
        this.p5.pop();
        return [this.color, complementaryColor];
    }

    /**
     * Generates a triadic color scheme (three colors evenly spaced on the color wheel, 120 degrees apart).
     * @return {array} An array of three colors in HSB format.
     */
    getTriadic() {
        this.p5.push();
        this.p5.colorMode(this.p5.HSB, 360, 100, 100, 1);
        let triadicColors = [
            this.color,
            this.p5.color((this.h + 120) % 360, this.s, this.b, this.opacity), 
            this.p5.color((this.h + 240) % 360, this.s, this.b, this.opacity)  
        ];
        this.p5.pop();
        return triadicColors;
    }

    /**
     * Generates a split complementary color scheme (two colors adjacent to the complementary color).
     * @param {number} degree - The degree difference from the complementary color (default: 30).
     * @return {array} An array of three colors in HSB format.
     */
    getSplitComplementary(degree = 30) {
        this.p5.push();
        this.p5.colorMode(this.p5.HSB, 360, 100, 100, 1);
        let splitComplementaryColors = [
            this.color,
            this.p5.color((this.h + 180 - degree + 360) % 360, this.s, this.b, this.opacity),
            this.p5.color((this.h + 180 + degree) % 360, this.s, this.b, this.opacity)
        ];
        this.p5.pop();
        return splitComplementaryColors;
    }

    /**
     * Generates a tetradic color scheme (four colors, two complementary pairs).
     * @return {array} An array of four colors in HSB format.
     */
    getTetradic() {
        this.p5.push();
        this.p5.colorMode(this.p5.HSB, 360, 100, 100, 1);
        let tetradicColors = [
            this.color,
            this.p5.color((this.h + 90) % 360, this.s, this.b, this.opacity),
            this.p5.color((this.h + 180) % 360, this.s, this.b, this.opacity),
            this.p5.color((this.h + 270) % 360, this.s, this.b, this.opacity)
        ];
        this.p5.pop();
        return tetradicColors;
    }

    /**
     * Generates an array of colors with varying opacities based on the base color.
     * @param {number} numColors - The number of colors to generate.
     * @return {array} An array of colors with different opacities.
     */
    getOpacityVariations(numColors) {
        this.p5.push();
        this.p5.colorMode(this.p5.HSB, 360, 100, 100, 1);
        let result = [];
        for (let i = 1; i <= numColors; i++) {
            let currentOpacity = i / numColors;
            result.push(this.p5.color(this.h, this.s, this.b, currentOpacity));
        }
        this.p5.pop();
        return result;
    }
}