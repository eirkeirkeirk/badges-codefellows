// uibuilder.js

var UiBuilder = (function() {
    console.log("Built ---- UiBuilder Object.");
    function UiBuilder(controller) {
        this.controller = controller;
    };
    UiBuilder.prototype.testMethod = function() {
        console.log("Run ---- UiBuilder.");
        console.log(this.controller.people);
    };
    UiBuilder.prototype.buildUi = function() {
        console.log("\n" + "\n" + "\n");
        console.log("Running ---- buildUi");
        console.log("\n" + "\n" + "\n");
        console.log(this.controller.people);





        //Build cards
        this.controller.people.forEach( function( e , i ) {
            console.log( "Building ---- card " + ( i + 1 ) + " ---- " + e.name +".");

            //Card
            var $card = $( '<div>' , { id: "user_" + e.username , class: "card" });

            //Rows
            var $card_header = $( '<div>', { id: e.username + "_card_header" , class: "card_header_row" });
            var $badge_gallery = $( '<div>', { id: e.username + "_gallery" , class: "badge_gallery_row" });
            var $badge_recommendations = $( '<div>' , { id: e.username + "_recommendations" , class: "badge_recommendation_row" });

            //Columns
            var $img_col = $( '<div>', { class: "img_col" });
            var $name_col = $( '<div>', { class: "name_col" } );
            var $badge_gallery_col = $( '<div>', { class: "badge_gallery_col" } );
            var $rec_label_col = $( '<div>', { class: "rec_label_col" } );
            var $rec_badge_col = $( '<div>', { class: "rec_badge_col" } );

            //Content
            var $badge_count = $( '<h5>' , { id: e.username + "_badge_count" , class: "badge_count" });
            var $name = $( '<h2>' , { class: "user_name" } );
            var $user_img = $( '<img>' , { src: e.gravatar , alt: e.username , id: "user_img_" + e.username , class: "user_img" });
            var $recommendation_label = $( '<h4>' , { class: "recommendation_label" } );
            var achievements = e.badges;
            var recommend_these = this.controller.getRecommendationsFor(e);

            //Badge Images
            achievements.forEach(function( e , i ) {
                var $small_badge = $( '<img>' , { src: e.badge.image , alt: e.name , id: "user_badge_" + e.name , class: "badge_gallery_img" });
                $small_badge.appendTo( $badge_gallery_col );
            });
            recommend_these.forEach(function( e , i ){
                var $medium_badge = $( '<img>' , { src: e.image , alt: e.name  , id: "user_badge_" + e.name , class: "recommended_badge_img" });
                $medium_badge.appendTo( $rec_badge_col );
            });

            //Text
            $name.text(e.name);
            $badge_count.text("Badge Count: " + achievements.length);
            $recommendation_label.text("Recommended Badges");

            //12-column grid
            $card_header.addClass("onerow");
            $badge_gallery.addClass("onerow");
            $badge_recommendations.addClass("onerow");
            $img_col.addClass("col4");
            $img_col.appendTo( $card_header );
            $name_col.addClass("col8 last");
            $name_col.appendTo( $card_header );
            $badge_gallery_col.addClass("col12 last");
            $badge_gallery_col.appendTo( $badge_gallery )
            $rec_label_col.addClass("col2");
            $rec_label_col.appendTo( $badge_recommendations );
            $rec_badge_col.addClass("col10 last");
            $rec_badge_col.appendTo( $badge_recommendations );

            //Append content to grid
            $user_img.appendTo( $img_col );
            $name.appendTo( $name_col );
            $badge_count.appendTo( $name_col );
            $recommendation_label.appendTo( $rec_label_col );

            //Append columns to card
            $card_header.appendTo( $card );
            $badge_gallery.appendTo( $card );
            $badge_recommendations.appendTo( $card );

            //Append this card to main-container
            $( "#main-container" ).append( $card );



            console.log(e);
            console.log( "Built ---- card " + ( i + 1 ) + " ---- " + e.name +".");
            console.log("\n" + "\n" + "\n");
    }, this);
    console.log("\n" + "\n" + "\n");
    console.log("Done ---- buildUi");
    console.log("\n" + "\n" + "\n");
    };
    return UiBuilder;
})();
