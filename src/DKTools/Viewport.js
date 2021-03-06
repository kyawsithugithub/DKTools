//===========================================================================
// DKTools.Viewport
//===========================================================================

/**
 * Viewport class
 *
 * @class DKTools.Viewport
 * @extends DKTools.Sprite
 *
 * @override
 *
 * @memberof DKTools
 *
 * @see DKTools.Viewport.prototype.initialize
 */
DKTools.Viewport = class extends DKTools.Sprite {

    // C methods

    /**
     * Returns true if the viewport can clone the fixed bitmap
     *
     * @override
     * @returns {Boolean} Viewport can clone the fixed bitmap
     */
    canCloneFixedBitmap() {
        return false;
    }

    /**
     * Creates all objects
     *
     * @override
     *
     * @see DKTools.Sprite.prototype.createAll
     * @see DKTools.Viewport.prototype.createMask
     */
    createAll() {
        DKTools.Sprite.prototype.createAll.call(this);
        this.createMask();
    }

    /**
     * Creates a mask
     *
     * @version 2.0.0
     * @override
     *
     * @see DKTools.Sprite.prototype.createMask
     */
    createMask() {
        DKTools.Sprite.prototype.createMask.call(this, this._maskShape);
    }

    // S methods

    /**
     * Changes all parameters
     * Returns the number of changed parameters
     *
     * @override
     *
     * @param {Object} [object={}] - Parameters
     * @param {Boolean} [blockStart=false] - Blocking the call of the "start" function
     * @param {Boolean} [activate=false] - Activates the object
     *
     * @param {String} [object.maskShape] - Shape of the mask
     *
     * @see DKTools.Sprite.prototype.setAll
     * @see DKTools.Viewport.prototype.setMaskShape
     * @see DKTools.Viewport.prototype.start
     * @see DKTools.Viewport.prototype.activate
     *
     * @returns {Number} Number of changed parameters
     */
    setAll(object = {}, blockStart = false, activate = false) {
        object = object || {};

        const block = true;
        let changed = DKTools.Sprite.prototype.setAll.call(this, object, block);

        if (this.setMaskShape(object.maskShape, block)) {
            changed++;
        }

        if (changed > 0) {
            if (!blockStart) {
                this.start();
            }

            if (activate) {
                this.activate();
            }
        }

        return changed;
    }

    /**
     * Changes the shape of the mask
     * Returns true if the change occurred
     *
     * @param {String} [shape] - Shape of the mask
     * @param {Boolean} [blockStart=false] - Blocking the call of the "start" function
     *
     * @returns {Boolean} Change occurred
     */
    setMaskShape(shape, blockStart = false) {
        if (this._maskShape === shape) {
            return false;
        }

        const lastShape = this._maskShape;

        this.setupShape(shape);

        if (this._maskShape === lastShape) {
            return false;
        }

        if (!blockStart) {
            this.start();
        }

        return true;
    }

    /**
     * Sets all parameters
     *
     * @override
     *
     * @param {Object} [object={}] - Parameters
     *
     * @param {String} [object.maskShape] - Shape of the mask
     *
     * @see DKTools.Sprite.prototype.setupAll
     * @see DKTools.Viewport.prototype.setupMaskShape
     */
    setupAll(object = {}) {
        object = object || {};

        DKTools.Sprite.prototype.setupAll.call(this, object);

        this.setupMaskShape(object.maskShape);
    }

    /**
     * Sets the shape of the mask
     *
     * @param {String} [shape] - Shape of the mask
     *
     * @see DKTools.Viewport.prototype.standardMaskShape
     */
    setupMaskShape(shape) {
        /**
         * @private
         * @readonly
         * @type {String}
         */
        this._maskShape = shape || this.standardMaskShape();
    }

    /**
     * Returns the standard mask shape
     *
     * @returns {String} Standard mask shape
     */
    standardMaskShape() {
        return 'rect';
    }

};

// properties

Object.defineProperties(DKTools.Viewport.prototype, {

    /**
     * Shape of the mask
     *
     * @readonly
     * @type {PIXI.Graphics}
     * @memberof DKTools.Viewport.prototype
     */
    maskShape: {
        get: function() {
            return this._maskShape;
        },
        configurable: true
    }

});




