import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'openblock-vm';
import {connect} from 'react-redux';

import ControlsComponent from '../components/controls/controls.jsx';
import log from '../lib/log';

class Controls extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCameraClick',
            'handleGreenFlagClick',
            'handleStopAllClick',
            'handleVideoStateChange'
        ]);
        this.state = {cameraOn: false};
    }
    componentDidMount () {
        // The camera can also be turned on and off by blocks, so the button
        // follows the video device rather than only its own clicks. Without
        // this the icon would go stale the first time a script used the camera.
        if (this.props.vm) {
            this.props.vm.runtime.on('VIDEO_STATE_CHANGED', this.handleVideoStateChange);
        }
    }
    componentWillUnmount () {
        if (this.props.vm) {
            this.props.vm.runtime.removeListener('VIDEO_STATE_CHANGED', this.handleVideoStateChange);
        }
    }
    handleVideoStateChange (on) {
        this.setState({cameraOn: on});
    }
    handleCameraClick (e) {
        e.preventDefault();
        const video = this.props.vm.runtime.ioDevices.video;
        if (!video) return;

        if (this.state.cameraOn) {
            video.disableVideo();
            return;
        }

        video.mirror = true;
        // Scratch calls this a ghost and it runs backwards from how it reads:
        // 0 is a solid picture. Set every time, so the button always gives the
        // same result no matter what fade a block left behind.
        video.setPreviewGhost(0);
        // A refused camera permission rejects here. Nothing is emitted in that
        // case, so the button honestly stays off.
        const enabling = video.enableVideo();
        if (enabling) {
            enabling.catch(err => {
                log.warn(`Could not turn the camera on: ${err}`);
            });
        }
    }
    handleGreenFlagClick (e) {
        e.preventDefault();
        if (e.shiftKey) {
            this.props.vm.setTurboMode(!this.props.turbo);
        } else {
            if (!this.props.isStarted) {
                this.props.vm.start();
            }
            this.props.vm.greenFlag();
        }
    }
    handleStopAllClick (e) {
        e.preventDefault();
        this.props.vm.stopAll();
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            isStarted, // eslint-disable-line no-unused-vars
            projectRunning,
            turbo,
            ...props
        } = this.props;
        return (
            <ControlsComponent
                {...props}
                active={projectRunning}
                cameraOn={this.state.cameraOn}
                turbo={turbo}
                onCameraClick={this.handleCameraClick}
                onGreenFlagClick={this.handleGreenFlagClick}
                onStopAllClick={this.handleStopAllClick}
            />
        );
    }
}

Controls.propTypes = {
    isStarted: PropTypes.bool.isRequired,
    projectRunning: PropTypes.bool.isRequired,
    turbo: PropTypes.bool.isRequired,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    isStarted: state.scratchGui.vmStatus.running,
    projectRunning: state.scratchGui.vmStatus.running,
    turbo: state.scratchGui.vmStatus.turbo
});
// no-op function to prevent dispatch prop being passed to component
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
