class LootBar extends StatusBar {
    loot_amount = 0;
    x = 320;
    y = 13;
    width = 45;
    height = 110;
    LOOTBAR_IMAGES = [
        './img/crystal_bar/crystal_bar_0.png',
        './img/crystal_bar/crystal_bar_1.png',
        './img/crystal_bar/crystal_bar_2.png',
        './img/crystal_bar/crystal_bar_3.png',
        './img/crystal_bar/crystal_bar_4.png',
        './img/crystal_bar/crystal_bar_5.png',
        './img/crystal_bar/crystal_bar_6.png',
        './img/crystal_bar/crystal_bar_7.png',
        './img/crystal_bar/crystal_bar_8.png',
        './img/crystal_bar/crystal_bar_9.png',
        './img/crystal_bar/crystal_bar_10.png',
        './img/crystal_bar/crystal_bar_11.png',
        './img/crystal_bar/crystal_bar_12.png',
        './img/crystal_bar/crystal_bar_13.png',
        './img/crystal_bar/crystal_bar_14.png',
        './img/crystal_bar/crystal_bar_15.png',
        './img/crystal_bar/crystal_bar_16.png',
        './img/crystal_bar/crystal_bar_17.png',
        './img/crystal_bar/crystal_bar_18.png',
        './img/crystal_bar/crystal_bar_19.png',
        './img/crystal_bar/crystal_bar_20.png',
        './img/crystal_bar/crystal_bar_21.png',
        './img/crystal_bar/crystal_bar_22.png',
        './img/crystal_bar/crystal_bar_23.png',
        './img/crystal_bar/crystal_bar_24.png',
        './img/crystal_bar/crystal_bar_25.png',
        './img/crystal_bar/crystal_bar_26.png',
        './img/crystal_bar/crystal_bar_27.png',
        './img/crystal_bar/crystal_bar_28.png',
        './img/crystal_bar/crystal_bar_29.png',
        './img/crystal_bar/crystal_bar_30.png',
        './img/crystal_bar/crystal_bar_31.png',
        './img/crystal_bar/crystal_bar_32.png',
        './img/crystal_bar/crystal_bar_33.png',
        './img/crystal_bar/crystal_bar_34.png',
        './img/crystal_bar/crystal_bar_35.png',
        './img/crystal_bar/crystal_bar_36.png',
        './img/crystal_bar/crystal_bar_37.png',
        './img/crystal_bar/crystal_bar_38.png',
        './img/crystal_bar/crystal_bar_39.png',
        './img/crystal_bar/crystal_bar_40.png',
        './img/crystal_bar/crystal_bar_41.png',
        './img/crystal_bar/crystal_bar_42.png',
        './img/crystal_bar/crystal_bar_43.png',
        './img/crystal_bar/crystal_bar_44.png',
        './img/crystal_bar/crystal_bar_45.png',
        './img/crystal_bar/crystal_bar_46.png',
        './img/crystal_bar/crystal_bar_47.png',
        './img/crystal_bar/crystal_bar_48.png',
        './img/crystal_bar/crystal_bar_49.png',
        './img/crystal_bar/crystal_bar_50.png',
    ];

    /**
     * Constructs a new CrystalLootBar object and initializes its properties.
     * Loads the initial image for the crystal loot bar and loads the images for the loot bar.
     * Sets the loot amount to 0.
     *
     * @return {void}
     */
    constructor() {
        super().loadImage('./img/crystal_bar/crystal_bar_0.png');
        this.loadImages(this.LOOTBAR_IMAGES);
        this.setLootAmount(0)
    }

    /**
     * Sets the loot amount and updates the image of the crystal loot bar based on the new loot amount.
     *
     * @param {number} loot_amount - The new loot amount to set.
     * @return {void} This function does not return a value.
     */
    setLootAmount(loot_amount) {
        this.loot_amount = loot_amount;
        let path = this.LOOTBAR_IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path]
    }

    /**
     * Returns the index of the image to be used based on the loot_amount.
     *
     * @return {number} The index of the image to be used.
     */
    resolveImageIndex() {
        if (this.loot_amount == 0) {
            return 0;
        } else if (this.loot_amount == 1) {
            return 1;
        } else if (this.loot_amount == 2) {
            return 2;
        } else if (this.loot_amount == 3) {
            return 3;
        } else if (this.loot_amount == 4) {
            return 4;
        } else if (this.loot_amount == 5) {
            return 5;
        } else if (this.loot_amount == 6) {
            return 6;
        } else if (this.loot_amount == 7) {
            return 7;
        } else if (this.loot_amount == 8) {
            return 8;
        } else if (this.loot_amount == 9) {
            return 9;
        } else if (this.loot_amount == 10) {
            return 10;
        } else if (this.loot_amount == 11) {
            return 11;
        } else if (this.loot_amount == 12) {
            return 12;
        } else if (this.loot_amount == 13) {
            return 13;
        } else if (this.loot_amount == 14) {
            return 14;
        } else if (this.loot_amount == 15) {
            return 15;
        } else if (this.loot_amount == 16) {
            return 16;
        } else if (this.loot_amount == 17) {
            return 17;
        } else if (this.loot_amount == 18) {
            return 18;
        } else if (this.loot_amount == 19) {
            return 19;
        } else if (this.loot_amount == 20) {
            return 20;
        } else if (this.loot_amount == 21) {
            return 21;
        } else if (this.loot_amount == 22) {
            return 22;
        } else if (this.loot_amount == 23) {
            return 23;
        } else if (this.loot_amount == 24) {
            return 24;
        } else if (this.loot_amount == 25) {
            return 25;
        } else if (this.loot_amount == 26) {
            return 26;
        } else if (this.loot_amount == 27) {
            return 27;
        } else if (this.loot_amount == 28) {
            return 28;
        } else if (this.loot_amount == 29) {
            return 29;
        } else if (this.loot_amount == 30) {
            return 30;
        } else if (this.loot_amount == 31) {
            return 31;
        } else if (this.loot_amount == 32) {
            return 32;
        } else if (this.loot_amount == 33) {
            return 33;
        } else if (this.loot_amount == 34) {
            return 34;
        } else if (this.loot_amount == 35) {
            return 35;
        } else if (this.loot_amount == 36) {
            return 36;
        } else if (this.loot_amount == 37) {
            return 37;
        } else if (this.loot_amount == 38) {
            return 38;
        } else if (this.loot_amount == 39) {
            return 39;
        } else if (this.loot_amount == 40) {
            return 40;
        } else if (this.loot_amount == 41) {
            return 41;
        } else if (this.loot_amount == 42) {
            return 42;
        } else if (this.loot_amount == 43) {
            return 43;
        } else if (this.loot_amount == 44) {
            return 44;
        } else if (this.loot_amount == 45) {
            return 45;
        } else if (this.loot_amount == 46) {
            return 46;
        } else if (this.loot_amount == 47) {
            return 47;
        } else if (this.loot_amount == 48) {
            return 48;
        } else if (this.loot_amount == 49) {
            return 49;
        } else if (this.loot_amount == 50) {
            return 50;
        }
    }
}