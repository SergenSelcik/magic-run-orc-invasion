class Level {
    enemies;
    loot;
    clouds;
    manaPotion;
    backgroundObjects;
    level_end_x = 720 * 17;

    /**
     * Constructs a new Level object with the given enemies, clouds, background objects, loot, and mana potion.
     *
     * @param {Array} enemies - An array of enemy objects.
     * @param {Array} clouds - An array of cloud objects.
     * @param {Array} backgroundObjects - An array of background object objects.
     * @param {Array} loot - An array of loot objects.
     * @param {Object} manaPotion - A mana potion object.
     */
    constructor(enemies, clouds, backgroundObjects, loot, manaPotion) {
        this.enemies = enemies;
        this.loot = loot;
        this.clouds = clouds;
        this.manaPotion = manaPotion;
        this.backgroundObjects = backgroundObjects;
    }
}