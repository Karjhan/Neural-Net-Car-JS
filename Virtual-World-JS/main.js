const mainCanvas = document.getElementById("myCanvas");
mainCanvas.width = 600;
mainCanvas.height = 600;

const mainContext = mainCanvas.getContext("2d");

const p1 = new Point(200, 200);
const p2 = new Point(500, 200);
const p3 = new Point(400, 400);
const p4 = new Point(100, 300);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p1, p3);
const s3 = new Segment(p1, p4);
const s4 = new Segment(p2, p3);

const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4]);
const graphEditor = new GraphEditor(mainCanvas, graph);

graph.draw(mainContext);
animate();

function animate(){
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    graphEditor.display(mainContext);
    requestAnimationFrame(animate);
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