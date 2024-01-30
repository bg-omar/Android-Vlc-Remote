import { Component } from '@angular/core';
import {IonicModule, NavController} from '@ionic/angular';
import {FormGroup, FormControl, FormArray, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from "@angular/common";


export interface User {
  nickName: string;
  mobile: string;
  sex: number;
  emails:string[],
  address: string[];
  interest: string[]
}


@Component({
  selector: 'page-home',
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: 'home.html'
})
export class HomePage {
  myForm: FormGroup;

  user: User;

  constructor(public navCtrl: NavController, private fb: FormBuilder) {
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
       address: new FormGroup({
        addressArray: new FormArray([
          new FormControl('', Validators.required),
          new FormControl('', Validators.required)

        ])
       }),
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
      address: {
        addressArray: this.user.address
      },
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

  //自定義驗證器
  mobileValidator(mobile: FormControl): any {
    let value = (mobile.value || '') + ''; //轉成字串
    var phoneReg = /^09\d{2}-?\d{3}-?\d{3}$/; //台灣手機號碼
    let valid = phoneReg.test(value);

    console.log('phone:' + valid);

    return valid ? null: {mobile: valid}
  }
}
