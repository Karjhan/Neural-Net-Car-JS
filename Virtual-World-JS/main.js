const mainCanvas = document.getElementById("myCanvas");
mainCanvas.width = 600;
mainCanvas.height = 600;

const mainContext = mainCanvas.getContext("2d");

const graphString = localStorage.getItem("graph");
const graphInfo = graphString ? JSON.parse(graphString) : null;
const graph = graphInfo ? Graph.load(graphInfo) : new Graph();
const viewport = new Viewport(mainCanvas);
const graphEditor = new GraphEditor(viewport, graph);

graph.draw(mainContext);
animate();

function animate(){
    viewport.reset();
    graphEditor.display(mainContext);
    requestAnimationFrame(animate);
}

// ------------------------------------------------------------------ //

function dispose(){
    graphEditor.dispose();
}

function save(){
    localStorage.setItem("graph", JSON.stringify(graph));
}

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