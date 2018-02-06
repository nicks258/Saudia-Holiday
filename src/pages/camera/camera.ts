import {Component, Input} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import {PreviewPage} from "../preview/preview";
/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  file_name_final : any;
  email;
  peopleDetail = {
    name:'',
    email:'',
    phone_number:''
  };
  phone_number;
  last_name;
  first_name;
  task: any;
  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: 'front',
    tapPhoto: false,
    previewDrag: false,
    toBack: true,
    alpha: 1,


  };

  picture;

  pictureOpts: CameraPreviewPictureOptions = {
    width: 1280,
    height: 1280,
    quality: 85
  };

  constructor(public navCtrl: NavController,private cameraPreview: CameraPreview, private file: File, public navParams: NavParams) {
    this.peopleDetail = navParams.get('peopleDetail');
    this.first_name = this.peopleDetail.name;
    this.phone_number = this.peopleDetail.phone_number;
    this.email= this.peopleDetail.email;
    console.log("Name->>> " + this.first_name);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');

    // this.startTimer();

  }
  timeInSeconds: number;
  show: boolean;
  time: number;
  remainingTime: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;

  ngOnInit() {
  }

  initTimer() {
    //Timer for 20 secs
    if (!this.timeInSeconds) { this.timeInSeconds = 20; }

    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;

    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }

  startTimer() {
    this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }

  pauseTimer() {
    this.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    setTimeout(() => {

      if (!this.runTimer) { return; }
      this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      }
      else {
        this.hasFinished = true;
        this.takeImage();
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0"      + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    if(parseInt(secondsString)==0)
    {
      this.show = false;
    }
    else if(parseInt(secondsString)==19)
    {
      this.startCamera();
      this.show = false;
    }
    else {
      this.show = true;
    }
    return secondsString;
  }
  startCamera(){
    this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
      (res) => {

        // alert(res);
        //
        // /*




      },
      (err) => {
        console.log(err);
        alert(err);
      });
  }
  takeImage(){
    this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      const img: string = imageData;
      const bytes: string = atob(img);
      const byteNumbers = new Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        byteNumbers[i] = bytes.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      const blob: Blob = new Blob([byteArray], { type: 'image/png' });
      this.file_name_final = imageData;
      this.cameraPreview.stopCamera();
      this.openPreview();
    }, (err) => {
      console.log(err);

    });
    // this.task = setTimeout( () => {
    //   this.openPreview();
    // }, 500);

  }
  openPreview(){
    let nav = this.navCtrl;
    console.log("Next Page");
    nav.push(PreviewPage, {people_detail:this.peopleDetail, file_name_final:this.file_name_final});
  }
  startCameraPreview(){
    this.initTimer();
    this.startTimer();
  }
}



