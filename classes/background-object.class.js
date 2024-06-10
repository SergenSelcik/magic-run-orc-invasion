class BackgroundObject extends MoveableObject {
    width = 480;
    height = 720;

    /**
     * Constructs a new BackgroundObject instance.
     *
     * @param {string} imagePath - The path to the image file.
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}