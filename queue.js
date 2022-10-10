'use strict';

class Queue {
  constructor() {
    this.data = {};
  }

  store(key, value) {
    this.data[key] = value;
    return key;
  }

  read(key) {
    return this.data[key];
  }

  remove(key) {
    const value = this.data[key];
    delete this.data[key];
    console.log('Removed the key:', key);
    return value;
  }
}

module.exports = Queue;
