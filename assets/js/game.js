var config = {
type: Phaser.AUTO,
width: 800,
height: 600,
backgroundColor: '#2d2d2d',
parent: 'phaser-example',
physics: {
  default: 'arcade',
  arcade: {
      gravity: { y: -500 },
      debug: false
  }
},
scene: {
    preload: preload,
    create: create,
    update: update
}
};


var scrollingSkyBkg;
var ball;
var game = new Phaser.Game(config);

function preload ()
{
this.load.image('scrollingSkyBkg', './assets/images/blueSky01.jpg');
this.load.spritesheet('ball','assets/images/ball.png',
{ frameWidth: 50, frameHeight: 50 });
this.load.image('star', 'assets/images/star.png');
this.load.image('purpleBrick', "./assets/puzzlepack/png/element_purple_rectangle.png")
this.load.spritesheet('greenBird', 'assets/images/birds/greenBird.png', { frameWidth: 80, frameHeight: 78});
}

function create () {
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


});



player.setBounce(0.2);
player.setCollideWorldBounds(true);

player.body.allowGravity = false;

// this.physics.add.collider(stars, player);

this.anims.create({
key: 'left',
frames: this.anims.generateFrameNumbers('ball', { start: 0, end: 0 }),
frameRate: 60,
repeat: -1
});

this.anims.create({
key: 'right',
frames: this.anims.generateFrameNumbers('ball', { start: 0, end: 0 }),
frameRate: 60,
repeat: -1
});

}

function update () {
scrollingSkyBkg.tilePositionY += 20;
cursors = this.input.keyboard.createCursorKeys();
if (cursors.left.isDown){
player.setVelocityX(-500);
player.anims.play('left', true);

} else if (cursors.right.isDown){
player.setVelocityX(500);
player.anims.play('right', true);
}

function makeBricks() {
  this.blocks.removeAll();
        var wallHeight = game.rnd.integerInRange(1, 4);
        for (var i = 0; i < wallHeight; i++) {
            var block = game.add.sprite(0, -i * 50, "purpleBrick");
            this.blocks.add(block);
        }
        this.blocks.x = game.width - this.blocks.width
        this.blocks.y = this.ground.y - 50;
        //
        //Loop through each block
        //and apply physics
        this.blocks.forEach(function(block) {
            //enable physics
            game.physics.enable(block, Phaser.Physics.ARCADE);
            //set the x velocity to -160
            block.body.velocity.x = -150;
            //apply some gravity to the block
            //not too much or the blocks will bounce
            //against each other
            block.body.gravity.y = 4;
            //set the bounce so the blocks
            //will react to the runner
            block.body.bounce.set(1,1);
        });
}


// if (cursors.up.isDown && player.body.touching.down)
// {
//     player.setVelocityY(-330);
// }

}
