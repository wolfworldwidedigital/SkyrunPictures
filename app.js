document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    // Skybox
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size: 2000.0}, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox/", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

    // Camera
    var camera = new BABYLON.ArcRotateCamera("camera", 3, 2, 1, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.upperRadiusLimit = 500.0;
    camera.lowerRadiusLimit = 10;
    camera.fov = BABYLON.Tools.ToRadians(80);

    // Light
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;


   
    const spheres = [];

    function createSpheres() {
        for (let i = 0; i < 4; i++) {
            const sphere = BABYLON.MeshBuilder.CreateSphere(`sphere${i}`, {diameter: 2}, scene);
            sphere.position.x = Math.random() * 20 - 10;
            sphere.position.y = Math.random() * 20 - 10;
            sphere.position.z = Math.random() * 20 - 10;
            
            spheres.push(sphere);
        }
    }
    createSpheres();

    scene.registerBeforeRender(function() {
        spheres.forEach(sphere => {
            // Gentle movement
            sphere.position.x += Math.sin(new Date().getTime() / 1000) / 100;
            sphere.position.y += Math.cos(new Date().getTime() / 1000) / 100;
    
            // Color change
            const r = (Math.sin(new Date().getTime() / 1000) + 1) / 2;
            const g = (Math.cos(new Date().getTime() / 1000) + 1) / 2;
            const b = (Math.sin(new Date().getTime() / 500) + 1) / 2;
    
            if (!sphere.material) {
                sphere.material = new BABYLON.StandardMaterial(`material${sphere.name}`, scene);
            }
            sphere.material.emissiveColor = new BABYLON.Color3(r, g, b);
        });
    });

    const urls = [
        "https://skyrun.pictures/about/",
        "https://skyrun.pictures/contact/",
        "https://skyrun.pictures/movies/",
        "https://skyrun.pictures/blog/"
    ];
    
    spheres.forEach((sphere, index) => {
        sphere.actionManager = new BABYLON.ActionManager(scene);
    
        // Hover
        sphere.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function() {
            sphere.scaling = new BABYLON.Vector3(2.5, 2.5, 2.5);
        }));
        sphere.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function() {
            sphere.scaling = new BABYLON.Vector3(1, 1, 1);
        }));
    
        // Click
        sphere.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function() {
            window.location.href = urls[index]; 
        }));
    });

    // Define the sphere
        var sphere = BABYLON.MeshBuilder.CreateSphere("mysphere", {diameter: 2}, scene); // Here, I've named it "mysphere" and given it a diameter of 2 units. Adjust as needed.
    sphere.position = new BABYLON.Vector3(0, 0, 0); // Position the sphere at the origin. Adjust the position as needed.
sphere.material = new BABYLON.StandardMaterial("sphereMaterial", scene); // Create a material for the sphere.
sphere.material.diffuseTexture = new BABYLON.Texture("images/1.jpg", scene); // Give the material a texture.
sphere.material.diffuseTexture.hasAlpha = true; // Ensure the texture's transparency displays correctly.
sphere.material.backFaceCulling = true; // Show the inside and outside of the sphere.
sphere.material.diffuseTexture.uScale = 5; // Adjust the horizontal tiling of the texture.
sphere.material.diffuseTexture.vScale = 5; // Adjust the vertical tiling of the texture.


    // Pointer
        scene.onPointerObservable.add((pointerInfo) => {
    switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERMOVE:
            if (pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh === sphere) {
                // If the pointer is over the sphere, change the cursor style.
                canvas.style.cursor = "url('images/magnifying-cursor.png'), auto";
            } else {
                // If the pointer is not over the sphere, reset the cursor style.
                canvas.style.cursor = "url('images/laserdot.png'), auto";
            }
            break;
    }
});

scene.onPointerObservable.add((pointerInfo) => {
    switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERMOVE:
            if (pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh === sphere) {
                // If the pointer is over the sphere, change the cursor style.
                canvas.style.cursor = "url('images/magnifying-cursor.png'), auto";
            } else {
                // If the pointer is not over the sphere, reset the cursor style.
                canvas.style.cursor = "url('images/laserdot.png'), auto";
            }
            break;
    }
});


    // Pointer
        scene.onPointerObservable.add((pointerInfo) => {
    switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERMOVE:
            if (pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh === sphere) {
                // If the pointer is over the sphere, change the cursor style.
                canvas.style.cursor = "url('images/magnifying-cursor.png'), auto";
            } else {
                // If the pointer is not over the sphere, reset the cursor style.
                canvas.style.cursor = "url('images/laserdot.png'), auto";
            }
            break;
    }
});


    window.addEventListener('resize', function() {
        engine.resize();
    });

    // Render Loop
    engine.runRenderLoop(function() {    
        scene.render();
    }   
    );

    engine.runRenderLoop(function() {
        scene.render();
    });

    window.addEventListener('resize', function() {
        engine.resize();
    });
});