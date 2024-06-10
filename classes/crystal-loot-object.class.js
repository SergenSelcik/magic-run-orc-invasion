class Crystal extends CollectableObject {
    height = 35;
    width = 45;

    /**
     * Constructs a new Crystal instance.
     *
     * @param {number} x - The x-coordinate of the crystal.
     * @param {number} y - The y-coordinate of the crystal.
     */
    constructor(x, y) {
        super().loadImage('./img/crystal/crystal.png');
        this.x = x;
        this.y = y;
    }
}