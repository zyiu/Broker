$(document).ready(function() {

    $.getJSON('stockinfo.json', function(data) {
        //var result = jQuery.parseJSON(data.d);
        //json_object = JSON.parse(data);
        //console.log(data.key);
        $.each(data, function(key, value){
            //console.log(key);
            var positiveArticles = 0;
            var negativeArticles = 0;
            $.each(value, function(key, value){
                //console.log(key, value);
                $.each(value, function(key, value){
                    if (key == 'positiveArticles') {
                        positiveArticles = value.length;
                    }
                    if (key == 'negativeArticles') {
                        negativeArticles = value.length;
                    }
                    //console.log(positiveArticles, negativeArticles);
                });
            });
            score = positiveArticles - negativeArticles
            if (score > 0) {
                $('#trending ul').append('<li class="normal_cell"><div><div id="content_align" style="display:inline-block;"><h4>'+key+'</h4></div><div class="rating" style="display:inline-block;">+'+score+'</div></div></li>');
            }
            if (score < 0) {
                $('#slump ul').append('<li class="normal_cell"><div><div id="content_align" style="display:inline-block;"><h4>'+key+'</h4></div><div class="rating" style="display:inline-block;">'+score+'</div></div></li>');
            }

        });

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
            $('#graph-wrapper').html('');
            $('#article-wrapper ul').html('');
            name = $(this).find('h4').text();
            score = $(this).find('.rating').text();
            $('#stocktitle').text(name+' '+score);
            var kvArray = [];
            $.getJSON('stockinfo.json', function(data) {
                //var dict = JSON.parse(data.name.value);
                //var negs = dict.key
                //console.log(dict.force)
                //console.log(data.name.key)
                //var result = jQuery.parseJSON(data.d);
                //json_object = JSON.parse(data);

                $.each(data, function(key, value){
                    //console.log(name);

                    if(key == name) {
                        //console.log("hello")
                        $.each(value, function(key, value){
                            $.each(value, function(key, value){
                                if (score > 0 && key == 'positiveArticles') {
                                    //console.log(value);
                                    $.each(value, function(i, val){
                                        $('#article-wrapper ul').append('<li><a href='+val+'>'+val+'</a></li>');
                                    });
                                }
                                if (score < 0 && key == 'negativeArticles') {
                                    $.each(value, function(i, val){
                                        $('#article-wrapper ul').append('<li><a href='+val+'>'+val+'</a></li>');
                                    });
                                }
                                if (key == 'positiveWords') {
                                    //console.log(value);
                                    $.each(value, function(i, val){
                                        kvArray.push({text: val, count: "1"})
                                    });
                                }
                                if (key == 'negativeWords') {
                                    //console.log(value);
                                    $.each(value, function(i, val){
                                        kvArray.push({text: val, count: "1"})
                                    });
                                }
                            });
                        });

                        $('#graph-wrapper').append('<div class="bubbleChart"></div>');
                        var bubbleChart = new d3.svg.BubbleChart({
                          supportResponsive: true,
                          size: 600,
                          innerRadius: 600 / 3.5,
                          radiusMin: 50,
                          data: {
                            items: kvArray,
                            eval: function (item) {return item.count;},
                            classed: function (item) {return item.text.split(" ").join("");}
                          },
                          plugins: [
                            {
                              name: "lines",
                              options: {
                                format: [
                                  {// Line #0
                                    textField: "count",
                                    classed: {count: true},
                                    style: {
                                      "font-size": "28px",
                                      "font-family": "Source Sans Pro, sans-serif",
                                      "text-anchor": "middle",
                                      fill: "white"
                                    },
                                    attr: {
                                      dy: "0px",
                                      x: function (d) {return d.cx;},
                                      y: function (d) {return d.cy;}
                                    }
                                  },
                                  {// Line #1
                                    textField: "text",
                                    classed: {text: true},
                                    style: {
                                      "font-size": "14px",
                                      "font-family": "Source Sans Pro, sans-serif",
                                      "text-anchor": "middle",
                                      fill: "white"
                                    },
                                    attr: {
                                      dy: "20px",
                                      x: function (d) {return d.cx;},
                                      y: function (d) {return d.cy;}
                                    }
                                  }
                                ],
                                centralFormat: [
                                  {// Line #0
                                    style: {"font-size": "50px"},
                                    attr: {}
                                  },
                                  {// Line #1
                                    style: {"font-size": "30px"},
                                    attr: {dy: "40px"}
                                  }
                                ]
                              }
                            }]
                        });
                        return false;
                    }
                });
            });
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

    $('#home').click(function() {
        $('#stocktitle').text('WELCOME');
        $('#article-wrapper ul').html('');
        $('#graph-wrapper').html('');
    });



});
