#FadeShow - A simple CSS3 slideshow
After having done a lot of fading slideshow-backgrounds lately, i decided to make a jQuery plugin to make my life easier. It aspect-fills the images, so its perfect for backgrounds. You can set an option to preserve the aspect-fill while resizing.

Enjoy, it might make your life easier as well.

##Demo
A live demo is available on [Github Pages](http://terwanerik.github.io/FadeShow).

##Usage
The plugin is really simple, add the jquery.fadeshow-[version].min.js to your project folder and include it.

```html
<script src="src/jquery.fadeshow-0.1.1.min.js" type="text/javascript"></script>
```

Now add the CSS file and jquery.fadeshow-[version].min.css to your project and include it.

```html
<link rel="stylesheet" href="css/jquery.fadeshow-0.1.1.min.css" />
```

Place a container for the slideshow anywhere on your page, a div is preferred (it needs a width and height to show).

```html
<div class="slideshow"></div>
```

Now call the .fadeShow() function on that element, you need to pass an array of image-urls. Do this after the page has finished loading.

```javascript
$(function(){
  $(".slideshow").fadeShow({
    images: ['/img/one.jpg',
	         '/img/two.jpg',
	         '/img/three.jpg']
  });
});
```


##Options
There are a number of options you can pass to the fadeShow, if you need a preview on how to do that, check the [live demo](http://terwanerik.github.io/FadeShow).

| Option Name | Type | Default | Description |
| ----------- | ---- | ------- | ----------- |
| images | Array of strings | null | All the images you want to display.  - REQUIRED |
| speed | Integer | 8000 | The number of milliseconds to wait for the next slide to appear. |
| startAtSlide | Integer | 0 | The index of the image to start with. |
| correctRatio | Boolean | false | If true, the aspect-fill is kept intact while resizing the window. If false, the aspect-fill only works every time a new image appears. |
| shuffle | Boolean | false | If true, the input will be shuffled, generating a random order every time you refresh. |


##Underscore.js
If you have implemented Underscore.js on your page, it will automaticly use the debounce function while resizing. This makes it a bit snappier on older devices.

##Known issues
You can only change the fade speed / easing in the CSS file, somehow if you change it after the DOM has loaded, the CSS3 animation doesn't work.