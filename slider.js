// Image Slider on main page
$(function() {

	var width = 720;
	var animationSpeed = 1000;
	var pause = 5000;
	var currentSlide = 1;

	var SLIDE_RIGHT = 1;
	var SLIDE_LEFT = -1;

	var $slider = $('#slider');
	var $slideContainer = $('.slides', $slider);
	var $slides = $('.slide', $slider);
	var $slideLeft = $('#slider-left');
	var $slideRight = $('#slider-right');

	var $bottomCounter = $('#slider-bottom');


	$slideContainer.css('margin-left', -width);
	var interval;

	function startSlider() {
		interval = setInterval(function() {
			updateSlider(SLIDE_RIGHT);
		}, pause);
	}

	function stopSlider() {
		clearInterval(interval);
	}
	
	function removeBottomCounterElement() {
		// Remove active class from previous item
		var $curElement = $('.active', $bottomCounter);
		$curElement.removeClass("active");
		$curElement.addClass("not-active");

	}

	function updateBottomCounter() {
		// Remove current markers in case clicked multiple times
		removeBottomCounterElement();

		// Add active class to new current item
		$curElement = $('#slider-bullet'+currentSlide);
		$curElement.removeClass("not-active");
		$curElement.addClass("active");
	}

	function updateSlider(slideDirection) {
		var currentOffset = slideDirection * width;
		removeBottomCounterElement();
		$slideContainer.animate({'margin-left': '-='+currentOffset}, animationSpeed, function() {
			currentSlide += slideDirection;
			// Slide right
			if(currentSlide === $slides.length - 1) {
				currentSlide = 1;
				$slideContainer.css('margin-left', -width);
			}
			// Slide left
			else if(currentSlide === 0) {
				currentSlide = $slides.length - 2;
				$slideContainer.css('margin-left', -720 * ($slides.length - 2));
			}
			updateBottomCounter();
		});
	}

	$slider
		.on('mouseenter', stopSlider)
		.on('mouseleave', startSlider);

	$slideLeft.on('click', function() {
		stopSlider();
		updateSlider(SLIDE_LEFT);
	});

	$slideRight.on('click', function() {	
		stopSlider();
		updateSlider(SLIDE_RIGHT);
	});

	startSlider();
});