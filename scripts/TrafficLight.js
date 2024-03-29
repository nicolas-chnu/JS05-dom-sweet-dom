export class TrafficLights {
    #onLightChange;
    #current = 0;
    #cancellationToken;
    #lights = [];

    constructor(onLightChange) {
        this.#onLightChange = onLightChange;
    }
    
    addLight(light) {
        this.#lights.push(light)
    }

    startLights() {
        this.#cancellationToken = new CancellationToken();
        this.#setLight(this.#current, this.#cancellationToken)
    }

    switchToNextLight() {
        this.#cancellationToken.cancel();

        for (let light of this.#lights) {
            light.turnOff()
        }

        this.#onLightChange(this.#current, false)
        this.#current = this.#getNextIndex();

        this.startLights()
    }

    changeLightTime(index, millis) {
        this.#lights[index].duration = millis;
    }

    #setLight(lightIndex, cancellationToken) {
        if (cancellationToken.isCancelled) {
            return
        }

        this.#current = lightIndex;
        let light = this.#lights[lightIndex];

        light.start((isOn) => this.#onLightChange(lightIndex, isOn), cancellationToken)

        setTimeout(
            () => this.#setLight(this.#getNextIndex(), cancellationToken),
            light.duration)
    }

    #getNextIndex() {
        return (this.#current + 1) % this.#lights.length;
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