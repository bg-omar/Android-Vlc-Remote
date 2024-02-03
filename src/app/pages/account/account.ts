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


export interface User {
  nickName: string;
  mobile: string;
  sex: number;
  emails: string[],
  address: string[];
  interest: string[]
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


  constructor(
    private userService: UserService,
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData,
    public navCtrl: NavController,
    private fb: FormBuilder) {
    this.user = {
      nickName: 'Allen',
      mobile: '0952-111222',
      sex: 1,
      emails: ['1@gmail.com', '2@gmail.com'],
      address: ['Adres...', 'Adress...'],
      interest: ['movie', 'music', 'sport']
    } as User;
  }
  ngOnInit() {
    this.user2 = this.userService;
    this.getUsername();
    this.getIpaddress();
    this.getVlcpassword();
    //1. FormBuilder
    this.myForm = this.fb.group({
      nickName: ['', [Validators.required, Validators.minLength(5)]],
      mobile: ['', this.mobileValidator],
      sex:1,
      emails: this.fb.array([
        this.fb.control(''),
        this.fb.control('')
      ]),
      address: this.fb.group({
        addressArray: this.fb.array([
          this.fb.control('', Validators.required),
          this.fb.control('', Validators.required)
        ])
      }),
      interest:this.fb.group({
        movie:false,
        music:false,
        sport:false
      })
    });

    // 2. FormControl, FormGroup, FormArray 建立表單元件
    this.myForm = new FormGroup({
      nickName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      mobile: new FormControl('', this.mobileValidator),
      sex: new FormControl(1),
      emails: new FormArray([
        new FormControl(''),
        new FormControl('')
      ]),
      address: new FormArray([
          new FormControl(''),
          new FormControl('')
      ]),
      interest:new FormGroup({
        movie:new FormControl(false),
        music:new FormControl(false),
        sport:new FormControl(false)
      })
    });

    this.myForm.setValue({
      nickName: this.user.nickName,
      mobile: this.user.mobile,
      sex: this.user.sex,
      emails: this.user.emails,
      address: this.user.address,
      interest: {
        movie: this.user.interest.indexOf('movie') > -1,
        music: this.user.interest.indexOf('music') > -1,
        sport: this.user.interest.indexOf('sport') > -1
      }
    });

    console.log(this.user.interest.indexOf('music'));
  }

  ionViewDidLoad() {

  }

  ngAfterViewInit() {

  }

  createUser({ value, valid }: { value: any, valid: boolean }) {
    let user: User = this.myForm.value;
    console.log(JSON.stringify(user));
    console.log(user.emails[0]);
    console.log(this.myForm.value);


    let control = this.myForm.get('nickName') as FormControl;
    let formArray = this.myForm.get('address.addressArray') as FormArray;

    //let formArray = group.controls.addressArray as FormArray;

    console.log(formArray.controls[0].value);

    let nickNameValid = this.myForm.get('nickName').valid;
    let nickNameErrorMsg = this.myForm.get('nickName').errors;
    console.log(`Nick Name Error: ${nickNameValid}-${JSON.stringify(nickNameErrorMsg)}`);
  }


  mobileValidator(mobile: FormControl): any {
    let value = (mobile.value || '') + ''; //轉成字串
    var phoneReg = /^09\d{2}-?\d{3}-?\d{3}$/; //台灣手機號碼
    let valid = phoneReg.test(value);

    console.log('phone:' + valid);

    return valid ? null: {mobile: valid}
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
