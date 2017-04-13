$(document).ready(function () {

    var btnActiv = function () {
        var $btn = $('.btn-wrap .btn');
        $btn.hover(function () {
            $(this).siblings().toggleClass('active');
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
        var $btnRed = $('.btn-wrap .btn--red'),
            $btnBlue = $('.btn-wrap .btn--blue'),
            $bgLeft = $('.bg-left'),
            $bgRight = $('.bg-right');

        var personAnimate = setInterval(function () {
            $bgRight.addClass('active');
            $bgLeft.toggleClass('active');
        }, 4000);


        $btnRed.hover(function (e) {
            clearInterval(personAnimate);
            $bgRight.removeClass('active');
            $bgLeft.removeClass('active');
        }, function (e) {
            personAnimate = setInterval(function () {
                $bgRight.addClass('active');
                $bgLeft.toggleClass('active');
            }, 5000);
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


    newSmoke();
    changePerson();


    validation();
    popup();
    bgChange();
    btnActiv();
    bgImage();

});