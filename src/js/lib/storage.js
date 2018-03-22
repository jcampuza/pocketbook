/**
 * Simple abstraction over localStorage/sessionStorage
 * implements most of the same interface, but includes some sugar on top
 */

export class Storage {
  constructor(storage) {
    this.storage = storage;
  }

  getItem(key) {
    return this.storage.getItem(key);
  }

  getItems(...keys) {
    const res = {};
    for (const key of keys) {
      res[key] = localStorage.getItem(key);
    }

    return res;
  }

  setItem(key, value) {
    this.storage.setItem(key, value);
  }

  setItems(keyValuePairs) {
    for (const key of Object.keys(keyValuePairs)) {
      this.storage.setItem(key, keyValuePairs[key]);
    }
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }

  removeItems(...keys) {
    for (const key of keys) {
      this.storage.removeItem(key);
    }
  }

  clear() {
    this.storage.clear();
  }

  has(key) {
    return this.storage.getItem(key) != null;
  }
}
