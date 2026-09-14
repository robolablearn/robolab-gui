/**
 * How the connected board is attached, for the few things that care.
 *
 * Firmware is the one that matters. The chip's ROM bootloader receives it over
 * the serial line only -- there is no radio until the firmware being replaced
 * is already running -- so a board on Bluetooth cannot be flashed, and the
 * editor has to know that before it opens the upload window rather than after.
 */

/**
 * @param {VirtualMachine} vm - the VM.
 * @param {string} deviceId - the selected device's id, as the GUI holds it.
 * @returns {boolean} - true when that device's board is in use over Bluetooth.
 */
const isPeripheralOverBluetooth = (vm, deviceId) => {
    const runtime = vm && vm.runtime;
    if (!runtime || !deviceId || !runtime.peripheralExtensions) return false;

    // The runtime keys peripherals by the real device id, not the GUI's; every
    // runtime peripheral method maps it the same way.
    const id = typeof runtime.analysisRealDeviceId === 'function' ?
        runtime.analysisRealDeviceId(deviceId) : deviceId;
    const peripheral = runtime.peripheralExtensions[id];

    // Only a peripheral that can use Bluetooth has the property. Every other
    // board is on a cable, which is exactly the answer undefined gives.
    return Boolean(peripheral && peripheral.isOverBluetooth === true);
};

export {
    isPeripheralOverBluetooth
};
