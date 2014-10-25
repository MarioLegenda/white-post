( function($) {

    function WhitePost(sliderData, options) {
        var counter = {
            total: null,
            current: 0,
            default: 0,

            start: function (total) {
                this.total = total;
            },

            next: function () {
                this.current += 1;
                if (this.current >= this.total) {
                    this.current = 0;
                    return this.current;
                }

                return this.default;
            },

            curr: function () {
                return this.current;
            },

            prev: function () {
                this.current -= 1;

                if (this.current < 0) {
                    this.current = this.total - 1;
                    return this.current;
                }

                return this.default;
            }
        };

        var animator = {
            clearRepeat: null,
            animationSpeed: options.animationSpeed,

            fade: function() {
                this.clearRepeat = window.setInterval(function () {
                    var image = $(images.get(counter.curr()));

                    //console.log(images.get(counter.curr()));

                    image.animate({
                        opacity: 1
                    }, 1000 ,function () {
                        counter.next();
                    }).clearQueue();

                    var prev = counter.curr() - 1;

                    if( typeof images.get(prev) !== 'undefined' ) {
                        $(images.get(prev)).animate({
                            opacity:0
                        })
                    }


                }, options.duration);
            },

            slide: function() {
                this.clearRepeat = window.setInterval(function () {
                    var image = $(images.get(counter.curr())),
                        next = $(images.get(counter.curr() + 1));

                    if( typeof next.get(0) === 'undefined' ) {
                        counter.next();
                        next = $(images.get(counter.curr() + 1));
                    }


                    next.css({
                        left: '-' + $(window).outerWidth() + 'px',
                        opacity:1
                    });

                    image.animate({
                        left: $(window).outerWidth() + 'px'
                    }, 1000, function() {
                        $(this).css({
                            left: '0px',
                            opacity: 0
                        });

                        counter.next();
                    }).clearQueue();

                    next.animate({
                        left: '0px'
                    }, 1000, function() {
                    }).clearQueue();


                }, options.duration);
            },

            clearAnimation: function() {
                clearInterval(this.clearRepeat);
            }
        };

        sliderData.imagesDOM.each(function(index, value) {
            $(value).css({
                backgroundImage : "url(" + options['images'][index] + ")"
            })
        });

        counter.start(sliderData.imagesDOM.length);

        var images = sliderData.imagesDOM;
        window.setTimeout(function() {

            $(images[0]).animate({
                opacity: 1
            }, options.animationSpeed,function () {
                if( options.animation === 'fade' ) {
                    counter.next();
                }
            }).clearQueue();
        }, 1000);

        if( options.animation === 'fade' ) {
            animator.fade();
        }
        else if( options.animation === 'slide' ) {
            animator.slide();
        }

    }

    $.fn.WhitePost = function( options ) {

        var sliderData = {
            breakPoint: false
        };

        options = ( function(scope) {
            var defaultOptions =  {
                images: null,
                duration: 5000,
                animation: 'fade',
                cursors: true,
                height: null,
                topElem: null,
                bottomElem: null
            };

            if( ! options.hasOwnProperty('images') ) {
                throw new TypeError('\'images\' property has to be specified as an array of paths to images, RELATIVE to whitepost.js');
            }

            if( Object.prototype.toString.call(options['images']) !== '[object Array]') {
                throw new TypeError('\'images\' property has to be an ARRAY data type, consisting paths to images RELATIVE to whitepost.js');
            }

            for( var option in options ) {
                if( options.hasOwnProperty(option) ) {
                    if( defaultOptions.hasOwnProperty(option) ) {
                        defaultOptions[option] = options[option];
                    } else {
                        throw new TypeError('Unknown option: ' + option);
                    }
                }
            }

            if( options['animation'] !== 'fade' && options['animation'] !== 'slide') {
                throw new TypeError('\'animation\' property can only be \'fade\' or \'slide\'');
            }

            var images = scope.find('.WhitePostSlider__Image');

            if( images.length === 0 ) {
                console.log('There are no \'.WhitePostSlider__Image\' classes inside WhitePostSlider HTML block');
            }
            else if( images.length > 0 ) {
                sliderData.sliderElem = scope;
                sliderData.imagesDOM = images;
                sliderData.breakPoint = true;
            }


            return defaultOptions;
        } (this) );

        if( sliderData.breakPoint === true ) {

            ( function(scope) {
                var viewportHeight = $(window).outerHeight(),
                    topElem = scope.prev(),
                    bottomElem = scope.next();

                var desiredHeight = viewportHeight - topElem.outerHeight();
                scope.css('height', desiredHeight + 'px');
                sliderData.sliderHeight = desiredHeight;

                var images = sliderData.imagesDOM;

                images.each( function(index, value) {
                    $(value).css('height', sliderData.sliderHeight + 'px');
                });

                for( var i = 0; i < options['images'].length; i++ ) {
                    var img = new Image();
                    img.src = options['images'][i];
                }

            } (this) );

            $(window).resize(function() {
                if( $(window).width() > 480 ) {
                    var viewportHeight = $(window).outerHeight(),
                        sliderElem = $('.WhitePostSlider'),
                        topElem = sliderElem.prev(),
                        bottomElem = sliderElem.next();

                    var desiredHeight = viewportHeight - topElem.outerHeight();
                    sliderElem.css('height', desiredHeight + 'px');
                    sliderData.sliderHeight = desiredHeight;

                    var images = sliderData.imagesDOM;

                    images.each( function(index, value) {
                        $(value).css('height', sliderData.sliderHeight + 'px');
                    });
                }
            });

            new WhitePost(sliderData, options);

        }
    }

} (jQuery));


