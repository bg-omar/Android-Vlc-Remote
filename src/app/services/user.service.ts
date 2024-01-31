import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _name: string;
  private _age: number;

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get age() {
    return this._age;
  }

  set age(age: number) {
    this._age = age;
  }
}
