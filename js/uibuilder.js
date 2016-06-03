// uibuilder.js

var UIBuilder = (function() {
  function UIBuilder(controller) {
    this.controller = controller;
    $( "#cards" ).html("");
  };
  UIBuilder.prototype.buildUi = function() {

    //Build cards
    this.controller.people.forEach( function( e , i ) {
      //Card
      var $card = $( '<div>' , { id: "user_" + e.username , class: "card" });

      //Rows
      var $card_header = $( '<div>', { id: e.username + "_card_header" , class: "card_header_row" });
      var $badge_gallery = $( '<div>', { id: e.username + "_gallery" , class: "badge_gallery_row" });

      //Columns
      var $img_col = $( '<div>', { class: "img_col" });
      var $name_col = $( '<div>', { class: "name_col" } );
      var $badge_gallery_col = $( '<div>', { class: "badge_gallery_col" } );

      //Content
      var $badge_count = $( '<h5>' , { id: e.username + "_badge_count" , class: "badge_count" });
      var $name = $( '<h2>' , { class: "user_name" } );
      var $user_img = $( '<img>' , { src: e.gravatar , alt: e.username , id: "user_img_" + e.username , class: "user_img" });
      var achievements = e.badges;

      //Badge Images
      achievements.forEach(function( e , i ) {
        var $small_badge = $( '<img>' , { src: e.badge.image , alt: e.name , id: "user_badge_" + e.name , class: "badge_gallery_img" });
        $small_badge.appendTo( $badge_gallery_col );
      });

      //Text
      $name.text(e.name);
      $badge_count.text("Badge Count: " + achievements.length);

      //12-column grid
      $card_header.addClass("onerow");
      $badge_gallery.addClass("onerow");
      $img_col.addClass("col4");
      $img_col.appendTo( $card_header );
      $name_col.addClass("col8 last");
      $name_col.appendTo( $card_header );
      $badge_gallery_col.addClass("col12 last");
      $badge_gallery_col.appendTo( $badge_gallery )

      //Append content to grid
      $user_img.appendTo( $img_col );
      $name.appendTo( $name_col );
      $badge_count.appendTo( $name_col );

      //Append columns to card
      $card_header.appendTo( $card );
      $badge_gallery.appendTo( $card );

      //Append this card to main-container
      // $( "#main-container" ).append( $card );
      $( "#cards" ).append( $card );
    }, this);
  };

  return UIBuilder;

})();
