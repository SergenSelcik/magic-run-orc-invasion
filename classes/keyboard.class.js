class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    F = false;

    /**
     * Constructs a new instance of the class and initializes its properties.
     * Binds key press events and touch press events on DOM ready.
     *
     * @return {void} 
     */
    constructor() {
        this.bindKeyPressEvents();
        this.bindTouchPressEventsOnDOMReady();
    }

    /**
     * Binds touch press events on DOM ready.
     *
     * This function checks if the DOM is ready by checking the `document.readyState` property.
     * If the DOM is already ready, it calls the `bindTouchPressEvents` method.
     * Otherwise, it adds an event listener for the `DOMContentLoaded` event, which will call the `bindTouchPressEvents` method when the DOM is ready.
     *
     * @return {void} This function does not return a value.
     */
    bindTouchPressEventsOnDOMReady() {
        if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
            this.bindTouchPressEvents();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindTouchPressEvents();
            });
        }
    }

    /**
     * Binds key press events to the window.
     *
     * This function adds event listeners for the 'keydown' and 'keyup' events on the window object.
     * When a key is pressed down, the 'keydown' event is triggered and the 'handleKeyPress' method is called with the key code and 'true' as arguments.
     * When a key is released, the 'keyup' event is triggered and the 'handleKeyPress' method is called with the key code and 'false' as arguments.
     *
     * @return {void} This function does not return a value.
     */
    bindKeyPressEvents() {
        window.addEventListener('keydown', (e) => {
            this.handleKeyPress(e.keyCode, true);
        });

        window.addEventListener('keyup', (e) => {
            this.handleKeyPress(e.keyCode, false);
        });
    }

    /**
     * Binds touch press events to the corresponding buttons.
     *
     * This function binds touch press events to the buttons with the IDs 'btnLeft', 'btnRight', 'btnJump', and 'btnAttack'.
     * When a button is pressed, the corresponding property in the Keyboard class is set to true, and when it is released, the property is set to false.
     *
     * @return {void} This function does not return a value.
     */
    bindTouchPressEvents() {
        this.addTouchEvent('btnLeft', 'LEFT');
        this.addTouchEvent('btnRight', 'RIGHT');
        this.addTouchEvent('btnJump', 'SPACE');
        this.addTouchEvent('btnAttack', 'F');
    }

    /**
     * Adds touch event listeners to a button element and updates the corresponding property in the Keyboard class.
     *
     * @param {string} buttonId - The ID of the button element.
     * @param {string} action - The property in the Keyboard class to update when the button is pressed or released.
     */
    addTouchEvent(buttonId, action) {
        const button = document.getElementById(buttonId);

        if (button) {
            button.addEventListener('touchstart', () => {
                this[action] = true;
            }, { passive: true });

            button.addEventListener('touchend', () => {
                this[action] = false;
            }, { passive: true });
        }
    }

    /**
     * Handles the key press event and updates the corresponding property in the Keyboard class.
     *
     * @param {number} keyCode - The key code of the pressed key.
     * @param {boolean} isPressed - Indicates whether the key is pressed or released.
     */
    handleKeyPress(keyCode, isPressed) {
        switch (keyCode) {
            case 37:
                this.LEFT = isPressed;
                break;
            case 39:
                this.RIGHT = isPressed;
                break;
            case 32:
                this.SPACE = isPressed;
                break;
            case 70:
                this.F = isPressed;
                break;
        }
    }
}