import {Light, TrafficLights} from "./TrafficLight.js";

const label = document.querySelector('.active-light');
const switchLightBtn = document.querySelector('.switch-traffic-light-btn');
const setLightSpeedBtn = document.querySelector('.prompt-duration-btn');

const lightsElem = document.querySelector('.traffic-lights');

const timePerSecond = 500;
const redTime = 5 * timePerSecond;
const yellowTime = 3 * timePerSecond;
const greenTime = 7 * timePerSecond;

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

    let time = +input.slice(2) * timePerSecond;

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

    label.innerText = capitalize(color);
    isOn
        ? lightsElem.setAttribute(colorAttr, color)
        : lightsElem.removeAttribute(colorAttr)
}

switchLightBtn.onclick = () => lights.switchToNextLight()
setLightSpeedBtn.onclick = promptLightSpeed

const lights = new TrafficLights(onLightChange);

lights.addLight(new Light(redTime, 1))
lights.addLight(new Light(yellowTime, 1))
lights.addLight(new Light(greenTime, 1))
lights.addLight(new Light(yellowTime, 3))

lights.startLights()