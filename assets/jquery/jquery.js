$(document).ready(function() {
  var value = parseInt($("#rating").text().trim());
  var color = 'red';
  if (!isNaN(value)) {
    if (value < 0) {
      color = 'red';
    }
    if (value > 0) {
      color = 'green';
    }
    $('#rating').css('color', color);
  }
});
