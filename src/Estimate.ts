import * as THREE from "three";

export interface FarthestPoints {
    distance : number,
    pair : [THREE.Vector2,THREE.Vector2]
}

export class DiameterEstimate {
    xMax?: THREE.Vector2;
    xMin?: THREE.Vector2;
    yMax?: THREE.Vector2;
    yMin?: THREE.Vector2;

    constructor(private pointList: THREE.Vector2[]) {}


    private reset() {
        this.xMax = undefined
        this.xMin = undefined
        this.yMax = undefined
        this.yMin = undefined
    }

    public approximateFarthestPairUsingCornerPoints() {
        this.reset()
        for (let point of this.pointList) {
            if (!this.xMax || point.x > this.xMax.x) {
                this.xMax = point;
            }

            if (!this.xMin || point.x < this.xMin.x) {
                this.xMin = point;
            }

            if (!this.yMax || point.y > this.yMax.y) {
                this.yMax = point;
            }

            if (!this.yMin || point.y < this.yMax.y) {
                this.yMin = point;
            }
        }

        let cornerPoints = [this.xMax!,this.xMin!,this.yMax!,this.yMin!]
        let cornerPointsFarthestPoints : FarthestPoints[] = cornerPoints.map(point => {
            return this.getMaxDistancePair(point)
        })

        let maxPair : FarthestPoints = cornerPointsFarthestPoints[0]
        for(let pair of cornerPointsFarthestPoints) {
            if(pair.distance > maxPair.distance) {
                maxPair = pair
            }
        }
        console.log("Max Cornerstone Distance = ",maxPair.distance)

        return maxPair.pair
    }

    private getMaxDistancePair(anchorPoint : THREE.Vector2) : FarthestPoints {

        let distance = 0
        let farthestPoint : THREE.Vector2
        for(let point of this.pointList) {
            let pointToAnchorPointDistance = point.distanceTo(anchorPoint)
            if(pointToAnchorPointDistance >= distance) {
                distance =  pointToAnchorPointDistance
                farthestPoint = point
            }
        }

        return {
            distance : distance,
            pair : [anchorPoint,farthestPoint!]
        }
    }

    public approximateFarthestPair(): [THREE.Vector2, THREE.Vector2] {
        this.reset()
        for (let point of this.pointList) {
            if (!this.xMax || point.x > this.xMax.x) {
                this.xMax = point;
            }

            if (!this.xMin || point.x < this.xMin.x) {
                this.xMin = point;
            }

            if (!this.yMax || point.y > this.yMax.y) {
                this.yMax = point;
            }

            if (!this.yMin || point.y < this.yMax.y) {
                this.yMin = point;
            }
        }

        let centerAverage = new THREE.Vector2((this.xMax!.x - this.xMin!.x) / 2, (this.yMax!.y - this.yMin!.y) / 2);

        //Calculate point that is farthest away from "center"
        let distance = 0;
        //Will be member one of farthest pair
        let farthestPoint: THREE.Vector2;
        for (let point of this.pointList) {
            let pointToCenterDistance = centerAverage.distanceTo(point);
            if (pointToCenterDistance >= distance) {
                distance = pointToCenterDistance;
                farthestPoint = point;
            }
        }

        //Calculate point that is farthest away from first member
        let secondDistance = 0;
        let farthestCounterPoint: THREE.Vector2;
        for (let point of this.pointList) {
            let pointToCenterDistance = farthestPoint!.distanceTo(point);
            if (pointToCenterDistance >= secondDistance) {
                secondDistance = pointToCenterDistance;
                farthestCounterPoint = point;
            }
        }

        console.log("Max Distance Approx = ", secondDistance);
        return [farthestPoint!, farthestCounterPoint!];
    }

    public calculateFarthestPair(): [THREE.Vector2, THREE.Vector2] {

        let maxDistance = 0
        let pointPair : [THREE.Vector2,THREE.Vector2]

        for(let firstPoint of this.pointList) {
            let maxDistanceToFirstPoint = 0
            let counterPoint : THREE.Vector2
            for(let secondPoint of this.pointList) {
                let distanceFirstToSecond = firstPoint.distanceTo(secondPoint)
                if(distanceFirstToSecond >= maxDistanceToFirstPoint) {
                    maxDistanceToFirstPoint = distanceFirstToSecond
                    counterPoint = secondPoint
                }
            }
            if(maxDistanceToFirstPoint >= maxDistance) {
                pointPair = [firstPoint,counterPoint!]
                maxDistance = maxDistanceToFirstPoint
            }
        }

        console.log("Max Distance Real = ",maxDistance)
        return pointPair!
    }
}
