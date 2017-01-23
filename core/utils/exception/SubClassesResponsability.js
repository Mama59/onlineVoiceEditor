function SubClassesResponsability( nameMethod ) {
  this.name = nameMethod;
}

SubClassesResponsability.prototype.toString = function () {
  return "Exception " + this.name + " Must Be implement by subclass";
};
