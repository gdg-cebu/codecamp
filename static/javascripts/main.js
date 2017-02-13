(function() {
  var carousel = $('.carousel');
  carousel.classList.add('carousel-active');

  var prevButton = $('.carousel-button.prev');
  var nextButton = $('.carousel-button.next');

  var speakers = Array.prototype.slice.call($$('.speaker'));

  var itemsPerSlide = 1;
  var index = 0;
  var maxIndex = speakers.length - 1;
  var margin = 0;
  updateValues();


  prevButton.addEventListener('click', function() {
    if (index <= 0) return;
    index--;
    updateCarousel();
  });

  nextButton.addEventListener('click', function() {
    if (index >= maxIndex) return;
    index++;
    updateCarousel();
  });

  window.addEventListener('resize', function() {
    updateValues();
    updateCarousel();
  });


  function updateCarousel() {
    speakers.forEach(function(speaker) {
      var translate = 'calc((' + ((index * 100) + '%') + ' + ' + ((index * 2 * margin) + 'rem') + ') * -1)';
      speaker.style.transform = 'translateX(' + translate + ')';
    });
  }


  function updateValues() {
    var width = window.innerWidth;
    if (width >= 800) {
      itemsPerSlide = 3;
      margin = 2;
    } else if (width >= 500) {
      itemsPerSlide = 2;
      margin = 1;
    } else {
      itemsPerSlide = 1;
      margin = 0;
    }
    maxIndex = speakers.length - itemsPerSlide;
    index = Math.min(index, maxIndex);
  }


  function $(selector, context) {
    return (context || document).querySelector(selector);
  }


  function $$(selector, context) {
    return (context || document).querySelectorAll(selector);
  }
})();
