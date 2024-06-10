class Character extends MoveableObject {
    x = 0;
    y = 358;
    height = 75;
    width = 100;
    speed = 6;
    noAction;
    world;
    offset = {
        top: 0,
        bottom: -25,
        left: 0,
        right: 35
    };
    playSound = false;
    RUN_IMAGES = [
        './img/character/_PNG/Wizard/Elf_03__RUN_000.png',
        './img/character/_PNG/Wizard/Elf_03__RUN_001.png',
        './img/character/_PNG/Wizard/Elf_03__RUN_002.png',
        './img/character/_PNG/Wizard/Elf_03__RUN_003.png',
        './img/character/_PNG/Wizard/Elf_03__RUN_004.png',
        './img/character/_PNG/Wizard/Elf_03__RUN_005.png',
        './img/character/_PNG/Wizard/Elf_03__RUN_006.png',
        './img/character/_PNG/Wizard/Elf_03__RUN_007.png',
        './img/character/_PNG/Wizard/Elf_03__RUN_008.png',
        './img/character/_PNG/Wizard/Elf_03__RUN_009.png',
    ];
    IDLE_IMAGES = [
        './img/character/_PNG/Wizard/Elf_03__IDLE_000.png',
        './img/character/_PNG/Wizard/Elf_03__IDLE_001.png',
        './img/character/_PNG/Wizard/Elf_03__IDLE_002.png',
        './img/character/_PNG/Wizard/Elf_03__IDLE_003.png',
        './img/character/_PNG/Wizard/Elf_03__IDLE_004.png',
        './img/character/_PNG/Wizard/Elf_03__IDLE_005.png',
        './img/character/_PNG/Wizard/Elf_03__IDLE_006.png',
        './img/character/_PNG/Wizard/Elf_03__IDLE_007.png',
        './img/character/_PNG/Wizard/Elf_03__IDLE_008.png',
        './img/character/_PNG/Wizard/Elf_03__IDLE_009.png',
    ];
    JUMP_IMAGES = [
        './img/character/_PNG/Wizard/Elf_03__JUMP_000.png',
        './img/character/_PNG/Wizard/Elf_03__JUMP_001.png',
        './img/character/_PNG/Wizard/Elf_03__JUMP_002.png',
        './img/character/_PNG/Wizard/Elf_03__JUMP_003.png',
        './img/character/_PNG/Wizard/Elf_03__JUMP_004.png',
        './img/character/_PNG/Wizard/Elf_03__JUMP_005.png',
        './img/character/_PNG/Wizard/Elf_03__JUMP_006.png',
        './img/character/_PNG/Wizard/Elf_03__JUMP_007.png',
        './img/character/_PNG/Wizard/Elf_03__JUMP_008.png',
        './img/character/_PNG/Wizard/Elf_03__JUMP_009.png',
    ]
    DYING_IMAGES = [
        './img/character/_PNG/Wizard/Elf_03__DIE_008.png',
    ];
    HURT_IMAGES = [
        './img/character/_PNG/Wizard/Elf_03__HURT_000.png',
        './img/character/_PNG/Wizard/Elf_03__HURT_001.png',
        './img/character/_PNG/Wizard/Elf_03__HURT_002.png',
        './img/character/_PNG/Wizard/Elf_03__HURT_003.png',
        './img/character/_PNG/Wizard/Elf_03__HURT_004.png',
        './img/character/_PNG/Wizard/Elf_03__HURT_005.png',
        './img/character/_PNG/Wizard/Elf_03__HURT_006.png',
        './img/character/_PNG/Wizard/Elf_03__HURT_007.png',
        './img/character/_PNG/Wizard/Elf_03__HURT_008.png',
    ];

    /**
     * Constructs a new Character object and initializes its properties.
     * Loads the initial image for the character and loads the images for jumping, running, idling, dying, and hurting.
     * Applies gravity and starts animation.
     * Sets the noAction property to the current time.
     *
     * @return {void}
     */
    constructor() {
        super().loadImage('./img/character/_PNG/Wizard/Elf_03__IDLE_000.png');
        this.loadImages(this.JUMP_IMAGES);
        this.loadImages(this.RUN_IMAGES);
        this.loadImages(this.IDLE_IMAGES);
        this.loadImages(this.DYING_IMAGES);
        this.loadImages(this.HURT_IMAGES);
        this.applyGravity();
        this.animate();
        this.noAction = new Date().getTime();
    }

    /**
     * Animates the character by calling the characterMovement and characterMovementAnimation functions.
     *
     * @return {void} This function does not return a value.
     */
    animate() {
        this.characterMovement();
        this.characterMovementAnimation();
    }

    /**
     * Executes the character movement by calling the characterMoveRight, characterMoveLeft, and characterJump functions.
     *
     * @return {void} This function does not return a value.
     */
    characterMovement() {
        this.characterMoveRight();
        this.characterMoveLeft();
        this.characterJump();
    }

    /**
     * Executes the character's movement to the right at a specified interval.
     * The movement is triggered when the right arrow key is pressed and the character
     * is not at the end of the level. The character's position is updated by calling
     * the moveRight() method and the otherDirection flag is set to false.
     *
     * @return {void} This function does not return a value.
     */
    characterMoveRight() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }
        }, 1000 / 60);
    }

    /**
     * Executes the character's movement to the left at a specified interval.
     * The movement is triggered when the left arrow key is pressed and the character
     * is not at the start of the level. The character's position is updated by calling
     * the moveLeft() method and setting the otherDirection property to true.
     *
     * @return {void} This function does not return a value.
     */
    characterMoveLeft() {
        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > -100) {
                this.moveLeft()
                this.otherDirection = true;
            }
        }, 1000 / 60);
    }

    /**
     * Executes the character's jumping behavior at a specified interval.
     * The jump is triggered when the spacebar is pressed and the character is not on the ground.
     * The character's position is updated by calling the jump() method.
     * The camera's position is also updated to keep the character centered on the screen.
     *
     * @return {void} This function does not return a value.
     */
    characterJump() {
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump()
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Executes the character's movement animation. 
     * This function runs a setInterval that checks the time since the last action, 
     * and if the character has been inactive for more than 500 milliseconds, 
     * and no movement keys are being pressed, and the character is not dead, 
     * it triggers the character's idle animation and jump animation. 
     * Otherwise, it calls the handleDifferentCharacterTriggers function.
     *
     * @return {void} This function does not return a value.
     */
    characterMovementAnimation() {
        let dyingCharacterInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const timeSinceLastAction = (currentTime - this.noAction);
            if (timeSinceLastAction > 500 && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.isDead()) {
                this.triggerCharacterIdle();
            }
            this.triggerCharacterJumpWhenStandingStill();
            this.handleDifferentCharacterTriggers(dyingCharacterInterval);

        }, 1000 / 30);
    }

    /**
     * Handles different character triggers based on the current state of the character.
     *
     * @param {number} dyingCharacterInterval - The interval for the character's dying animation.
     * @return {void} This function does not return a value.
     */
    handleDifferentCharacterTriggers(dyingCharacterInterval) {
        if (this.isDead()) {
            this.triggerCharacterDying(dyingCharacterInterval);
        } else if (this.isHurt()) {
            this.triggerCharacterHurt();
        } else if (this.isAboveGround()) {
            this.triggerCharacterJump();
        } else {
            if (this.world.keyboard.SPACE && !this.isDead()) {
                this.jump();
            } else if (!this.isDead()) {
                this.triggerCharacterRunningState();
            }
        }
    }

    /**
     * Triggers the character's idle animation and pauses the running sound.
     *
     * @return {void} This function does not return a value.
     */
    triggerCharacterIdle() {
        this.playIdleAnimation(this.IDLE_IMAGES);
        running_sound.pause();
    }

    /**
     * Triggers the character's jump animation when the character is standing still and above the ground.
     *
     * @return {void} This function does not return a value.
     */
    triggerCharacterJumpWhenStandingStill() {
        if (this.isAboveGround()) {
            this.playJumpAnimation(this.JUMP_IMAGES);
        }
    }

    /**
     * Triggers the character's dying animation, pauses the running sound, 
     * sets a timeout to clear the dying character interval, and calls the playerDeath function.
     *
     * @return {void} This function does not return a value.
     */
    triggerCharacterDying() {
        this.playDyingAnimation(this.DYING_IMAGES);
        running_sound.pause();
        setTimeout(() => {
            clearInterval(dyingCharacterInterval);
        }, 25);
        playerDeath();
    }

    /**
     * Triggers the character's hurt animation and plays the hurt sound if sound is not muted.
     *
     * @return {void} This function does not return a value.
     */
    triggerCharacterHurt() {
        this.playHurtAnimation(this.HURT_IMAGES);
        if (!soundmuted) {
            hurt_sound.play();
        }
    }

    /**
     * Triggers the character's jump animation when the character is standing still and above the ground.
     *
     * @return {void} This function does not return a value.
     */
    triggerCharacterJump() {
        this.playJumpAnimation(this.JUMP_IMAGES);
        if (this.playSound) {
            running_sound.pause();
        }
    }

    /**
     * Triggers the character's running state animation and plays the running sound if sound is not muted.
     *
     * @return {void} This function does not return a value.
     */
    triggerCharacterRunningState() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playRunAnimation(this.RUN_IMAGES);
            if (!soundmuted) {
                running_sound.play().then(() => { this.playSound = true; });
            }
        }
    }
}