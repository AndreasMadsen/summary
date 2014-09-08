
var array_types = [
    Array, Int8Array, Uint8Array, Int16Array, Uint16Array,
    Int32Array, Uint32Array, Float32Array, Float64Array
];

function Summary(data, sorted) {
  if (!(this instanceof Summary)) return new Summary(data, sorted);

  if (array_types.indexOf(data.constructor) === -1) {
    throw TypeError('data must be an array');
  }

  this._data = data;
  this._sorted = !!sorted;
  this._length = data.length;

  this._cache_sum = null;
  this._cache_mode = null;
  this._cache_mean = null;
  this._cache_quartiles = {};
  this._cache_variance = null;
  this._cache_sd = null;
  this._cache_max = null;
  this._cache_min = null;
}
module.exports = Summary;

//
// Not all values are in lazy calculated since that wouldn't do any good
//
Summary.prototype.sort = function() {
  if (this._sorted === false) {
    this._sorted = true;
    this._data = this._data.sort(function (a, b) { return a - b; });
  }

  return this._data;
};

Summary.prototype.size = function () {
  return this._length;
};

//
// Always lazy calculated functions
//
Summary.prototype.sum = function () {
  if (this._cache_sum === null) {
    var sum = 0;
    for (var i = 0; i < this._length; i++) sum += this._data[i];
    this._cache_sum = sum;
  }

  return this._cache_sum;
};

Summary.prototype.mode = function () {
  if (this._cache_mode === null) {
    var data = this.sort();

    var modeValue = NaN;
    var modeCount = 0;
    var currValue = data[0];
    var currCount = 1;

    // Count the amount of repeat and update mode variables
    for (var i = 1; i < this._length; i++) {
      if (data[i] === currValue) {
        currCount += 1;
      } else {
        if (currCount >= modeCount) {
          modeCount = currCount;
          modeValue = currValue;
        }

        currValue = data[i];
        currCount = 1;
      }
    }

    // Check the last count
    if (currCount >= modeCount) {
      modeCount = currCount;
      modeValue = currValue;
    }

    this._cache_mode = modeValue;
  }

  return this._cache_mode;
};

Summary.prototype.mean = function () {
  if (this._cache_mean === null) {
    this._cache_mean = this.sum() / this._length;
  }

  return this._cache_mean;
};

Summary.prototype.quartile = function (prob) {
  if (!this._cache_quartiles.hasOwnProperty(prob)) {
    var data = this.sort();
    var product = prob * this.size();
    var ceil = Math.ceil(product);

    if (ceil === product) {
      if (ceil === 0) {
        this._cache_quartiles[prob] = data[0];
      } else if (ceil === data.length) {
        this._cache_quartiles[prob] = data[data.length - 1];
      } else {
        this._cache_quartiles[prob] = (data[ceil - 1] + data[ceil]) / 2;
      }
    } else {
      this._cache_quartiles[prob] = data[ceil - 1];
    }
  }

  return this._cache_quartiles[prob];
};

Summary.prototype.median = function () {
  return this.quartile(0.5);
};

Summary.prototype.variance = function () {
  if (this._cache_variance === null) {
    var mean = this.mean();
    var sqsum = 0;
    for (var i = 0; i < this._length; i++) {
      sqsum += (this._data[i] - mean) * (this._data[i] - mean);
    }

    this._cache_variance = sqsum / (this._length - 1);
  }

  return this._cache_variance;
};

Summary.prototype.sd = function () {
  if (this._cache_sd === null) {
    this._cache_sd = Math.sqrt(this.variance());
  }

  return this._cache_sd;
};

Summary.prototype.max = function () {
  if (this._cache_max === null) {
    this._cache_max = this.sort()[this._length - 1];
  }

  return this._cache_max;
};

Summary.prototype.min = function () {
  if (this._cache_min === null) {
    this._cache_min = this.sort()[0];
  }

  return this._cache_min;
};
