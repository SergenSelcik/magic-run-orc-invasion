class HpBar extends StatusBar {
    x = 15;
    y = 15;
    height = 200;
    width = 37;
    hp_percentage = 100;
    HP_BAR_IMAGES = [
        './img/hp_bar/hp_bar_100.png',
        './img/hp_bar/hp_bar_75.png',
        './img/hp_bar/hp_bar_50.png',
        './img/hp_bar/hp_bar_25.png',
        './img/hp_bar/hp_bar_0.png',
    ];

    /**
     * Constructs a new instance of the class and initializes its properties.
     * Loads the HP bar images and sets the initial HP percentage to 100.
     *
     * @return {void}
     */
    constructor() {
        super();
        this.loadImages(this.HP_BAR_IMAGES);
        this.setHpPercentage(100);
    }

    /**
     * Sets the percentage of HP for the HP bar.
     *
     * @param {number} hp_percentage - The percentage of HP to set.
     * @return {void} This function does not return anything.
     */
    setHpPercentage(hp_percentage) {
        this.hp_percentage = hp_percentage;
        let path = this.HP_BAR_IMAGES[this.resolveImageIndex()];
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
        } else if (this.hp_percentage >= 1) {
            return 3;
        } else {
            return 4;
        }
    }
}         