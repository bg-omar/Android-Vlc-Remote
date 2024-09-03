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
  FormsModule, ValidatorFn, AbstractControl, ValidationErrors
} from '@angular/forms';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {StorageService} from "../../services/storage.service";
import {json} from "@angular-devkit/core";

export interface pass {
  vlcPass: string,
}

export interface User {
  hide: boolean;
  ipAddress: string;
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
  myForm: FormGroup;
  user: User;
  addVlc: User;

  userSettings: User[] = [{
    ipAddress: '192.168.2.2:8080', hide: false
  }, {
    ipAddress: '192.168.2.2:8081', hide: false
  }];





  public getterdata: User[]=  [];
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
    this.getJson(1);
    this.user = this.userService;
    this.configForm = this.userService;

    //1. FormBuilder
    this.myForm = this.fb.group({
      ipAddress: ['', this.ipValidator],
    });

    // 2. FormControl, FormGroup,
    this.myForm = new FormGroup({
      ipAddress: new FormControl('', this.ipValidator),
    });

    this.myForm.setValue({
      ipAddress: this.addVlc.ipAddress,
    }
    );
    this.userSettings = [ ...this.userSettings, this.addVlc]
  }

  setJson(setter: number) {
    if (setter == 1){
      this.getJson(setter).then(r => console.log("getting before setting: "));

    let ip = [   {
        'ipAddress': 'http://192.168.2.'+this.user.ipAddress+'/mobile.html',
        'hide': this.user.hide

      }]
      if (this.getterdata.find(value => value.ipAddress === ip[0].ipAddress)){
        console.log("%c 1 --> something: ","color:#f0f;");
      } else {
        this.getterdata = [...this.getterdata, ...ip
        ].filter(value => value.ipAddress)
      }
        let configAccount = JSON.stringify(this.getterdata);
        this.storageServive.setData(this.userSettings[0].ipAddress, configAccount).then(r => {
        });
        // this.storageServive.setData('pass', config).then(r =>{});

    }

    this.getJson(setter).then(r => console.log("getting after setting: "));

  }
  async getJson(getter: number) {
    if (getter == 1){
      await this.storageServive.getData(this.userSettings[0].ipAddress).then((data:any) => {

        let res;
        if (data.value) {
          res = JSON.parse(data.value);

          this.getterdata = res
          console.log("%c 1 --> 135||C:/workspace/projects/Android-vlc-Remote/src/app/pages/account/account.ts\n this.getterdata: ","color:#f0f;", this.getterdata);
        }
      });
         }

    // await this.storageServive.getData('pass').then((data:any) => {
    //     if (data.value) {
    //       let configUserPass: pass = JSON.parse(data.value)
    //       this.getterpass = configUserPass.vlcPass;
    //     } else {
    //       this.getterpass = "no value";
    //     }
    //   }
    // );

  }

  async delJson(i) {
    await this.storageServive.delData(this.userSettings[0].ipAddress);
    let foo_object = this.getterdata[i];
    this.getterdata = this.getterdata.filter(obj => {
      return obj !== foo_object
    });
  }


  mobileValidator(port: FormControl): any {
    let value = (port.value || '') + '';
    var portReg = /^\d{2,5}?$/;
    let valid = portReg.test(value);
    return valid ? null: {port: valid}
  }


  ipValidator(ipAddress: FormControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regex = /^(?:\d{1,3}\.){3}\d{1,3}:(?:6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]\d{4}|\d{1,4})$/;
    const valid = regex.test(ipAddress.value);
    return valid ? null: {ipAddress: valid}
  };
}

  saveConfig(myForm: FormGroup) {
    let configForm: User = JSON.parse(myForm.value)
    let config: string = JSON.stringify(myForm.value);
    console.log("%c ---> configForm: ","color:#F0F;", configForm);
    this.storageServive.setData(configForm.ipAddress, config).then(r =>{});
  }
}
