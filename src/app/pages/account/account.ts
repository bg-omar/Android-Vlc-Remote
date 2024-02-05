import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

import { AlertController } from '@ionic/angular';

import { UserData } from '../../providers/user-data';

import {IonicModule, NavController} from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {StorageService} from "../../services/storage.service";


export interface User {
  nickName: string;
  port: string;
  emails: string,
  address: string;
  interest: string[]
}


type userconfig = { name: string, pass: string}
type user = {
  name: string;
  age: number;
  country: string;
  config: userconfig
};

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    NgForOf,
    FormsModule,
    RouterLink
  ],
})
export class AccountPage implements OnInit {
  username: string;
  ipaddress: string;
  vlcpassword: string;
  myForm: FormGroup;
  user2: any;
  user: User;

  userSettings: user = {
    name: 'me',
    age: 36,
    country: 'NL',
    config: {name: '', pass: '1z2x'}
  };

  userSettings2: user = {
    name: 'you',
    age: 28,
    country: 'NL',
    config: {name: '', pass: '1z2x'}
  };
  that: string = JSON.stringify(this.userSettings);
  that2: string = JSON.stringify(this.userSettings2);

  public getterdata: string = "no data";
  public getterpass: string = "no pass";

  constructor(
    private userService: UserService,
    public storageServive: StorageService,
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    public navCtrl: NavController,
    private fb: FormBuilder) {
    this.user = {
      nickName: 'PC1',
      port: '8080',
      emails: 'username',
      address: '192.168.2.2',
      interest: ['movie', 'music', 'sport']
    } as User;
  }
  ngOnInit() {
    this.user2 = this.userService;

    //1. FormBuilder
    this.myForm = this.fb.group({
      nickName: ['', [Validators.required, Validators.minLength(1)]],
      mobile: ['', this.mobileValidator],
      emails: '',
      address: '',
      interest:this.fb.group({
        movie:false,
        music:false,
        sport:false
      })
    });

    // 2. FormControl, FormGroup,
    this.myForm = new FormGroup({
      nickName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      mobile: new FormControl('', this.mobileValidator),
      emails: new FormControl(''),
      address: new FormControl(''),
      interest:new FormGroup({
        movie:new FormControl(false),
        music:new FormControl(false),
        sport:new FormControl(false)
      })
    });

    this.myForm.setValue({
      nickName: this.user.nickName,
      mobile: this.user.port,
      emails: this.user.emails,
      address: this.user.address,
      interest: {
        movie: this.user.interest.indexOf('movie') > -1,
        music: this.user.interest.indexOf('music') > -1,
        sport: this.user.interest.indexOf('sport') > -1
      }
    });
  }

  ionViewDidLoad() {

  }

  ngAfterViewInit() {

  }

  setJson(setter: number) {
    if (setter == 1){
      this.storageServive.setData(this.userSettings.name, this.that).then(r =>{});

      let config: string = JSON.stringify(this.userSettings.config);
      this.storageServive.setData('config', config).then(r =>{});

    }
    if (setter == 2){
      this.storageServive.setData(this.userSettings2.name, this.that2).then(r =>{});
      let config: string = JSON.stringify(this.userSettings2.config);
      this.storageServive.setData('config', config).then(r =>{});
    }
    this.getJson(setter).then(r => console.log("getting after setting: "));

  }
  async getJson(getter: number) {
    if (getter == 1){
      await this.storageServive.getData(this.userSettings.name).then((data:any) => {
        if(data.value) {
          this.getterdata = data.value;
        } else {
          this.getterdata = "no value";
        }
      });
    }
    if (getter == 2){
      await this.storageServive.getData(this.userSettings2.name).then((data:any) => {
        if(data.value) {
          this.getterdata = data.value;
        } else {
          this.getterdata = "no value";
        }
      });
    }
    await this.storageServive.getData('config').then((data:any) => {
        console.log("%c ---> data.value: ","color:#F0F;", data.value);
        console.log("%c ---> JSON.parse(data.value): ","color:#F0F;", JSON.parse(data.value));
        if (data.value) {
          let configUserPass: userconfig = JSON.parse(data.value)
          this.getterpass = configUserPass.pass;
        } else {
          this.getterpass = "no value";
        }
      }
    );

  }
  async delJson() {
    await this.storageServive.delData(this.userSettings.name);
    await this.storageServive.delData(this.userSettings2.name);
    await this.storageServive.delData("config");
    this.getterdata = "no data";
    this.getterpass = "no data";
  }


  mobileValidator(mobile: FormControl): any {
    let value = (mobile.value || '') + ''; //轉成字串
    var phoneReg = /^09\d{2}-?\d{3}-?\d{3}$/; //台灣手機號碼
    let valid = phoneReg.test(value);

    console.log('phone:' + valid);

    return valid ? null: {mobile: valid}
  }



  createUser(myForm: FormGroup) {

  }
}
