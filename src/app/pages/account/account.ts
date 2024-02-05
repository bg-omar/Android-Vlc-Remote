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
import {json} from "@angular-devkit/core";

export interface pass {
  vlcUser: string,
  vlcPass: string,
}

export interface User extends pass {
  ipAddress: string;
  port: number;
  pcs: string[]
}


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

  userSettings: User = {
    vlcPass: '1z2x',
    ipAddress: '192.168.2.2',
    port: 8080,
    vlcUser: '',
    pcs: ['192.168.2.2:8080', '192.168.2.2:8081', '192.168.2.3:8080']
  };

  pass: pass = {vlcPass: this.userSettings.vlcPass, vlcUser: this.userSettings.vlcUser}
  config: string = JSON.stringify(this.pass);
  configAccount: string = JSON.stringify(this.userSettings);


  public getterdata: string = "no data";
  public getterpass: string = "no pass";
  configForm: any;

  constructor(
    private userService: UserService,
    public storageServive: StorageService,
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    public navCtrl: NavController,
    private fb: FormBuilder) {
  }
  ngOnInit() {
    this.user2 = this.userService;
    this.configForm = this.userService;

    //1. FormBuilder
    this.myForm = this.fb.group({
      vlcPass: ['', [Validators.required, Validators.minLength(1)]],
      port: ['', this.mobileValidator],
      vlcUser: '',
      ipAddress: ['', this.ipValidator],
      pcs:this.fb.group({
        pc1:false,
        pc2:false,
        pc3:false
      })
    });

    // 2. FormControl, FormGroup,
    this.myForm = new FormGroup({
      vlcPass: new FormControl('', [Validators.required, Validators.minLength(1)]),
      port: new FormControl('', this.mobileValidator),
      vlcUser: new FormControl(''),
      ipAddress: new FormControl('', this.ipValidator),
      pcs:new FormGroup({
        pc1:new FormControl(false),
        pc2:new FormControl(false),
        pc3:new FormControl(false)
      })
    });

    this.myForm.setValue({
      vlcPass: this.userSettings.vlcPass,
      port: this.userSettings.port,
      vlcUser: this.userSettings.vlcUser,
      ipAddress: this.userSettings.ipAddress,
      pcs: {
        pc1: this.userSettings.pcs.indexOf('pc1') > -1,
        pc2: this.userSettings.pcs.indexOf('pc2') > -1,
        pc3: this.userSettings.pcs.indexOf('pc3') > -1
      }
    });
  }

  ionViewDidLoad() {

  }

  ngAfterViewInit() {

  }

  setJson(setter: number) {
    if (setter == 1){
      this.storageServive.setData(this.userSettings.ipAddress, this.configAccount).then(r =>{});
      this.storageServive.setData('pass', this.config).then(r =>{});

    }

    this.getJson(setter).then(r => console.log("getting after setting: "));

  }
  async getJson(getter: number) {
    if (getter == 1){
      await this.storageServive.getData(this.userSettings.ipAddress).then((data:any) => {
        if(data.value) {
          this.getterdata = data.value;
        } else {
          this.getterdata = "no value";
        }
      });
    }

    await this.storageServive.getData('pass').then((data:any) => {
        if (data.value) {
          let configUserPass: pass = JSON.parse(data.value)
          this.getterpass = configUserPass.vlcPass;
        } else {
          this.getterpass = "no value";
        }
      }
    );

  }
  async delJson() {
    await this.storageServive.delData(this.userSettings.ipAddress);
    await this.storageServive.delData("config");
    await this.storageServive.delData("pass");
    this.getterdata = "no data";
    this.getterpass = "no data";
  }


  mobileValidator(port: FormControl): any {
    let value = (port.value || '') + '';
    var portReg = /^\d{2,5}?$/;
    let valid = portReg.test(value);
    return valid ? null: {port: valid}
  }


  ipValidator(ipAddress: FormControl): any {
    let value = (ipAddress.value || '') + '';
    var ipReg = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    let valid ;
    (value == 'localhost') ? valid = true : valid = ipReg.test(value);
    return valid ? null: {ipAddress: valid}
  }

  saveConfig(myForm: FormGroup) {
    let configForm: User = JSON.parse(myForm.value)
    let config: string = JSON.stringify(myForm.value);
    console.log("%c ---> configForm: ","color:#F0F;", configForm);
    this.storageServive.setData(configForm.ipAddress, config).then(r =>{});
  }
}
