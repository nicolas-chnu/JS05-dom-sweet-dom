export class TrafficLights {
    onLightChange = (index, isOn) => {}
    #current = 0;
    #cancellationToken;

    constructor(redTime, yellowTime, greenTime) {
        this.lights = [
            new Light(redTime, 1),
            new Light(yellowTime, 1),
            new Light(greenTime, 1),
            new Light(yellowTime, 3)
        ];
    }

    static getNextIndex(index) {
        return (index + 1) % 4;
    }

    startLights() {
        this.#cancellationToken = new CancellationToken();

        this.setLight(this.#current, this.onLightChange, this.#cancellationToken)
    }

    setLight(lightIndex, handler, cancellationToken) {
        this.#current = lightIndex;

        if (!cancellationToken.isCancelled) {
            let light = this.lights[lightIndex];
            light.start((isOn) => this.onLightChange(lightIndex, isOn), cancellationToken)

            setTimeout(
                () => this.setLight(TrafficLights.getNextIndex(lightIndex), handler, cancellationToken),
                light.duration)
        }
    }

    switchToNextLight() {
        this.#cancellationToken.cancel();

        for (let light of this.lights) {
            light.turnOff()
        }
        this.onLightChange(this.#current, false)
        this.#current = TrafficLights.getNextIndex(this.#current);

        this.startLights()
    }

    changeLightTime(index, millis) {
        this.lights[index].duration = millis;
    }
}

export class Light {
    isOn = false;
    duration;
    blinkCount;

    constructor(duration, blinkCount)
    {
        this.duration = duration;
        this.blinkCount = blinkCount;
    }

    static countInterval(blinkCount, duration) {
        return blinkCount > 1 ? duration / blinkCount * 0.5 : duration / blinkCount
    }

    toggle = () => this.isOn = !this.isOn;
    turnOff = () => this.isOn = false;

    start(handler, cancellationToken) {
        let interval = Light.countInterval(this.blinkCount, this.duration)

        this.setLightToggle(handler, this.blinkCount * 2, interval, cancellationToken)
    }

    setLightToggle(handler, timesLeft, nextTimeout, cancellationToken) {
        if (timesLeft > 0 && !cancellationToken.isCancelled) {
            this.toggle()
            handler(this.isOn)

            setTimeout(
                () => this.setLightToggle(handler, timesLeft - 1, nextTimeout, cancellationToken),
                nextTimeout)
        }
    }
}

class CancellationToken {
    isCancelled = false;
    cancel = () => this.isCancelled = true;
}