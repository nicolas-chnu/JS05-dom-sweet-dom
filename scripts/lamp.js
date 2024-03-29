import {animatePro, bowShooting, bounce} from './animation.js'

const duration = 1000;
const animationPathLen = 400;
const initialLampTop = -100;

const toggleLampTypeBtn = document.querySelector('.toggle-lamp-type-btn');
const toggleLampPowerBtn = document.querySelector('.toggle-lamp-power-btn');

const setLampBrightnessBtn = document.querySelector('.set-lamp-brightness-btn');
const bulbElem = document.querySelector('.lamp__bulb');
const lampElem = document.querySelector('.lamp');

let timeout;
let currentLampType = 'basic'

function animateLampUp() {
    animatePro(
        bowShooting,
        (progress) => lampElem.style.top = initialLampTop - progress * animationPathLen + 'px',
        duration);
}

function animateLampDown() {
    animatePro(
        (timeFraction) => 1 - bounce(1 - timeFraction),     // bounce ease out
        (progress) => lampElem.style.top = initialLampTop - animationPathLen + progress * animationPathLen + 'px',
        duration);
}

function updateSleepTimeout() {
    clearTimeout(timeout)
    timeout = setTimeout(() => bulbElem.classList.remove('is-on'), 5000);
}

function updateSetLampBrightnessBtn() {
    setLampBrightnessBtn.disabled = currentLampType !== 'led';
}

function switchToNextLamp() {
    currentLampType = getNextLampType()
    updateSetLampBrightnessBtn();

    bulbElem.nextElementSibling.style.opacity = '1';
    lampElem.setAttribute('lamp-type', currentLampType)
}

function getNextLampType() {
    const lampTypes = ['basic', 'eco', 'led'];
    return lampTypes[(lampTypes.indexOf(currentLampType) + 1) % (lampTypes.length)];
}

function updateBrightness() {
    let brightness = +prompt('Enter brightness from 0 to 100')
    let coercedBrightness = Math.max(0, Math.min(brightness, 100)) / 100;

    bulbElem.nextElementSibling.style.opacity = coercedBrightness.toString();
}

window.onmousemove = updateSleepTimeout;
window.onmousedown = updateSleepTimeout;
window.onkeydown = updateSleepTimeout;
window.onwheel = updateSleepTimeout;

window.onload = () => {
    updateSetLampBrightnessBtn();
    setTimeout(animateLampDown, 500);
}

toggleLampTypeBtn.onclick = () => {
    animateLampUp();

    setTimeout(() => {
        switchToNextLamp()
        animateLampDown();
    }, duration + 200);
}
toggleLampPowerBtn.onclick = () => bulbElem.classList.toggle('is-on')
setLampBrightnessBtn.onclick = updateBrightness;