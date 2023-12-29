const carCanvas = document.getElementById("carCanvas");
carCanvas.width = window.innerWidth - 430;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 400;

const miniMapCanvas = document.getElementById("miniMapCanvas");
miniMapCanvas.width = 400;
miniMapCanvas.height = 400;

carCanvas.height = window.innerHeight;
networkCanvas.height = window.innerHeight-400;

const carContext = carCanvas.getContext("2d");
const networkContext = networkCanvas.getContext("2d");

// const worldString = localStorage.getItem("world");
// const worldInfo = worldString ? JSON.parse(worldString) : null;
// const world = worldInfo ? World.load(worldInfo) : new World(new Graph());
const viewport = new Viewport(carCanvas, world.zoom, world.offset);
const miniMap = new MiniMap(miniMapCanvas, world.graph, 400);

const N = 200;
const cars = generateCars(N);
let bestCar = cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0; i<cars.length; i++){
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain"));
        if(i !== 0)[
            NeuralNetwork.mutate(cars[i].brain, 0.25)
        ]
    }
}

const traffic=[];
const roadBorders = world.roadBorders.map((s) => [s.p1, s.p2]);

animate();

function save(){
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function animate(time){
    for(let i=0; i<traffic.length; i++){
        traffic[i].update(roadBorders, []);
    }

    for(let i=0; i<cars.length; i++){
        cars[i].update(roadBorders, traffic);
    }

    const bestCar = cars.find(c => c.fitness === Math.max(...cars.map(c => c.fitness)));

    world.cars = cars;
    world.bestCar = bestCar;

    viewport.offset.x = -bestCar.x;
    viewport.offset.y = -bestCar.y;

    viewport.reset();
    const viewPoint = scale(viewport.getOffset(), -1);
    world.draw(carContext, viewPoint, false);
    miniMap.update(viewPoint);

    for(let i=0; i<traffic.length; i++){
        traffic[i].draw(carContext);
    }

    networkContext.lineDashOffset = time/50;
    networkContext.clearRect(0, 0, networkCanvas.width, networkCanvas.height);
    Visualizer.drawNetwork(networkContext, bestCar.brain);
    requestAnimationFrame(animate);
}

function generateCars(N){
    const startPoints = world.markings.filter((m) => m instanceof Start);
    const startPoint = startPoints.length > 0 ? startPoints[0].center : new Point(100, 100);
    const dir = startPoints.length > 0 ? startPoints[0].directionVector : new Point(0, -1);
    const startAngle = Math.PI/2 - angle(dir);
    const cars = [];
    for (let i = 0; i < N; i++) {
        cars.push(new Car(startPoint.x, startPoint.y, 30, 50, "AI", startAngle));
    }
    return cars;
}