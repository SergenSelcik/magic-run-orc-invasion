class World {
    character = new Character();
    hpBar = new HpBar();
    manaBar = new ManaBar();
    lootBar = new LootBar();
    hpBarBoss = new HpBarEndboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    fireableObjects = [];
    nearBossInterval;

    /**
     * Initializes a new instance of the World class.
     *
     * @param {HTMLCanvasElement} canvas - The canvas element on which the game world will be drawn.
     * @param {Keyboard} keyboard - The keyboard object used for handling user input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
    }

    /**
     * Sets the world property of the character object to the current world object.
     *
     * @return {void} This function does not return anything.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the game loop, which includes checking for near-boss events, firing objects, collecting mana potions,
     * collecting loot, and checking for magic attacks on minions and bosses.
     *
     * @return {void} This function does not return anything.
     */
    run() {
        this.nearBossInterval = setInterval(() => {
            this.checkIfNearBoss();
        }, 100)
        setInterval(() => {
            this.checkFiredObjects();
            this.checkCollectManaPotion();
            this.checkCollectLoot();
            this.checkMagicAttackCollisionMinion();
        }, 100)
        setInterval(() => {
            this.checkMagicAttackCollisionBoss();
            this.checkCollisionWithEnemy();
        }, 1)
    }

    /**
     * Clears all intervals in the window object.
     *
     * @return {void} This function does not return anything.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * Checks if the player can fire an attack and updates the mana bar accordingly.
     * If the player can fire an attack, it updates the mana bar by subtracting 25 from the current mana percentage.
     * It also sets the attackFired flag to true.
     * If the player is not pressing the F key, it sets the attackFired flag to false.
     *
     * @return {void} This function does not return anything.
     */
    checkFiredObjects() {
        if (this.canFireAttack()) {
            this.updateMana();
            this.fireAttack();
            this.attackFired = true;
        }
        if (!this.keyboard.F) {
            this.attackFired = false;
        }
    }

    /**
     * Checks if the player can fire an attack.
     *
     * @return {boolean} Returns true if the player can fire an attack, false otherwise.
     */
    canFireAttack() {
        return this.keyboard.F && !this.attackFired && this.manaBar.mana_percentage > 0;
    }

    /**
     * Updates the mana bar by subtracting 25 from the current mana percentage.
     *
     * @return {void} This function does not return anything.
     */
    updateMana() {
        this.manaBar.setManaPercentage(this.manaBar.mana_percentage - 25);
    }

    /**
     * Creates a new FireableObject at the position of the character plus 15 in the x-axis,
     * and pushes it into the fireableObjects array. If sound is not muted, plays the attack_sound.
     *
     * @return {void} This function does not return anything.
     */
    fireAttack() {
        let attack = new FireableObject(this.character.x + 15, this.character.y);
        this.fireableObjects.push(attack);
        attack_sound.currentTime = 0;
        if (!soundmuted) {
            attack_sound.play();
        }
    }

    /**
     * Checks if the character is colliding with any mana potion in the level and if the mana bar is not full.
     * If a collision is detected and the mana bar is not full, the mana bar is increased by 25 units and the mana potion is removed from the level.
     * If the sound is not muted, the drinkPotion_sound is played.
     *
     * @return {void} This function does not return anything.
     */
    checkCollectManaPotion() {
        this.level.manaPotion.forEach((manaPotion) => {
            if (this.character.isColliding(manaPotion) && this.manaBar.mana_percentage < 100) {
                this.manaBar.setManaPercentage(this.manaBar.mana_percentage + 25);
                this.level.manaPotion.splice(this.level.manaPotion.indexOf(manaPotion), 1);
                if (!soundmuted) {
                    drinkPotion_sound.play();
                }
            }
        });
    }

    /**
     * Checks for collisions between magic attacks and minions in the game world.
     *
     * @return {void} This function does not return anything.
     */
    checkMagicAttackCollisionMinion() {
        this.fireableObjects.forEach((attack, attackIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (this.isAttackHittingEnemy(attack, enemy)) {
                    this.handleAttackCollisionWithEnemy(attackIndex, enemyIndex);
                }
            });
        });
    }

    /**
     * Checks if the given attack is hitting the enemy.
     *
     * @param {Object} attack - The attack object to check.
     * @param {Object} enemy - The enemy object to check against.
     * @return {boolean} Returns true if the attack is hitting the enemy, false otherwise.
     */
    isAttackHittingEnemy(attack, enemy) {
        return (enemy instanceof Minion || enemy instanceof Minion2) && enemy.isColliding(attack);
    }

    /**
     * Handles the collision between a magic attack and an enemy in the game world.
     *
     * @param {number} attackIndex - The index of the attack object in the fireableObjects array.
     * @param {number} enemyIndex - The index of the enemy object in the level.enemies array.
     * @return {void} This function does not return anything.
     */
    handleAttackCollisionWithEnemy(attackIndex, enemyIndex) {
        this.level.enemies[enemyIndex].instantKill();
        setTimeout(() => {
            this.level.enemies.splice(enemyIndex, 1);
        }, 1000 / 5);
        this.fireableObjects.splice(attackIndex, 1);
    }

    /**
     * Checks for a collision between a magic attack and the boss. If a collision is detected,
     * the boss's health is decreased, the boss's health bar is updated, and the attack is removed
     * from the list of fireable objects. If the boss is defeated, it is removed from the list of enemies.
     *
     * @param {number} index - The index of the boss in the list of enemies.
     * @return {void} This function does not return anything.
     */
    checkMagicAttackCollisionBoss(index) {
        this.fireableObjects.forEach((attack, attackIndex) => {
            this.level.enemies.forEach((enemy, index) => {
                if (enemy instanceof Endboss && enemy.isColliding(attack)) {
                    enemy.hpLossBoss();
                    this.hpBarBoss.setHpPercentage(enemy.hp);
                    if (enemy.isDead()) {
                        this.spliceBoss(index);
                    }
                    this.fireableObjects.splice(attackIndex, 1);
                }
            });
        });
    }

    /**
     * Removes the boss at the specified index from the list of enemies after a delay.
     *
     * @param {number} index - The index of the boss in the list of enemies.
     * @return {void} This function does not return anything.
     */
    spliceBoss(index) {
        setTimeout(() => {
            this.level.enemies.splice(index, 1);
        }, 1000 / 3);
    }

    /**
     * Checks for collisions between the character and enemies in the game world.
     * If a collision is detected, the character is affected and the enemy is removed from the game world.
     *
     * @return {void} This function does not return anything.
     */
    checkCollisionWithEnemy() {
        let collidedEnemy = null;
        for (let i = 0; i < this.level.enemies.length; i++) {
            const enemy = this.level.enemies[i];
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.moveDown()) {
                this.handleEnemyCollision(enemy);
                collidedEnemy = enemy;
                break;
            }
        }
        if (collidedEnemy) {
            this.removeCollidedEnemy(collidedEnemy);
        }
    }

    /**
     * Checks if the character is colliding with an enemy and if the character is above the ground.
     *
     * @param {Object} enemy - The enemy object to check collision with.
     * @return {boolean} Returns true if the character is colliding with the enemy and is above the ground, false otherwise.
     */
    isCharacterCollidingWithEnemy(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround();
    }

    /**
     * Handles the collision between the character and an enemy.
     *
     * @param {Enemy} enemy - The enemy that the character collided with.
     * @return {void} This function does not return anything.
     */
    handleEnemyCollision(enemy) {
        this.character.speedY = 33;
        if (this.character.y > 358) {
            this.character.y = 358;
        }
        if (!soundmuted) {
            jump_on_head.play();
        }
        if (enemy instanceof Minion || enemy instanceof Minion2) {
            this.handleMinionCollision(enemy);
        }
    }

    /**
     * Handles the collision between the character and a minion.
     *
     * @param {Minion} minion - The minion that the character collided with.
     * @return {void} This function does not return anything.
     */
    handleMinionCollision(minion) {
        minion.isKilled = true;
        minion.instantKill();
    }

    /**
     * Removes a collided enemy from the level enemies array after a delay of 100 milliseconds.
     *
     * @param {Object} collidedEnemy - The enemy object that collided with the character.
     * @return {void} This function does not return anything.
     */
    removeCollidedEnemy(collidedEnemy) {
        setTimeout(() => {
            let index = this.level.enemies.findIndex(findEnemy => findEnemy.id === collidedEnemy.id);
            if (index !== -1 && !(collidedEnemy instanceof Endboss)) {
                this.level.enemies.splice(index, 1);
            }
        }, 100);
    }

    collidingWithEnemy = false;

    /**
     * Checks for collisions between the character and enemies in the game world.
     * If a collision is detected and the enemy is not killed and the character is not above the ground,
     * the character's health is decreased and the health bar is updated.
     *
     * @return {void} This function does not return anything.
     */
    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && !enemy.isKilled && !this.character.isAboveGround()) {
                    this.character.hpLoss();
                    this.hpBar.setHpPercentage(this.character.hp);
                }
            });
        }, 200);
    }

    /**
     * Checks if the character is colliding with any loot in the current level.
     * If the character is colliding with a loot, it adds one to the loot amount
     * of the loot bar and removes the loot from the level. It also resets the
     * current time of the collectCrystal_sound and plays the sound if sound is not muted.
     *
     * @return {void} This function does not return anything.
     */
    checkCollectLoot() {
        this.level.loot.forEach((loot) => {
            if (this.character.isColliding(loot)) {
                if (this.lootBar.loot_amount < 51) {
                    this.lootBar.setLootAmount(this.lootBar.loot_amount + 1);
                }
                this.level.loot.splice(this.level.loot.indexOf(loot), 1);
                collectCrystal_sound.currentTime = 0;
                if (!soundmuted) {
                    collectCrystal_sound.play();
                }
            }
        });
    }

    /**
     * Checks if the player is near the boss and performs the corresponding actions.
     *
     * @return {void} This function does not return anything.
     */
    checkIfNearBoss() {
        let boss = this.level.enemies[this.level.enemies.length - 1];
        boss.reduceMusicVolumeIfNearBoss();
        if (boss.isHurt() && !boss.isDead()) {
            boss.handleBossHurtAnimation(boss);
        } else if (this.character.x > 11200 || (boss.hadFirstContact && !boss.isDead())) {
            this.triggerBoss(boss)
        }
        boss.handleBossIdleAnimation(boss);
        boss.handleBossDeath(boss);
    }

    /**
     * Triggers the boss by playing the boss roar sound for the first time if it has not been played yet,
     * playing the boss music, and setting the boss move behavior. It also handles the boss walk animation
     * when it has had first contact with the player and stops the ingame music transition.
     *
     * @param {Object} boss - The boss object.
     * @return {void} This function does not return a value.
     */
    triggerBoss(boss) {
        boss.playingBossRoarSoundForOnce();
        boss.playBossMusic();
        this.bossMoveBehaviour(boss);
        boss.handleBossWalkAnimationWhenHadFirstContact(boss);
        boss.stopIngameMusicTransition();
    }

    /**
     * Determines the movement behavior of the boss based on the position of the character.
     *
     * @param {Object} boss - The boss object.
     * @return {void} This function does not return a value.
     */
    bossMoveBehaviour(boss) {
        if (this.character.x + this.character.width - this.character.offset.right < boss.x + boss.offset.left) {
            boss.bossMovesLeft(boss);
        } else if (this.character.x > boss.x) {
            boss.bossMovesRight(boss);
        } else {
            boss.bossIsStandingNextToCharacter(boss)
        }
        boss.playWalkAnimation(boss.WALK_IMAGES);
    }

    /**
     * Draws the game world on the canvas, including the background objects, clouds,
     * fixed objects (HP bar, mana bar, loot bar, character, enemies, fireable objects),
     * and the boss's HP bar if the character has reached it.
     *
     * @return {void} This function does not return anything.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects ------
        this.addToMap(this.hpBar);
        this.addToMap(this.manaBar);
        let boss = this.level.enemies[this.level.enemies.length - 1];
        if (this.character.x >= boss.x - this.canvas.width / 2) {
            this.addToMap(this.hpBarBoss);
        }
        this.addToMap(this.lootBar);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.loot);
        this.addObjectsToMap(this.level.manaPotion);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.fireableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.animationFramePaused = requestAnimationFrame(() => this.draw());
    }

    /**
     * Pauses the animation by canceling the animation frame.
     *
     * @return {void} This function does not return anything.
     */
    pauseAnimation() {
        cancelAnimationFrame(this.animationFramePaused);
    }

    /**
     * Continues the animation by scheduling the next frame to be drawn.
     *
     * @return {void} This function does not return anything.
     */
    continueAnimation() {
        this.animationFramePaused = requestAnimationFrame(() => this.draw());
    }

    /**
     * Adds an array of objects to the map.
     *
     * @param {Array} objects - An array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    /**
     * Adds a MoveableObject to the map and draws it on the canvas. If the object has the 'otherDirection' property set to true, the image is flipped before and after drawing.
     *
     * @param {MoveableObject} MoveableObject - The object to be added to the map and drawn on the canvas.
     * @return {void} This function does not return anything.
     */
    addToMap(MoveableObject) {
        if (MoveableObject.otherDirection) {
            this.flipImage(MoveableObject)
        }
        MoveableObject.draw(this.ctx);
        if (MoveableObject.otherDirection) {
            this.flipImageBack(MoveableObject)
        }
    };

    /**
     * Flips the image of a MoveableObject on the canvas.
     *
     * @param {MoveableObject} MoveableObject - The object whose image is to be flipped.
     */
    flipImage(MoveableObject) {
        this.ctx.save();
        this.ctx.translate(MoveableObject.width, 0);
        this.ctx.scale(-1, 1);
        MoveableObject.x = MoveableObject.x * -1;
    }

    /**
     * Flips the image of the given MoveableObject back to its original direction.
     *
     * @param {MoveableObject} MoveableObject - The MoveableObject whose image needs to be flipped back.
     * @return {void} This function does not return anything.
     */
    flipImageBack(MoveableObject) {
        MoveableObject.x = MoveableObject.x * -1;
        this.ctx.restore();
    }
}