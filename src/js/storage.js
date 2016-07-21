var storage = window.sessionStorage;
module.exports = {
  get: function(key) {
    return storage[key];
  },
  set: function(key, value) {
    storage[key] = value;
  },  
};