function toggleCard(overlayItem) {
  overlayItem.classList.toggle('visible');
  var page = document.querySelector('body');
  page.classList.toggle('disable-scroll');
}


// if in the home page, run this
if (document.querySelector('#home')) {
  console.log("Inside home");
  var trips = document.querySelectorAll('article.trip');
  for (let tripItem of trips) {
    // console.log(tripItem.outerHTML);
    tripItem.addEventListener('click',function(event) {
      var overlayItem = event.target.nextElementSibling;
      console.log(overlayItem);
      toggleCard(overlayItem);
    });
  }
}

// if the customize-overlay is on display,
// play this js
if (document.querySelector('.overlay')) {
  // var overlay = document.querySelector('.overlay');
  // if there are any clicks happening on overlay
  // check if it's from outside the form-card
  document.addEventListener('click', function(event){
    // Select the necessary elements from the DOM
    var areaClicked = event.target;
    console.log(areaClicked);
    if (areaClicked.className === 'overlay visible') {
      toggleCard(areaClicked);
    }
  });
}
