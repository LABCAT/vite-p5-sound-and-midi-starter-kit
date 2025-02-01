class ColorGenerator {
    /**
     * Constructor for ColorGenerator.
     * Initializes the generator with a base color and optional opacity. 
     * If no color is provided, it generates a random one.
     * @param {string} colorString - The base color in any valid p5.js color format (e.g., hex or RGB).
     * @param {number} [opacity=1] - The opacity of the color, defaults to 1.
     */
    constructor(colorString, opacity = 1) {
        // Set color mode to HSB with ranges for hue (360), saturation, brightness (100), and alpha (1)
        colorMode(HSB, 360, 100, 100, 1);

        this.opacity = opacity; // Store the provided opacity

        // If no color is provided, generate a random HSB color
        if (colorString === undefined) {
            let h = random(0, 360);
            let s = random(0, 100);
            let b = random(0, 100);
            colorString = color(h, s, b, this.opacity); // Include opacity in random color generation
        } else {
            // Create a color object, handling potential string formats and applying opacity
            let c = color(colorString);
            colorString = color(hue(c), saturation(c), brightness(c), this.opacity);
        }


        // Store the color and its HSB components
        this.color = color(colorString);
        this.h = hue(this.color);
        this.s = saturation(this.color);
        this.b = brightness(this.color);
    }

    getShades(nr, limit = 0) {
        push();
        colorMode(HSB, 360, 100, 100, 1);
        let result = [];

        limit = constrain(limit, 0, this.b);
        let equalDifference = (this.b - limit) / nr;
        for (let i = 0; i < nr; i++) {
            result.push(color(this.h, this.s, this.b - (i * equalDifference), this.opacity));
        }
        pop();
        return result;
    }

    getTints(nr, limit = 100) {
        push();
        colorMode(HSB, 360, 100, 100, 1);
        let result = [];

        limit = constrain(limit, this.b, 100);
        let equalDifferenceBrightness = (limit - this.b) / nr;
        let equalDifferenceSaturation = this.s / nr;

        for (let i = 0; i < nr; i++) {
            result.push(color(this.h, this.s - (i * equalDifferenceSaturation), this.b + (i * equalDifferenceBrightness), this.opacity));
        }
        pop();
        return result;
    }

    getMonochromatic(nr, increaseSaturation = false, increaseBrightness = false) {
        push();
        colorMode(HSB, 360, 100, 100, 1);
        let result = [];

        let satDifference = this.s / nr;
        let brightDifference = (100 - this.b) / nr;

        for (let i = 0; i < nr; i++) {
            let currentSaturation, currentBrightness;

            currentSaturation = increaseSaturation
                ? constrain(this.s + (i * satDifference), 0, 100)
                : constrain(this.s - (i * satDifference), 0, 100);

            currentBrightness = increaseBrightness
                ? constrain(this.b + (i * brightDifference), 0, 100)
                : constrain(this.b - (i * brightDifference), 0, 100);

            result.push(color(this.h, currentSaturation, currentBrightness, this.opacity));
        }

        pop();
        return result;
    }

    getComplementary() {
        push();
        colorMode(HSB, 360, 100, 100, 1);
        let complementaryColor = color((this.h + 180) % 360, this.s, this.b, this.opacity);
        pop();
        return [this.color, complementaryColor];
    }

    getTriadic() {
        push();
        colorMode(HSB, 360, 100, 100, 1);
        let triadicColors = [
            this.color,
            color((this.h + 120) % 360, this.s, this.b, this.opacity),
            color((this.h + 240) % 360, this.s, this.b, this.opacity)
        ];
        pop();
        return triadicColors;
    }

    getAnalogous(degree = 30) {
        push();
        colorMode(HSB, 360, 100, 100, 1);
        let analogousColors = [
            this.color,
            color((this.h - degree + 360) % 360, this.s, this.b, this.opacity),
            color((this.h + degree) % 360, this.s, this.b, this.opacity)
        ];
        pop();
        return analogousColors;
    }

    getSplitComplementary(degree = 30) {
        push();
        colorMode(HSB, 360, 100, 100, 1);
        let splitComplementaryColors = [
            this.color,
            color((this.h + 180 - degree + 360) % 360, this.s, this.b, this.opacity),
            color((this.h + 180 + degree) % 360, this.s, this.b, this.opacity)
        ];
        pop();
        return splitComplementaryColors;
    }

    getTetradic() {
        push();
        colorMode(HSB, 360, 100, 100, 1);
        let tetradicColors = [
            this.color,
            color((this.h + 90) % 360, this.s, this.b, this.opacity),
            color((this.h + 180) % 360, this.s, this.b, this.opacity),
            color((this.h + 270) % 360, this.s, this.b, this.opacity)
        ];
        pop();
        return tetradicColors;
    }
}