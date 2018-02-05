import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {NativeStorage} from "@ionic-native/native-storage";

/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {
  username:any;
  password:any;
  developers = [];
  developer = {};
  location:any;
  constructor(public nativeStorage: NativeStorage, public databaseprovider:DatabaseProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }
  authenticate(){
    this.nativeStorage.setItem('authentication', {username: this.username, password: this.password,location: this.location})
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );

    console.log("Native Storage->>");

  }

  sync(){
    this.databaseprovider.getAllDevelopers().then(data => {
      this.developers = data;
      console.log(data);
    })
  }
}
