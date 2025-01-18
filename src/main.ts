import p5 from 'p5'

new p5((p: p5) => {
    p.setup = () => {
        p.createCanvas(400, 400)
        p.colorMode(p.HSB)
    }

    p.draw = () => {
        p.background(220)
        p.fill(p.frameCount % 360, 100, 100)
        p.circle(p.width / 2, p.height / 2, 100)
    }
})