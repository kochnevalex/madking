$(document).ready(function () {

    var btnActiv = function () {
        var $btn = $('.btn-wrap .btn');
        $btn.hover(function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });

        $btn.on('mouseout', function () {
            $btn.addClass('active');
        });

    };

    var bgChange = function () {
        var $btnRed = $('.btn-wrap .btn--red'),
            $btnBlue = $('.btn-wrap .btn--blue'),
            $bgLeft = $('.bg-left'),
            $bgRight = $('.bg-right');
        $btnRed.hover(function () {
            $bgRight.toggleClass('active');
        });
        $btnBlue.hover(function () {
            $bgLeft.toggleClass('active');
        });
    };

    var bgImage = function () {

        if ($('.bg-image').length) {
            $('.bg-image').each(function () {
                var $node = $(this);
                var imgUrl = $node.data('bgimage');
                $node.css({
                    backgroundImage: "url('" + imgUrl + "')"
                });
            });
        }

    };


    var popup = function () {
        var popupOpen = $('.btn--popup');
        popupOpen.magnificPopup({
            showCloseBtn: false,
            type: 'inline',
            padding: 0,
            midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function () {
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            }
        });
    };


    var validation = function () {
        var $formSender = $('#form');
        $formSender.validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                nick: {
                    required: true,
                    minlength: 4
                },
                pass: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                email: {
                    required: 'Корректный адрес email имеет формат nick@mail.ru.',
                    email: 'Корректный адрес email имеет формат nick@mail.ru.'
                },
                nick: {
                    required: 'Никнейм должен содержать 4 и более символов.',
                    minlength: 'Никнейм должен содержать 4 и более символов.'
                },
                pass: {
                    required: 'Пароль должен содержать 6 и более символов.',
                    minlength: 'Пароль должен содержать 6 и более символов.'
                }

            },

        });
    };

    var changePerson = function () {
        var $btn = $('.btn-wrap .btn'),
            $btnRed = $('.btn-wrap .btn--red'),
            $btnBlue = $('.btn-wrap .btn--blue'),
            $bgLeft = $('.bg-left'),
            $bgRight = $('.bg-right');

        var personAnimate = setInterval(function () {
            $bgRight.addClass('active');
            $bgLeft.toggleClass('active');
            if ($btnRed.hasClass('active')) {
                $btnBlue.addClass('active');
                $btnRed.removeClass('active');

            }
            else {
                $btnRed.addClass('active');
                $btnBlue.removeClass('active');
            }

        }, 4000);


        $btn.hover(function (e) {
            clearInterval(personAnimate);
            $bgRight.removeClass('active');
            $bgLeft.removeClass('active');
            btnActiv();
        }, function (e) {
            personAnimate = setInterval(function () {
                $bgRight.addClass('active');
                $bgLeft.toggleClass('active');
                if ($btnRed.hasClass('active')) {
                    $btnBlue.addClass('active');
                    $btnRed.removeClass('active');

                }
                else {
                    $btnRed.addClass('active');
                    $btnBlue.removeClass('active');
                }
            }, 4000);
        });


    };


    var newSmoke = function () {

        var smoke = new Image();
        smoke.src = 'http://s4.postimg.org/atxdou6u1/smoke.png';

        $.fn.emitter = function (opts) {
            var particles = [];
            var canvases = [];

            var particle = function (canvas) {
                var x, y, size, speedX, speedY, opacity;
                reset();

                this.update = function () {
                    if (opacity > 0) {
                        opacity -= (Math.random() / opts.speed.fade);
                    }

                    if (opacity <= 0) {
                        reset();
                    }

                    speedX -= Math.random() / opts.speed.acceleration;
                    speedY -= Math.random() / opts.speed.acceleration;
                    x += speedX;
                    y += speedY;
                    size += Math.random();
                    drawParticle(x, y, size, opacity);
                };

                function drawParticle(x, y, size, opacity) {
                    canvas.globalAlpha = opacity;
                    canvas.drawImage(smoke, 0, 0, opts.size, opts.size, x, y, size, size);
                }

                function reset() {
                    x = opts.x;
                    y = opts.y;
                    size = opts.size;
                    speedX = Math.random() * opts.speed.x;
                    speedY = Math.random() * opts.speed.y;
                    opacity = Math.random();
                }
            };

            var canvas = function (el) {
                var canvas = el[0].getContext('2d');

                canvas.width = el.width();
                canvas.height = el.height();

                for (var c = 0; c < opts.particles; c++) {
                    particles.push(new particle(canvas));
                }

                this.clear = function () {
                    canvas.clearRect(0, 0, canvas.width, canvas.height);
                };
            };

            $(this).each(function () {
                canvases.push(new canvas($(this)));
            });

            function render() {
                canvases.forEach(function (canvas) {
                    canvas.clear();
                });

                particles.forEach(function (particle) {
                    particle.update();
                });

                window.requestAnimationFrame(render);
            }

            return {
                render: render
            }
        };

        $('canvas').emitter({
            x: 100,
            y: 150,
            size: 70,
            particles: 60,
            speed: {
                x: 0.5,
                y: 0,
                fade: 150,
                acceleration: 150
            }
        }).render();
    };
    var background = function () {


        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var smokeParticle = function () {
            function smokeParticle() {
                _classCallCheck(this, smokeParticle);

                this.init();
            }

            smokeParticle.prototype.init = function init() {
                this.particlesQuantity = 300;
                this.velocity = 0.25;
                this.maxRadius = 2;

                this.imgQuantity = 150;
                this.maxSize = 600;
                this.imgVelocity = 0.05;
                this.smokeOne = new Image();
                this.smokeTwo = new Image();
                this.smokeOne.src = 'https://raw.githubusercontent.com/RegisBiron/smokeParticles/master/smoke.png';
                this.smokeTwo.src = 'https://raw.githubusercontent.com/RegisBiron/smokeParticles/master/smoke-2.png';

                this.canvas = document.getElementById('canvas');
                this.ctx = this.canvas.getContext('2d');
                this.particles = [];
                this.smoke = [];

                this.ratio = 1;

                this.bindHandlers();
                this.buildParticles();
                this.buildImg();
                this.resizeCanvas();
                this.retinaScreen();
                this.animateParticles();
            };

            smokeParticle.prototype.bindHandlers = function bindHandlers() {
                window.addEventListener('resize', this.resizeCanvas.bind(this), false);
            };

            smokeParticle.prototype.buildImg = function buildImg() {
                var smokeImages = [this.smokeOne, this.smokeTwo];

                var maxSize;

                for (var i = 0; i < this.imgQuantity; i++) {
                    var img = smokeImages[Math.floor(Math.random() * smokeImages.length)];

                    maxSize = Math.round(Math.random() * this.maxSize);

                    this.smoke.push({
                        x: Math.round(Math.random() * window.innerWidth) - maxSize / 2,
                        y: Math.round(Math.random() * window.innerHeight) - maxSize / 2,
                        velx: Math.random() * this.imgVelocity * 2 - this.imgVelocity,
                        vely: Math.random() * this.imgVelocity * 2 - this.imgVelocity,
                        size: maxSize,
                        img: img
                    });
                }
            };

            smokeParticle.prototype.buildParticles = function buildParticles() {
                for (var i = 0; i < this.particlesQuantity; i++) {
                    // use this for an array of colors
                    // var colors = ['#60CAA0', '#BEE1EF', '#FF6F6F'];
                    // var color = colors[Math.floor(Math.random() * colors.length)];

                    this.particles.push({
                        x: Math.round(Math.random() * window.innerWidth),
                        y: Math.round(Math.random() * window.innerHeight),
                        velx: Math.random() * this.velocity * 2 - this.velocity,
                        vely: Math.random() * this.velocity * 2 - this.velocity,
                        radius: Math.round(Math.random() * this.maxRadius),
                        color: '#5F6D7C'
                    });
                }
            };

            smokeParticle.prototype.resizeCanvas = function resizeCanvas() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
                this.retinaScreen();
            };

            smokeParticle.prototype.retinaScreen = function retinaScreen() {
                var devicePixelRatio = window.devicePixelRatio || 1,
                    backingStoreRatio = this.ctx.webkitBackingStorePixelRatio || this.ctx.mozBackingStorePixelRatio || this.ctx.msBackingStorePixelRatio || this.ctx.oBackingStorePixelRatio || this.ctx.backingStorePixelRatio || 1;
                this.ratio = devicePixelRatio / backingStoreRatio;

                if (devicePixelRatio !== backingStoreRatio) {
                    var oldWidth = this.canvas.width;
                    var oldHeight = this.canvas.height;

                    this.canvas.width = oldWidth * this.ratio;
                    this.canvas.height = oldHeight * this.ratio;

                    this.canvas.style.width = oldWidth + 'px';
                    this.canvas.style.height = oldHeight + 'px';

                    this.ctx.scale(this.ratio, this.ratio);
                } else {
                    this.canvas.width = window.innerWidth;
                    this.canvas.height = window.innerHeight;
                }
            };

            smokeParticle.prototype.animateParticles = function animateParticles() {
                window.requestAnimationFrame(this.animateParticles.bind(this));
                this.render();
            };

            smokeParticle.prototype.render = function render() {

                // clear the canvas in-between each animation frame
                this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

                var particle,
                    particleLength = this.particles.length;

                for (var i = 0; i < particleLength; i++) {
                    particle = this.particles[i];

                    // create bounds if particle reaches the edge of the canvas
                    if (particle.x < 0) {
                        particle.velx = this.velocity + Math.random();
                    } else if (particle.x > window.innerWidth) {
                        particle.velx = -this.velocity - Math.random();
                    }

                    if (particle.y < 0) {
                        particle.vely = this.velocity + Math.random();
                    } else if (particle.y > window.innerHeight) {
                        particle.vely = -this.velocity - Math.random();
                    }

                    particle.x += particle.velx;
                    particle.y += particle.vely;

                    this.ctx.fillStyle = particle.color;
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, true);
                    this.ctx.closePath();
                    this.ctx.fill();
                }

                var img,
                    smokeLength = this.smoke.length;

                for (var i = 0; i < smokeLength; i++) {
                    img = this.smoke[i];

                    // Create bounds that are 0.5 the size of the canvas
                    if (img.x < window.innerWidth * -0.5) {
                        img.velx = this.imgVelocity + Math.random();
                    } else if (img.x > (window.innerWidth - img.size) * 2) {
                        img.velx = -this.imgVelocity - Math.random();
                    }

                    if (img.y < window.innerHeight * -0.5) {
                        img.vely = this.imgVelocity + Math.random();
                    } else if (img.y > (window.innerHeight - img.size) * 2) {
                        img.vely = -this.imgVelocity - Math.random();
                    }

                    img.x += img.velx;
                    img.y += img.vely;

                    this.ctx.drawImage(img.img, img.x, img.y, img.size, img.size);
                }
                this.ctx.restore();
            };

            return smokeParticle;
        }();

        new smokeParticle();
    };


    background();
    changePerson();
    validation();
    popup();
    bgChange();
    btnActiv();
    bgImage();

});