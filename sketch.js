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


function setup() 
{
  createCanvas(500,700);
  frameRate(80); //taxa de frames, geralmente: 30 frames/seg
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  
  rope = new Rope(6,{x:245,y:30});
  
coelho= createSprite (250,500,10,14);
coelho.addImage(pernalonga);
coelho.scale= 0.25; 

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

  image(melancia,fruit.position.x,fruit.position.y,70,70);
  
  Engine.update(engine);

  drawSprites ()
}
 function preload (){
    parede = loadImage ("background.png");
    melancia = loadImage ("melon.png");
    pernalonga = loadImage ("Rabbit-01.png");
 }


 function cerveja (){
  rope.break ();
  link.cortar ();
  link = null
}



