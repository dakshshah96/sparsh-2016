! function() {
	"use strict";
	// main loop
	function run() {
		requestAnimationFrame(run);
		pointer.ease(15);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// flat world
		cb = "";
		ctx.beginPath();
		for (var i = 0, n = points.length; i < n; i++) {
			points[i].background();
		}
		ctx.fill();
		// target
		ctx.fillStyle = "#333";
		ctx.fillRect(pointer.ex - 2, 0, 4, canvas.height);
		ctx.fillRect(0, pointer.ey - 2, canvas.width, 4);
		ctx.beginPath();
		ctx.fillStyle = "#f00";
		ctx.arc(pointer.ex, pointer.ey, 4, 0, Math.PI * 2);
		ctx.fill();
		// 3D globe
		cb = "";
		ctx.beginPath();
		for (var i = 0; i < n; i++) {
			points[i].globe();
		}
		ctx.fill();
	}
	// Point constructor
	function Point (x, y) {
		this.x    = 0;
		this.y    = 0;
		this.c    = false;
		this.x0   = x;
		this.y0   = y;
		this.dist = 0;
		this.dx   = 0;
		this.dy   = 0;
	}
	// paint background
	Point.prototype.background = function () {
		this.dx = (pointer.ex - mx) - this.x0 * 11;
		this.dy = (pointer.ey - my) - this.y0 * 11;
		this.dist = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
		var c = this.dist < 140 ? "#333" : (this.c ? "#f80" : "#666");
		if (c !== cb) {
			ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = c;
			cb = c;
		}
		ctx.moveTo(this.x0 * 11 + mx, this.y0 * 11 + my);
		ctx.arc(this.x0 * 11 + mx, this.y0 * 11 + my, 4, 0, Math.PI * 2);

	}
	// paint globe
	Point.prototype.globe = function () {
		if (this.dist < 140) {
			var scale = Math.cos(0.5 * Math.PI * this.dist / 140);
			this.x = (this.x0 * 11) - (this.dx * scale) - (11 * 24) - pointer.ex + canvas.width;
			this.y = (this.y0 * 11) - (this.dy * scale) - (11 * 11) - pointer.ey + canvas.height;
			var c = this.c ? "#f83" : "#fff";
			if (c !== cb) {
				ctx.fill();
				ctx.beginPath();
				ctx.fillStyle = c;
				cb = c;
			}
			ctx.moveTo(this.x, this.y);
			ctx.arc(this.x, this.y, scale * 7, 0, Math.PI * 2);
		}
	}
	// set canvas
	var canvas = {
		width:  0,
		height: 0,
		elem: document.createElement("canvas"),
		resize: function () {
			this.width  = this.elem.width  = this.elem.offsetWidth;
			this.height = this.elem.height = this.elem.offsetHeight;
			mx = (this.width * 0.5) -  (11 * 22);
			my = (this.height * 0.5) - (11 * 11);
		}
	}
	var ctx = canvas.elem.getContext("2d");
	document.body.appendChild(canvas.elem);
	window.addEventListener('resize', canvas.resize.bind(canvas), false);
	// set pointer / touch
	var pointer = {
		x:  0, y:  0,
		ex: 0, ey: 0,
		isDown: false,
		move: function (e) {
			e.preventDefault();
			var pointer = e.targetTouches ? e.targetTouches[0] : e;
			this.x = pointer.clientX;
			this.y = pointer.clientY;
		},
		down: function (e) {
			e.preventDefault();
			if (!this.isDown) {
				this.isDown = true;
				var dm = 9999, c = null;
				for (var i = 0; i < points.length; i++) {
					var p = points[i];
					var dx = p.x - this.x;
					var dy = p.y - this.y;
					var d = Math.sqrt(dx * dx + dy * dy);
					if (d < 10) {
						if (d < dm) {
							dm = d;
							c = p;
						}
					}
				}
				if (c) {
					c.c = true;
					coordData += key.charAt( c.x0 ) + key.charAt( c.y0 );
					window.location.hash = coordData;
					document.getElementById( 'link' ).href = 'http://codepen.io/ge1doot/debug/JdzXjb/#' + coordData;
				}
			}
		},
		up: function (e) {
			e.preventDefault();
			this.isDown = false;
		},
		ease: function (steps) {
			this.ex += (this.x - this.ex) / steps;
			this.ey += (this.y - this.ey) / steps;
		}
	}
	canvas.elem.addEventListener("mousedown", pointer.down.bind(pointer), false );
	canvas.elem.addEventListener("touchstart", pointer.down.bind(pointer), false );
	window.addEventListener("mousemove", pointer.move.bind(pointer), false );
	canvas.elem.addEventListener("touchmove", pointer.move.bind(pointer), false );
	window.addEventListener("mouseup", pointer.up.bind(pointer), false );
	window.addEventListener("touchend", pointer.up.bind(pointer), false );
	var points  = [], mx, my, cb;
	var coordData = '';
	// deflate the world
	var world = "001F8C0C400031F30E7FE000FF964FFFFF00FFB067FFFE001FF03FFFFA001FF07FFFFC003F806BFFF4001F8020FFF4001D007FFFF4000E80FFE7F0000600FFC6680001E07FC2180001F00FC0780001FC0F81730001FC0F80940000FC0F400F0020780F403F00007006001F00006000000640006000000080006000000000002000000000";
	var bits = "", k = 0, o;
	for (var i = 0; i < world.length; i += 2) {
		o = parseInt(world.substring(i, i + 2), 16).toString(2);
		bits += "00000000".substring(0, 8 - o.length) + o;
	}
	for (var y = 0; y < 22; y++) {
		for (var x = 0; x < 48; x++) {
			if (bits.charAt(k++) == "1") points.push(
				new Point(x, y)
			);
		}
	}
	// decode hash
	var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var hash = window.location.hash.substr(1);
	for (var i = 0; i < hash.length; i += 2) {
		var x = key.indexOf(hash.charAt(i));
		var y = key.indexOf(hash.charAt(i + 1));
		for (var j = 0; j < points.length; j++) {
			var p = points[j];
			if (x == p.x0 && y == p.y0) {
				p.c = true;
				break;
			}
		}
	}
	// start
	canvas.resize();
	pointer.x = canvas.width * 0.5;
	pointer.y = canvas.height * 0.5;
	run();
}();




var $lines = $('.prompt p');
$lines.hide();
var lineContents = new Array();

var terminal = function() {

  var skip = 0;
  typeLine = function(idx) {
    idx == null && (idx = 0);
    var element = $lines.eq(idx);
    var content = lineContents[idx];
    if(typeof content == "undefined") {
      $('.skip').hide();
      return;
    }
    var charIdx = 0;

    var typeChar = function() {
      var rand = Math.round(Math.random() * 150) + 25;

      setTimeout(function() {
        var char = content[charIdx++];
        element.append(char);
        if(typeof char !== "undefined")
          typeChar();
        else {
          element.append('<br/><span class="output">' + element.text().slice(9, -1) + '</span>');
          element.removeClass('active');
          typeLine(++idx);
        }
      }, skip ? 0 : rand);
    }
    content = '' + content + '';
    element.append(' ').addClass('active');
    typeChar();
  }

  $lines.each(function(i) {
    lineContents[i] = $(this).text();
    $(this).text('').show();
  });

  typeLine();
}

terminal();
