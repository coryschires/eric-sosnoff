$(document).ready(function() {

  // open all pdf links in new window
  $('a[href$="pdf"]').attr('target', "_blank");
  
  
  var animated_navigation = function() {
    
    var page_content = $('#pagewrap .page');
    var nav = $('header nav');
    var links = $('header nav a');
    var fast_animation = 1200;
    var slow_animation = 300;

    var nav_css = {
      home: {
        smaller: { 'top': 150, 'left': 200, 'font-size' : 16 },
        bigger: { 'top': 55, 'left': 60, 'font-size' : 59 },
        selected: { 'top': 55, 'left': 60, 'font-size' : 59 }
      },
      bio: { 
        smaller: { 'top': 50, 'left': 300, 'font-size' : 16 },
        bigger: { 'top': 241, 'left': 374, 'font-size' : 59 },
        selected: { 'top': 21, 'left': 282, 'font-size' : 48 }
      },
      teach: { 
        smaller: { 'top': 70, 'left': 40, 'font-size' : 16 },
        bigger: { 'top': 420, 'left': 40, 'font-size' : 59 },
        selected: { 'top': 15, 'left': 5, 'font-size' : 40 }
      },
      papers: { 
        smaller: { 'top': 60, 'left': 529, 'font-size' : 16 },
        bigger: { 'top': 44, 'left': 462, 'font-size' : 51 },
        selected: { 'top': 17, 'left': 393, 'font-size' : 40 }
      },
      contact: { 
        smaller: { 'top': 116, 'left': 605, 'font-size' : 16 },
        bigger: { 'top': 456, 'left': 435, 'font-size' : 50 },
        selected: { 'top': 33, 'left': 342, 'font-size' : 40 }
      }
    }
    
    var header_css = {
      smaller: { 'height': 250 },
      bigger: { 'height': 750 }
    }
    
    
    var animating_to_or_from_homepage = function() {
      var animating_to_homepage = $('a[data-id="home"]').hasClass('selected');
      var animating_from_homepage = $('header nav').height() > header_css.smaller.height;
      return  animating_to_homepage || animating_from_homepage;
    }
    

    var load_header = function(size, use_animation) {
      var animation_speed = animating_to_or_from_homepage() ? fast_animation : slow_animation;
      var easing = 'easeInOutQuart';
     
      // load nav links
      $.each(nav_css, function(link_name, styles) {
        var link = links.filter('[data-id="'+link_name+'"]');
        if ( !link.hasClass('selected') ) {
          if (use_animation) {
            // link.animate(styles[size], animation_speed, easing);
            link.animate(styles[size], { queue: false, duration: animation_speed });

          } else {
            link.css(styles[size]);
          }
        }
      });
      
      // load header background
      if (use_animation) {
        // nav.animate(header_css[size], animation_speed, easing);
        nav.animate(header_css[size], { queue: false, duration: animation_speed });
      } else {
        nav.css(header_css[size]);
      }
    };
    
    
    var animate_selected_link = function(use_animation) {
      var link = links.filter('.selected');
      var animation_speed = function() {
        return animating_to_or_from_homepage() ? fast_animation : slow_animation;
      }();
      
      if (use_animation) {
        link.animate(nav_css[link.attr('data-id')]['selected'], { queue: false, duration: animation_speed });
      } else {
        link.css(nav_css[link.attr('data-id')]['selected']);
      }
    };
    
    
    var display_correct_content_on_page_load = function() {
        var hash_url = window.location.href.match(/#.+$/);
        if (hash_url) {hash_url = hash_url[0]}
        if (hash_url && hash_url !== '#home') {
            var link = $('a[href='+hash_url+']').addClass('selected');
            load_header('smaller')
            animate_selected_link();
            setTimeout(function() {
              page_content.filter('[data-id="'+ link.attr('data-id') +'"]').show();
            }, 40);
            
        } else {
          load_header('bigger', false);
        }
    }();
    
    
    // when you click a link
    links.click(function() {
      var clicked_link = $(this);
      var data_id = clicked_link.attr('data-id')
      var clicked_anything_except_home = data_id !== 'home';
      
      // make clicked link bigger
      links.removeClass('selected');
      clicked_link.addClass('selected');
      animate_selected_link(true);
      
      // conditionally animate the header
      load_header( (clicked_anything_except_home ? 'smaller' : 'bigger'), true );
      
      // hide all page content except the corresponding page
      page_content.hide().filter('[data-id="'+ data_id +'"]').show();
    });
    
  }();
    

});
