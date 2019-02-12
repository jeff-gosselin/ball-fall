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
