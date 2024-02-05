import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {

  private _port: number;
  private _ipAddress: string;
  private _vlcUser: string;
  private _vlcPass: string;
  private _pcs: string[];

  get ipAddress() {
    return this._ipAddress;
  }

  set ipAddress(ip: string) {
    this._ipAddress = ip;
  }

  get port() {
    return this._port;
  }

  set port(port: number) {
    this._port = port;
  }

  get vlcUser() {
    return this._vlcUser;
  }

  set vlcUser(user: string) {
    this._vlcUser = user;
  }


  get vlcPass() {
    return this._vlcPass;
  }

  set vlcPass(pass: string) {
    this._vlcPass = pass;
  }

  get pcs() {
    return this._pcs;
  }

  set pcs(pcs: string[]) {
    this._pcs = pcs;
  }
}
