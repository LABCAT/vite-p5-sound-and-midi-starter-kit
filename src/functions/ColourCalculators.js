function TetradicColourCalculator(p5, hue, saturation = 100, brightness = 100) {
    let set = [];
    let i = 0;
    while(i < 4){
        hue = hue + i * 90;
        hue = hue < 360 ? hue : hue - 360;
        const colour = p5.color(
            hue,
            saturation,
            brightness,
            1
        );
        set.push(colour);
        i++;
    }
    return set;
}

function TriadicColourCalculator(p5, hue, saturation = 100, brightness = 100) {
    let set = [];
    let i = 0;
    while(i < 3){
        const colour = p5.color(
            hue,
            saturation,
            brightness,
            1
        );
        set.push(colour);
        hue = hue + 120 < 360 ? hue + 120 : hue - 240;
        i++;
    }
    return set;
}

function ComplementaryColourCalculator(p5, hue, saturation = 100, brightness = 100) {
    let set = [];
    let i = 0;
    while(i < 2){
        hue = hue + i * 180;
        hue = hue < 360 ? hue : hue - 360;
        const colour = p5.color(
            hue,
            saturation,
            brightness,
            1
        );
        set.push(colour);
        i++;
    }
    return set;
}

export { TetradicColourCalculator, TriadicColourCalculator, ComplementaryColourCalculator };