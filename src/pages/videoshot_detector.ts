import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Shot } from '../models/Shot'

@Component({
    selector: 'VideoShotDetector',
    templateUrl: './video_shot_detector.html',
  })

export class VideoShotDetector {
    title = 'videoshot detector';
    shots = Array<Shot>();
    lastFrameInPixel: Uint8ClampedArray;
    videoPlayer: HTMLVideoElement; 
    canvasBacking: HTMLCanvasElement; 
    canvasContext: CanvasRenderingContext2D;
    currentTime: number;

    ngOnInit() {
        this.videoPlayer = <HTMLVideoElement> document.getElementById("videoPlayer");
        this.canvasBacking = <HTMLCanvasElement> document.getElementById("backing");
        this.canvasContext = this.canvasBacking.getContext("2d");
        this.videoPlayer.addEventListener("play", this.onPlay.bind(this), false);
    }

 onPlay() {
     if (this.videoPlayer.paused || this.videoPlayer.ended) {
        return false;
     }
     var w = this.videoPlayer.clientWidth;
     var h = this.videoPlayer.clientHeight;

     //grab video pixels
     this.canvasContext.drawImage(this.videoPlayer, 0,0);
     var image = this.canvasContext.getImageData(0,0,w,h);

     if (this.lastFrameInPixel){
        this.currentTime = this.videoPlayer.currentTime; 
        this.calculateShotUsingTwinComparison.bind(this)(this.lastFrameInPixel, image);
     }
     this.lastFrameInPixel = image.data;
     setTimeout(this.onPlay.bind(this),1000/24.0);
    }

 calculateShotUsingTwinComparison(lastFrame: Uint8ClampedArray, image: ImageData){
        var nextFrame = image.data;
        var calculatedPixelArray = lastFrame.map(function (_, i): number {return lastFrame[i] - nextFrame[i];});
        var accumulatedDifferences = calculatedPixelArray.reduce((a,b) => a + b);
        //console.log(accumulatedDifferences);
        if (accumulatedDifferences > 1000000) {
            var newShot = new Shot(this.currentTime, this.getImagefromImageData.bind(this)(image));
            this.shots.push(newShot);
            console.log(newShot.startTime);
        } 
    } 

    getImagefromImageData(imagedata: ImageData): HTMLImageElement {
        
        this.canvasBacking.width = imagedata.width;
        this.canvasBacking.height = imagedata.height;
        this.canvasContext.putImageData(imagedata, 0, 0);
    
        var image = new Image();
        image.src = this.canvasBacking.toDataURL();
        return image;
    }
}
