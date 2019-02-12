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
this.load.spritesheet('ball',
  'assets/images/ball.png',
  { frameWidth: 50, frameHeight: 50 }
);
this.load.image('star', 'assets/images/star.png');
//	this.add.sprite('object', 'assets/ball.png', {frameWidth: 50, frameHeight: 50})

}

function create ()
{
scrollingSkyBkg = this.add.tileSprite(400, 300, 800, 600, 'scrollingSkyBkg');
player = this.physics.add.sprite(400, 300, 'ball');
stars = this.physics.add.group({
key: 'star',
repeat: 21,
setXY: { x: 12, y: 800, stepX: 30 }
});

stars.children.iterate(function (child) {

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
key: 'turn',
frames: [ { key: 'ball', frame: 0 } ],
frameRate: 60
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
} else {
player.setVelocityX(10);
player.anims.play('turn');
}

// if (cursors.up.isDown && player.body.touching.down)
// {
//     player.setVelocityY(-330);
// }

}
