import p5 from 'p5'
import './style.scss'

new p5(p => {
    const shapes = ['circle', 'square']

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        p.rectMode(p.CENTER)
        p.shape = p.random(shapes)
        document.getElementById("loader").classList.add("loading--complete")
    }

    p.draw = () => {
        p.background(220)
        p.fill(p.frameCount % 360, 100, 100)
        p[p.shape](p.width/2, p.height/2, 100)

        if(p.frameCount % 360 === 0){
            p.shape = p.random(shapes)
        }
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
})