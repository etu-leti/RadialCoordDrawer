'use strict';

var deg2rad = Math.PI / 180;

if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}

function Drawer() {
  this.canvas = document.getElementById('canvas');
  this.ctx = canvas.getContext('2d');

  this.centerPoint = {x: canvas.width / 2, y: canvas.height / 2};
}

Drawer.prototype.clear = function clear() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Drawer.prototype.draw = function draw(func, vars, options) {
  var deltaFi = options.delta;
  var Fi = 0;

  var graphFunc = new Function('vars', 'for (var i in vars){window[i] = vars[i]}; return ' + func);
  var passArg = Object.assign(vars, {fi: Fi});
  var radius = graphFunc(passArg);
  this.ctx.beginPath();
  this.ctx.moveTo(
    Math.cos(0 * deg2rad) * radius + this.centerPoint.x,
    Math.sin(0 * deg2rad) * radius + this.centerPoint.y
  );

  for (var i = 0; i <= options.iterations; i++) {
    Fi += deltaFi;
    passArg = Object.assign(vars, {fi: Fi});
    radius = graphFunc(passArg);
    this.ctx.lineTo(
      Math.cos(Fi * deg2rad) * radius + this.centerPoint.x,
      Math.sin(Fi * deg2rad) * radius + this.centerPoint.y
    );
  }
  this.ctx.stroke();
}
