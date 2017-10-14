import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { VideoShotDetectorModule } from '../pages/videoshot_detector.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VideoShotDetectorModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
