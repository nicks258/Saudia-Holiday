import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScreensaverPage } from './screensaver';

@NgModule({
  declarations: [
    ScreensaverPage,
  ],
  imports: [
    IonicPageModule.forChild(ScreensaverPage),
  ],
})
export class ScreensaverPageModule {}
