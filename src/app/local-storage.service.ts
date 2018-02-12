import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  public localStorageAvailable = true;

  constructor() {
    if (typeof(Storage) === 'undefined') {
      this.localStorageAvailable = false;
    }
  }

  public setObjectValue(namespace: string, key: string, value: object) {
    if (this.localStorageAvailable) {
      localStorage.setItem(`${namespace}__${key}`, JSON.stringify(value));
    }
  }
  public getObjectValue<T>(namespace: string, key: string): T {
    if (this.localStorageAvailable) {
      const item = localStorage.getItem(`${namespace}__${key}`);
      if (item) {
        return <T>JSON.parse(item);
      }
      return null;
    }
  }
  public setValue(namespace: string, key: string, value: string) {
    if (this.localStorageAvailable) {
      localStorage.setItem(`${namespace}__${key}`, value);
    }
  }

  public setBooleanValue(namespace: string, key: string, value: boolean) {
    if (this.localStorageAvailable) {
      localStorage.setItem(`${namespace}__${key}`, value ? 'true' : 'false');
    }
  }

  public getValue(namespace: string, key: string): string {
    if (this.localStorageAvailable) {
      return localStorage.getItem(`${namespace}__${key}`);
    }
  }

  public getBooleanValue(namespace: string, key: string): boolean {
    if (this.localStorageAvailable) {
      const checking = localStorage.getItem(`${namespace}__${key}`);
      if (!checking || checking === 'false') {
        return false;
      }
      else if (checking === 'true') {
        return true;
      }
      return false;
    }
  }


}
