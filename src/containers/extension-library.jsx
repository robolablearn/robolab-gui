import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'openblock-vm';

import analytics from '../lib/analytics';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import extensionLibraryContent from '../lib/libraries/extensions/index.jsx';
import {showAlertWithTimeout} from '../reducers/alerts';

import LibraryComponent from '../components/library/library.jsx';
import extensionIcon from '../components/action-menu/icon--sprite.svg';

const messages = defineMessages({
    extensionTitle: {
        defaultMessage: 'Choose an Extension',
        description: 'Heading for the extension library',
        id: 'gui.extensionLibrary.chooseAnExtension'
    },
    extensionUrl: {
        defaultMessage: 'Enter the URL of the extension',
        description: 'Prompt for unoffical extension url',
        id: 'gui.extensionLibrary.extensionUrl'
    },
    robotTag: {
        id: 'gui.library.robotTag',
        defaultMessage: 'Robot',
        description: 'Robot tag to filter all robot libraries.'
    },
    hardwareTag: {
        id: 'gui.library.hardwareTag',
        defaultMessage: 'Hardware',
        description: 'Hardware tag to filter all hardware libraries.'
    },
    aiMlTag: {
        id: 'gui.library.aiMlTag',
        defaultMessage: 'AI&ML',
        description: 'AI&ML tag to filter all AI and machine learning libraries.'
    },
    iotTag: {
        id: 'gui.library.iotTag',
        defaultMessage: 'IoT',
        description: 'IoT tag to filter extensions that use internet services.'
    }
});

const ROBOT_TAG = {tag: 'robot', intlLabel: messages.robotTag};
const HARDWARE_TAG = {tag: 'hardware', intlLabel: messages.hardwareTag};
const AI_ML_TAG = {tag: 'ai&ml', intlLabel: messages.aiMlTag};
const IOT_TAG = {tag: 'iot', intlLabel: messages.iotTag};

/**
 * The categories an extension can be filed under.
 *
 * "All" is not here: the library component puts it in front of whatever it is
 * given, so adding it would show it twice.
 *
 * An extension with no tag still appears, but only under All -- which is where
 * the editor utilities sit, because they are not any of these four things.
 */
const tagListPrefix = [ROBOT_TAG, HARDWARE_TAG, AI_ML_TAG, IOT_TAG];

class ExtensionLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'updateScratchExtensions',
            'updateDeviceExtensions',
            'handleItemSelect'
        ]);
        this.state = {
            scratchExtensions: [],
            deviceExtensions: []
        };
    }

    componentDidMount () {
        if (this.props.isRealtimeMode) {
            this.updateScratchExtensions();
        } else {
            this.updateDeviceExtensions();
        }
    }

    updateScratchExtensions () {
        this.props.vm.extensionManager.getExtensionsList(Object.assign([], extensionLibraryContent))
            .then(data => {
                if (data) {
                    this.setState({scratchExtensions: data});
                }
            });
    }

    updateDeviceExtensions () {
        this.props.vm.extensionManager.getDeviceExtensionsList()
            .then(data => {
                if (data) {
                    this.setState({deviceExtensions: data});
                }
            });
    }

    handleItemSelect (item) {
        const id = item.extensionId;

        if (this.props.isRealtimeMode) {
            let url = item.extensionURL ? item.extensionURL : id;
            if (!item.disabled && !id) {
                // eslint-disable-next-line no-alert
                url = prompt(this.props.intl.formatMessage(messages.extensionUrl));
            }
            if (id && !item.disabled) {
                if (this.props.vm.extensionManager.isExtensionLoaded(url)) {
                    this.props.vm.extensionManager.unloadExtension(url);
                    this.updateScratchExtensions();
                } else {
                    // Promise.resolve().then() so that a synchronous throw from
                    // loadExtensionURL lands in the catch below rather than
                    // escaping handleItemSelect entirely.
                    return Promise.resolve()
                        .then(() => this.props.vm.extensionManager.loadExtensionURL(url))
                        .then(() => {
                            this.updateScratchExtensions();
                            analytics.event({
                                category: 'extensions',
                                action: 'select extension',
                                label: id
                            });
                        })
                        .catch(err => {
                            // Without this the editor sat on "Processing..."
                            // forever and said nothing.
                            console.error(err); // eslint-disable-line no-console
                            this.props.onExtensionLoadError();
                            this.updateScratchExtensions();
                        });
                }
            }
        } else if (id && !item.disabled) {
            if (this.props.vm.extensionManager.isDeviceExtensionLoaded(id)) {
                this.props.vm.extensionManager.unloadDeviceExtension(id);
                this.updateDeviceExtensions();
            } else {
                return this.props.vm.extensionManager.loadDeviceExtension(id).then(() => {
                    this.updateDeviceExtensions();
                    analytics.event({
                        category: 'extensions',
                        action: 'select device extension',
                        label: id
                    });
                })
                    .catch(err => {
                        console.error(err); // eslint-disable-line no-console
                        this.props.onExtensionLoadError();
                        this.updateDeviceExtensions();
                    });
            }
        }
    }
    render () {
        let extensionLibraryThumbnailData = [];
        const device = this.props.deviceData.find(dev => dev.deviceId === this.props.deviceId);
        const filterAndSort = extensions => extensions.filter(extension => {
            if (extension.supportDevice) {
                return extension.supportDevice.includes(this.props.deviceId) ||
                extension.supportDevice.includes(device.deviceExtensionsCompatible) ||
                extension.supportDevice.includes('*');
            }
            return true;
        })
            .map(extension => ({
                rawURL: extension.iconURL || extensionIcon,
                ...extension
            }))
            .sort((a, b) => {
                if ((b.isLoaded !== true) && (a.isLoaded === true)) return -1;
                return 1;
            });

        if (this.props.isRealtimeMode) {
            extensionLibraryThumbnailData = filterAndSort(this.state.scratchExtensions);
        } else {
            extensionLibraryThumbnailData = filterAndSort(this.state.deviceExtensions);
        }

        return (
            <LibraryComponent
                autoClose={false}
                data={extensionLibraryThumbnailData}
                filterable
                tags={tagListPrefix}
                id="extensionLibrary"
                isUnloadble
                title={this.props.intl.formatMessage(messages.extensionTitle)}
                visible={this.props.visible}
                onItemSelected={this.handleItemSelect}
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

ExtensionLibrary.propTypes = {
    onExtensionLoadError: PropTypes.func.isRequired,
    deviceData: PropTypes.instanceOf(Array).isRequired,
    deviceId: PropTypes.string,
    intl: intlShape.isRequired,
    isRealtimeMode: PropTypes.bool,
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired // eslint-disable-line react/no-unused-prop-types
};

const mapStateToProps = state => ({
    deviceData: state.scratchGui.deviceData.deviceData,
    deviceId: state.scratchGui.device.deviceId,
    isRealtimeMode: state.scratchGui.programMode.isRealtimeMode
});

const mapDispatchToProps = dispatch => ({
    onExtensionLoadError: () => showAlertWithTimeout(dispatch, 'extensionLoadError')
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(ExtensionLibrary);
