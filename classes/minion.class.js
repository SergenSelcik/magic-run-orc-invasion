class Minion extends MoveableObject {
    y = 340;
    height = 140;
    width = 120;
    currentImage = 0;
    enemyMoveInterval;
    WALK_IMAGES = [
        './img/smallOrc/_PNG/2_ORK/ORK_02_WALK_000.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_WALK_001.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_WALK_002.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_WALK_003.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_WALK_004.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_WALK_005.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_WALK_006.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_WALK_007.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_WALK_008.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_WALK_009.png',
    ];
    DYING_IMAGES = [
        './img/smallOrc/_PNG/2_ORK/ORK_02_DIE_000.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_DIE_001.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_DIE_002.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_DIE_003.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_DIE_004.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_DIE_005.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_DIE_006.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_DIE_007.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_DIE_008.png',
        './img/smallOrc/_PNG/2_ORK/ORK_02_DIE_009.png',
    ];
    currentImage = 0;
    enemyMoveInterval;

    /**
     * Constructs a new instance of the Minion class.
     * Initializes the Minion object with the specified properties.
     *
     * @param {number} id - The ID of the minion.
     * @param {number} x - The x-coordinate of the minion.
     * @return {void} 
     */
    constructor(id, x) {
        super().loadImage('./img/smallOrc/_PNG/2_ORK/ORK_02_IDLE_000.png');
        this.loadImages(this.WALK_IMAGES);
        this.loadImages(this.DYING_IMAGES);
        this.x = x;
        this.speed = 1 + Math.random() * 1;
        this.id = id;
        this.animate();
    }

    /**
     * Animates the enemy by handling the enemy move interval and the enemy dying interval.
     *
     * @return {void} This function does not return anything.
     */
    animate() {
        this.handleEnemyMoveInterval();
        this.handleEnemyDyingInterval();
    }

    /**
     * Sets up an interval to continuously move the enemy to the left as long as it is not dead.
     *
     * @return {void} This function does not return anything.
     */
    handleEnemyMoveInterval() {
        this.enemyMoveInterval = setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 25);
    }

    /**
     * Sets up an interval to continuously check if the enemy is dead. If the enemy is dead, it plays the dying animation using the provided dying images. Otherwise, it plays the walk animation using the provided walk images.
     *
     * @return {void} This function does not return anything.
     */
    handleEnemyDyingInterval() {
        setInterval(() => {
            if (this.isDead()) {
                this.playDyingAnimation(this.DYING_IMAGES);
            } else {
                this.playWalkAnimation(this.WALK_IMAGES);
            }
        }, 1000 / 10);
    }
}