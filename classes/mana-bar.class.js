class ManaBar extends StatusBar {
    x = 22;
    y = 60;
    height = 195;
    width = 50;
    mana_percentage = 0;
    MANA_BAR_IMAGES = [
        './img/potion_bar/mana_bar_100.png',
        './img/potion_bar/mana_bar_75.png',
        './img/potion_bar/mana_bar_50.png',
        './img/potion_bar/mana_bar_25.png',
        './img/potion_bar/mana_bar_0.png'
    ];

    /**
     * Constructs a new instance of the class and initializes its properties.
     * Loads the MANA bar images and sets the initial MANA percentage to 0.
     *
     * @return {void}
     */
    constructor() {
        super();
        this.loadImages(this.MANA_BAR_IMAGES);
        this.setManaPercentage(0);
    }

    /**
     * Sets the mana percentage of the mana bar and updates the image accordingly.
     *
     * @param {number} mana_percentage - The new mana percentage to set.
     * @return {void} This function does not return anything.
     */
    setManaPercentage(mana_percentage) {
        this.mana_percentage = mana_percentage;
        let path = this.MANA_BAR_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path]
    }

    /**
     * Returns the index of the corresponding image in the MANA bar images array based on the current MANA percentage.
     *
     * @return {number} The index of the image in the MANA bar images array.
     */
    resolveImageIndex() {
        if (this.mana_percentage == 0) {
            return 4;
        } else if (this.mana_percentage == 25) {
            return 3;
        } else if (this.mana_percentage == 50) {
            return 2;
        } else if (this.mana_percentage == 75) {
            return 1;
        } else {
            return 0;
        }
    }
}