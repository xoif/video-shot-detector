import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
    selector: 'VideoShotDetector',
    templateUrl: './video_shot_detector.html',
  })

export class VideoShotDetector {
    title = 'videoshot detector';
    lastFrameInPixel: Uint8ClampedArray;
    videoPlayer: HTMLVideoElement; 
    canvasBacking: HTMLCanvasElement; 
    canvasContext: CanvasRenderingContext2D;

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
        this.calculateShotUsingTwinComparison(this.lastFrameInPixel, image.data);
     }
     this.lastFrameInPixel = image.data;
     setTimeout(this.onPlay.bind(this),1000/24.0);
    }

 calculateShotUsingTwinComparison(lastFrame: Uint8ClampedArray, nextFrame: Uint8ClampedArray){
        var detection;
        //bring in nextFrame
        var calculatedPixelArray = lastFrame.map(function (oldPixel: number, newPixel:number): number {return oldPixel - newPixel;});
        var accumulatedDifferences = calculatedPixelArray.reduce((a,b) => a + b);
        console.log(accumulatedDifferences);
        if (accumulatedDifferences > ?) {
            console.log("shot");
        }
    }
}
