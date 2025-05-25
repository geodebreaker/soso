/** @type {HTMLCanvasElement} */
let canvas;
/** @type {CanvasRenderingContext2D} */
let ctx;

let particles = [];
let last = Date.now();
let acc = 0;

addEventListener('DOMContentLoaded', () => {
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
  for (let i = 0; i < 100; i++)
    particles.push([
      innerWidth + Math.random() * innerWidth,
      Math.random() * innerHeight,
      Math.random() * 3,
      Math.random() * 3,
      Math.random() * 3
    ]);
  draw();
});

function draw() {
  particles.forEach((x, i) => {
    x[0] -= 3 * x[3];
    x[1] += Math.random() * x[3] * .5;
    if (x[0] < 0) particles[i] = [
      innerWidth, 
      Math.random() * innerHeight, 
      Math.random() * 5 + 2,
      Math.random() * 1 + .5,
      Math.random() * 2 + 1
    ];
  });

  requestAnimationFrame(draw);
  canvas.height = innerHeight;
  canvas.width = innerWidth;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ffa';
  particles.forEach(x => {
    ctx.beginPath();
    ctx.arc(x[0], x[1] + Math.sin(Date.now() / 100 * x[4]) * x[2], 3, 0, Math.PI * 2);
    ctx.fill();
  });
}