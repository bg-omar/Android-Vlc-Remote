import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {

  private _ipAddress: string;


  get ipAddress() {
    return this._ipAddress;
  }

  set ipAddress(ip: string) {
    this._ipAddress = ip;
  }

}
