// buttons
let toggleLampTypeBtn = document.querySelector('.toggle-lamp-type-btn');
let toggleLampPowerBtn = document.querySelector('.toggle-lamp-power-btn');
let setLampBrightnessBtn = document.querySelector('.set-lamp-brightness-btn');

let bulb = document.querySelector('.lamp__bulb');
let timeout = getSleepTimeout();

const duration = 1000;
const animationLength = 400;
let lamp = document.querySelector('.lamp');
const initialLampTop = -100;

// ------------ animation ---------------

function animate({timing, draw, duration}) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction)

        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

// Time fraction is from 0 to 1
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

function makeEaseOut(timing) {
    return function(timeFraction) {
        return 1 - timing(1 - timeFraction);
    }
}

function drawLampUp(progress) {
    lamp.style.top = initialLampTop - progress * animationLength + 'px';
    // lamp.style.top = -100 - progress * 400 + 'px';
}

function drawLampDown(progress) {
    lamp.style.top = initialLampTop - animationLength + progress * animationLength + 'px';
    // lamp.style.top = -500 + progress * 400 + 'px';
}

function animateLampUp() {
    animate({
        timing: bowShooting,
        draw: drawLampUp,
        duration: duration
    });
}

function animateLampDown() {
    animate({
        timing: makeEaseOut(bounce),
        draw: drawLampDown,
        duration: duration
    });
}

// ------------------------------------

function getSleepTimeout() {
    return setTimeout(() => bulb.classList.remove('on'), 5000);
}

function updateSleepTimeout() {
    clearTimeout(timeout)
    timeout = getSleepTimeout();
}

function getCurrentLampType() {
    return bulb.classList.item(1);
}

function updateSetBrightnessAbility(type) {
    setLampBrightnessBtn.disabled = type !== 'led';
}

function switchLampType() {
    let current = getCurrentLampType();
    let newType = getNextLampType(current);

    animateLampUp();

    setTimeout(() => {
        updateLampType(current, newType);
        animateLampDown(); // Start the down animation
    }, duration + 500);
}

function updateLampType(before, after) {
    updateSetBrightnessAbility(after);

    bulb.nextElementSibling.style.opacity = '1';
    bulb.classList.replace(before, after);
}

function getNextLampType(currentType) {
    const lampTypes = ['basic', 'eco', 'led'];
    return lampTypes[(lampTypes.indexOf(currentType) + 1) % (lampTypes.length)];
}

function promptLampBrightness() {
    return Math.max(0, Math.min(+prompt('Enter brightness from 0 to 100'), 100)) / 100;
}

function updateBrightness() {
    bulb.nextElementSibling.style.opacity = promptLampBrightness().toString();
}

window.onmousemove = () => updateSleepTimeout();
window.onkeydown = () => updateSleepTimeout();
window.onwheel = () => updateSleepTimeout();
window.onload = () => {
    updateSetBrightnessAbility(getCurrentLampType());
    setTimeout(animateLampDown, 500);
}

toggleLampTypeBtn.onclick = () => switchLampType()
toggleLampPowerBtn.onclick = () => bulb.classList.toggle('on');

setLampBrightnessBtn.onclick = () => updateBrightness();