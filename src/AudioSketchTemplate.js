import { Midi } from '@tonejs/midi';

/** 
 * Add your ogg and mid files in the audio director and update these file names
 */
const audio = new URL("@audio/your-audio-file.ogg", import.meta.url).href;
const midi = new URL("@audio/your-midi-file.mid", import.meta.url).href;

const AudioSketchTemplate = (p) => {
    /** 
     * Core audio properties
     */
    p.song = null;
    p.audioLoaded = false;
    p.songHasFinished = false;

    /** 
     * Preload function - Loading audio and setting up MIDI
     * This runs first, before setup()
     */
    p.preload = () => {
        /** 
         * Log when preload starts
         */
        p.song = p.loadSound(audio, p.loadMidi);
        p.song.onended(() => p.songHasFinished = true);
    };

    /** 
     * Setup function - Initialize your canvas and any starting properties
     * This runs once after preload
     */
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        /** 
         * Add any additional setup code here
         * Example: p.colorMode(p.HSB);
         */
    };

    /** 
     * Main draw loop - This is where your animations happen
     * This runs continuously after setup
     */
    p.draw = () => {
        if(p.audioLoaded && p.song.isPlaying() || p.songHasFinished){
            /** 
             * Add your animation code here
             * This will run while the song is playing or has finished
             */
        }
    }

    /** 
     * MIDI loading and processing
     * Handles synchronization between audio and visuals
     */
    p.loadMidi = () => {
        Midi.fromUrl(midi).then((result) => {
            /** 
             * Log when MIDI is loaded
             */
            console.log('MIDI loaded:', result);
            /** 
             * Example: Schedule different tracks for different visual elements
             */
            const track1 = result.tracks[0].notes;
            /** 
             * Schedule your cue sets
             * You can add multiple tracks by:
             * 1. Getting notes from different MIDI tracks (e.g., tracks[1], tracks[2])
             * 2. Creating corresponding execute functions (e.g., executeTrack2, executeTrack3)
             * 3. Adding new scheduleCueSet calls for each track
             * Example:
             * const track2 = result.tracks[1].notes;
             * const track3 = result.tracks[2].notes;
             * p.scheduleCueSet(track2, 'executeTrack2');
             * p.scheduleCueSet(track3, 'executeTrack3');
             */
            p.scheduleCueSet(track1, 'executeTrack1');
            /** 
             * Update UI elements when loaded
             */
            document.getElementById("loader").classList.add("loading--complete");
            document.getElementById('play-icon').classList.add('fade-in');
            p.audioLoaded = true;
        });
    };

    /** 
     * Schedule MIDI cues to trigger animations
     * @param {Array} noteSet - Array of MIDI notes
     * @param {String} callbackName - Name of the callback function to execute
     * @param {Boolean} polyMode - Allow multiple notes at same time if true
     */
    p.scheduleCueSet = (noteSet, callbackName, polyMode = false) => {
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

    /** 
     * Example track execution functions
     * Add your animation triggers here
     */
    p.executeTrack1 = (note) => {
        /** 
         * Add animation code triggered by track 1
         * Example: trigger based on note properties
         */
        const { midi, velocity, currentCue } = note;
    }

    /** 
     * Handle mouse/touch interaction
     * Controls play/pause and reset functionality
     */
    p.mousePressed = () => {
        if(p.audioLoaded){
            if (p.song.isPlaying()) {
                p.song.pause();
            } else {
                if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                    /** 
                     * Reset animation properties here
                     */
                }
                document.getElementById("play-icon").classList.remove("fade-in");
                p.song.play();
            }
        }
    }
};

export default AudioSketchTemplate;