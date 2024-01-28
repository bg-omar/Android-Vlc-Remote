import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements AfterViewInit {
  username: string;
  ipaddress: string;
  vlcpassword: string;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData
  ) { }

  ngAfterViewInit() {
    this.getUsername();
    this.getIpaddress();
    this.getVlcpassword();
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
