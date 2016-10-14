// toggleFontSize.js
(function(global){
  var document = global.document;
  var go = document.querySelector('body');
  document.addEventListener('keydown', toggleGuide);
  function toggleGuide(event) {
    if(event.shiftKey && event.keyCode === 71) {
      go.classList.toggle('fontsize-12px');
    }
  }
}(this));
