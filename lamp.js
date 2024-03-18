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

window.onmousemove = () => updateSleepTimeout();
window.onkeydown = () => updateSleepTimeout();
window.onwheel = () => updateSleepTimeout();

window.onload = () => {
    let type = bulb.classList.item(1);
    setLampBrightnessBtn.disabled = type !== 'led';
}

toggleLampTypeBtn.onclick = () => {
    const lampTypes = ['basic', 'eco', 'led'];
    let current = bulb.classList.item(1);
    let newType = lampTypes[(lampTypes.indexOf(current) + 1) % (lampTypes.length)];

    setLampBrightnessBtn.disabled = newType !== 'led';
    bulb.nextElementSibling.style.opacity = '1';
    bulb.classList.replace(current, newType);
}

toggleLampPowerBtn.onclick = () => {
    bulb.classList.contains('on') ? bulb.classList.remove('on') : bulb.classList.add('on');
}

setLampBrightnessBtn.onclick = () => {
    let brightness = Math.max(0, Math.min(+prompt('Enter brightness from 0 to 100'), 100));
    bulb.nextElementSibling.style.opacity = (brightness / 100).toString();
}