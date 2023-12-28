const buttonGraph = document.getElementById("graphBtn");
const buttonStop = document.getElementById("stopBtn");
const buttonYield = document.getElementById("yieldBtn");
const buttonCrossing = document.getElementById("crossingBtn");
const buttonParking = document.getElementById("parkingBtn");
const buttonLight = document.getElementById("lightBtn");
const buttonStart = document.getElementById("startBtn");
const buttonTarget = document.getElementById("targetBtn");

const mainCanvas = document.getElementById("myCanvas");
mainCanvas.width = 600;
mainCanvas.height = 600;

const mainContext = mainCanvas.getContext("2d");

const graphString = localStorage.getItem("graph");
const graphInfo = graphString ? JSON.parse(graphString) : null;
const graph = graphInfo ? Graph.load(graphInfo) : new Graph();
const world = new World(graph);

const viewport = new Viewport(mainCanvas);
const tools = {
    graph: { button: graphBtn, editor: new GraphEditor(viewport, graph) },
    stop: { button: stopBtn, editor: new StopEditor(viewport, world) },
    crossing: { button: crossingBtn, editor: new CrossingEditor(viewport, world) },
    start: { button: startBtn, editor: new StartEditor(viewport, world) },
    parking: { button: parkingBtn, editor: new ParkingEditor(viewport, world) },
    light: { button: lightBtn, editor: new LightEditor(viewport, world) },
    target: { button: targetBtn, editor: new TargetEditor(viewport, world) },
    yield: { button: yieldBtn, editor: new YieldEditor(viewport, world) },
};

graph.draw(mainContext);
let oldGraphHash = graph.hash();
setMode("graph");
animate();

function animate(){
    viewport.reset();
    if(graph.hash() != oldGraphHash){
        world.generate();
        oldGraphHash = graph.hash();
    }
    const viewPoint = scale(viewport.getOffset(), -1);
    world.draw(mainContext, viewPoint);
    mainContext.globalAlpha = 0.3;
    for (const tool of Object.values(tools)) {
        tool.editor.display();
    }
    requestAnimationFrame(animate);
}

function setMode(mode){
    disableEditors();
    tools[mode].button.style.backgroundColor = "white";
    tools[mode].button.style.filter = "";
    tools[mode].editor.enable();    
}

function disableEditors(){
    for (const tool of Object.values(tools)) {
        tool.button.style.backgroundColor = "gray";
        tool.button.style.filter = "grayscale(100%)";
        tool.editor.disable();
    }
}

function dispose(){
    graphEditor.dispose();
    world.markings.length = 0;
}

function save(){
    localStorage.setItem("graph", JSON.stringify(graph));
}

// ------------------------------------------------------------------ //

function addRandomPoint(){
    const success = graph.tryAddPoint(
        new Point(
            Math.random()*mainCanvas.width,
            Math.random()*mainCanvas.height
        )
    );
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    graph.draw(mainContext);
}

function addRandomSegment(){
    const index1 = Math.floor(Math.random()*graph.points.length);
    const index2 = Math.floor(Math.random()*graph.points.length);
    const success = graph.tryAddSegment(
            new Segment(graph.points[index1], graph.points[index2])
        );
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    graph.draw(mainContext);
    console.log(success);
}

function removeRandomSegment(){
    if(graph.segments.length == 0){
        console.log("No segments!");
        return;
    }
    const index = Math.floor(Math.random()*graph.segments.length);
    graph.removeSegment(graph.segments[index]);
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    graph.draw(mainContext);
}

function removeRandomPoint(){
    if(graph.points.length == 0){
        console.log("No points!");
        return;
    }
    const index = Math.floor(Math.random()*graph.points.length);
    graph.removePoint(graph.points[index]);
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    graph.draw(mainContext);
}

function removeAll(){
    graph.dispose();
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    graph.draw(mainContext);
}