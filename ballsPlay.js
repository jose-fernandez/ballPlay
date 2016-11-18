class game{
	constructor(x, y){
		var cont=0;
		this.x=x;
		this.y=y;
		this.list=[];
		this.build();
	}
	build(){
		var bg= document.createElementNS ("http://www.w3.org/2000/svg", "svg");
		bg.setAttribute("height",`${this.y}`);
		bg.setAttribute("width",`${this.x}`);
		bg.setAttribute("id",`contenedor`);
		bg.style.backgroundColor="grey";

		document.body.insertBefore(bg, document.getElementById("start"));
	}

	start(x){
		var cont=0;
		this.list=[];
		if (this.deleteCanvas()){
			this.deleteCanvas();
			this.field=this.build();
		}
		for (let i=0;i<x;i++){
			let r = this.random();
			this.list.push(new circle(cont, r[0],r[1],r[2],r[3]));
			cont++;
		}
		this.run();
	}
	deleteCanvas(){
		if(document.getElementById("contenedor").remove())
			return true;
		else{return false;}
	}

	stop(){
		clearInterval(this.sI);
	}

	random(){
		var x=Math.floor(Math.random() * (385 - 14)) + 14;
		var y=Math.floor(Math.random() * (285 - 14)) + 14;
		var vx=Math.floor(Math.random() * (7 - 1)) + 1;
		var vy=Math.floor(Math.random() * (7 - 1)) + 1;
		var list=[x,y,vx,vy];
		return list;
	}
	run(){
		var that=this;
		this.sI=setInterval((()=>this.drawBalls(that)),10);
	}

	drawBalls(x){
		for (let i=0;i<x.list.length;i++){
			x.list[i].calculateMove(this);
		}
	}
}

class circle{
	constructor(id, x,y,vx,vy){
		this.id=id;
		this.px=x;
		this.py=y;
		this.rx=10;
		this.ry=10;
		this.vx=vx;
		this.vy=vy;
		this.st=4;

		this.build();
	}

	build(){
		this.listColor=["blue","cyan", "GoldenRod", "green", "red", "magenta", "violet","orange"];
		this.pos=Math.floor(Math.random() * (6 - 0)) + 0;

		var cir= document.createElementNS ("http://www.w3.org/2000/svg", "ellipse");
		cir.setAttribute("cx",`${this.px}`);
		cir.setAttribute("cy",`${this.py}`);
		cir.setAttribute("rx",`${this.rx}`);
		cir.setAttribute("ry",`${this.ry}`);
		cir.setAttribute("stroke", `Dark${this.listColor[this.pos]}`);
		cir.setAttribute("stroke-width", this.st);
		cir.setAttribute("fill", this.listColor[this.pos]);

		document.getElementById("contenedor").appendChild(cir);
	}

	calculateMove(x){
		var eli=document.getElementsByTagName("ellipse");
		if(this.py>(x.y-(this.ry+this.st)) && this.px<(0+this.rx+this.st) ||
			this.py>(x.y-(this.ry+this.st)) && this.px>(x.x-(this.rx+this.st))|| 
			this.py<(0+this.ry+this.st) && this.px>(x.x-(this.rx+this.st)) ||
			this.py<(0+this.ry+this.st) && this.px<(0+this.rx+this.st)){
				eli[this.id].setAttribute("rx",`${this.rx}`);
				this.rx=10;
				this.vx=this.vx*(-1);
				eli[this.id].setAttribute("ry",`${this.ry}`);
				this.ry=10;
				this.vy=this.vy*(-1);

		}else if (this.py>(x.y-(this.ry+this.st)) || this.py<(0+this.ry+this.st)){
			this.vy=this.vy*(-1);
			eli[this.id].setAttribute("rx",13);
			this.rx=13;
			eli[this.id].setAttribute("ry",7);
			this.ry=7;
		}else if(this.px>(x.x-(this.rx+this.st)) || this.px<(0+this.rx+this.st)){
			this.vx=this.vx*(-1);
			eli[this.id].setAttribute("ry",13);
			this.ry=13;
			eli[this.id].setAttribute("rx",7);
			this.rx=7;
		}else{
			eli[this.id].setAttribute("rx",`${this.rx}`);
			this.rx=10;
			eli[this.id].setAttribute("ry",`${this.ry}`);
			this.ry=10;
		}
		this.px=this.px+this.vx;
		eli[this.id].setAttribute("cx",`${this.px}`);

		this.py=this.py+this.vy;
		eli[this.id].setAttribute("cy",`${this.py}`);
	}
}



function init(){
	new game(400,300);
	document.getElementById("start").addEventListener("click", function(){
		arcanoid=new game(400,300);
		arcanoid.start(50);
	});
	document.getElementById("finish").addEventListener("click", function(){
		arcanoid.stop();
	});
}




window.onload=function(){
	init();
};