class StatusBar extends DrawableObject {
    IMAGES = [
    ];

    /**
     * Constructs a new instance of the class and initializes its properties.
     * Loads the images for the status bar.
     *
     * @return {void} This function does not return a value.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
    }

}         