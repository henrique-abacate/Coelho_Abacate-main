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
var rope;
var fruit;
var link;
var parede;
var melancia;
var pernalonga;
var coelho;
var cortador;
var salsicha, sadBoy, piscando;
var somFundo, somAr, somComendo, somTriste, somCorte;
var mudo;

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
  createCanvas(500,700);
  frameRate(80); //taxa de frames, geralmente: 30 frames/seg

  //som de fundo
  somFundo.play();
  somFundo.setVolume(0.1);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  
  rope = new Rope(6,{x:245,y:30});
  
  piscando.frameDelay = 20;
  salsicha.frameDelay = 30;

  coelho= createSprite (250,500,10,14);
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

  cortador = createImg ("cut_btn.png");
  cortador.position (185,35);
  cortador.size (70,70);
  cortador.mouseClicked (cerveja);
  var fruit_options = {
    density: 0.001
  }
  
  fruit = Bodies.circle(300,300,15,fruit_options);
  
  Matter.Composite.add(rope.body,fruit);

  link = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
imageMode (CENTER)
  
}

function draw() 
{
  background("");
  image (parede,width/2,height/2, 500,700); 
  ground.show();
  rope.show();


  if (fruit!=null){

  image(melancia,fruit.position.x,fruit.position.y,70,70);
}  
  Engine.update(engine);
if (bateu(fruit,coelho)== true )
{
  coelho.changeAnimation ("comendo");


}
if(bateu(fruit,ground.body)== true) {
  coelho.changeAnimation ("triste");
}
drawSprites ();

}
 
 function cerveja (){
  rope.break ();
  link.cortar ();
  link = null
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



