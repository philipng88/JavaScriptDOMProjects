$(document).ready(function() {
  $('a').on('click', function(event) {
    event.preventDefault();
    if (this.hash !== '') {
      let hash = this.hash;
      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top
        },
        800,
        function() {
          window.location.hash = hash;
        }
      );
    }
  });
});
