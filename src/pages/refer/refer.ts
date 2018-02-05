import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, Http} from "@angular/http";
import {DatabaseProvider} from "../../providers/database/database";
import {NativeStorage} from "@ionic-native/native-storage";

/**
 * Generated class for the ReferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-refer',
  templateUrl: 'refer.html',
})
export class ReferPage {
  funct: any;
  name;
  location;
  username;
  password;
  developers = [];
  developer = {};
  phone_number;
  constructor(public nativeStorage: NativeStorage, public databaseprovider:DatabaseProvider, public http:Http , public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReferPage');
  }
  sendToServer(){

    this.nativeStorage.getItem('authentication')
      .then(
        data => console.log(data.username +"->" + data.password+"->" + data.location,
        this.location = data.location,
        this.username = data.username,
        this.password = data.password),
        error => console.error(error)
      );
    this.addLocalDB();
    let body = new FormData();
    let date = new Date('2013-03-10T02:00:00Z');

    body.append('location', this.location);
    body.append('name',this.name);
    body.append('mobile',this.phone_number);
    body.append('email',"NA");
    body.append('clicked_on',date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate());
    body.append('user_id',this.username);
    body.append('password',this.password);
    let headers = new Headers();
    let options = { headers: headers };
    this.http.post('http://rayqube.com/projects/saudia_photobooth/savereferal_rest/', body , options ).subscribe(data => {
      console.log(data);
      let data_to_use = data.json();
      console.log(data_to_use);
    });
  }
  addLocalDB() {
    let nav = this.navCtrl;
    console.log("Button Clicked");
    //TODO Code for inserting in sqlite
    this.databaseprovider.addReferEntry(this.name,this.phone_number,'1')
      .then(data => {
        this.loadDeveloperData();
      });
    this.sendToServer();
    this.developer = {};

  }
  loadDeveloperData() {
    this.databaseprovider.getAllRefer().then(data => {
      this.developers = data;
      console.log(data);
      this.developers.forEach(functionToIterate);
      function  functionToIterate(){
        for(let dev of this.developers)
        {
          console.log(dev.firstname + "->" + dev.lastname + "->" + dev.email)
        }
      }
    })
  }

}
