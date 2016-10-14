// toggleGuide.js
(function(global){
  var document = global.document;
  var go = document.querySelector('.guide-overlay');
  document.addEventListener('keydown', toggleGuide);
  function toggleGuide(event) {
    if(event.shiftKey && event.keyCode === 71) {
      go.classList.toggle('show');
    }
  }
}(this));
