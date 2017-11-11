const { Observable } = require('rxjs/Observable');
require('rxjs/add/observable/of');
require('rxjs/add/observable/timer');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/let');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');

const { MuseClient, channelNames } = require('muse-js');

const connectButton = document.querySelector('#eegConnect');
const sensitivityInput = document.querySelector('#sensitivity');
const leftEyeInput = document.querySelector('#eyes-left input');
const leftEyeIcon = document.querySelector('#eyes-left .eye-icon');
const rightEyeInput = document.querySelector('#eyes-right input');
const rightEyeIcon = document.querySelector('#eyes-right .eye-icon');
let connected = false;

function onDisconnected() {
    connectButton.textContent = 'Connect';
    connected = false;
}

const client = new MuseClient();
client.connectionStatus.subscribe(newStatus => {
    if (newStatus) {
        connectButton.textContent = 'Disconnect';
    } else {
        onDisconnected();
    }
});

connectButton.addEventListener('click', () => {
    if (connected) {
        client.disconnect();
    } else {
        connected = true;
        connectButton.textContent = 'Connecting...';
        connectToMuse().catch(err => {
            console.error(err);
            onDisconnected()
        });
    }
});

function filterBlinks(obs) {
    return obs
        .map(r => Math.max(...r.samples.map(Math.abs)))
        .filter(max => max > parseInt(sensitivityInput.value))
        .switchMap(() => Observable.merge(
            Observable.of(true),
            Observable.timer(150).map(() => false)
        ))
        .distinctUntilChanged();
}

function toggleClass(el, className) {
    return obs => {
        obs
            .subscribe(value => {
                if (value) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            });
    };
}

async function connectToMuse() {
    await client.connect();
    await client.start();

    const leftChannel = channelNames.indexOf('AF7');
    const rightChannel = channelNames.indexOf('AF8');
    const blinks = client.eegReadings
        .filter(r => {
            return (leftEyeInput.checked && r.electrode === leftChannel)
                || (rightEyeInput.checked && r.electrode === rightChannel)
        })
        .let(filterBlinks);

    client.eegReadings
        .filter(r => r.electrode === leftChannel)
        .let(filterBlinks)
        .let(toggleClass(leftEyeIcon, 'blink'));

    client.eegReadings
        .filter(r => r.electrode === rightChannel)
        .let(filterBlinks)
        .let(toggleClass(rightEyeIcon, 'blink'));

    blinks.subscribe((value) => {
        if (value) {
            const jumpEvent = new Event('keydown');
            jumpEvent.keyCode = 32; // Space key
            document.dispatchEvent(jumpEvent);
        }
    });
}
