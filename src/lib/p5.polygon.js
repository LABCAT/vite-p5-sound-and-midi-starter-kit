// p5.polygon.js
// A polygon drawing library for p5.js

/**
 * Helper function to draw any regular polygon
 * @param {Number} x - x-coordinate of the polygon
 * @param {Number} y - y-coordinate of the polygon
 * @param {Number} radius - radius of the polygon
 * @param {Number} sides - number of sides
 * @param {Number} startAngle - starting angle (optional)
 */
p5.prototype.polygon = function(x, y, radius, sides, startAngle = 0) {
    this.angleMode(this.RADIANS);
    const angle = this.TWO_PI / sides;
    this.beginShape();
    for (let a = startAngle; a < this.TWO_PI + startAngle; a += angle) {
        let sx = x + this.cos(a) * radius;
        let sy = y + this.sin(a) * radius;
        this.vertex(sx, sy);
    }
    this.endShape(this.CLOSE);
};

/**
 * Draw a pentagon shape
 * @param {Number} x - x-coordinate of the pentagon
 * @param {Number} y - y-coordinate of the pentagon
 * @param {Number} radius - radius of the pentagon
 */
p5.prototype.pentagon = function(x, y, radius) {
    this.polygon(x, y, radius / 2, 5, -this.TWO_PI / 10);
};

/**
 * Draw a hexagon shape
 * @param {Number} x - x-coordinate of the hexagon
 * @param {Number} y - y-coordinate of the hexagon
 * @param {Number} radius - radius of the hexagon
 */
p5.prototype.hexagon = function(x, y, radius) {
    this.polygon(x, y, radius / 2, 6, 0);
};

/**
 * Draw an octagon shape
 * @param {Number} x - x-coordinate of the octagon
 * @param {Number} y - y-coordinate of the octagon
 * @param {Number} radius - radius of the octagon
 */
p5.prototype.octagon = function(x, y, radius) {
    this.polygon(x, y, radius / 2, 8, this.TWO_PI / 16);
};