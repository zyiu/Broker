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

    $('.pinned_show_hide').on("click", function() {
      $('div#pinned ul li:gt(0)').slideToggle();
    })

    $('.trending_show_hide').on("click", function() {
      $('div#trending ul li:gt(0)').slideToggle();
    })

    $('.slump_show_hide').on("click", function() {
      $('div#slump ul li:gt(0)').slideToggle();
    })
});
