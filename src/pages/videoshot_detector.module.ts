import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { VideoShotDetector } from '../pages/videoshot_detector';

@NgModule({
  declarations: [
    VideoShotDetector
  ],
  imports: [
    BrowserModule
 
  ],
  exports: [
    VideoShotDetector
  ]
})export class VideoShotDetectorModule { 



}
