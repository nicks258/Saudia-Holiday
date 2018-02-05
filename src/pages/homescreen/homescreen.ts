import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ScreensaverPage} from "../screensaver/screensaver";

/**
 * Generated class for the HomescreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homescreen',
  templateUrl: 'homescreen.html',
})
export class HomescreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomescreenPage');
  }
  takeARefer(){
    this.navCtrl.push(ScreensaverPage,{optionSelected:"refer"});
  }
  takeAPhoto(){
    this.navCtrl.push(ScreensaverPage,{optionSelected:"photo"});
  }
}
