class FireableObject extends MoveableObject {
    y = 330;
    height = 150;
    width = 150;
    otherDirection = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 80,
    };
    THUNDERBALL_IMAGES = [
        './img/attack/frostfury/attack_1.png',
        './img/attack/frostfury/attack_1.png',
        './img/attack/frostfury/attack_2.png',
        './img/attack/frostfury/attack_2.png',
        './img/attack/frostfury/attack_3.png',
        './img/attack/frostfury/attack_3.png',
        './img/attack/frostfury/attack_4.png',
        './img/attack/frostfury/attack_4.png',
        './img/attack/frostfury/attack_5.png',
        './img/attack/frostfury/attack_5.png',
        './img/attack/frostfury/attack_5.png',
        './img/attack/frostfury/attack_5.png',
        './img/attack/frostfury/attack_5.png',
        './img/attack/frostfury/attack_6.png',
        './img/attack/frostfury/attack_6.png',
        './img/attack/frostfury/attack_7.png',
        './img/attack/frostfury/attack_7.png',
        './img/attack/frostfury/attack_8.png',
        './img/attack/frostfury/attack_8.png',
        './img/attack/frostfury/attack_9.png',
        './img/attack/frostfury/attack_9.png',
        './img/attack/frostfury/attack_10.png',
        './img/attack/frostfury/attack_10.png',
    ];

    /**
     * Constructs a new instance of the class.
     *
     * @param {number} x - The x-coordinate of the object.
     * @return {void} This function does not return a value.
     */
    constructor(x) {
        super().loadImage('./img/attack/frostfury/attack_1.png');
        this.loadImages(this.THUNDERBALL_IMAGES);
        this.x = x;
        this.animate();
    }

    /**
     * Fires the object in the specified direction. If the initial direction is not defined, it sets it to the opposite of the character's direction and updates the character position accordingly. Then, it handles the fire attack position.
     *
     * @return {void} This function does not return a value.
     */
    fire() {
        if (this.initialDirection === undefined) {
            this.initialDirection = world.character.otherDirection;
            this.handleCharacterPosition();
        }
        this.handleFireAttackPosition()
    }

    /**
     * Updates the position of the character based on the initial direction.
     *
     * @return {void} This function does not return a value.
     */
    handleCharacterPosition() {
        if (this.initialDirection) {
            this.x = world.character.x - 70;
        } else {
            this.x = world.character.x - 10;
        }
    }

    /**
     * Updates the position of the fireable object based on its initial direction.
     *
     * @return {void} This function does not return a value.
     */
    handleFireAttackPosition() {
        if (this.initialDirection) {
            this.x -= 7.5;
        } else {
            this.x += 7.5;
        }
    }

    /**
     * Animates the object by continuously checking if it can fire and playing an attack animation if not.
     *
     * @return {void} This function does not return a value.
     */
    animate() {
        setInterval(() => {
            if (!this.fire()) {
                this.playAttackAnimation(this.THUNDERBALL_IMAGES);
            }
        }, 1000 / 90);
    }
}