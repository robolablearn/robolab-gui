/**
 * When a device is picked, the untouched default sprite becomes that device.
 *
 * A project about a robot should open with the robot on the stage rather than
 * a placeholder, so choosing Mieo in the device library swaps the pristine
 * default sprite for the library's Mieo sprite. Only a sprite nobody has
 * touched is replaced -- the default project's own costumes and not a single
 * block. Anything a person has renamed, drawn on or scripted is theirs. A
 * project opened from disk with Mieo already in it never comes through here
 * at all, because this runs on a library click, not on a device being loaded.
 *
 * The sprite comes from the sprite library, which scripts/copy-assets.js
 * fills from src/assets/sprites/sprites.manifest.json on every install. The
 * name below is the manifest's name, and the artwork is whatever the manifest
 * points at, so a redrawn Mieo arrives here without a change.
 */
import projectData from './default-project/project-data';
import spriteLibraryContent from './libraries/sprites.json';

/** Which library sprite stands in for which device. */
const DEVICE_SPRITES = {
    mieo: 'Mieo'
};

/**
 * The costume ids of the default project's sprite: the fingerprint of a
 * sprite nobody has touched. Read from the default project itself, so that a
 * change to the default sprite changes this with it.
 * @returns {Array<string>} - assetIds, in costume order.
 */
const defaultCostumeIds = () => {
    const sprite = projectData().targets.find(target => !target.isStage);
    return sprite ? sprite.costumes.map(costume => costume.assetId) : [];
};

/**
 * @param {object} target - a runtime target.
 * @param {Array<string>} costumeIds - what the default sprite's costumes are.
 * @returns {boolean} - true for a sprite nobody has touched: the default
 * project's own costumes, in order, and no scripts. The name is deliberately
 * not part of it; it is translated, and renaming alone is not making it yours.
 */
const isPristineDefault = (target, costumeIds) => {
    if (!target || target.isStage || !target.isOriginal || !target.sprite) return false;
    if (costumeIds.length === 0) return false;
    if (target.blocks.getScripts().length > 0) return false;
    const ids = target.sprite.costumes.map(costume => costume.assetId);
    return ids.length === costumeIds.length && ids.every((id, i) => id === costumeIds[i]);
};

/**
 * @param {string} deviceId - the device just chosen.
 * @returns {?object} - the library sprite that stands for it, or null when
 * the device has none or the library does not carry it.
 */
const librarySpriteFor = deviceId => {
    const name = DEVICE_SPRITES[deviceId];
    if (!name) return null;
    return spriteLibraryContent.find(sprite => sprite.name === name) || null;
};

/**
 * Swap the pristine default sprite for the device's, if both exist.
 *
 * The replacement goes in before the default comes out, so the project is
 * never left without a sprite and a failed add leaves the default exactly as
 * it was. Errors are left to the caller, who has the console.
 * @param {VM} vm - the virtual machine.
 * @param {string} deviceId - the device just chosen.
 * @returns {Promise<boolean>} - resolves true when a swap happened.
 */
const adoptDeviceSprite = (vm, deviceId) => {
    const librarySprite = librarySpriteFor(deviceId);
    if (!librarySprite) return Promise.resolve(false);
    const costumeIds = defaultCostumeIds();
    const pristine = vm.runtime.targets.find(target => isPristineDefault(target, costumeIds));
    if (!pristine) return Promise.resolve(false);

    const before = new Set(vm.runtime.targets.map(target => target.id));
    return vm.addSprite(JSON.stringify(librarySprite)).then(() => {
        const added = vm.runtime.targets.find(target => !target.isStage && !before.has(target.id));
        vm.deleteSprite(pristine.id);
        if (added && vm.editingTarget !== added) {
            vm.setEditingTarget(added.id);
        }
        return true;
    });
};

export {
    adoptDeviceSprite,
    isPristineDefault,
    librarySpriteFor,
    defaultCostumeIds,
    DEVICE_SPRITES
};
