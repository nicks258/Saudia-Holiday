import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {IonicStorageModule} from "@ionic/storage";
import {HttpModule} from "@angular/http";
import {SQLite} from "@ionic-native/sqlite";
import {NativeStorage} from "@ionic-native/native-storage";
import {CameraPreview} from "@ionic-native/camera-preview";
import {Toast} from "@ionic-native/toast";
import {SQLitePorter} from "@ionic-native/sqlite-porter";
import { DatabaseProvider } from '../providers/database/database';
import {CameraPage} from "../pages/camera/camera";
import {ScreensaverPage} from "../pages/screensaver/screensaver";
import { File } from '@ionic-native/file';
import {HomescreenPage} from "../pages/homescreen/homescreen";
import {ReferPage} from "../pages/refer/refer";
import {OptionsPage} from "../pages/options/options";
import {PreviewPage} from "../pages/preview/preview";
import {TestPage} from "../pages/test/test";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestPage,
    PreviewPage,
    OptionsPage,
    ReferPage,
    HomescreenPage,
    ScreensaverPage,
    CameraPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{scrollAssist:false,
      autoFocusAssist:false}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TestPage,
    PreviewPage,
    OptionsPage,
    ReferPage,
    HomescreenPage,
    ScreensaverPage,
    CameraPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    NativeStorage,
    CameraPreview,
    HttpModule,
    File,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLitePorter,
    DatabaseProvider
  ]
})
export class AppModule {}
