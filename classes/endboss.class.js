class Endboss extends MoveableObject {
    y = 260
    height = 300
    width = 200
    hadFirstContact = false;
    offset = {
        top: 0,
        bottom: 100,
        left: 50,
        right: 0,
    };
    bossRoarSoundPlayed = false;
    IDLE_IMAGES = [
        './img/bigOrc/PNG/Animation/BigOrc/Idle_000.png',
        './img/bigOrc/PNG/Animation/BigOrc/Idle_001.png',
        './img/bigOrc/PNG/Animation/BigOrc/Idle_002.png',
        './img/bigOrc/PNG/Animation/BigOrc/Idle_003.png',
        './img/bigOrc/PNG/Animation/BigOrc/Idle_004.png',
        './img/bigOrc/PNG/Animation/BigOrc/Idle_005.png',
        './img/bigOrc/PNG/Animation/BigOrc/Idle_006.png',
        './img/bigOrc/PNG/Animation/BigOrc/Idle_007.png',
        './img/bigOrc/PNG/Animation/BigOrc/Idle_008.png',
        './img/bigOrc/PNG/Animation/BigOrc/Idle_009.png',
    ];
    DYING_IMAGES = [
        './img/bigOrc/PNG/Animation/BigOrc/Dead_000.png',
        './img/bigOrc/PNG/Animation/BigOrc/Dead_001.png',
        './img/bigOrc/PNG/Animation/BigOrc/Dead_002.png',
        './img/bigOrc/PNG/Animation/BigOrc/Dead_003.png',
        './img/bigOrc/PNG/Animation/BigOrc/Dead_004.png',
        './img/bigOrc/PNG/Animation/BigOrc/Dead_005.png',
        './img/bigOrc/PNG/Animation/BigOrc/Dead_006.png',
        './img/bigOrc/PNG/Animation/BigOrc/Dead_007.png',
        './img/bigOrc/PNG/Animation/BigOrc/Dead_008.png',
        './img/bigOrc/PNG/Animation/BigOrc/Dead_009.png',
    ];
    HURT_IMAGES = [
        './img/bigOrc/PNG/Animation/BigOrc/Hurt_000.png',
        './img/bigOrc/PNG/Animation/BigOrc/Hurt_001.png',
        './img/bigOrc/PNG/Animation/BigOrc/Hurt_002.png',
        './img/bigOrc/PNG/Animation/BigOrc/Hurt_003.png',
        './img/bigOrc/PNG/Animation/BigOrc/Hurt_004.png',
        './img/bigOrc/PNG/Animation/BigOrc/Hurt_005.png',
        './img/bigOrc/PNG/Animation/BigOrc/Hurt_006.png',
        './img/bigOrc/PNG/Animation/BigOrc/Hurt_007.png',
        './img/bigOrc/PNG/Animation/BigOrc/Hurt_008.png',
        './img/bigOrc/PNG/Animation/BigOrc/Hurt_009.png',
    ];
    WALK_IMAGES = [
        './img/bigOrc/PNG/Animation/BigOrc/Walk_000.png',
        './img/bigOrc/PNG/Animation/BigOrc/Walk_001.png',
        './img/bigOrc/PNG/Animation/BigOrc/Walk_002.png',
        './img/bigOrc/PNG/Animation/BigOrc/Walk_003.png',
        './img/bigOrc/PNG/Animation/BigOrc/Walk_004.png',
        './img/bigOrc/PNG/Animation/BigOrc/Walk_005.png',
        './img/bigOrc/PNG/Animation/BigOrc/Walk_006.png',
        './img/bigOrc/PNG/Animation/BigOrc/Walk_007.png',
        './img/bigOrc/PNG/Animation/BigOrc/Walk_008.png',
        './img/bigOrc/PNG/Animation/BigOrc/Walk_009.png',
    ];
    HURT_SOUND = [
        './audio/hurt_sound_1.mp3',
        './audio/hurt_sound_2.mp3',
        './audio/hurt_sound_3.mp3',
        './audio/dying_sound.mp3'
    ];

    /**
     * Constructs a new instance of the Endboss class.
     * Initializes the Endboss object with the specified properties.
     *
     * @return {void} 
     */
    constructor() {
        super().loadImage('./img/bigOrc/PNG/Animation/BigOrc/Idle_000.png');
        this.loadImages(this.IDLE_IMAGES);
        this.loadImages(this.DYING_IMAGES);
        this.loadImages(this.HURT_IMAGES);
        this.loadImages(this.WALK_IMAGES);
        this.x = 11700;
        this.speed = 0;
        this.lastPlayedSoundIndex = 0;
        this.animate();
        this.soundIsPlaying = false;
    }

    /**
     * Animates the end boss by playing the dying animation, playing the boss hurt sound if sound is not muted,
     * and stopping the dying animation after a certain interval.
     *
     * @return {void} This function does not return a value.
     */
    animate() {
        let dyingEndbossInterval = setInterval(() => {
            if (this.isDead()) {
                this.playDyingAnimation(this.DYING_IMAGES);
                if (!soundmuted) {
                    this.playBossHurtSound();
                }
                this.stopDyingAnimation(dyingEndbossInterval);
            }
        }, 1000 / 10);
    }

    /**
     * Stops the dying animation by clearing the specified interval after a delay of 600 milliseconds.
     *
     * @param {number} interval - The interval to be cleared.
     * @return {void} This function does not return a value.
     */
    stopDyingAnimation(interval) {
        setTimeout(() => {
            clearInterval(interval);
        }, 600);
    }

    /**
     * Moves the boss to the left.
     *
     * @param {Object} boss - The boss object.
     * @return {void} This function does not return a value.
     */
    bossMovesLeft(boss) {
        boss.otherDirection = false;
        boss.moveLeft();
        boss.speed = 14;
    }

    /**
     * Moves the boss to the right by setting the 'otherDirection' property to true,
     * calling the 'moveRight' method, and updating the 'speed' property to 14.
     *
     * @param {Object} boss - The boss object.
     * @return {void} This function does not return a value.
     */
    bossMovesRight(boss) {
        boss.otherDirection = true;
        boss.moveRight();
        boss.speed = 14;
    }

    /**
     * Handles the death of the boss by checking if it is dead and calling the playerWin function if it is.
     *
     * @param {Object} boss - The boss object.
     * @return {void} This function does not return a value.
     */
    handleBossDeath(boss) {
        if (boss.isDead()) {
            playerWin();
        }
    }

    /**
     * Plays the boss music if sound is not muted.
     *
     * @return {void} This function does not return a value.
     */
    playBossMusic() {
        if (!soundmuted) {
            boss_music.play();
        }
    }

    /**
     * Sets the speed of the boss to 0, effectively stopping it from moving, when it is standing next to the character.
     *
     * @param {Object} boss - The boss object.
     * @return {void} This function does not return a value.
     */
    bossIsStandingNextToCharacter(boss) {
        boss.speed = 0;
    }

    /**
     * Handles the animation and sound for when the boss is hurt.
     *
     * @param {Object} boss - The boss object.
     * @return {void} This function does not return a value.
     */
    handleBossHurtAnimation(boss) {
        boss.speed = 0;
        boss.playHurtAnimation(boss.HURT_IMAGES);
        boss.playBossHurtSound();
    }

    /**
     * Handles the boss walk animation when it has had first contact with the player.
     *
     * @param {Object} boss - The boss object.
     * @return {void} This function does not return a value.
     */
    handleBossWalkAnimationWhenHadFirstContact(boss) {
        boss.playWalkAnimation(boss.WALK_IMAGES);
        boss.hadFirstContact = true;
    }

    /**
     * Handles the boss idle animation by checking if the boss has not had first contact and is not dead.
     * If the conditions are met, the boss plays the idle animation using the IDLE_IMAGES array.
     *
     * @param {Object} boss - The boss object.
     * @return {void} This function does not return a value.
     */
    handleBossIdleAnimation(boss) {
        if (!boss.hadFirstContact && !boss.isDead()) {
            boss.playIdleAnimation(boss.IDLE_IMAGES);
        }
    }

    /**
     * Plays the boss roar sound for the first time if it has not been played yet.
     *
     * @return {void} This function does not return a value.
     */
    playingBossRoarSoundForOnce() {
        if (!this.bossRoarSoundPlayed) {
            this.playBossRoarSound();
            this.bossRoarSoundPlayed = true;
        }
    }

    /**
     * Plays the boss roar sound if the sound is not muted.
     *
     * @return {void} This function does not return a value.
     */
    playBossRoarSound() {
        if (!soundmuted) {
            boss_roar.play();
        }
    }

    /**
     * Reduces the music volume if the player is near the boss.
     *
     * @return {void} This function does not return anything.
     */
    reduceMusicVolumeIfNearBoss() {
        if (world.character.x > 10800) {
            this.reduceIngameMusicVolume();
        }
    }

    /**
     * Reduces the volume of the ingame music gradually until it reaches 0.
     *
     * @return {void} This function does not return anything.
     */
    reduceIngameMusicVolume() {
        let currentVolume = ingame_music.volume;
        if (currentVolume > 0.01) {
            ingame_music.volume -= 0.01;
            setTimeout(() => {
                this.reduceIngameMusicVolume();
            }, 50);
        } else {
            ingame_music.volume = 0;
            ingame_music.pause();
        }
    }

    /**
     * Stops the ingame music transition by clearing the interval.
     *
     * @return {void} This function does not return anything.
     */
    stopIngameMusicTransition() {
        clearInterval(this.ingameMusicTransitionInterval);
    }
}