class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image from the specified path and assigns it to the `img` property of the current object.
     *
     * @param {string} path - The path to the image file.
     * @return {void} This function does not return anything.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the image on the given canvas context at the specified coordinates and dimensions.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the image.
     * @return {void} This function does not return anything.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
    }

    /**
     * Loads an array of images and stores them in the image cache.
     *
     * @param {Array<string>} arr - An array of image paths.
     * @return {void} This function does not return anything.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}

