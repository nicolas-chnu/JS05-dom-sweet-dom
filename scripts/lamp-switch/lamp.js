import {animatePro, bowShooting, bounce} from '../animation.js'

const ANIMATION_DURATION = 1000;
const ANIMATION_PATH_LEN = 400;
const INITIAL_LAMP_POS = -100;

const toggleLampTypeBtn = document.querySelector('.js-toggle-lamp-type-btn');
const toggleLampPowerBtn = document.querySelector('.js-toggle-lamp-power-btn');
const setLampBrightnessBtn = document.querySelector('.js-set-lamp-brightness-btn');

const bulbElem = document.querySelector('.js-lamp__bulb');
const lampElem = bulbElem.parentElement;

let timeout;
let currentLampType = 'basic'

function animateLampUp() {
    animatePro(
        bowShooting,
        (progress) => lampElem.style.top = INITIAL_LAMP_POS - progress * ANIMATION_PATH_LEN + 'px',
        ANIMATION_DURATION);
}

function animateLampDown() {
    animatePro(
        (timeFraction) => 1 - bounce(1 - timeFraction),     // bounce ease out
        (progress) => lampElem.style.top = INITIAL_LAMP_POS - ANIMATION_PATH_LEN + progress * ANIMATION_PATH_LEN + 'px',
        ANIMATION_DURATION);
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

window.addEventListener('mousemove', updateSleepTimeout)
window.addEventListener('mousedown', updateSleepTimeout)
window.addEventListener('keydown', updateSleepTimeout)
window.addEventListener('wheel', updateSleepTimeout)
window.addEventListener('DOMContentLoaded', () => {
    updateSetLampBrightnessBtn();
    setTimeout(animateLampDown, 500);
})

toggleLampPowerBtn.addEventListener('click', () => bulbElem.classList.toggle('is-on'))
setLampBrightnessBtn.addEventListener('click', updateBrightness);

toggleLampTypeBtn.addEventListener('click', () => {
    animateLampUp();

    setTimeout(() => {
        switchToNextLamp()
        animateLampDown();
    }, ANIMATION_DURATION + 200);
})
