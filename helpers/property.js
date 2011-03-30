exports.create = function () {
var value = null;
  return {
    get: function() {
      return value;
    },
    set: function(new_value) {
      value = new_value;
    }
  };
};
