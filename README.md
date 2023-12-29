# Neural-Net-Car-JS

## Description
A set of apps in JS with the final purpose of displaying the capabilities of a neural network from scratch in JS.
It contains a virtual world editor for creating and generating the setup. The result will be stored in a file which will be used for the training part.
The project is heavily inspired from the project of professor Radu Marinescu-Istodor, lecturer in Computer Science at University of Eastern Finland.

## Tools and technologies learned
- recap of JS, HTML and CSS
- canvas display, design and load
- OSM (Open Street Map) 
- math fundamentals (ex: distances, projections, etc.)
- graphs and optimization
- neural network fundamentals

## Virtual World Editor
Everything begins with this part, where you have to generate your world and export it.
In order to open the project, navigate to *Virtual-World-JS/src/index.html*. 
You have to serve this file in the browser. A simple solution is the Live Server extension in VS Code.

Simply right-click the file and open using the extension server.

![VirtualWorldSetup](./screenshots/SSVirtualWorldSetup.png)

The editor supports: 
1. addition of roads and intersections
2. importing a world from a file
3. saving a world in file format and localstorage(if size allows it)
4. deleting the current world (clearing the canvas)
5. addition of markings:
    - stop
    - yield
    - crossing
    - parking
    - target
    - start (start point for a car)
    - light

## Self Driving Car
The project itself lies in a separate folder and the union with an existing world in another folder.
The main purpose is to setup a testing environment for a neural network to learn how drive a car based on the setup.
There are no UI controls for this one, so the car input scenario, or the neural network can be reconfigured from code.

In order to open the project, navigate to *Project-Joins/src/index.html*. 
You have to serve this file in the browser. A simple solution is the Live Server extension in VS Code.

Simply right-click the file and open using the extension server.

![VirtualWorldSetup](./screenshots/SSProjectJoinsSetup1.png)