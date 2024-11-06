import * as THREE from "three";

export class Point {
    distanceYUp: undefined | number = undefined;
    distanceYDown: undefined | number = undefined;
    distanceXUp: undefined | number = undefined;
    distanceXDown: undefined | number = undefined;

    constructor(public vec: THREE.Vector2) {}

    setClosestY(y: number) {}

    setClosestX(x: number) {}
}
