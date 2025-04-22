// ghost_patch.js
const ghostSprites = [
  'https://i.imgur.com/WIw1LQl.png', // Game Boy
  'https://i.imgur.com/tOKTTiK.png', // Cassette
  'https://i.imgur.com/k9rAbjV.png', // VHS Tape
  'https://i.imgur.com/Zv1CCmo.png'  // Floppy Disk
];

function patchGhostDraw() {
  const originalGhost = Pacman.Ghost;
  Pacman.Ghost = function(game, map, color, index) {
    const ghost = originalGhost(game, map, color);
    const originalDraw = ghost.draw;

    ghost.draw = function(ctx) {
      const img = new Image();
      img.src = ghostSprites[index % ghostSprites.length];
      const pos = ghost.move(ctx).new;
      const s = map.blockSize;
      const x = (pos.x / 10) * s;
      const y = (pos.y / 10) * s;
      img.onload = () => ctx.drawImage(img, x, y, s, s);
    };

    return ghost;
  };
}
