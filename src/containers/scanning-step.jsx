import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import ScanningStepComponent from '../components/connection-modal/scanning-step.jsx';
import VM from 'openblock-vm';

/**
 * How a Bluetooth board's id is told apart from a serial port's.
 * Matches BLE_PREFIX in openblock-vm's mieo-ble.
 * @readonly
 */
const BLE_PREFIX = 'ble:';

class ScanningStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handlePeripheralListUpdate',
            'handlePeripheralScanTimeout',
            'handleClickListAll',
            'handleRefresh',
            'handleSelectSerialTab',
            'handleSelectBluetoothTab'
        ]);
        this.state = {
            scanning: true,
            peripheralList: [],
            activeTab: 'serial'
        };
    }
    componentDidMount () {
        this.scanForPeripheral(this.props.isListAll);
        this.props.vm.on(
            'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
        this.props.vm.on(
            'PERIPHERAL_SCAN_TIMEOUT', this.handlePeripheralScanTimeout);
    }
    componentWillUnmount () {
        // @todo: stop the peripheral scan here
        this.props.vm.removeListener(
            'PERIPHERAL_LIST_UPDATE', this.handlePeripheralListUpdate);
        this.props.vm.removeListener(
            'PERIPHERAL_SCAN_TIMEOUT', this.handlePeripheralScanTimeout);
    }
    scanForPeripheral (listAll) {
        this.props.vm.scanForPeripheral(this.props.deviceId, listAll);
    }
    handlePeripheralScanTimeout () {
        // Whatever has already been found stays on screen. The timeout comes
        // from the serial scan, and throwing away a Bluetooth board that was
        // found perfectly well because no cable turned up would be daft.
        this.setState({scanning: false});
    }
    handleSelectSerialTab () {
        this.setState({activeTab: 'serial'});
    }
    handleSelectBluetoothTab () {
        this.setState({activeTab: 'bluetooth'});
    }
    handlePeripheralListUpdate (newList) {
        // TODO: sort peripherals by signal strength? so they don't jump around
        const peripheralArray = Object.keys(newList).map(id =>
            newList[id]
        );
        this.setState({peripheralList: peripheralArray});
    }
    handleClickListAll () {
        this.props.onClickListAll(!this.props.isListAll);
        this.scanForPeripheral(!this.props.isListAll);
        this.setState({
            scanning: true,
            peripheralList: []
        });
    }
    handleRefresh () {
        this.scanForPeripheral(this.props.isListAll);
        this.setState({
            scanning: true,
            peripheralList: []
        });
    }
    render () {
        const isBluetooth = peripheral => String(peripheral.peripheralId).startsWith(BLE_PREFIX);
        const bluetoothList = this.state.peripheralList.filter(isBluetooth);
        const serialList = this.state.peripheralList.filter(p => !isBluetooth(p));

        return (
            <ScanningStepComponent
                activeTab={this.state.activeTab}
                bluetoothList={bluetoothList}
                bluetoothSupported={this.props.bluetoothSupported}
                connectionSmallIconURL={this.props.connectionSmallIconURL}
                isSerialport={this.props.isSerialport}
                isListAll={this.props.isListAll}
                serialList={serialList}
                phase={this.state.phase}
                scanning={this.state.scanning}
                title={this.props.deviceId}
                onConnected={this.props.onConnected}
                onConnecting={this.props.onConnecting}
                onClickListAll={this.handleClickListAll}
                onRefresh={this.handleRefresh}
                onSelectSerialTab={this.handleSelectSerialTab}
                onSelectBluetoothTab={this.handleSelectBluetoothTab}
            />
        );
    }
}

ScanningStep.propTypes = {
    bluetoothSupported: PropTypes.bool,
    connectionSmallIconURL: PropTypes.string,
    isSerialport: PropTypes.bool.isRequired,
    isListAll: PropTypes.bool.isRequired,
    deviceId: PropTypes.string.isRequired,
    onConnected: PropTypes.func.isRequired,
    onConnecting: PropTypes.func.isRequired,
    onClickListAll: PropTypes.func.isRequired,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default ScanningStep;
