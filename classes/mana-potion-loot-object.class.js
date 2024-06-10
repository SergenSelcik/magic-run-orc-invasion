class ManaPotion extends CollectableObject {
    height = 35;
    width = 45;

    /**
     * Constructs a new instance of the class with the specified coordinates.
     *
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     */
    constructor(x, y) {
        super().loadImage('./img/mana_potion/mana_potion.png');
        this.x = x;
        this.y = y;
    }
}