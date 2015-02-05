/* 
 * FadeShow jQuery Plugin
 * Made by Erik Terwan
 * 5 February 2015 - 0.1.1
 * 
 * This plugin is provided as-is and released under the terms of the MIT license.
 */

(function($){
	$.fn.fadeShow = function(options){
		/*
		 *  VARIABLES
		 */
		
		// Set the default options
		var settings = $.extend({
			images: null, //images (urls) to create the slideshow with, array of strings - required
			speed: 8000, //milliseconds per slide, integer
			startAtSlide: 0, //the slide index to start the slideshow with, integer
			correctRatio: false, //if true, the aspect fill will be intact even when resizing the window, boolean
								//only handy for full width / height slideshows, otherwise slows your page down
			shuffle: false //if true, the slides will be shuffled before shown, get a unique slider each refresh, boolean
		}, options);
		
		var $thisElement = this; //for use inside functions etc.
		var $imageElements = new Array(); //all the image elements in the slider
		var currentSlide = settings.startAtSlide; //the current slide
		
		/*
		 *  PRIVATE METHODS
		 */
		
		//initialize the slideshow
		function init()
		{
			$thisElement.append("<div class='fadeShow-container'></div>"); //add the container to the element
			
			$.each(settings.images, function(count){
				$(".fadeShow-container", $thisElement).append(format(this, count)); //format the image urls and place them inside the container
				
				var $imageElement = $("#fadeShow-slide"+count); //get the object
				
				$imageElements.push($imageElement); //add it to the array of elements
			});
			
			setInterval(nextImage, settings.speed); //set the timer
			
			//check the settings for alterations
			if(settings.correctRatio){
				//correct the fill ratio when rezing the window 
				
				//check if underscore.js is used
				if(typeof _ === 'function' && typeof _.debounce !== 'undefined') {
					$(window).resize(_.debounce(function(){
						var runningElement = currentSlide - 1; //get the current visible slide,
						//that is currentSlide minus one because we upped it with 1 in the nextImage function
						
						if(runningElement < 0){
							runningElement = $imageElements.length - 1; //lower than 0 == last slide
						}
						
						setImageRatio($imageElements[runningElement]); //set the ratio
					}, 50));
				} else{
					$(window).resize(function(){
						var runningElement = currentSlide - 1; //get the current visible slide,
						//that is currentSlide minus one because we upped it with 1 in the nextImage function
						
						if(runningElement < 0){
							runningElement = $imageElements.length - 1; //lower than 0 == last slide
						}
						
						setImageRatio($imageElements[runningElement]); //set the ratio
					});
				}
			}
			
			if(settings.shuffle){
				//shuffle the images
				$imageElements = shuffleArray($imageElements);
			}
			
			nextImage(); //set the image for 'startAtSlide' option
			
			setTimeout(function(){
				setImageRatio($(".fadeShow-container .active")); //set ratio after 10 ms to let the image load
				
				setTimeout(function(){
					setImageRatio($(".fadeShow-container .active")); //set ratio after 300 ms again
				}, 300);
			}, 10);
			
			return $thisElement; //return self for chaining
		}
		
		//format the image URL to an image element
		function format(image, count)
		{
			//using the background-image, but adding the image element so we can get the aspect ratio
			return "<div class='image' id='fadeShow-slide"+count+"' style='background-image: url("+image+");'><img src='"+image+"' alt='' /></div>";
		}
		
		//display the next image in the array
		function nextImage()
		{
			//loop through all image elements
			$.each($imageElements, function(count){
				if(currentSlide == count){
					setImageRatio(this);
					
					$(this).addClass('active').removeClass('inactive'); //toggle active class
				} else{
					$(this).removeClass('active').addClass('inactive'); //toggle inactive class 
				}
			});
			
			currentSlide++; //up the currentSlide by 1
			
			if(currentSlide >= $imageElements.length){
				currentSlide = 0; //if bigger than number of images start at the beginning
			}
		}
		
		//set the correct aspect fill ratio for an image element
		function setImageRatio($imageElement)
		{
			var parentRatio = parseInt($thisElement.width()) / parseInt($thisElement.height());
			var imageRatio = 100 / parseInt($("img", $imageElement).height());
			
			if(imageRatio > parentRatio){
				//fill the image using 100% height
				$imageElement.addClass('fillHeight');
			} else{
				//fill image using 100% width
				$imageElement.removeClass('fillHeight');
			}
		}
		
		return init(); //return init > this for chaining
	};
}(jQuery));

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 * From http://stackoverflow.com/a/12646864/886926
 */
function shuffleArray(array)
{
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}