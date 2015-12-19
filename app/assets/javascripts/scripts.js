//FLEXSLIDER
// selectpicker
// $(document).ready(function(){
//   $('select').selectpicker();
// })

$(document).ready(function(){
  $(".stripe-button-el").prop('disabled', true);


  $("select").change(function(){
      console.log("hello");
      if (($("#product_color").val() != "") && ($("#product_material").val() != "")){
        console.log("biatch")
        $(".stripe-button-el").removeAttr("disabled");
      }
      else{
        $(".stripe-button-el").prop('disabled', true);
      }
    })
})

$(window).load(function() {
  $('.flexslider').flexslider({
    animation: "slide",
    directionNav: false,
    controlNav: true,
  });
});

$(window).load(function() {
  $('.hero').flexslider({
    animation: "slide",
    directionNav: false,
    controlNav: true,
    slideshow: true,
    slideshowSpeed: 5000,
  });
});
$(window).load(function() {
  $(function() {
    var pull = $('#pull');
    var menu = $('nav ul');

    $(pull).on('click', function(e) {
      e.preventDefault();
      menu.slideToggle();
    });
  });
  $(window).resize(function() {
    var menu = $('nav ul');
    var w = $(window).width();
    if (w > 320 && menu.is(':hidden')) {
      menu.removeAttr('style');
    }
  });
});


//OVERLAYS
$(document).ready(function() {

  if (Modernizr.touch) {
    // show the close overlay button
    $(".close-overlay").removeClass("hidden");
    // handle the adding of hover class when clicked
    $(".effects .img").click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!$(this).hasClass("hover")) {
        $(this).addClass("hover");
      }
    });
    // handle the closing of the overlay
    $(".close-overlay").click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      if ($(this).closest(".img").hasClass("hover")) {
        $(this).closest(".img").removeClass("hover");
      }
    });
  } else {
    // handle the mouseenter functionality
    $(".effects .img").mouseenter(function() {
      $(this).addClass("hover");
    })
    // handle the mouseleave functionality
    .mouseleave(function() {
      $(this).removeClass("hover");
    });
    $("#conversion_form").on("submit", function(e){

       e.preventDefault();
       var $this = $(this);
       var email = $('#email-input').val();
       // stocker l'email du client pour pouvoir le réutiliser dans le formulaire stripe
       $.ajax({
                url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                method:"POST",
                dataType: "json", // La méthode indiquée dans le formulaire (get ou post)
                data: {message: email}, // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
                success: function(data, textStatus, xhr) {
                    if(xhr.status==200)
                        $('#email-input').val('');
                        $('#myModal').modal('show');
                    // $('#myModal').popover('show');

                }
            });

    })
  }
});


$(document).ready(function() {
   var handler = StripeCheckout.configure({
      key: 'pk_test_5gV3lLJvx0mc36rSRhKfrLho',
      image: '../img/butt-icon.svg',
      locale: 'auto',
      token: function(token) {
        console.log("hello stripe");
       // var stripe = require("stripe")("pk_test_5gV3lLJvx0mc36rSRhKfrLho");
       var stripeToken = request.body.stripeToken;
       console.log(stripeToken)
        var charge = stripe.charges.create({
        amount: 4000, // amount in cents, again
        currency: "eur",
        source: stripeToken,
        description: "Example charge"
      }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
          // The card has been declined
        }
      });
      }
    });

    $('#payment_button').on('click', function(e) {
      // Open Checkout with further options
      handler.open({
        name: 'Demo Site',
        description: '2 widgets',
        currency: "eur",
        amount: 4000
      });
      e.preventDefault();
    });

    // Close Checkout on page navigation
    $(window).on('popstate', function() {
      handler.close();
    });
})

// SMOOTH NAV SCROLL
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 2000);
        return false;
      }
    }
  });
});

// $('.carousel').carousel();


// WAYPOINTS
$(function() {

  $('.wp1').waypoint(function() {
    $('.wp1').addClass('animated bounceInLeft');
  }, {
    offset: '85%'
  });

  $('.wp2').waypoint(function() {
    $('.wp2').addClass('animated bounceInRight');
  }, {
    offset: '85%'
  });

  $('.wp3').waypoint(function() {
    $('.wp3').addClass('animated bounceInLeft');
  }, {
    offset: '85%'
  });

  $('.wp4').waypoint(function() {
    $('.wp4').addClass('animated fadeInUp');
  }, {
    offset: '85%'
  });

  $('.wp5').waypoint(function() {
    $('.wp5').addClass('animated fadeInUp');
  }, {
    offset: '85%'
  });

  $('.wp6').waypoint(function() {
    $('.wp6').addClass('animated fadeInUp');
  }, {
    offset: '85%'
  });

});
