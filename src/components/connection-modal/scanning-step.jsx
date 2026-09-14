import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Box from '../box/box.jsx';
import PeripheralTile from './peripheral-tile.jsx';
import Dots from './dots.jsx';

import radarIcon from './icons/searching.png';
import refreshIcon from './icons/refresh.svg';

import styles from './connection-modal.css';

/**
 * The list of boards found, or a reason there is nothing to show.
 *
 * A board that has already been found stays on screen even after the scan
 * gives up: it is still there, and hiding it because the search timed out
 * would be actively unhelpful.
 * @param {object} props - the peripherals to show and how the scan is going.
 * @returns {React.ReactElement} - the contents of the list pane.
 */
const PeripheralList = props => {
    if (props.peripherals.length > 0) {
        return (
            <div className={styles.peripheralTilePane}>
                {props.peripherals.map(peripheral => (
                    <PeripheralTile
                        connectionSmallIconURL={props.connectionSmallIconURL}
                        key={peripheral.peripheralId}
                        name={peripheral.name}
                        peripheralId={peripheral.peripheralId}
                        rssi={peripheral.rssi}
                        isSerialport={props.isSerialport}
                        onConnecting={props.onConnecting}
                    />
                ))}
            </div>
        );
    }

    if (props.scanning) {
        return (
            <div className={styles.activityAreaInfo}>
                <div className={styles.centeredRow}>
                    <img
                        className={classNames(styles.radarSmall, styles.radarSpin)}
                        src={radarIcon}
                    />
                    <FormattedMessage
                        defaultMessage="Looking for devices"
                        description="Text shown while scanning for devices"
                        id="gui.connection.scanning.lookingforperipherals"
                    />
                </div>
            </div>
        );
    }

    return (
        <Box className={styles.instructions}>
            <FormattedMessage
                defaultMessage="No devices found"
                description="Text shown when no devices could be found"
                id="gui.connection.scanning.noPeripheralsFound"
            />
        </Box>
    );
};

PeripheralList.propTypes = {
    connectionSmallIconURL: PropTypes.string,
    isSerialport: PropTypes.bool,
    onConnecting: PropTypes.func,
    peripherals: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        rssi: PropTypes.number,
        peripheralId: PropTypes.string
    })).isRequired,
    scanning: PropTypes.bool.isRequired
};

const ScanningStep = props => {
    const onBluetoothTab = props.bluetoothSupported && props.activeTab === 'bluetooth';
    const peripherals = onBluetoothTab ? props.bluetoothList : props.serialList;

    return (
        <Box className={styles.body}>
            {props.bluetoothSupported ? (
                <Box className={styles.tabRow}>
                    <button
                        className={classNames(styles.tab, {[styles.tabActive]: !onBluetoothTab})}
                        onClick={props.onSelectSerialTab}
                    >
                        <FormattedMessage
                            defaultMessage="Serial Ports (USB)"
                            description="Tab listing boards connected by cable"
                            id="gui.connection.scanning.serialTab"
                        />
                    </button>
                    <button
                        className={classNames(styles.tab, {[styles.tabActive]: onBluetoothTab})}
                        onClick={props.onSelectBluetoothTab}
                    >
                        <FormattedMessage
                            defaultMessage="Bluetooth"
                            description="Tab listing boards reachable over Bluetooth"
                            id="gui.connection.scanning.bluetoothTab"
                        />
                        {props.bluetoothList.length > 0 ? (
                            <span className={styles.tabCount}>{props.bluetoothList.length}</span>
                        ) : null}
                    </button>
                </Box>
            ) : null}

            {/* Listing every serial port is a cable-only idea; there is no
                equivalent for Bluetooth, so the option goes with its tab. */}
            {props.isSerialport && !onBluetoothTab ? (
                <Box className={classNames(styles.bodyHeadArea)}>
                    <div className={styles.listAll}>
                        <FormattedMessage
                            defaultMessage="Show all connectable devices"
                            description="Button in prompt for show all connectable devices"
                            id="gui.connection.scanning.listAll"
                        />
                    </div>
                    <div className={styles.checkBox}>
                        <input
                            type="checkbox"
                            name="hexform"
                            checked={props.isListAll}
                            onChange={props.onClickListAll}
                        />
                    </div>
                </Box>
            ) : null}

            <Box className={styles.activityArea}>
                <PeripheralList
                    connectionSmallIconURL={props.connectionSmallIconURL}
                    isSerialport={props.isSerialport && !onBluetoothTab}
                    peripherals={peripherals}
                    scanning={props.scanning}
                    onConnecting={props.onConnecting}
                />
            </Box>

            <Box className={styles.bottomArea}>
                <Box className={classNames(styles.bottomAreaItem, styles.instructions)}>
                    {/* Nothing found yet points at Refresh on purpose: a
                        Bluetooth search may only be started from a click, and
                        that permission lapses a few seconds after the window
                        opens. Refresh is the reliable way to start another. */}
                    {onBluetoothTab && props.bluetoothList.length === 0 ? (
                        <FormattedMessage
                            defaultMessage="Switch the board on, then press Refresh to search over Bluetooth."
                            description="Prompt when no Bluetooth boards have been found yet"
                            id="gui.connection.scanning.bluetoothEmpty"
                        />
                    ) : onBluetoothTab ? (
                        <FormattedMessage
                            defaultMessage="Switch the board on and wait for it to appear. Firmware updates still need the USB cable."
                            description="Prompt for choosing a Bluetooth board"
                            id="gui.connection.scanning.bluetoothInstructions"
                        />
                    ) : (
                        <FormattedMessage
                            defaultMessage="Select your device in the list above."
                            description="Prompt for choosing a device to connect to"
                            id="gui.connection.scanning.instructions"
                        />
                    )}
                </Box>
                <Dots
                    className={styles.bottomAreaItem}
                    counter={0}
                    total={3}
                />
                <button
                    className={classNames(styles.bottomAreaItem, styles.connectionButton)}
                    onClick={props.onRefresh}
                >
                    <FormattedMessage
                        defaultMessage="Refresh"
                        description="Button in prompt for starting a search"
                        id="gui.connection.search"
                    />
                    <img
                        className={styles.buttonIconRight}
                        src={refreshIcon}
                    />
                </button>
            </Box>
        </Box>
    );
};

ScanningStep.propTypes = {
    activeTab: PropTypes.oneOf(['serial', 'bluetooth']),
    bluetoothList: PropTypes.arrayOf(PropTypes.object),
    bluetoothSupported: PropTypes.bool,
    connectionSmallIconURL: PropTypes.string,
    isListAll: PropTypes.bool.isRequired,
    isSerialport: PropTypes.bool,
    onClickListAll: PropTypes.func.isRequired,
    onConnecting: PropTypes.func,
    onRefresh: PropTypes.func,
    onSelectBluetoothTab: PropTypes.func,
    onSelectSerialTab: PropTypes.func,
    serialList: PropTypes.arrayOf(PropTypes.object),
    scanning: PropTypes.bool.isRequired
};

ScanningStep.defaultProps = {
    activeTab: 'serial',
    bluetoothList: [],
    bluetoothSupported: false,
    serialList: [],
    scanning: true
};

export default ScanningStep;
