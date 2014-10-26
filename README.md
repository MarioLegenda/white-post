

# White Post #

Jquery image slider that uses background images instead of html `<img>` elements.

I'm most of my projects, whenever I needed a slider on the front page, I used [Flexslider](http://flexslider.woothemes.com) but it uses `<img>` elements to make a slider. But if I wanted to add home more html content into the slider, I would have to take into account that Flexslider uses unordered lists to add images. And that complicates adding, for example a form in front of the slider. In those cases, I always had to modify the flexslider.css or even flexslider.js. Also, Flexslider takes images as they are, so if one image has less height that the next one in the slide, next one will will change the height of the entire Flexslider wrapper. To fix that, one has to scale images to an exact uniform size, which is somewhat limiting.

Benefits:
> Easy to add more content

> Light

> Responsive

> No messing with images. If you have an 1200 X 900 image and a 1200 X 950 image, both will automaticlly scale to the size of the slider's element


Downfalls:
> Needs to have a fixed height. Beacuse of that, it can only be used as a frontpage slider, spanning across the entire viewport height of the browser. That will be fixed in a few days or sometime next week by means of letting client code set the desired height via options.

> 



