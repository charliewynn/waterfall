window.onload = function(){
	//Lets create a simple particle system in HTML5 canvas and JS

//Initializing the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Canvas dimensions
var W = 300; var H = 500;
canvas.width = W;
canvas.height = H;

//Lets create an array of water
var water = [];
var foam = [];
for(var i = 0; i < 100; i++)
{
	water.push(new particle());
	foam.push(new foam_particle());
}

//Lets create a function which will help us to create multiple water
function particle()
{
	//Random position on the canvas
	this.x = Math.random()*(W-20)+10;
	this.y = Math.random()*H;
	
	//Lets add random velocity to each particle
	this.vx = Math.random()*2-1;
	this.vy = (W-Math.abs(W/2-this.x))/W+Math.random()*5;
	
	//Random size
	this.radius = Math.random()*10;
}

function foam_particle()
{
	//Random position on the canvas
	this.x = Math.random()*W;
	this.y = H-Math.random()*20+10;
	
	//Lets add random velocity to each particle
	this.vx = Math.random()*2-1;
	this.vy = (-(W-Math.abs(W/2-this.x))/(W)-Math.random()*5)/10;
	
	//Random size
	this.radius = Math.random()*10+20;
  this.life = Math.random()*25 + 75;
  this.max_life = this.life;
}

var x = 100; var y = 100;

//Lets animate the particle
function draw()
{
	//Moving this BG paint code insde draw() will help remove the trail
	//of the particle
	//Lets paint the canvas black
	//But the BG paint shouldn't blend with the previous frame
	ctx.globalCompositeOperation = "source-over";
	//Lets reduce the opacity of the BG paint to give the final touch
	ctx.fillStyle = "rgba(0, 150, 250, 0.01)";
	ctx.fillRect(0, 0, W, H);
	
    //ctx.beginPath()
    //ctx.fillStyle = "brown";
	//ctx.lineWidth = 3;
    //ctx.moveTo(W, H/2);
	//ctx.lineTo(W-15, H/2-30);
	//ctx.lineTo(W-10, H/2-50);
	//ctx.lineTo(W, H/2-70);
	//ctx.fill();
	//Lets blend the particle with the BG
	//ctx.globalCompositeOperation = "darker";
	
	//Lets draw water from the array now
	for(var t = 0; t < water.length; t++)
	{
		var p = water[t];
		
		ctx.beginPath();
		
		//Time for some colors
		var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
		gradient.addColorStop(0, "rgba(100, 200, 255, 1)");
		gradient.addColorStop(0.4, "rgba(100, 200, 255, .5)");
		gradient.addColorStop(1, "rgba(50, 175, 175, 0.1)");
		
		ctx.fillStyle = gradient;
		ctx.arc(p.x, p.y, p.radius*1.5, Math.PI*2, false);
		ctx.fill();
		
		//Lets use the velocity now
		p.x += p.vx;
		p.y += p.vy;
    p.vy = (10*(W-2*Math.abs(W/2-p.x))/W)+Math.random()*5;
		
		//To prevent the balls from moving out of the canvas
		if(p.x < 10 || p.x > W-10) p.vx *= -1;
		if(p.y > H+50) p.y = -50;
	}
  for(var i=0; i<foam.length; ++i)
  {
    var f = foam[i];
		
		ctx.beginPath();
		
		//Time for some colors
		var gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
		gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
		gradient.addColorStop(0.4, "rgba(255, 255, 255, .5)");
		gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)");
		
		ctx.fillStyle = gradient;
		ctx.arc(f.x, f.y, f.radius, Math.PI*2, false);
		ctx.fill();
		
		//Lets use the velocity now
		f.x += f.vx;
		f.y += f.vy;
		
    f.life--;
    
    if(f.life < 0)
    {
      foam[i] = new foam_particle();
    }
  }
}

setInterval(draw, 10);
//I hope that you enjoyed the tutorial :)
  
};