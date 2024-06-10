class HpBarEndboss extends DrawableObject {
    x = 240;
    y = 450;
    width = 25;
    height = 250;
    HP_BAR_IMAGES_BOSS = [
        './img/hp_bar_endboss/hp_bar_100.png',
        './img/hp_bar_endboss/hp_bar_75.png',
        './img/hp_bar_endboss/hp_bar_50.png',
        './img/hp_bar_endboss/hp_bar_25.png',
        './img/hp_bar_endboss/hp_bar_0.png'
    ];
    hp_percentage = 100;

    /**
     * Constructs a new instance of the HpBarEndboss class.
     * Loads the HP bar images for the boss and sets the initial HP percentage to 100.
     *
     * @return {void}
     */
    constructor() {
        super();
        this.loadImages(this.HP_BAR_IMAGES_BOSS);
        this.setHpPercentage(100);
    }

    /**
     * Sets the percentage of HP for the Endboss.
     *
     * @param {number} hp_percentage - The percentage of HP to set.
     * @return {void} This function does not return anything.
     */
    setHpPercentage(hp_percentage) {
        this.hp_percentage = hp_percentage;
        let path = this.HP_BAR_IMAGES_BOSS[this.resolveImageIndex()];
        this.img = this.imageCache[path]
    }

    /**
     * Returns the index of the corresponding image in the HP bar images array based on the current HP percentage.
     *
     * @return {number} The index of the image in the HP bar images array.
     */
    resolveImageIndex() {
        if (this.hp_percentage >= 100) {
            return 0;
        } else if (this.hp_percentage >= 75) {
            return 1;
        } else if (this.hp_percentage >= 50) {
            return 2;
        } else if (this.hp_percentage >= 25) {
            return 3;
        } else {
            return 4;
        }
    }
}