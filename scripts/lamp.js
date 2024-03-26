const duration = 1000;
const animationLen = 400;
const initialLampTop = -100;

let toggleLampTypeBtn = document.querySelector('.toggle-lamp-type-btn');
let toggleLampPowerBtn = document.querySelector('.toggle-lamp-power-btn');

let setLampBrightnessBtn = document.querySelector('.set-lamp-brightness-btn');
let bulb = document.querySelector('.lamp__bulb');
let lamp = document.querySelector('.lamp');
let timeout = getSleepTimeout();

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