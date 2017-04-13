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
            $bgMain = $('.bg-main'),
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


    validation();
    popup();
    bgChange();
    btnActiv();
    bgImage();

});