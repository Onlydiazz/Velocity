// Inicializar Babylon.js
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

let scene;
let camera;
let car;
let ball;
let scoreA = 0;
let scoreB = 0;

// Configuração de física
const gravity = new BABYLON.Vector3(0, -9.81, 0);
const physicsPlugin = new BABYLON.CannonJSPlugin();

function createScene() {
    scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;
    scene.gravity = gravity;
    scene.enablePhysics(gravity, physicsPlugin);

    // Câmera
    camera = new BABYLON.UniversalCamera('camera1', new BABYLON.Vector3(0, 15, -25));
    camera.attachControl(canvas, true);
    camera.inertia = 0.7;
    camera.angularSensibility = 1000;

    // Luz
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.9;

    const sunLight = new BABYLON.PointLight('sunLight', new BABYLON.Vector3(20, 30, 20), scene);
    sunLight.intensity = 0.8;

    // Piso do campo
    createField();

    // Bola
    createBall();

    // Carro do jogador
    createCar();

    // Gols
    createGoals();

    return scene;
}

function createField() {
    // Tamanho do campo
    const fieldWidth = 100;
    const fieldLength = 150;

    // Material do piso
    const fieldMaterial = new BABYLON.StandardMaterial('fieldMat', scene);
    fieldMaterial.diffuse = new BABYLON.Color3(0.1, 0.5, 0.1);
    fieldMaterial.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    // Piso principal
    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: fieldWidth, height: fieldLength }, scene);
    ground.material = fieldMaterial;
    
    // Física do piso
    const groundPhysics = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.2 }, scene);

    // Paredes
    const wallMaterial = new BABYLON.StandardMaterial('wallMat', scene);
    wallMaterial.diffuse = new BABYLON.Color3(0.3, 0.3, 0.3);

    // Parede frontal
    const wallFront = BABYLON.MeshBuilder.CreateBox('wallFront', { width: fieldWidth, height: 10, depth: 2 }, scene);
    wallFront.position.z = fieldLength / 2;
    wallFront.material = wallMaterial;
    new BABYLON.PhysicsImpostor(wallFront, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5 }, scene);

    // Parede traseira
    const wallBack = BABYLON.MeshBuilder.CreateBox('wallBack', { width: fieldWidth, height: 10, depth: 2 }, scene);
    wallBack.position.z = -fieldLength / 2;
    wallBack.material = wallMaterial;
    new BABYLON.PhysicsImpostor(wallBack, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5 }, scene);

    // Parede esquerda
    const wallLeft = BABYLON.MeshBuilder.CreateBox('wallLeft', { width: 2, height: 10, depth: fieldLength }, scene);
    wallLeft.position.x = -fieldWidth / 2;
    wallLeft.material = wallMaterial;
    new BABYLON.PhysicsImpostor(wallLeft, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5 }, scene);

    // Parede direita
    const wallRight = BABYLON.MeshBuilder.CreateBox('wallRight', { width: 2, height: 10, depth: fieldLength }, scene);
    wallRight.position.x = fieldWidth / 2;
    wallRight.material = wallMaterial;
    new BABYLON.PhysicsImpostor(wallRight, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5 }, scene);
}

function createBall() {
    const ballMaterial = new BABYLON.StandardMaterial('ballMat', scene);
    ballMaterial.diffuse = new BABYLON.Color3(1, 1, 1);
    ballMaterial.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    ballMaterial.shininess = 64;

    ball = BABYLON.MeshBuilder.CreateSphere('ball', { diameter: 2 }, scene);
    ball.material = ballMaterial;
    ball.position = new BABYLON.Vector3(0, 2, 0);

    // Física da bola
    ball.physicsImpostor = new BABYLON.PhysicsImpostor(
        ball,
        BABYLON.PhysicsImpostor.SphereImpostor,
        { mass: 1, restitution: 0.9, friction: 0.5 },
        scene
    );
}

function createCar() {
    const carMaterial = new BABYLON.StandardMaterial('carMat', scene);
    carMaterial.diffuse = new BABYLON.Color3(1, 0, 0);

    // Carroceria
    car = BABYLON.MeshBuilder.CreateBox('car', { width: 2, height: 1.5, depth: 4 }, scene);
    car.material = carMaterial;
    car.position = new BABYLON.Vector3(0, 1.5, -30);

    // Física do carro
    car.physicsImpostor = new BABYLON.PhysicsImpostor(
        car,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 2, restitution: 0.3, friction: 1 },
        scene
    );

    // Rodas (visuais)
    const wheelMaterial = new BABYLON.StandardMaterial('wheelMat', scene);
    wheelMaterial.diffuse = new BABYLON.Color3(0.2, 0.2, 0.2);

    const wheelPositions = [
        new BABYLON.Vector3(-0.8, 0.3, -1),
        new BABYLON.Vector3(0.8, 0.3, -1),
        new BABYLON.Vector3(-0.8, 0.3, 1),
        new BABYLON.Vector3(0.8, 0.3, 1),
    ];

    wheelPositions.forEach(pos => {
        const wheel = BABYLON.MeshBuilder.CreateCylinder('wheel', { diameter: 0.8, height: 0.4 }, scene);
        wheel.material = wheelMaterial;
        wheel.parent = car;
        wheel.position = pos;
        wheel.rotation.z = Math.PI / 2;
    });
}

function createGoals() {
    const goalMaterial = new BABYLON.StandardMaterial('goalMat', scene);
    goalMaterial.diffuse = new BABYLON.Color3(0, 1, 1);
    goalMaterial.alpha = 0.3;

    // Gol da equipe B (frente)
    const goalB = BABYLON.MeshBuilder.CreateBox('goalB', { width: 20, height: 8, depth: 4 }, scene);
    goalB.position = new BABYLON.Vector3(0, 4, 73);
    goalB.material = goalMaterial;
    goalB.isTrigger = true;
    goalB.physicsImpostor = new BABYLON.PhysicsImpostor(goalB, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

    // Gol da equipe A (trás)
    const goalA = BABYLON.MeshBuilder.CreateBox('goalA', { width: 20, height: 8, depth: 4 }, scene);
    goalA.position = new BABYLON.Vector3(0, 4, -73);
    goalA.material = goalMaterial;
    goalA.isTrigger = true;
    goalA.physicsImpostor = new BABYLON.PhysicsImpostor(goalA, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
}

// Controles do carro
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false
};

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w') keys.w = true;
    if (key === 'a') keys.a = true;
    if (key === 's') keys.s = true;
    if (key === 'd') keys.d = true;
    if (key === ' ') { keys.space = true; e.preventDefault(); }
});

window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w') keys.w = false;
    if (key === 'a') keys.a = false;
    if (key === 's') keys.s = false;
    if (key === 'd') keys.d = false;
    if (key === ' ') keys.space = false;
});

function updateCarMovement() {
    if (!car || !car.physicsImpostor) return;

    const speed = 50;
    const force = new BABYLON.Vector3(0, 0, 0);
    const carDirection = BABYLON.Vector3.Forward().applyRotationQuaternionToRef(car.absoluteRotation, new BABYLON.Vector3());

    if (keys.w) {
        force.addInPlace(carDirection.scale(speed));
    }
    if (keys.s) {
        force.addInPlace(carDirection.scale(-speed));
    }
    if (keys.a) {
        car.rotate(BABYLON.Axis.Y, 0.05, BABYLON.Space.WORLD);
    }
    if (keys.d) {
        car.rotate(BABYLON.Axis.Y, -0.05, BABYLON.Space.WORLD);
    }
    if (keys.space && car.position.y < 3) {
        car.physicsImpostor.applyForce(
            new BABYLON.Vector3(0, 500, 0),
            car.getAbsolutePosition()
        );
    }

    if (force.length() > 0) {
        car.physicsImpostor.applyForce(force, car.getAbsolutePosition());
    }
}

function checkGoals() {
    if (ball.position.z > 70) {
        scoreA++;
        resetBall();
    } else if (ball.position.z < -70) {
        scoreB++;
        resetBall();
    }

    document.getElementById('team-a').textContent = scoreA;
    document.getElementById('team-b').textContent = scoreB;
}

function resetBall() {
    ball.position = new BABYLON.Vector3(0, 5, 0);
    ball.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero());
    ball.physicsImpostor.setAngularVelocity(BABYLON.Vector3.Zero());
}

function render() {
    engine.runRenderLoop(() => {
        updateCarMovement();
        checkGoals();
        
        // Atualizar câmera para seguir o carro
        if (car) {
            const offset = new BABYLON.Vector3(0, 12, -25);
            const targetPosition = car.position.add(offset);
            camera.position = BABYLON.Vector3.Lerp(camera.position, targetPosition, 0.1);
            camera.setTarget(car.position.add(new BABYLON.Vector3(0, 3, 0)));
        }

        scene.render();
    });
}

window.addEventListener('resize', () => {
    engine.resize();
});

// Iniciar o jogo
createScene();
render();
