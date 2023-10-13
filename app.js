document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function() {
        var scene = new BABYLON.Scene(engine);
        
        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, false);       
        
        var plane = BABYLON.MeshBuilder.CreatePlane("plane", {width: 16, height: 9}, scene);
        plane.position.y = 10;
        
        // Light
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
        
        var imageMaterial = new BABYLON.StandardMaterial("imageMaterial", scene);
        imageMaterial.diffuseTexture = new BABYLON.Texture("/images/skyrun-home.webp", scene);
        imageMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1); // Ensure the image isn't affected by scene lighting
        
        var imagePlane = BABYLON.MeshBuilder.CreatePlane("imagePlane", {width:10, height:10}, scene);
        imagePlane.material = imageMaterial;
        imagePlane.position.z = -5;
        
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
