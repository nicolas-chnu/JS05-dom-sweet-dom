// buttons
let toggleLampTypeBtn = document.querySelector('.toggle-lamp-type-btn');
let toggleLampPowerBtn = document.querySelector('.toggle-lamp-power-btn');
let setLampBrightnessBtn = document.querySelector('.set-lamp-brightness-btn');

let bulb = document.querySelector('.lamp__bulb');
let timeout = getSleepTimeout();

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

    updateLampType(current, newType);
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
window.onload = () => updateSetBrightnessAbility(getCurrentLampType())

toggleLampTypeBtn.onclick = () => switchLampType()
toggleLampPowerBtn.onclick = () => bulb.classList.toggle('on');

setLampBrightnessBtn.onclick = () => updateBrightness();