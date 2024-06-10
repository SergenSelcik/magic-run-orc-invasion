class MoveableObject extends DrawableObject {
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    offsetY = 0;
    hp = 100;
    mana = 0;
    lastHit = 0;
    isKilled = false;
    offset = {
        top: 0,
        bottom: 20,
        left: 0,
        right: -20
    };

    /**
     * Applies gravity to the object by continuously updating its vertical position.
     * If the object is above the ground or has a positive vertical speed, it is moved upwards
     * based on its current speed and acceleration. The speed is then decreased by the
     * acceleration value. The default landing position is also ensured.
     *
     * @return {void} This function does not return a value.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            this.securingTheDefaultLandingPosition();
        }, 1000 / 30)
    }

    /**
     * Ensures that the object's vertical position does not exceed the default landing position.
     * If the object's vertical position is greater than 358, it is set to 358.
     *
     * @return {void} This function does not return a value.
     */
    securingTheDefaultLandingPosition() {
        if (this.y > 358) {
            this.y = 358;
        }
    }

    /**
     * Checks if this object is colliding with another object.
     *
     * @param {Object} obj - The object to check collision with.
     * @return {boolean} Returns true if the objects are colliding, false otherwise.
     */
    isColliding(obj) {
        return (this.x + this.width - this.offset.right) > (obj.x + obj.offset.left) &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }

    /**
     * Decreases the health points (hp) of the object by 8 and updates the last hit time.
     *
     * This function subtracts 8 from the current health points (hp) of the object. If the resulting
     * health points are less than 0, the health points are set to 0. Otherwise, the last hit time
     * is updated to the current time.
     *
     * @return {void} This function does not return a value.
     */
    hpLoss() {
        this.hp -= 8;
        if (this.hp < 0) {
            this.hp = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Decreases the health points (hp) of the object by 100 and updates the last hit time.
     *
     * This function subtracts 100 from the current health points (hp) of the object. If the resulting
     * health points are less than 0, the health points are set to 0. Otherwise, the last hit time
     * is updated to the current time.
     *
     * @return {void} This function does not return a value.
     */
    instantKill() {
        this.hp -= 100;
        if (this.hp < 0) {
            this.hp = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Decreases the health points (hp) of the boss by 25 and updates the last hit time.
     *
     * This function subtracts 25 from the current health points (hp) of the boss. If the resulting
     * health points are less than 0, the health points are set to 0. Otherwise, the last hit time
     * is updated to the current time.
     *
     * @return {void} This function does not return a value.
     */
    hpLossBoss() {
        this.hp -= 25;
        if (this.hp < 0) {
            this.hp = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is hurt by comparing the current time with the last hit time.
     *
     * @return {boolean} Returns true if the object is hurt, false otherwise.
     */
    isHurt() {
        let now = new Date().getTime() - this.lastHit;
        now = now / 1000;
        return now < 1;
    }

    /**
     * Checks if the object is dead by comparing its health points to zero.
     *
     * @return {boolean} Returns true if the object's health points are equal to zero, false otherwise.
     */
    isDead() {
        return this.hp == 0;
    }

    /**
     * Moves the object to the right if it is not dead.
     *
     * @return {void} This function does not return a value.
     */
    jump() {
        if (!this.isDead()) {
            this.doubleJump()
            if (!soundmuted) {
                jump_sound.play();
            }
            this.landingSoundTiming();
        }
    }

    /**
     * Sets the vertical speed of the object to 33, enabling a double jump.
     *
     * @return {void} This function does not return a value.
     */
    doubleJump() {
        this.speedY = 33;
    }

    /**
     * Checks if the object is moving down.
     *
     * @return {boolean} Returns true if the object is moving down, false otherwise.
     */
    moveDown() {
        return this.speedY < 0;
    }

    /**
     * Plays the landing sound after a delay of 600 milliseconds.
     *
     * @return {void} This function does not return a value.
     */
    landingSoundTiming() {
        setTimeout(() => {
            if (!soundmuted) {
                landing_sound.play();
            }
        }, 600);
    }

    /**
     * Checks if the object is above the ground.
     *
     * @return {boolean} Returns true if the object's y-coordinate is less than 358, indicating that it is above the ground.
     */
    isAboveGround() {
        return this.y < 358;
    }

    /**
     * Removes the attack image from the canvas by deleting it from the image cache.
     *
     * @return {void} This function does not return a value.
     */
    removeAttackFromCanvas() {
        delete this.imageCache[this.img.src];
    }

    /**
     * Moves the object to the right if it is not dead.
     *
     * @return {void} This function does not return a value.
     */
    moveRight() {
        if (!this.isDead()) {
            this.x += this.speed;
        }
    }

    /**
     * Moves the object to the left if it is not dead.
     *
     * @return {void} This function does not return a value.
     */
    moveLeft() {
        if (!this.isDead()) {
            this.x -= this.speed;
        }
    }

    /**
     * Plays a run animation using the provided images.
     *
     * @param {Array<string>} images - An array of image paths.
     * @return {void} This function does not return anything.
     */
    playRunAnimation(images) {
        let i = this.currentImage % this.RUN_IMAGES.length;
        let path = images[i];
        this.img = this.imageCache[path]
        this.currentImage++;
    }

    /**
     * Plays an attack animation using the provided images.
     *
     * @param {Array<string>} images - An array of image paths.
     * @return {void} This function does not return anything.
     */
    playAttackAnimation(images) {
        let i = this.currentImage % this.THUNDERBALL_IMAGES.length;
        let path = images[i];
        this.img = this.imageCache[path]
        this.currentImage++;
    }

    /**
     * Plays the dying animation using the provided images.
     *
     * @param {Array<string>} images - An array of image paths.
     * @return {void} This function does not return anything.
     */
    playDyingAnimation(images) {
        let i = this.currentImage % this.DYING_IMAGES.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays the hurt animation using the provided images.
     *
     * @param {Array<string>} images - An array of image paths.
     * @return {void} This function does not return anything.
     */
    playHurtAnimation(images) {
        let i = this.currentImage % this.HURT_IMAGES.length;
        let path = images[i];
        this.img = this.imageCache[path]
        this.currentImage++;
    }

    /**
     * Plays a walk animation using the provided images.
     *
     * @param {Array<string>} images - An array of image paths.
     * @return {void} This function does not return anything.
     */
    playWalkAnimation(images) {
        let i = this.currentImage % this.WALK_IMAGES.length;
        let path = images[i];
        this.img = this.imageCache[path]
        this.currentImage++;
    }

    /**
     * Plays an idle animation using the provided images.
     *
     * @param {Array<string>} images - An array of image paths.
     * @return {void} This function does not return anything.
     */
    playIdleAnimation(images) {
        let i = this.currentImage % this.IDLE_IMAGES.length;
        let path = images[i];
        this.img = this.imageCache[path]
        this.currentImage++;
    }

    /**
     * Plays a jump animation using the provided images.
     *
     * @param {Array<string>} images - An array of image paths.
     * @return {void} This function does not return anything.
     */
    playJumpAnimation(images) {
        let i = this.currentImage % this.JUMP_IMAGES.length;
        let path = images[i];
        this.img = this.imageCache[path]
        this.currentImage++;
    }

    /**
     * Plays the boss hurt sound if the sound is not already playing and the last played sound index is less than 4.
     *
     * @return {void} This function does not return a value.
     */
    playBossHurtSound() {
        if (!this.soundIsPlaying && this.lastPlayedSoundIndex < 4) {
            this.playBossSoundFromArray(this.HURT_SOUND[this.lastPlayedSoundIndex % this.HURT_SOUND.length]);
            this.soundIsPlaying = true;
            this.lastPlayedSoundIndex++;
        }
    }

    /**
     * Plays a boss sound from an array of sound sources.
     *
     * @param {string} soundSrc - The source of the sound to be played.
     * @return {void} This function does not return a value.
     */
    playBossSoundFromArray(soundSrc) {
        let sound = new Audio(soundSrc);
        if (!soundmuted) {
            sound.play();
        }
        sound.addEventListener('ended', () => {
            this.soundIsPlaying = false;
        });
    }
}