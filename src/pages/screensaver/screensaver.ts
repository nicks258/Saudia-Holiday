import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, } from 'ionic-angular';
import {HomePage} from "../home/home";
import {ReferPage} from "../refer/refer";

import {Toast} from "@ionic-native/toast";
import {CameraPage} from "../camera/camera";
import {Headers, Http} from "@angular/http";
import {OptionsPage} from "../options/options";


/**
 * Generated class for the ScreensaverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-screensaver',
  templateUrl: 'screensaver.html',
})
export class ScreensaverPage {
  optionSelected:any;
  constructor( public http :Http,public toast: Toast, public navCtrl: NavController, public navParams: NavParams) {
    this.optionSelected = this.navParams.get("optionSelected");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScreensaverPage');
  }
  options(){
    this.navCtrl.push(OptionsPage,{animate: true, animation:'transition',duration:300, direction: 'forward'})
  }
  enterADraw(){
    let nav = this.navCtrl;

  }
  takeAShot(){
    let nav = this.navCtrl;

    // if(this.optionSelected.equals("refer"))
    // {
    //   console.log("Take A Shot");
    //   nav.push(ReferPage, {optionSelected:this.optionSelected, animate: true, animation:'transition',duration:300, direction: 'forward'});
    // }
    // else
      {
      console.log("Take -> " + this.optionSelected);
      nav.push(HomePage, {optionSelected:this.optionSelected,animate: true, animation:'transition',duration:300, direction: 'forward'});
    }
  }

}
