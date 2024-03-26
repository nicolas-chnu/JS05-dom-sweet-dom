function animatePro(timing, draw, duration) {
    let start = performance.now();

    let animate = (time) => {
        let timeFraction = (time - start) / duration;   // from 0 to 1

        if (timeFraction > 1) {
            timeFraction = 1;
        }

        let progress = timing(timeFraction)

        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

function bowShooting(timeFraction) {
    let x = 1.5;
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}

function bounce(timeFraction) {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
    }
}