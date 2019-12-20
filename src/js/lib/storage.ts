/**
 * Simple abstraction over localStorage/sessionStorage
 * implements most of the same interface, but includes some sugar on top
 */

export class AppStorage {
  storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  getItem(key: string) {
    return this.storage.getItem(key);
  }

  getItems(...keys: string[]) {
    const res: Record<string, any> = {};

    for (const key of keys) {
      res[key] = localStorage.getItem(key);
    }

    return res;
  }

  setItem(key: string, value: any) {
    this.storage.setItem(key, value);
  }

  setItems(keyValuePairs: Record<string, any>) {
    for (const [key, value] of Object.entries(keyValuePairs)) {
      this.storage.setItem(key, value);
    }
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

  removeItems(...keys: string[]) {
    for (const key of keys) {
      this.storage.removeItem(key);
    }
  }

  clear() {
    this.storage.clear();
  }

  has(key: string) {
    return this.storage.getItem(key) != null;
  }
}
