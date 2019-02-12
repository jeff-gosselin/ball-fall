class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
      this.load.image('scrollingSkyBkg', './assets/images/blueSky01.jpg');
      this.load.spritesheet('ball','assets/images/ball.png',
      { frameWidth: 50, frameHeight: 50 });
      this.load.image('star', 'assets/images/star.png');
      this.load.image('purpleBrick', "./assets/puzzlepack/png/element_purple_rectangle.png")
      this.load.spritesheet('greenBird', 'assets/images/birds/greenBird.png', { frameWidth: 80, frameHeight: 78});
    }
    create() {
      scrollingSkyBkg = this.add.tileSprite(400, 300, 800, 600, 'scrollingSkyBkg');
      player = this.physics.add.sprite(400, 300, 'ball');
      greenBird = this.physics.add.sprite(400, 300, 800, 600, 'greenBird');
      star = this.physics.add.group({
      key: 'star',
      repeat: 21,
      setXY: { x: 12, y: 800, stepX: 30 }
      });
      purpleBrick = this.physics.add.group({
        key: 'purpleBrick',
        repeat: 15,
        setXY: { x: 8, y: 1000, stepX: 50}
      })

      star.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    }
    update() {
      scrollingSkyBkg.tilePositionY += 20;
      cursors = this.input.keyboard.createCursorKeys();
      if (cursors.left.isDown){
      player.setVelocityX(-500);
      player.anims.play('left', true);

      } else if (cursors.right.isDown){
      player.setVelocityX(500);
      player.anims.play('right', true);
    }
}
