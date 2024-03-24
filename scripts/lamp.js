const duration = 1000;
const animationLen = 400;
const initialLampTop = -100;

let toggleLampTypeBtn = document.querySelector('.toggle-lamp-type-btn');
let toggleLampPowerBtn = document.querySelector('.toggle-lamp-power-btn');

let setLampBrightnessBtn = document.querySelector('.set-lamp-brightness-btn');
let bulb = document.querySelector('.lamp__bulb');
let lamp = document.querySelector('.lamp');
let timeout = getSleepTimeout();

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

function animateLampUp() {
    animatePro(
        bowShooting,
        (progress) => lamp.style.top = initialLampTop - progress * animationLen + 'px',
        duration);
}

function animateLampDown() {
    animatePro(
        (timeFraction) => 1 - bounce(1 - timeFraction),     // bounce ease out
        (progress) => lamp.style.top = initialLampTop - animationLen + progress * animationLen + 'px',
        duration);
}

function getSleepTimeout() {
    return setTimeout(() => bulb.classList.remove('on'), 5000);
}

function updateSleepTimeout() {
    clearTimeout(timeout)
    timeout = getSleepTimeout();
}

function getCurrentLampType() {
    return lamp.getAttribute('lamp-type')
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
        animateLampDown();
    }, duration + 500);
}

function updateLampType(before, after) {
    updateSetBrightnessAbility(after);

    bulb.nextElementSibling.style.opacity = '1';
    lamp.setAttribute('lamp-type', after)
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
window.onmousedown = () => updateSleepTimeout();
window.onkeydown = () => updateSleepTimeout();
window.onwheel = () => updateSleepTimeout();

window.onload = () => {
    updateSetBrightnessAbility(getCurrentLampType());
    setTimeout(animateLampDown, 500);
}

toggleLampTypeBtn.onclick = () => switchLampType()
toggleLampPowerBtn.onclick = () => bulb.classList.toggle('on');

setLampBrightnessBtn.onclick = () => updateBrightness();