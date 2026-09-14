import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import CameraToggle from '../camera-toggle/camera-toggle.jsx';
import GreenFlag from '../green-flag/green-flag.jsx';
import StopAll from '../stop-all/stop-all.jsx';
import TurboMode from '../turbo-mode/turbo-mode.jsx';

import styles from './controls.css';

const messages = defineMessages({
    goTitle: {
        id: 'gui.controls.go',
        defaultMessage: 'Go',
        description: 'Green flag button title'
    },
    stopTitle: {
        id: 'gui.controls.stop',
        defaultMessage: 'Stop',
        description: 'Stop button title'
    },
    cameraOnTitle: {
        id: 'gui.controls.cameraOn',
        defaultMessage: 'Turn the camera off',
        description: 'Camera button title while the camera is on'
    },
    cameraOffTitle: {
        id: 'gui.controls.cameraOff',
        defaultMessage: 'Turn the camera on',
        description: 'Camera button title while the camera is off'
    }
});

const Controls = function (props) {
    const {
        active,
        cameraOn,
        className,
        intl,
        onCameraClick,
        onGreenFlagClick,
        onStopAllClick,
        turbo,
        ...componentProps
    } = props;
    return (
        <div
            className={classNames(styles.controlsContainer, className)}
            {...componentProps}
        >
            <GreenFlag
                active={active}
                title={intl.formatMessage(messages.goTitle)}
                onClick={onGreenFlagClick}
            />
            <StopAll
                active={active}
                title={intl.formatMessage(messages.stopTitle)}
                onClick={onStopAllClick}
            />
            <CameraToggle
                on={cameraOn}
                title={intl.formatMessage(cameraOn ? messages.cameraOnTitle : messages.cameraOffTitle)}
                onClick={onCameraClick}
            />
            {turbo ? (
                <TurboMode />
            ) : null}
        </div>
    );
};

Controls.propTypes = {
    active: PropTypes.bool,
    cameraOn: PropTypes.bool,
    className: PropTypes.string,
    intl: intlShape.isRequired,
    onCameraClick: PropTypes.func.isRequired,
    onGreenFlagClick: PropTypes.func.isRequired,
    onStopAllClick: PropTypes.func.isRequired,
    turbo: PropTypes.bool
};

Controls.defaultProps = {
    active: false,
    cameraOn: false,
    turbo: false
};

export default injectIntl(Controls);
