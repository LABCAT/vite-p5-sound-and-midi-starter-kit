import { Midi } from '@tonejs/midi';

const audio = new URL("@audio/circles-no-3.ogg", import.meta.url).href;
const midi = new URL("@audio/circles-no-3.mid", import.meta.url).href;

const CirclesSketch = (p) => {
    p.song = null;

    p.audioLoaded = false; 

    p.songHasFinished = false;

    p.preload = () => {
        p.song = p.loadSound(audio, p.loadMidi);
        p.song.onended(() => p.songHasFinished = true);
    };

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB);
        p.background(0);
        p.canvas = p._renderer.canvas;
        p.canvas.classList.add('p5Canvas--cursor-play');
    };

    p.draw = () => {
        if(p.audioLoaded && p.song.isPlaying() || p.songHasFinished){
            p.background(0);

            if(p.swarm){
                for (let pA = 0; pA < p.mass.length; pA++) {
                    let accelerationX = 0, accelerationY = 0;
                    
                    for (let pB = 0; pB < p.mass.length; pB++) {
                        if (pA != pB) {
                            let distanceX = p.positionX[pB] - p.positionX[pA];
                            let distanceY = p.positionY[pB] - p.positionY[pA];

                            let distance = p.sqrt(distanceX * distanceX + distanceY * distanceY);
                            if (distance < 1) distance = 1;

                            let force = (distance - 320) * p.mass[pB] / distance;
                            accelerationX += force * distanceX;
                            accelerationY += force * distanceY;
                        }
                    }
                    
                    p.velocityX[pA] = p.velocityX[pA] * 0.99 + accelerationX * p.mass[pA];
                    p.velocityY[pA] = p.velocityY[pA] * 0.99 + accelerationY * p.mass[pA];
                }
            }
            
            for (let particle = 0; particle < p.particles.length; particle++) {
                p.positionX[particle] += p.velocityX[particle];
                p.positionY[particle] += p.velocityY[particle];
                const { hue1, hue2, hue3, hue4, strokeOpacity } = p.particles[particle];

                p.strokeWeight(1);
                p.stroke(0, 0, 100, strokeOpacity);
                p.fill(hue1, 100, 100, 0.25);
                p.ellipse(p.positionX[particle], p.positionY[particle], p.particles[particle].size * 2000, p.particles[particle].size * 2000);
                p.stroke(0, 0, 100, strokeOpacity);
                p.fill(hue2, 100, 100, 0.25);
                p.ellipse(p.positionX[particle], p.positionY[particle], p.particles[particle].size * 1000, p.particles[particle].size * 1000);
                p.stroke(hue3, 100, 100, 1);
                p.fill(hue3, 100, 100, 0.25);
                p.ellipse(p.positionX[particle], p.positionY[particle], p.particles[particle].size * 500, p.particles[particle].size * 500);
                p.stroke(hue3, 100, 100, 0);
                p.fill(hue4, 100, 100, 0.25);
                p.ellipse(p.positionX[particle], p.positionY[particle], p.particles[particle].size * 250, p.particles[particle].size * 250);
            }
        }
    }

    p.loadMidi = () => {
        Midi.fromUrl(midi).then((result) => {
            const noteSet1 = result.tracks[5].notes; // Synth 1
            const noteSet2 = result.tracks[1].notes; // Sampler 2
            p.scheduleCueSet(noteSet1, 'executeCueSet1', true);
            p.scheduleCueSet(noteSet2, 'executeCueSet2');
            document.getElementById("loader").classList.add("loading--complete");
            document.getElementById('play-icon').classList.add('fade-in');
            p.audioLoaded = true;
        });
    };

    p.scheduleCueSet = (noteSet, callbackName, polyMode = false)  => {
        let lastTicks = -1, 
            currentCue = 1;
        for (let i = 0; i < noteSet.length; i++) {
            const note = noteSet[i],
                { ticks, time } = note;
            if(ticks !== lastTicks || polyMode){
                note.currentCue = currentCue;
                p.song.addCue(time, p[callbackName], note);
                lastTicks = ticks;
                currentCue++;
            }
        }
    } 

    p.executeCueSet1 = (note) => {
        const { currentCue, ticks } = note;
        if(ticks % 122880 === 0) {
            p.cueSet1DirectionDown = !p.cueSet1DirectionDown;
        }
        if(!p.swarm || currentCue > 200){
            const posX = p.random(0 + p.width / 40, p.width - p.width / 40); // Random X position
            const posY = p.random(0 + p.height / 20, p.height - p.height / 20); // Random Y position
            p.addNewParticle(note.midi, posX, posY);
        }
    }

    p.executeCueSet2 = (note) => {
        const { durationTicks } = note;
        
        // When durationTicks is greater than 4000, start the swarm
        if(durationTicks > 4000) {
            p.swarm = true;
            // Fade out stroke opacity of particles when swarm is active
            p.particles.forEach(particle => {
                particle.strokeOpacity = 0; 
            });
        }
        else {
            p.swarm = false;
        }
    }

    p.hueSet1 = [30, 60, 90, 120, 150, 180];

    p.hueSet2 = [210, 240, 270, 300, 330, 360];

    p.particles = [];

    p.mass = [];
            
    p.positionX = [];

    p.positionY = [];

    p.velocityX = [];

    p.velocityY = [];

    p.addNewParticle = (midi, posX, posY) => {
        let size = p.random(0.003, 0.03);
        let hueSet = [];
        switch (midi) {
            case 60:
                hueSet = p.shuffle(p.hueSet2);
                break;
            case 62:
                hueSet = p.shuffle(p.hueSet1);
                break;
        }
        p.particles.push(
            {
                size: size,
                hue1: hueSet[0],
                hue2: hueSet[1],
                hue3: hueSet[2],
                hue4: hueSet[3],
                strokeOpacity: 1
            } 
        );
        p.mass.push(size);
        p.positionX.push(posX);
        p.positionY.push(posY);
        p.velocityX.push(0);
        p.velocityY.push(0);
    }

    p.mousePressed = () => {
        if(p.audioLoaded){
            if (p.song.isPlaying()) {
                p.song.pause();
                if (p.canvas) {
                    p.canvas.classList.add('p5Canvas--cursor-play');
                    p.canvas.classList.remove('p5Canvas--cursor-pause');
                }
            } else {
                if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                    p.reset();
                    if (typeof window.dataLayer !== typeof undefined){
                        window.dataLayer.push(
                            { 
                                'event': 'play-animation',
                                'animation': {
                                    'title': document.title,
                                    'location': window.location.href,
                                    'action': 'replaying'
                                }
                            }
                        );
                    }
                }
                document.getElementById("play-icon").classList.remove("fade-in");
                p.song.play();
                if (p.canvas) {
                    p.canvas.classList.add('p5Canvas--cursor-pause');
                    p.canvas.classList.remove('p5Canvas--cursor-play');
                }
                if (typeof window.dataLayer !== typeof undefined && !p.hasStarted){
                    window.dataLayer.push(
                        { 
                            'event': 'play-animation',
                            'animation': {
                                'title': document.title,
                                'location': window.location.href,
                                'action': 'start playing'
                            }
                        }
                    );
                }
            }
        }
    }
};

export default CirclesSketch;
