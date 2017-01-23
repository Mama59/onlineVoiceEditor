function ExceptionBound( intValue, direction ) {
  this.value = intValue;
  this.direction = direction,
    this.name = "ExceptionBound";
}

ExceptionBound.prototype.direction = function () {
  return this.direction;
};

ExceptionBound.prototype.toString = function () {
  return this.name + ': "' + this.value + '" in ' + this.direction;
};
