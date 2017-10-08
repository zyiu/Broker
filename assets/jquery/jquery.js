$(document).ready(function() {
    $('.rating').each(function() {
        var value = parseInt($(this).text().trim());
        if (!isNaN(value)) {
          if (value < 0) {
            $(this).addClass('red');
          }
          if (value > 0) {
            $(this).addClass('green');
          }
        }
    });

    $('.normal_cell').click(function() {
        $('#stocktitle').text($(this).text());
    });
});
