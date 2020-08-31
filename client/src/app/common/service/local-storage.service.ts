import { Injectable } from '@angular/core';
import { Constants } from '../constant/constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public storage = {
    user: {},
    auth: {}
  };

  constructor() {
    if (localStorage.getItem('auth') && localStorage.getItem('user')) {
      this.storage.auth = JSON.parse(localStorage.getItem('auth'));
      this.storage.user = JSON.parse(localStorage.getItem('user'));
    }

  }

  public create() {
    this.storage = {
      user: {},
      auth: {}
    };
    localStorage.setItem('auth', JSON.stringify(this.storage.auth));
    localStorage.setItem('user', JSON.stringify(this.storage.user));

    return localStorage;
  }

  public setValue(key, value) {
    if (value === undefined) {
      return;
    }
    const objectKey = this.storageForKey(key);
    const eKey = window.btoa(key);
    if (typeof (value) === 'boolean') {
      this.storage[objectKey][eKey] = value;
    } else if (typeof (value) === 'string') {
      this.storage[objectKey][eKey] = window.btoa(value);
    } else {
      this.storage[objectKey][eKey] = window.btoa(JSON.stringify(value));
    }
    localStorage.setItem(objectKey, JSON.stringify(this.storage[objectKey]));
  }

  public getValue(key): any {
    if (this.isLoggedIn) {
      const objectKey = this.storageForKey(key);
      const eKey = window.btoa(key);
      const value = JSON.parse(localStorage[objectKey])[eKey];
      if (!value) {
        return value;
      }
      if (typeof (value) === 'boolean') {
        return value;
      } else {
        try {
          return JSON.parse(window.atob(value));
        } catch (e) {
          return window.atob(value);
        }
      }
    } else {
      return;
    }
  }

  get isLoggedIn() {
    return window.localStorage.getItem('auth');
  }
  removeItem(key) {
    const objectKey = this.storageForKey(key);
    const eKey = window.btoa(key);
    this.storage[objectKey][eKey] = undefined;
    localStorage.setItem(objectKey, JSON.stringify(this.storage[objectKey]));
  }

  private storageForKey(key) {
    switch (key) {
      case Constants.ACCESS_TOKEN:
        return 'auth';
      case 'refreshToken':
        return 'auth';
      default:
        return 'user';
    }
  }

  removeAll() {
    localStorage.clear();
  }
}
