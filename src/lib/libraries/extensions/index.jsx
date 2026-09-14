import React from 'react';
import {FormattedMessage} from 'react-intl';

import musicIconURL from './music/music.png';
import musicInsetIconURL from './music/music-small.svg';

import penIconURL from './pen/pen.png';
import penInsetIconURL from './pen/pen-small.svg';

import videoSensingIconURL from './videoSensing/video-sensing.png';
import videoSensingInsetIconURL from './videoSensing/video-sensing-small.svg';

import text2speechIconURL from './text2speech/text2speech.png';
import text2speechInsetIconURL from './text2speech/text2speech-small.svg';

import translateIconURL from './translate/translate.png';
import translateInsetIconURL from './translate/translate-small.png';

import faceSenseIconURL from './faceSense/face-sense.svg';
import faceSenseInsetIconURL from './faceSense/face-sense-small.svg';
import objectSenseIconURL from './objectSense/object-sense.svg';
import objectSenseInsetIconURL from './objectSense/object-sense-small.svg';
import bodySenseIconURL from './bodySense/body-sense.svg';
import bodySenseInsetIconURL from './bodySense/body-sense-small.svg';
import speechSenseIconURL from './speechSense/speech-sense.svg';
import speechSenseInsetIconURL from './speechSense/speech-sense-small.svg';
import scanSenseIconURL from './scanSense/scan-sense.svg';
import scanSenseInsetIconURL from './scanSense/scan-sense-small.svg';
import weatherSenseIconURL from './weatherSense/weather-sense.svg';
import weatherSenseInsetIconURL from './weatherSense/weather-sense-small.svg';
import iotCloudIconURL from './iotCloud/iot-cloud.svg';
import iotCloudInsetIconURL from './iotCloud/iot-cloud-small.svg';
import visionSenseIconURL from './visionSense/vision-sense.svg';
import visionSenseInsetIconURL from './visionSense/vision-sense-small.svg';

// Makey Makey is not offered: Robolab ships one board, and turning a banana
// into a key is not part of it. Left commented rather than deleted, like the
// LEGO extensions below, so putting it back is a one-line job.
// import makeymakeyIconURL from './makeymakey/makeymakey.png';
// import makeymakeyInsetIconURL from './makeymakey/makeymakey-small.svg';

// import ev3IconURL from './ev3/ev3.png';
// import ev3InsetIconURL from './ev3/ev3-small.svg';
// import ev3ConnectionIconURL from './ev3/ev3-hub-illustration.svg';
// import ev3ConnectionSmallIconURL from './ev3/ev3-small.svg';

// import wedo2IconURL from './wedo2/wedo.png'; // TODO: Rename file names to match variable/prop names?
// import wedo2InsetIconURL from './wedo2/wedo-small.svg';
// import wedo2ConnectionIconURL from './wedo2/wedo-illustration.svg';
// import wedo2ConnectionSmallIconURL from './wedo2/wedo-small.svg';
// import wedo2ConnectionTipIconURL from './wedo2/wedo-button-illustration.svg';

// import boostIconURL from './boost/boost.png';
// import boostInsetIconURL from './boost/boost-small.svg';
// import boostConnectionIconURL from './boost/boost-illustration.svg';
// import boostConnectionSmallIconURL from './boost/boost-small.svg';
// import boostConnectionTipIconURL from './boost/boost-button-illustration.svg';

// import gdxforIconURL from './gdxfor/gdxfor.png';
// import gdxforInsetIconURL from './gdxfor/gdxfor-small.svg';
// import gdxforConnectionIconURL from './gdxfor/gdxfor-illustration.svg';
// import gdxforConnectionSmallIconURL from './gdxfor/gdxfor-small.svg';

export default [
    {
        name: (
            <FormattedMessage
                defaultMessage="Music"
                description="Name for the 'Music' extension"
                id="gui.extension.music.name"
            />
        ),
        extensionId: 'music',
        iconURL: musicIconURL,
        insetIconURL: musicInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Play instruments and drums."
                description="Description for the 'Music' extension"
                id="gui.extension.music.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Pen"
                description="Name for the 'Pen' extension"
                id="gui.extension.pen.name"
            />
        ),
        extensionId: 'pen',
        iconURL: penIconURL,
        insetIconURL: penInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Draw with your sprites."
                description="Description for the 'Pen' extension"
                id="gui.extension.pen.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Video Sensing"
                description="Name for the 'Video Sensing' extension"
                id="gui.extension.videosensing.name"
            />
        ),
        extensionId: 'videoSensing',
        iconURL: videoSensingIconURL,
        insetIconURL: videoSensingInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense motion with the camera."
                description="Description for the 'Video Sensing' extension"
                id="gui.extension.videosensing.description"
            />
        ),
        featured: true,
        tags: ['ai&ml']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Text to Speech"
                description="Name for the Text to Speech extension"
                id="gui.extension.text2speech.name"
            />
        ),
        extensionId: 'text2speech',
        collaborator: 'Amazon Web Services',
        iconURL: text2speechIconURL,
        insetIconURL: text2speechInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make your projects talk."
                description="Description for the Text to speech extension"
                id="gui.extension.text2speech.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true,
        tags: ['ai&ml']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Translate"
                description="Name for the Translate extension"
                id="gui.extension.translate.name"
            />
        ),
        extensionId: 'translate',
        collaborator: 'Google',
        iconURL: translateIconURL,
        insetIconURL: translateInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Translate text into many languages."
                description="Description for the Translate extension"
                id="gui.extension.translate.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true,
        tags: ['ai&ml']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Face Sense"
                description="Name for the Face Sense extension"
                id="gui.extension.faceSense.name"
            />
        ),
        extensionId: 'faceSense',
        iconURL: faceSenseIconURL,
        insetIconURL: faceSenseInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Find faces, read expressions, and tell people apart."
                description="Description for the Face Sense extension"
                id="gui.extension.faceSense.description"
            />
        ),
        featured: true,
        tags: ['ai&ml']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Object Sense"
                description="Name for the Object Sense extension"
                id="gui.extension.objectSense.name"
            />
        ),
        extensionId: 'objectSense',
        iconURL: objectSenseIconURL,
        insetIconURL: objectSenseInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Spot everyday things through the camera and say what they are."
                description="Description for the Object Sense extension"
                id="gui.extension.objectSense.description"
            />
        ),
        featured: true,
        tags: ['ai&ml']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Body Sense"
                description="Name for the Body Sense extension"
                id="gui.extension.bodySense.name"
            />
        ),
        extensionId: 'bodySense',
        iconURL: bodySenseIconURL,
        insetIconURL: bodySenseInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Follow people's poses and hands through the camera."
                description="Description for the Body Sense extension"
                id="gui.extension.bodySense.description"
            />
        ),
        featured: true,
        tags: ['ai&ml']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Speech Sense"
                description="Name for the Speech Sense extension"
                id="gui.extension.speechSense.name"
            />
        ),
        extensionId: 'speechSense',
        iconURL: speechSenseIconURL,
        insetIconURL: speechSenseInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Turn what you say into words your project can use."
                description="Description for the Speech Sense extension"
                id="gui.extension.speechSense.description"
            />
        ),
        featured: true,
        tags: ['ai&ml']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Scan Sense"
                description="Name for the Scan Sense extension"
                id="gui.extension.scanSense.name"
            />
        ),
        extensionId: 'scanSense',
        iconURL: scanSenseIconURL,
        insetIconURL: scanSenseInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Read QR codes with the camera or on the stage."
                description="Description for the Scan Sense extension"
                id="gui.extension.scanSense.description"
            />
        ),
        featured: true,
        tags: ['ai&ml']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Weather Sense"
                description="Name for the Weather Sense extension"
                id="gui.extension.weatherSense.name"
            />
        ),
        extensionId: 'weatherSense',
        iconURL: weatherSenseIconURL,
        insetIconURL: weatherSenseInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Weather now and forecasts for any city, from OpenWeather. Needs a free key."
                description="Description for the Weather Sense extension"
                id="gui.extension.weatherSense.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true,
        tags: ['iot']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="IoT Cloud"
                description="Name for the IoT Cloud extension"
                id="gui.extension.iotCloud.name"
            />
        ),
        extensionId: 'iotCloud',
        iconURL: iotCloudIconURL,
        insetIconURL: iotCloudInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Send values to ThingSpeak channels and read them back."
                description="Description for the IoT Cloud extension"
                id="gui.extension.iotCloud.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true,
        tags: ['iot']
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Vision Sense"
                description="Name for the Vision Sense extension"
                id="gui.extension.visionSense.name"
            />
        ),
        extensionId: 'visionSense',
        iconURL: visionSenseIconURL,
        insetIconURL: visionSenseInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Find objects, label pictures and read printed text from the camera, the stage or a web picture."
                description="Description for the Vision Sense extension"
                id="gui.extension.visionSense.description"
            />
        ),
        featured: true,
        tags: ['ai&ml']
    }
    // {
    //     name: 'LEGO MINDSTORMS EV3',
    //     extensionId: 'ev3',
    //     collaborator: 'LEGO',
    //     iconURL: ev3IconURL,
    //     insetIconURL: ev3InsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Build interactive robots and more."
    //             description="Description for the 'LEGO MINDSTORMS EV3' extension"
    //             id="gui.extension.ev3.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: true,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: false,
    //     connectionIconURL: ev3ConnectionIconURL,
    //     connectionSmallIconURL: ev3ConnectionSmallIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting. Make sure the pin on your EV3 is set to 1234."
    //             description="Message to help people connect to their EV3. Must note the PIN should be 1234."
    //             id="gui.extension.ev3.connectingMessage"
    //         />
    //     ),
    //     helpLink: 'https://scratch.mit.edu/ev3'
    // },
    // {
    //     name: 'LEGO BOOST',
    //     extensionId: 'boost',
    //     collaborator: 'LEGO',
    //     iconURL: boostIconURL,
    //     insetIconURL: boostInsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Bring robotic creations to life."
    //             description="Description for the 'LEGO BOOST' extension"
    //             id="gui.extension.boost.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: true,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: true,
    //     connectionIconURL: boostConnectionIconURL,
    //     connectionSmallIconURL: boostConnectionSmallIconURL,
    //     connectionTipIconURL: boostConnectionTipIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their BOOST."
    //             id="gui.extension.boost.connectingMessage"
    //         />
    //     ),
    //     helpLink: 'https://scratch.mit.edu/boost'
    // },
    // {
    //     name: 'LEGO Education WeDo 2.0',
    //     extensionId: 'wedo2',
    //     collaborator: 'LEGO',
    //     iconURL: wedo2IconURL,
    //     insetIconURL: wedo2InsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Build with motors and sensors."
    //             description="Description for the 'LEGO WeDo 2.0' extension"
    //             id="gui.extension.wedo2.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: true,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: true,
    //     connectionIconURL: wedo2ConnectionIconURL,
    //     connectionSmallIconURL: wedo2ConnectionSmallIconURL,
    //     connectionTipIconURL: wedo2ConnectionTipIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their WeDo."
    //             id="gui.extension.wedo2.connectingMessage"
    //         />
    //     ),
    //     helpLink: 'https://scratch.mit.edu/wedo'
    // },
    // {
    //     name: 'Go Direct Force & Acceleration',
    //     extensionId: 'gdxfor',
    //     collaborator: 'Vernier',
    //     iconURL: gdxforIconURL,
    //     insetIconURL: gdxforInsetIconURL,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="Sense push, pull, motion, and spin."
    //             description="Description for the Vernier Go Direct Force and Acceleration sensor extension"
    //             id="gui.extension.gdxfor.description"
    //         />
    //     ),
    //     featured: true,
    //     disabled: false,
    //     bluetoothRequired: true,
    //     internetConnectionRequired: true,
    //     launchPeripheralConnectionFlow: true,
    //     useAutoScan: false,
    //     connectionIconURL: gdxforConnectionIconURL,
    //     connectionSmallIconURL: gdxforConnectionSmallIconURL,
    //     connectingMessage: (
    //         <FormattedMessage
    //             defaultMessage="Connecting"
    //             description="Message to help people connect to their force and acceleration sensor."
    //             id="gui.extension.gdxfor.connectingMessage"
    //         />
    //     ),
    //     helpLink: 'https://scratch.mit.edu/vernier'
    // }
];
