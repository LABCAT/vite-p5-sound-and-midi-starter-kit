import p5 from 'p5';
window.p5 = p5;
await import("p5/lib/addons/p5.sound");

import './style.scss';
import CirclesSketch from '@demos/CirclesSketch';

new p5(CirclesSketch);