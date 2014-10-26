

# White Post #

Jquery image slider that uses background images instead of html `<img>` elements.

I'm most of my projects, whenever I needed a slider on the front page, I used [Flexslider](http://flexslider.woothemes.com) who uses `<img>` elements to make a slider. But if I wanted to add some more html content into the slider, I would have to take into account that Flexslider uses unordered lists to add images. And that complicates adding, for example a form in front of the slider. In those cases, I always had to modify the flexslider.css or even flexslider.js. Also, Flexslider takes images as they are, so if one image has less height that the next one in the slide, next one will will change the height of the entire Flexslider wrapper. To fix that, one has to scale images to an exact uniform size, which is somewhat limiting.

Benefits:
> Easy to add more content

> Light

> Responsive

> No messing with images. If you have an 1200 X 900 image and a 1200 X 950 image, both will automaticlly scale to the size of the slider's wrapping element

> whitepost.css has around 20 lines of css and it wont be hard to modify it to suit your fancy


Downfalls:
> Needs to have a fixed height. Beacuse of that, it can only be used as a frontpage slider, spanning across the entire viewport height of the browser. I will fix it in a few days or sometime next week by means of letting client code set the desired height via options.

> No cursors to navigate left or right. Also will be added sometim next week

> Limited options and only one form of slider. For example, doesn't have a carousel option. Will be added in the futur.

If you find some other downfalls or bugs, please tell me so I can fix it.

####Usage####

First, add HTML...

```
<div class="WhitePostSlider">
    <div class="WhitePostSlider__Image"></div>
    <div class="WhitePostSlider__Image"></div>
    <div class="WhitePostSlider__Image"></div>
    <div class="WhitePostSlider__Image"></div>
    <div class="WhitePostSlider__Image"></div>
</div>
```

Then jQuery...

```
$(document).ready(function() {
    $('.WhitePostSlider').WhitePost({
        images: [
            'path/image1.jpg',
            'path/image2.jpg',
            'path/image3.jpg',
            'path/image4.jpg',
            'path/image5.jpg',
        ],
        duration: 5000,
        animation: 'fade',
        pauseOnHover: false
    });
})
```

So far, options can be
* `images`: has to be an array of paths
* `duration`: integer in miliseconds
* `animation`: `fade` or `slide`
* `pauseOnHover`: `true` or `false`




