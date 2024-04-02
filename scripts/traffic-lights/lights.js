import {Light, TrafficLights} from "./TrafficLights.js";

const TIME_PER_SECOND = 500;
const RED_TIME = 5 * TIME_PER_SECOND;
const YELLOW_TIME = 3 * TIME_PER_SECOND;
const GREEN_TIME = 7 * TIME_PER_SECOND;

const switchLightBtn = document.querySelector('.js-switch-traffic-light-btn');
const setLightSpeedBtn = document.querySelector('.js-prompt-duration-btn');

const activeLightLabel = document.querySelector('.js-active-light');
const lightsElem = document.querySelector('.js-traffic-lights');

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function promptLightSpeed() {
    const regex = /^[ryg]=\d?\d$/
    let input = prompt('Enter option (r,y,g) and amount of seconds', 'r=5');
    let found = input.match(regex);

    if (found === null) {
        alert('Invalid input!')
        return
    }

    let time = +input.slice(2) * TIME_PER_SECOND;

    switch (input[0]) {
        case 'r':
            lights.changeLightTime(0, time)
            break;
        case 'y':
            lights.changeLightTime(1, time)
            lights.changeLightTime(3, time)
            break;
        case 'g':
            lights.changeLightTime(2, time)
            break;
    }
}

function onLightChange(index, isOn) {
    const colorAttrValues = ['red', 'yellow', 'green', 'yellow']
    const colorAttr = 'color'
    let color = colorAttrValues[index]

    activeLightLabel.innerText = capitalize(color);
    isOn
        ? lightsElem.setAttribute(colorAttr, color)
        : lightsElem.removeAttribute(colorAttr)
}

switchLightBtn.addEventListener('click', () => lights.switchToNextLight())
setLightSpeedBtn.addEventListener('click', promptLightSpeed)

const lights = new TrafficLights(onLightChange);

lights.addLight(new Light(RED_TIME, 1))
lights.addLight(new Light(YELLOW_TIME, 1))
lights.addLight(new Light(GREEN_TIME, 1))
lights.addLight(new Light(YELLOW_TIME, 3))

lights.startLights()