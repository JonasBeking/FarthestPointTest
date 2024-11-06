import * as THREE from "three"
import { Point } from "./points";

export class Sorting {
    private vectorPoints : THREE.Vector2[] = []
    private original : Point[] = [];
    private xSorted : Point[] = [];
    private ySorted : Point[] = [];
    readonly pointCount = 50;

    constructor() {
        
        const range = 5;

        for (let i = 0; i < this.pointCount; i++) {
            const x = (Math.random() - 0.5) * range * 2;
            const y = (Math.random() - 0.5) * range * 2;
            const vec = new THREE.Vector2(x, y)
            this.vectorPoints.push(vec);
            this.original.push(new Point(vec))
        }

        //n log n
        this.xSorted = this.original.sort((a,b) => {
            return a.vec.x - b.vec.x
        })

        //n log n
        this.ySorted = this.original.sort((a,b) => {
            return a.vec.y - b.vec.y
        })

        //Find closest distancepair for x
        //n
        for(let i = 1; i < this.pointCount - 1; i++) {
            let previousPoint = this.xSorted[i - 1]
            let currentPoint = this.xSorted[i]
            let nextPoint = this.xSorted[i + 1]
            let distanceUp = nextPoint.vec.x - currentPoint.vec.x
            let distanceDown = currentPoint.vec.x - previousPoint.vec.x

            if(previousPoint.distanceXUp === undefined) {
                previousPoint.distanceXUp = distanceDown
            }
            
            if(currentPoint.distanceXDown === undefined) {
                currentPoint.distanceXDown = distanceDown
            }

            currentPoint.distanceXUp = distanceUp
            nextPoint.distanceXDown = distanceUp
        }

        //Find closest distancepair for x
        //n
        for(let i = 1; i < this.pointCount - 1; i++) {
            let previousPoint = this.ySorted[i - 1]
            let currentPoint = this.ySorted[i]
            let nextPoint = this.ySorted[i + 1]
            let distanceUp = nextPoint.vec.y - currentPoint.vec.y
            let distanceDown = currentPoint.vec.y - previousPoint.vec.y

            if(previousPoint.distanceYUp === undefined) {
                previousPoint.distanceYUp = distanceDown
            }
            
            if(currentPoint.distanceYDown === undefined) {
                currentPoint.distanceYDown = distanceDown
            }

            currentPoint.distanceYUp = distanceUp
            nextPoint.distanceYDown = distanceUp
        }

        for(let i = 1; i < this.pointCount - 1; i++) {
            
        }


    }
}
