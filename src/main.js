import p5 from 'p5'
import './style.scss'

new p5(sketch => {
    sketch.setup = () => {
        sketch.createCanvas(400, 400)
        sketch.colorMode(sketch.HSB)
    }

    sketch.draw = () => {
        sketch.background(220)
        sketch.fill(sketch.frameCount % 360, 100, 100)
        sketch.circle(sketch.width / 2, sketch.height / 2, 100)
    }
})