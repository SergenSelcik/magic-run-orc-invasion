class Cloud extends MoveableObject {
    height = 720;
    width = 630;
    speed = 1;

    /**
     * Constructs a new Cloud instance.
     *
     * @param {number} x - The x-coordinate of the cloud.
     * @param {number} y - The y-coordinate of the cloud.
     */
    constructor(x, y) {
        super().loadImage('./img/background/PNG/Mountains/Bright/clouds.png');
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Animates the Cloud object by continuously calling the moveLeft method
     * at a set interval of 50 milliseconds.
     *
     * @return {void} This function does not return a value.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 50);
    }
}

