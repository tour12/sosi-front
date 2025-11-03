/* ========= Exaggerated starfield + parallax tilt ========= */
const cvs = document.getElementById('stars');
const ctx = cvs.getContext('2d');
let W,H, S=[];
function size(){ W=cvs.width=innerWidth; H=cvs.height=innerHeight; }
addEventListener('resize', size); size();

function makeStars(n=220){
  S.length=0;
  for(let i=0;i<n;i++){
    S.push({
      x:Math.random()*W,
      y:Math.random()*H,
      z:Math.random()*1+0.4,              // depth
      r:Math.random()*1.6+0.4,
      s:Math.random()*0.7+0.3,
      a:Math.random()*0.5+0.25
    });
  }
}
makeStars();

function draw(){
  ctx.clearRect(0,0,W,H);
  for(const p of S){
    // exaggerated float + parallax drift
    p.y -= p.s*(0.6+p.z*0.8);
    p.x += Math.sin((p.y+p.x)*0.004)*0.6;
    if(p.y<-12){ p.y=H+12; p.x=Math.random()*W; }

    const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*7*(1+p.z));
    g.addColorStop(0,`rgba(255,240,200,${p.a})`);
    g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r*(1+p.z),0,Math.PI*2); ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

/* Parallax tilt for the whole stage */
const stage = document.querySelector('.stage');
const logoWrap = document.querySelector('.logo-wrap');
let mx=0,my=0;
addEventListener('mousemove', e=>{
  const x = (e.clientX / innerWidth - .5) * 2;  // -1..1
  const y = (e.clientY / innerHeight - .5) * 2;
  mx = x; my = y;
});
function tilt(){
  const rx = my * -6;   // exaggerate
  const ry = mx * 8;
  stage.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  logoWrap.style.transform = `translateZ(0) rotateX(${rx*0.5}deg) rotateY(${ry*0.7}deg)`;
  requestAnimationFrame(tilt);
}
tilt();

/* Kick title in if images load late */
window.addEventListener('load', ()=> {
  // if needed, could add additional reveals here
});
