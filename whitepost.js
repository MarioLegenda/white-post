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

        sliderData.imagesDOM.each(function(index, value) {
            $(value).css({
                backgroundImage : "url(" + options['images'][index] + ")",
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                '-webkit-background-size': 'cover',
                '-moz-background-size': 'cover',
                '-o-background-size': 'cover'
            })
        });

        counter.start(sliderData.imagesDOM.length);

        var tempTimeout = window.setTimeout(function() {}, 1000);
        window.clearTimeout(tempTimeout);

        var images = sliderData.imagesDOM;

       $(images[0]).animate({
            opacity: 1
        }, 500,function () {
            counter.next();
        }).clearQueue();

        window.setInterval(function () {
            var image = $(images.get(counter.curr()));

            //console.log(images.get(counter.curr()));

            image.animate({
                opacity: 1
            }, 500,function () {
                counter.next();
            }).clearQueue();

            var prev = counter.curr() - 1;

            if( typeof images.get(prev) !== 'undefined' ) {
                $(images.get(prev)).animate({
                    opacity:0
                })
            }


        }, options.speed);


    }

    $.fn.WhitePost = function( options ) {

        var sliderData = {
            breakPoint: false
        };

        options = ( function(scope) {
            var defaultOptions =  {
                images: null,
                speed: 6000,
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

                var desiredHeight = viewportHeight - ( topElem.outerHeight() + bottomElem.outerHeight() );
                scope.css('height', desiredHeight + 'px');
                sliderData.sliderHeight = desiredHeight;

                for( var i = 0; i < options['images'].length; i++ ) {
                    var img = new Image();
                    img.src = options['images'][i];
                }

                var images = sliderData.imagesDOM;

                images.each( function(index, value) {
                    $(value).css('height', sliderData.sliderHeight + 'px');
                });

            } (this) );

            var slider = new WhitePost(sliderData, options);

        }
    }

} (jQuery));


