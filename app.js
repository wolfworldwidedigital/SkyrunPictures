// Ensure Babylon is loaded before executing this
document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function() {
        var scene = new BABYLON.Scene(engine);
// Put the Babylon.js code here
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, 0), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);

    // Rest of the code (image, custom cursor) will go here
    var imageMaterial = new BABYLON.StandardMaterial("imageMaterial", scene);
imageMaterial.diffuseTexture = new BABYLON.Texture("/images/laserdot.png", scene);
imageMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1); // Ensure the image isn't affected by scene lighting

var imagePlane = BABYLON.MeshBuilder.CreatePlane("imagePlane", {width:10, height:10}, scene);
imagePlane.material = imageMaterial;
imagePlane.position.z = -5; // Adjust as needed

    var imageMaterial = new BABYLON.StandardMaterial("imageMaterial", scene);
imageMaterial.diffuseTexture = new BABYLON.Texture("/images/skyrun-home.webp", scene);
imageMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1); // Ensure the image isn't affected by scene lighting

var imagePlane = BABYLON.MeshBuilder.CreatePlane("imagePlane", {width:10, height:10}, scene);
imagePlane.material = imageMaterial;
imagePlane.position.z = -5; // Adjust as needed

document.body.style.cursor = 'none';
var cursorMaterial = new BABYLON.StandardMaterial("cursorMaterial", scene);
cursorMaterial.diffuseTexture = new BABYLON.Texture("/assets/img/giant-scope.png", scene);
cursorMaterial.diffuseTexture.hasAlpha = true; // Assuming the cursor image has transparency
cursorMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);

var cursorPlane = BABYLON.MeshBuilder.CreatePlane("cursorPlane", {width: 1, height: 1}, scene); // Adjust size as needed
cursorPlane.material = cursorMaterial;
cursorPlane.position.z = -1; // This ensures the cursor is always in front of the main image

// Follow camera movement
scene.onBeforeRenderObservable.add(() => {
    let pickInfo = scene.pick(scene.pointerX, scene.pointerY);
    if (pickInfo.hit) {
        cursorPlane.position.x = pickInfo.pickedPoint.x;
        cursorPlane.position.y = pickInfo.pickedPoint.y;
    }
});

var hotspotMaterial = new BABYLON.StandardMaterial("hotspotMaterial", scene);
hotspotMaterial.alpha = 0;  // Make it invisible

var hotspot = BABYLON.MeshBuilder.CreatePlane("hotspot", {width: 1, height: 1}, scene);
hotspot.material = hotspotMaterial;
hotspot.position = new BABYLON.Vector3(x, y, z); // Position it where you want on the image

hotspot.actionManager = new BABYLON.ActionManager(scene);
hotspot.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
    BABYLON.ActionManager.OnPointerOverTrigger,
    function() {
        // Zoom in or any other effect
    }
));
hotspot.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
    BABYLON.ActionManager.OnPickTrigger,
    function() {
        // Navigate to the desired page or any other action
    }
));
}
        return scene;
    };

    var scene = createScene();
    engine.runRenderLoop(function() {
        scene.render();
    });

    window.addEventListener('resize', function() {
        engine.resize();
    });
});