import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

import {File} from "@ionic-native/file";
import {CameraPage} from "../camera/camera";
import {DatabaseProvider} from "../../providers/database/database";
import {Toast} from "@ionic-native/toast";
import {SQLite} from "@ionic-native/sqlite";

import { Http, Headers } from '@angular/http';
import {NativeStorage} from "@ionic-native/native-storage";
import {ScreensaverPage} from "../screensaver/screensaver";
import {HomescreenPage} from "../homescreen/homescreen";


/**
 * Generated class for the PreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {
  imagepath: any;
  developer = {};
  users: any;
  data;
  baseImageString;
  postBody ={};
  developers = [];
  fileName: any;
  peopleDetail = {
    location:'',
    username:'',
    password:'',
    name:'',
    email:'',
    phone_number:''
  };
  constructor(public nativeStorage: NativeStorage, public http :Http,private navParams:NavParams, private toast: Toast, private databaseprovider: DatabaseProvider, private sqlite: SQLite,private platform: Platform, public navCtrl: NavController, private file: File) {

    this.fileName = "data:image/png;base64," + navParams.get('file_name_final');
    this.baseImageString = navParams.get('file_name_final');
    this.peopleDetail = navParams.get('people_detail');
    this.imagepath = this.file.dataDirectory + '/' + this.fileName;
    this.addDeveloper();
    // this.network.onConnect().subscribe(data => {
    //   console.log(data);
    //   this.displayNetworkUpdate(data.type);
    // }, error => console.error(error));

    // setTimeout(function () {
    //   {
    //     console.log("its time");
    //
    //     let body = new FormData();
    //
    //     // body.append('location', "jaipur");
    //     // body.append('name',this.peopleDetail.name);
    //     // body.append('mobile',this.peopleDetail.phone_number);
    //     // body.append('email',this.peopleDetail.email);
    //     // body.append('photo_base_64',this.baseImageString);
    //     // body.append('clicked_on',new Date().toISOString());
    //     // body.append('user_id',"nicks");
    //     // body.append('password',"2702100000");
    //
    //     // body.append('location', "jaipur");
    //     // body.append('name',"jaipur");
    //     // body.append('mobile',"jaipur");
    //     // body.append('email',"jaipur");
    //     // body.append('photo_base_64',"jaipur");
    //     // body.append('clicked_on',"jaipur");
    //     // body.append('user_id',"nicks");
    //     // body.append('password',"2702100000");
    //     // let headers = new Headers();
    //     // let options = { headers: headers };
    //     // this.http.post('http://rayqube.com/projects/saudia_photobooth/saveclick_rest/', body , options ).subscribe(data => {
    //     //   console.log(data);
    //     //   let data_to_use = data.json();
    //     //   console.log(data_to_use);
    //     // });
    //   }
    //
    // },3000);
    setTimeout(function () {
      console.log("This is called ->navCtrl.push(ScreensaverPage) ");
      navCtrl.push(HomescreenPage)
    },10000)
    // this.network.onDisconnect().subscribe(data => {
    //   console.log(data);
    //   this.displayNetworkUpdate(data.type);
    // }, error => console.error(error));
  }

  reShoot(){
    let nav = this.navCtrl;
    nav.push(CameraPage, {peopleDetail:this.peopleDetail, animate: true, animation:'transition',duration:300, direction: 'forward'});
  }
  loadDeveloperData() {
    this.databaseprovider.getAllDevelopers().then(data => {
      this.developers = data;
      console.log(data);
    })
  }

  addDeveloper() {

    console.log("Button Clicked addDeveloper()");
    //TODO Code for inserting in sqlite
    this.databaseprovider.addDeveloper(this.peopleDetail.name,this.peopleDetail.email,this.peopleDetail.phone_number,'1')
      .then(data => {
        this.loadDeveloperData();
      });
    // this.sendToServer();
    this.developer = {};

  }



}
