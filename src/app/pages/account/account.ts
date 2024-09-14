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
import {jsonData, StorageService} from "../../services/storage.service";
import { Storage } from '@ionic/storage';
import {GetResult, Preferences} from "@capacitor/preferences";

export interface pass {
  vlcPass: string,
}

export interface User {
  buttenName?: string;
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
  username: string;
  ipaddress: string;
  vlcpassword: string;
  myForm: FormGroup;
  user: User;
  addVlc: User;

  userSettings: User[] = [{
    ipAddress: '192.168.2.2:8080', hide: false
  }, {
    ipAddress: '192.168.2.2:8081', hide: false
  }];


  public getterdata: User[] = [];
  configForm: any;
  vlcPass: string = 'pass';

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

    this.userSettings = [...this.userSettings, this.addVlc]
  }

  createUser({ value, valid }: { value: any, valid: boolean }) {
    let user: User = this.myForm.value;
    console.log(JSON.stringify(user));
    console.log(this.myForm.value);


    let control = this.myForm.get('nickName') as FormControl;
    let formArray = this.myForm.get('address.addressArray') as FormArray;

    //let formArray = group.controls.addressArray as FormArray;

    console.log(formArray.controls[0].value);

    let nickNameValid = this.myForm.get('nickName').valid;
    let nickNameErrorMsg = this.myForm.get('nickName').errors;
    console.log(`Nick Name Error: ${nickNameValid}-${JSON.stringify(nickNameErrorMsg)}`);
  }


  setHide(i: number) {
    this.getterdata[i].hide = !this.getterdata[i].hide;
    this.setJson(1);
  }

  setJson(setter: number) {
    if (setter == 1) {
      this.getJson(setter).then(r => console.log("getting before setting: "));

      let ip = [{
        'ipAddress': 'http://192.168.2.' + this.user.ipAddress + '/mobile.html',
        'hide': this.user.hide || false
      }]
      if (this.getterdata.find(value => value.ipAddress === ip[0].ipAddress)) {
        console.log("%c 1 --> something: ", "color:#f0f;");
      } else if (this.user.ipAddress === undefined) {
        console.log("%c 2 --> 114||C:/workspace/projects/Android-vlc-Remote/src/app/pages/account/account.ts\n this.user.ipAddress: ", "color:#0f0;", this.user.ipAddress);
      } else {
        this.getterdata = [
          ...this.getterdata,
          ...ip
        ].filter(value => value.ipAddress)
      }
      let configAccount: User[] = this.getterdata;
      this.storageServive.setData("VLC", configAccount).then(r => {
      });
      // this.storageServive.setData('pass', config).then(r =>{});

    }

    this.getJson(setter).then(r => console.log("getting after setting: "));

  }

  async getJson(getter: number) {
    if (getter == 1) {
      await this.storageServive.getData("VLC").then((data: any) => {

        let res;
        if (data.value) {
          res = JSON.parse(data.value);

          this.getterdata = res

          console.log("%c 1 --> 135||C:/workspace/projects/Android-vlc-Remote/src/app/pages/account/account.ts\n this.getterdata: ", "color:#f0f;", this.getterdata);
        }
      });
    }

  }

  async delJson(i) {
    await this.storageServive.delData("VLC");
    let foo_object = this.getterdata[i];
    this.getterdata = this.getterdata.filter(obj => {
      return obj !== foo_object
    });
  }

  async getPass(x) {
    if (x === 2) {
      await Preferences.remove({key: 'pass'}).then()
    }

    if (x === 3) {
      this.vlcPass = '1z2x'
      await Preferences.set({
        key: 'pass',
        value: this.vlcPass,
      });
    }
      const result = await Preferences.get({key: 'pass'})
      this.vlcPass = result.value || 'no password'


  }

  ipValidator(ipAddress: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /^(?:\d{1,3}\.){3}\d{1,3}:(?:6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]\d{4}|\d{1,4})$/;
      const valid = regex.test(ipAddress.value);
      return valid ? null : {ipAddress: valid}
    };
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData.setUsername(data.username);
            this.getUsername();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.username,
          placeholder: 'username'
        }
      ]
    });
    await alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.router.navigateByUrl('/login');
  }

  support() {
    this.router.navigateByUrl('/support');
  }

  getVlcpassword() {
    this.userData.getVlcpassword().then((vlcpassword) => {
      this.vlcpassword = vlcpassword;
    });
  }

  getIpaddress() {
    this.userData.getVlcpassword().then((ipaddress) => {
      this.ipaddress = ipaddress;
    });
  }

  async changevlcpassword() {
    const alert = await this.alertCtrl.create({
      header: 'Change VlcPass',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData.setVlcpassword(data.vlcpassword);
            this.getVlcpassword();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'vlcpassword',
          value: this.vlcpassword,
          placeholder: 'vlcpassword'
        }
      ]
    });
    await alert.present();

  }

  async changeipaddress() {
    const alert = await this.alertCtrl.create({
      header: 'Change ipaddress',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            this.userData.setIpaddress(data.ipaddress);
            this.getIpaddress();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'ipaddress',
          value: this.ipaddress,
          placeholder: 'ipaddress'
        }
      ]
    });
    await alert.present();

  }
}
