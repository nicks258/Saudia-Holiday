import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import { Toast } from '@ionic-native/toast';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { DatabaseProvider } from './../../providers/database/database';
import {ReferPage} from "../refer/refer";
import {CameraPage} from "../camera/camera";
import {NativeStorage} from "@ionic-native/native-storage";
import {Headers, Http} from "@angular/http";
import {HomescreenPage} from "../homescreen/homescreen";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  developer = {};
  developers = [];
  email;
  peopleDetail = {};
  phone_number;
  last_name;
  location;
  username;
  password;
  optionSelected;
  first_name;
  db: SQLiteObject;
  database: SQLiteObject;
  name : any;
  // public database: SQLite;
  public people: Array<Object>;
  private databaseReady: BehaviorSubject<boolean>;
  constructor( public nativeStorage:NativeStorage,public loadingCtrl: LoadingController,public navParams: NavParams,public http:Http , private toast: Toast, private databaseprovider: DatabaseProvider, private sqlite: SQLite,private platform: Platform, public navCtrl: NavController) {
    this.optionSelected = this.navParams.get("optionSelected");
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        // this.loadDeveloperData();
      }
    })
  }

  // loadDeveloperData() {
  //   this.databaseprovider.getAllDevelopers().then(data => {
  //     this.developers = data;
  //     console.log(data);
  //   })
  // }

  addDeveloper() {
    this.nativeStorage.getItem('authentication')
      .then(
        data => console.log(data.username +"->" + data.password+"->" + data.location,
          this.location = data.location,
          this.username = data.username,
          this.password = data.password),
        error => console.error(error)
      );
    let nav = this.navCtrl;
    this.peopleDetail = {
      location : this.location,
      username : this.username,
      password : this.password,
      name : this.first_name +" "+ this.last_name,
      email : this.email,
      phone_number : this.phone_number
    };
    if(this.optionSelected == ("refer"))
    {
      console.log("Take A refer");
      this.navCtrl.push(HomescreenPage, {animate: true, animation:'transition',duration:300, direction: 'forward'});
      // this.sendToServer();
    }
    else
    {
      console.log("Take -> " + this.optionSelected);
      nav.push(CameraPage, {peopleDetail:this.peopleDetail, animate: true, animation:'transition',duration:300, direction: 'forward'});
    }


    //
    console.log("Button Clicked");
    //TODO Code for inserting in sqlite
    this.databaseprovider.addDeveloper(this.first_name,this.last_name,this.phone_number,this.email)
      .then(data => {
        // this.loadDeveloperData();
      });
    this.developer = {};
  }

  sendToServer(){
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading your data...',
      spinner: 'circles'
    });
    this.nativeStorage.getItem('authentication')
      .then(
        data => console.log(data.username +"->" + data.password+"->" + data.location,
          this.location = data.location,
          this.username = data.username,
          this.password = data.password),
        error => console.error(error)
      );
    this.addLocalDB();
    // let body = new FormData();
    // let date = new Date('2013-03-10T02:00:00Z');
    //
    // body.append('location', this.location);
    // body.append('name',this.name);
    // body.append('mobile',this.phone_number);
    // body.append('email',this.email);
    // body.append('clicked_on',date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate());
    // body.append('user_id',this.username);
    // body.append('password',this.password);
    // let headers = new Headers();
    // let options = { headers: headers };
    // this.http.post('http://rayqube.com/projects/saudia_photobooth/savereferal_rest/', body , options ).subscribe(data => {
    //   console.log(data);
    //   let data_to_use = data.json();
    //   loadingPopup.dismiss();
    //   this.navCtrl.push(HomescreenPage, {animate: true, animation:'transition',duration:300, direction: 'forward'});
    //   console.log(data_to_use);
    // });
  }
  addLocalDB() {
    let nav = this.navCtrl;
    console.log("Button Clicked");
    //TODO Code for inserting in sqlite
    this.databaseprovider.addReferEntry(this.name,this.phone_number,'1')
      .then(data => {
        // this.loadDeveloperData();
      });
    // this.sendToServer();
    this.developer = {};

  }
  // loadDeveloperData() {
  //   this.databaseprovider.getAllRefer().then(data => {
  //     this.developers = data;
  //     console.log(data);
  //     this.developers.forEach(functionToIterate);
  //     function  functionToIterate(){
  //       for(let dev of this.developers)
  //       {
  //         console.log(dev.firstname + "->" + dev.lastname + "->" + dev.email)
  //       }
  //     }
  //   })
  // }

  // Fetchdashboard(){
  //   // this.sqlite.create({
  //   //   name: 'data.db',
  //   //   location: 'default'
  //   // }).then((db: SQLiteObject) => {
  //   this.db.executeSql('SELECT firstname AS firstname  FROM people ', {})
  //     .then(res => {
  //       if(res.rows.length>0) {
  //         this.people.push({firstname:res.rows.item(0).firstname});
  //         // for(var i=0; i<res.rows.length; i++) {
  //         //   this.people.push({firstname:res.firstname.item(i).type,lastname:res.rows.item(i).lastname})
  //         // }
  //         console.log("name->" + res.rows.item(0).firstname);
  //         console.log("Itesm->" + this.people);
  //         alert("Data saved " + this.name);
  //       }
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.toast.show(e, '5000', 'center').subscribe(
  //         toast => {
  //           console.log(toast);
  //         }
  //       );
  //     });


    // console.log("phone_number->" + this.phone_number +" " + "last_name" + this.last_name);
    // this.sqlobj.executeSql("INSERT INTO people (firstname, lastname) VALUES ('Nic', 'Raboy')", []).then((data) => {
    //   console.log("INSERTED: " + JSON.stringify(data));
    //   alert("INSERTED: " + JSON.stringify(data));
    // }, (error) => {
    //   console.log("ERROR: " + JSON.stringify(error.err));
    // });
  // })
  // }
  // fillDatabase() {
  //   this.http.get('assets/dummyDump.sql')
  //     .map(res => res.text())
  //     .subscribe(sql => {
  //       this.sqlitePorter.importSqlToDb(this.database, sql)
  //         .then(data => {
  //           this.databaseReady.next(true);
  //           this.storage.set('database_filled', true);
  //         })
  //         .catch(e => console.error(e));
  //     });
  // }
}
