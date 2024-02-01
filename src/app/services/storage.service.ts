import {Injectable} from '@angular/core';
import {Preferences} from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  async setData(key: string, value:any) {
      await Preferences.set({key,value}) ;
  }

  async getData(key: string) {
    return (await Preferences.get({key}))
  }

  async delData(key: string) {
    await Preferences.remove({key})
  }

  async upData(key: string, value: any) {
    await Preferences.set({key, value})
  }

  async clear() {
    await Preferences.clear()
  }

}
