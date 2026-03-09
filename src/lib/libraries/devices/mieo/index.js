const ArgumentType = require('scratch-vm/src/extension-support/argument-type');
const BlockType = require('scratch-vm/src/extension-support/block-type');

class MieoExtension {
    constructor(runtime) {
        this.runtime = runtime;
    }

    getInfo() {
        return {
            id: 'mieo',
            name: 'Mieo',
            category: 'mieo',
            categoryData: {
                colour: '#FF6B6B',
                secondaryColour: '#FF5252',
                tertiaryColour: '#FF4040'
            },
            blocks: [
                {
                    opcode: 'whenMieoStartsUp',
                    blockType: BlockType.EVENT,
                    text: 'when Mieo starts up',
                    arguments: {},
                    category: 'mieo'
                },
                {
                    opcode: 'mieoDigitalWrite',
                    blockType: BlockType.COMMAND,
                    text: 'set digital pin [PIN] to [VALUE]',
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'digitalPins',
                            defaultValue: 'D0'
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            menu: 'pinStates',
                            defaultValue: 'HIGH'
                        }
                    },
                    category: 'mieo'
                },
                {
                    opcode: 'mieoDigitalRead',
                    blockType: BlockType.REPORTER,
                    text: 'digital pin [PIN]',
                    arguments: {
                        PIN: {
                            type: ArgumentType.STRING,
                            menu: 'digitalPins',
                            defaultValue: 'D0'
                        }
                    },
                    category: 'mieo'
                }
            ],
            menus: {
                digitalPins: [
                    'D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13'
                ],
                pinStates: ['HIGH', 'LOW']
            }
        };
    }

    whenMieoStartsUp() {
        // This is an event block - it doesn't need implementation
        // The block is triggered by the runtime when Mieo device starts
        return true;
    }

    mieoDigitalWrite(args) {
        // Send command to set digital pin
        const pin = args.PIN;
        const value = args.VALUE;
        // Implementation would communicate with device
        console.log(`Setting pin ${pin} to ${value}`);
        return true;
    }

    mieoDigitalRead(args) {
        // Read digital pin value
        const pin = args.PIN;
        // Implementation would read from device
        console.log(`Reading pin ${pin}`);
        return 'HIGH';
    }
}

module.exports = MieoExtension;
