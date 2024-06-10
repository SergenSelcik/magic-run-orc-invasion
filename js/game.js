let canvas;
let world;
let keyboard = new Keyboard();
let soundmuted = false;
let playSound = false;

/**
 * Initializes the game by showing the canvas and the world.
 *
 * @return {void} This function does not return anything.
 */
function init() {
    showCanvas();
    showWorld();
}

/**
 * Retrieves the canvas element from the DOM and assigns it to the global variable 'canvas'.
 *
 * @return {void} This function does not return a value.
 */
function showCanvas() {
    canvas = document.getElementById('canvas');
}

/**
 * Initializes the game world by creating a new instance of the World class with the provided canvas and keyboard.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element on which the game world will be drawn.
 * @param {Keyboard} keyboard - The keyboard object used for handling user input.
 * @return {void} This function does not return a value.
 */
function showWorld() {
    world = new World(canvas, keyboard);
}

/**
 * Initializes a new game by pausing the intro music, showing in-game buttons, 
 * showing mobile buttons on mobile devices, creating level 1, initializing the game, 
 * pausing the boss music, pausing the ingame music, and playing the ingame music.
 *
 * @return {void} This function does not return anything.
 */
function newGame() {
    showInGameButtonsWhenNewGame();
    showMobileButtonsWhenOnMobile()
    createLevel1();
    init();
    pauseBossMusic();
    pauseIngameMusic();
    playIngameMusic();
}

/**
 * Restarts the game by hiding the menu container, pausing the boss music and the ingame music,
 * playing the ingame music, clearing all intervals, creating level 1, and initializing the game.
 *
 * @return {void} This function does not return anything.
 */
function restartGame() {
    hideWinAndLoseScreenAfterRestart();
    pauseBossMusic();
    pauseIngameMusic();
    playIngameMusic();
    world.clearAllIntervals();
    createLevel1();
    init();
}

/**
 * Handles the player's death by pausing the boss music, pausing the ingame music,
 * playing the defeat music, clearing all intervals, and showing the "you died" screen.
 *
 * @return {void} This function does not return anything.
 */
function playerDeath() {
    pauseBossMusic();
    pauseIngameMusic();
    playDefeatMusic();
    world.clearAllIntervals();
    showYouDiedScreen();
}

/**
 * Executes the necessary actions when the player wins the game.
 *
 * @return {void} This function does not return anything.
 */
function playerWin() {
    pauseBossMusic();
    pauseIngameMusic();
    running_sound.pause();
    playVictoryMusic();
    world.clearAllIntervals();
    showYouWinScreen();
}

/**
 * Hides the "lose screen", "win screen", "restart" button, "restart win" button, and "menu container" elements after a game restart.
 *
 * @return {void} This function does not return anything.
 */
function hideWinAndLoseScreenAfterRestart() {
    document.querySelector('.losescreen_container').style.display = 'none';
    document.querySelector('.winscreen_container').style.display = 'none';
    document.querySelector('.restart').style.display = 'none';
    document.querySelector('.restart_win').style.display = 'none';
    document.querySelector('.menu_container').style.display = 'none';
}

/**
 * Shows the in-game buttons when a new game is started.
 *
 * @return {void} This function does not return anything.
 */
function showInGameButtonsWhenNewGame() {
    document.getElementById('fullScreenButton').style.display = 'block';
    document.getElementById('startscreen').style.display = 'none';
    document.getElementById('newGameButton').style.display = 'none';
    document.getElementById('storyButton').style.display = 'none';
    document.getElementById('settingsButton').style.display = 'block';
    document.getElementById('volumeOnButton').style.display = 'block';
    document.getElementById('volumeOffButton').style.display = 'none';
    document.getElementById('infoButton').style.display = 'block';
    document.querySelector('.menu_container').style.display = 'none';
}

/**
 * Shows or hides the mobile buttons based on the device's screen height and user agent.
 *
 * @return {void} This function does not return anything.
 */
function showMobileButtonsWhenOnMobile() {
    if (window.innerHeight <= 480 && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.querySelector('.mobile_buttons').style.display = 'flex';
        document.getElementById('fullScreenButton').style.display = 'none';
        document.querySelector('.legal_notice').style.display = 'none';
    } else {
        document.querySelector('.mobile_buttons').style.display = 'none';
        document.getElementById('fullScreenButton').style.display = 'block';
        document.querySelector('.legal_notice').style.display = 'flex';
    }
}

/**
 * Pauses the boss music if the playSound flag is true. Resets the current time of the boss music to 0.
 *
 * @return {void} This function does not return anything.
 */
function pauseBossMusic() {
    if (playSound) {
        boss_music.pause();
        boss_music.currentTime = 0;
    }
}

/**
 * Pauses the ingame music if the playSound flag is true. Resets the current time of the ingame music to 0.
 *
 * @return {void} This function does not return anything.
 */
function pauseIngameMusic() {
    if (playSound) {
        ingame_music.pause();
        ingame_music.currentTime = 0;
    }
}

/**
 * Plays the ingame music if the sound is not muted.
 *
 * @return {void} This function does not return anything.
 */
function playIngameMusic() {
    if (!soundmuted) {
        ingame_music.currentTime = 0;
        ingame_music.play().then(() => { playSound = true; });
        ingame_music.volume = 1
    }
}

/**
 * Plays the defeat music if the sound is not muted.
 *
 * @return {void} This function does not return anything.
 */
function playDefeatMusic() {
    if (!soundmuted) {
        defeat_music.play();
    }
}

/**
 * Plays the victory music if the sound is not muted.
 *
 * @return {void} This function does not return anything.
 */
function playVictoryMusic() {
    if (!soundmuted) {
        victory_music.play();
    }
}

/**
 * Displays the "you died" screen and reloads the page after a 3.5-second delay.
 *
 * @return {void} This function does not return anything.
 */
function showYouDiedScreen() {
    let youDiedContainer = document.getElementById('youDied');
    if (youDiedContainer) {
        youDiedContainer.style.display = 'block';
        setTimeout(() => {
            document.querySelector('.restart').style.display = 'block';
        }, 3500);
    }
}

/**
 * Displays the "you win" screen and reloads the page after a 3.5 second delay.
 *
 * @return {void} This function does not return anything.
 */
function showYouWinScreen() {
    let youWinContainer = document.getElementById('youWin');
    if (youWinContainer) {
        youWinContainer.style.display = 'block';
        setTimeout(() => {
            document.querySelector('.restart_win').style.display = 'block';
        }, 3500);
    }
}

/**
 * Enters fullscreen mode for the canvas element.
 *
 * @return {void} This function does not return anything.
 */
function fullScreen() {
    canvas.requestFullscreen();
}

/**
 * Opens the instructions based on the device's screen height and user agent.
 *
 * @return {void} This function does not return anything.
 */
function openInstructions() {
    if (window.innerHeight <= 480 && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.querySelector('.instructions_container_mobile').style.display = 'flex';
        document.querySelector('.instructions_container').style.display = 'none';
    } else {
        document.querySelector('.instructions_container').style.display = 'flex';
        document.querySelector('.instructions_container_mobile').style.display = 'none';
    }
}

/**
 * Opens the story container and closes the instructions.
 *
 * @return {void} This function does not return anything.
 */
function openStory() {
    document.querySelector('.story_container').style.display = 'flex';
    closeInstructions();
}

/**
 * Opens the menu by displaying the menu container and pausing the game.
 *
 * @return {void} This function does not return anything.
 */
function openMenu() {
    document.querySelector('.menu_container').style.display = 'flex';
    pauseGame();
}

/**
 * Closes the menu by hiding the menu container and resuming the game.
 *
 * @return {void} This function does not return anything.
 */
function closeMenu() {
    document.querySelector('.menu_container').style.display = 'none';
    continueGame();
}

/**
 * Opens the credits container and pauses the game.
 *
 * @return {void} This function does not return anything.
 */
function openCredits() {
    document.querySelector('.credits_container').style.display = 'flex';
    pauseGame();
}

/**
 * Closes the instructions based on the device's screen height and user agent.
 *
 * @return {void} This function does not return anything.
 */
function closeInstructions() {
    if (window.innerHeight <= 480 && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.querySelector('.instructions_container_mobile').style.display = 'none';
    } else {
        document.querySelector('.instructions_container').style.display = 'none';
    }
}

/**
 * Closes the story container by setting its display property to 'none'.
 *
 * @return {void} This function does not return anything.
 */
function closeStory() {
    document.querySelector('.story_container').style.display = 'none';
}

/**
 * Closes the credits container by setting its display property to 'none'.
 *
 * @return {void} This function does not return anything.
 */
function closeCredits() {
    document.querySelector('.credits_container').style.display = 'none';
}

/**
 * Reloads the current page by redirecting to the home page.
 *
 * @return {void} This function does not return anything.
 */
function homeButton() {
    window.location.reload();
}

/**
 * Mutes the ingame music and updates the display of the volume buttons.
 *
 * @return {void} This function does not return anything.
 */
function muteSound() {
    ingame_music.pause();
    soundmuted = true;
    document.getElementById('volumeOnButton').style.display = 'none';
    document.getElementById('volumeOffButton').style.display = 'block';
}

/**
 * Unmutes the ingame music and updates the display of the volume buttons.
 *
 * @return {void} This function does not return anything.
 */
function unmuteSound() {
    ingame_music.play();
    soundmuted = false;
    document.getElementById('volumeOffButton').style.display = 'none';
    document.getElementById('volumeOnButton').style.display = 'block';
}

/**
 * Pauses the game by pausing the animation and clearing all enemy move intervals and the near boss interval.
 *
 * @return {void} This function does not return anything.
 */
function pauseGame() {
    world.pauseAnimation();
    world.level.enemies.forEach((enemy) => {
        clearInterval(enemy.enemyMoveInterval);
        clearInterval(world.nearBossInterval);
    })
}

/**
 * Continues the game by resuming the animation and pausing the enemy movements.
 *
 * @return {void} This function does not return anything.
 */
function continueGame() {
    world.continueAnimation();
    world.level.enemies.forEach((enemy) => {
        pauseEnemyMovements(enemy);
    })
}

/**
 * Pauses the enemy movements based on the type of enemy.
 *
 * @param {Object} enemy - The enemy object.
 * @return {void} This function does not return anything.
 */
function pauseEnemyMovements(enemy) {
    if (enemy instanceof Endboss) {
        world.nearBossInterval = setInterval(() => {
            world.checkIfNearBoss();
        }, 100);
    } else {
        enemy.enemyMoveInterval = setInterval(() => {
            enemy.moveLeft();
        }, 25);
    }
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 70) {
        keyboard.F = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 70) {
        keyboard.F = false;
    }
});