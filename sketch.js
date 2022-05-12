//módulos da biblioteca matter
const Engine = Matter.Engine; //ok
const Render = Matter.Render; //ok
const World = Matter.World; //ok
const Bodies = Matter.Bodies; //ok
const Constraint = Matter.Constraint; //ok
const Body = Matter.Body; //ok
const Composites = Matter.Composites;  //ok
const Composite = Matter.Composite; //ok

var engine;
var world;
var ground;
var rope, rope2;
var fruit;
var link, link2;
var parede;
var melancia;
var pernalonga;
var coelho;
var cortador,cortador2;
var salsicha, sadBoy, piscando;
var somFundo, somAr, somComendo, somTriste, somCorte;
var mudo;
var ventilador;
var cortador3;
var rope3;
var link3;

function preload (){
  parede = loadImage ("background.png");
  melancia = loadImage ("melon.png");
  pernalonga = loadImage ("Rabbit-01.png");
  salsicha = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sadBoy = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  piscando = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  somFundo = loadSound("sound1.mp3");
  somAr = loadSound("air.wav");
  somComendo = loadSound("eating_sound.mp3");
  somTriste = loadSound("sad.wav");
  somCorte = loadSound("rope_cut.mp3");

  //playing e looping
  salsicha.playing = true;
  salsicha.looping = false;
  sadBoy.playing = true;
  sadBoy.looping = false;
  piscando.playing = true;
  piscando.looping = true;
}


function setup() 
{
 var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
 if(isMobile){
   canW = displayWidth;
   canH = displayHeight;
   createCanvas(canW,canH);
 }
 else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW,canH);
 }
 
 // createCanvas(500,700);
  frameRate(80); //taxa de frames, geralmente: 30 frames/seg

  //som de fundo
  somFundo.play();
  somFundo.setVolume(0.1);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH-20,600,20);
  
  rope = new Rope(6,{x:225,y:30});
  rope2 = new Rope(8,{x:315,y:30});
   rope3 = new Rope(6,{x:450,y:35});
 
  
  piscando.frameDelay = 20;
  salsicha.frameDelay = 30;

  coelho= createSprite (250,canH-150,10,14);
  //coelho.addImage(pernalonga);
  coelho.addAnimation('piscando', piscando);
  coelho.addAnimation('comendo', salsicha);
  coelho.addAnimation('triste', sadBoy);
  coelho.changeAnimation('piscando');

  coelho.scale= 0.25; 

  //botão para mutar o som de fundo
  mudo = createImg("mute.png");
  mudo.position(400,50);
  mudo.size(50,50);
  mudo.mouseClicked(mutar);


 //botão para cortar a corda
  cortador = createImg ("cut_btn.png");
  cortador.position (185,35);
  cortador.size (70,70);
  cortador.mouseClicked (cerveja);

  cortador2 = createImg ("cut_btn.png");
  cortador2.position (285,15);
  cortador2.size (70,70);
  cortador2.mouseClicked(cerveja2);

  cortador3 = createImg ("cut_btn.png");
  cortador3.position (450,35);
  cortador3.size (70,70);
  cortador3.mouseClicked (cerveja3);

  ventilador = createImg("balloon.png")
  ventilador.position (100,175);
  ventilador.size (100,100);
  ventilador.mouseClicked (tornado);

  var fruit_options = {
    density: 0.001
  }

  fruit = Bodies.circle(300,300,15,fruit_options);
  
  Matter.Composite.add(rope.body,fruit);

  link = new Link(rope,fruit);
  link2 = new Link(rope2,fruit);
  link3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
imageMode (CENTER)
  
}

function draw() 
{
  background("");
  image(parede,width/2,height/2, canW,canH); 
  //ground.show();
  rope.show();
  rope2.show();
  rope3.show();

  if (fruit!=null){

  image(melancia,fruit.position.x,fruit.position.y,70,70);
}  
  Engine.update(engine);
if (bateu(fruit,coelho)== true)
{
  coelho.changeAnimation ("comendo");
somComendo.play ();

}
if(bateu(fruit,ground.body)== true) {
  coelho.changeAnimation ("triste");
somTriste.play();
}
drawSprites ();

}
 
 function cerveja (){
  rope.break ();
  link.cortar ();
  link = null;
somCorte.play ();
}

function cerveja2 (){
  rope2.break();
  link2.cortar();
  link2 = null;
  somCorte.play();
}

function bateu(body,sprite){
  if(body!= null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80){
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
    }
    else{
      return false;
    }
  }

}

function mutar(){
  if(somFundo.isPlaying()){
    somFundo.stop();
  }
  else{
    somFundo.play();
  }
}
function tornado (){
  Matter.Body.applyForce (fruit,{x:0 , y:0}, {x:0.05, y:0.05})
  somAr.play ()
}
function cerveja3 (){
  rope3.break();
  link3.cortar();
  link3 = null;
  somCorte.play();
}

