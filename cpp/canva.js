const canvas = document.getElementById("strings");
const ctx = canvas.getContext("2d");
let mouse = { x: 0, y: 0 };

document.addEventListener("mousemove", function (event) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
});

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Points that will move and connect with lines
const pointsCount = 150;
const points = [];

class Point {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5; // velocity x
    this.vy = (Math.random() - 0.5) * 0.5; // velocity y
    this.radius = 1.5;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fill();
  }
}

// Create points
for (let i = 0; i < pointsCount; i++) {
  points.push(new Point());
}

function connectPoints() {
  const maxDistance = 120; // max distance to draw line

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let dx = points[i].x - points[j].x;
      let dy = points[i].y - points[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDistance) {
        let alpha = 1 - dist / maxDistance;
        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
      }
    }
  }
}
function followMouse() {
  const maxMouseDistance = 150;

  for (let i = 0; i < points.length; i++) {
    let dx = points[i].x - mouse.x;
    let dy = points[i].y - mouse.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < maxMouseDistance && dist > 0) {
      // Normalize vector (dx, dy)
      let pushFactor = (maxMouseDistance - dist) / maxMouseDistance; // stronger push when closer
      let pushX = (dx / dist) * pushFactor * 10; // multiply by speed factor (2)
      let pushY = (dy / dist) * pushFactor * 10;

      points[i].x += pushX;
      points[i].y += pushY;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  points.forEach((p) => {
    p.move();
    followMouse();
    p.draw();
  });

  connectPoints();

  requestAnimationFrame(animate);
}

animate();
