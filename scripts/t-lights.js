const timePerSecond = 500;
const redTime = 5 * timePerSecond;
const yellowTime = 3 * timePerSecond;
const greenTime = 7 * timePerSecond;

let red = document.querySelector('.traffic-lights__red');
let yellow = document.querySelector('.traffic-lights__yellow');
let green = document.querySelector('.traffic-lights__green');
let label = document.querySelector('.active-light');
let switchLightBtn = document.querySelector('.switch-traffic-light-btn');
let setLightSpeedBtn = document.querySelector('.prompt-duration-btn');

function promptLightSpeed() {
    const regex = /^[ryg]=\d?\d$/
    let input = prompt('Enter option (r,y,g) and amount of seconds', 'r=5');
    let found = input.match(regex);
    if (found !== null) {
        let num = +input.slice(2) * timePerSecond;
        switch (input[0]) {
            case 'r':
                redLight.duration = num;
                break;
            case 'y':
                yellowLightIn.duration = num;
                yellowLightOut.duration = num;
                break;
            case 'g':
                greenLight.duration = num;
                break;
        }
    }
    else {
        alert('Invalid input!')
    }
}

function setDisposableTimeout(handler, timeout, cancellationToken) {
    let timeoutId = setTimeout(
        (token) => token.isCancelled ? clearTimeout(timeoutId) : handler(),
        timeout, cancellationToken);

    return cancellationToken;
}

function CancellationToken() {
    this.isCancelled = false;
    this.cancel = () => this.isCancelled = true;
}

function TrafficLight(element, duration, blinkCount, displayName, next = undefined) {
    this.next = next;
    this.duration = duration;
    this.displayName = displayName;

    this.toggle = () => element.classList.toggle('on');
    this.turnOff = () => element.classList.remove('on');

    this.perform = () => {
        label.innerText = this.displayName;

        let interval = blinkCount > 1 ? this.duration / blinkCount * 0.5 : this.duration / blinkCount;
        let cancellationToken = new CancellationToken();

        repeat(this.toggle, blinkCount * 2, interval, cancellationToken);
        return cancellationToken;
    }
}

let yellowLightOut = new TrafficLight(yellow, yellowTime, 3, 'Yellow');
let greenLight = new TrafficLight(green, greenTime, 1, 'Green', yellowLightOut);
let yellowLightIn = new TrafficLight(yellow, yellowTime, 1, 'Yellow', greenLight);
let redLight = new TrafficLight(red, redTime, 1, 'Red', yellowLightIn);

yellowLightOut.next = redLight;

function turnOffAllLights() {
    redLight.turnOff()
    yellowLightIn.turnOff()
    greenLight.turnOff()
    yellowLightOut.turnOff()
}

function repeat(handler, times, interval, cancellationToken) {
    for (let i = 0; i < times; i++) {
        if (cancellationToken.isCancelled) {
            return
        }
        setDisposableTimeout(handler, interval * i, cancellationToken);
    }
}

let currentLight = redLight;
let currentLightCancellationToken;

function performLight() {
    let waitTime = currentLight.duration;
    currentLightCancellationToken = currentLight.perform();

    currentLight = currentLight.next;
    lightTimeout = setTimeout(performLight, waitTime);
}

let lightTimeout = setTimeout(performLight, 0);

switchLightBtn.onclick = () => {
    currentLightCancellationToken.cancel();
    clearTimeout(lightTimeout);

    turnOffAllLights();
    lightTimeout = setTimeout(performLight, 0);
}

setLightSpeedBtn.onclick = promptLightSpeed;