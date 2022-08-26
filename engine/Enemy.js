import Animation from "./Animation";
import Game from "./Game";
import GameObject from "./GameObject";

export default class Enemy extends GameObject {
  constructor(game) {
    super(game);
    this.x = 21;
    this.y = 5;

    this.w = 0.32;
    this.h = 0.25;
    this.defaultSize = [this.w, this.h];
    /**
     * - `0` = Left
     * - `1` = Right
     */
    this.facing = 0;

    /**
     * @type {Game}
     */
    this.game = game;

    this.tiles = {};

    this.lastLandY = 0;

    this.animations = {
      idle: new Animation({
        sprite: "idle",
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        speed: 140,
        after: "idle",
        idle: true,
      }),
    };

    /**
     * @type {Animation}
     */
    this.animation = null;
    this.animationName = "";

    this.setAnimation("idle");
  }
  setAnimation(animationName, fixSize = true) {
    if (!this.animations[animationName]) {
      throw new Error("Invalid animation: " + animationName);
    }

    var oldAnimation = this.animation;

    this.animation = this.animations[animationName];
    this.animationName = animationName;
    this.animationTick = 0;

    if (this.animation.size) {
      this.w = this.animation.size[0];
      this.h = this.animation.size[1];

      this.x += (this.defaultSize[0] - this.animation.size[0]) / 2;
      this.y += this.defaultSize[1] - this.animation.size[1];
    } else {
      [this.w, this.h] = this.defaultSize;

      if (fixSize) {
        if (oldAnimation && oldAnimation.size) {
          this.x -= (this.w - oldAnimation.size[0]) / 2;
          this.y -= this.h - oldAnimation.size[1];
        }
      }
    }
  }

render(delta) {
    // animator
    this.animationTick += delta * 1000;

    var index = Math.floor(this.animationTick / this.animation.speed);
    var done = false;
    if (index > this.animation.frames.length - 1) {
      if (index > this.animation.frames.length) {
        done = true;
      }

      index = this.animation.frames.length - 1;
    }

    var frame = this.animation.frames[index];

    if (this.game.showInfo) {
      this.game.render.drawRect(
        this.x,
        this.y,
        this.w,
        this.h
      );
    }

    var xOffset = 0;

    var [w, h] = this.defaultSize;

    this.game.render.drawSprite(
      {
        sprite: this.animation.sprite,
        frame: frame,
      },
      this.x -
        w * 1.55 +
        (Array.isArray(this.animation.xOffset)
          ? this.animation.xOffset[this.facing]
          : this.animation.xOffset) +
        xOffset,
      this.y - h * 1.05 + this.animation.yOffset,
      w * h * 4.3,
      w * h * 4.3 * 0.875
    );

  update(delta) {
    var wasOnGround = this.onGround;

    super.update(delta);

    // game boundaries
    this.x = Math.max(0, Math.min(this.game.levelWidth - this.w, this.x));
    this.y = Math.max(0, Math.min(this.game.levelHeight - this.h, this.y));
  }
}
