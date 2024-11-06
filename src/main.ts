import { DiameterEstimate } from "./Estimate";
import "./style.css";

import * as THREE from "three";

function addPoints(list : THREE.Vector2[],center : THREE.Vector2,range : number,amount : number) {
  for (let i = 0; i < amount; i++) {
    const x = center.x + (Math.random() - 0.5) * 2 * range
    const y = center.y + (Math.random() - 0.5) * 2 * range
    const vec = new THREE.Vector2(x, y);
    list.push(vec);
}
}

function createScene() {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const vectorList : THREE.Vector2[] = [];

    addPoints(vectorList,new THREE.Vector2(4,2),1,30)
    addPoints(vectorList,new THREE.Vector2(2,5),1,30)
    addPoints(vectorList,new THREE.Vector2(2,8),1,30)
    addPoints(vectorList,new THREE.Vector2(4,12),1,30)

    addPoints(vectorList,new THREE.Vector2(7,2),1,30)
    addPoints(vectorList,new THREE.Vector2(10,5),1,30)
    addPoints(vectorList,new THREE.Vector2(10,8),1,30)
    addPoints(vectorList,new THREE.Vector2(7,12),1,30)



    const estimate = new DiameterEstimate(vectorList);
    const estimatedPointPair = estimate.approximateFarthestPair();
    console.log(estimatedPointPair);
    const estimatedCornerPointPair = estimate.approximateFarthestPairUsingCornerPoints();
    console.log(estimatedCornerPointPair);
    const actualPointPair = estimate.calculateFarthestPair();
    console.log(actualPointPair);

    // Convert Vector2 points to Vector3 for Three.js compatibility (setting z = 0)
    const points3D = vectorList.map((point) => new THREE.Vector3(point.x, point.y, 0));

    // Create the geometry and add points
    const geometry = new THREE.BufferGeometry().setFromPoints(points3D);

    // Define material (set color and size)
    const material = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.1 });

    // Create the Points object
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Set the camera position
    camera.position.z = 20;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

// Initialize the scene
createScene();
