$(function() {
    sparcet.initStyling();
    sparcet.initEvents();
});

var sparcet = {

    initStyling: function () {
        $.getJSON('https://sparc.sparcet.com/api/sparcets?limit=10', function(results) {
            var output = '';
            var $sparcetList = $(".result ul");
            //var items = results.data;
            var baseImgURL = "https://sparc.sparcet.com/profiles/"


            $.each(results.data, function(index, value) {

               output += "<p class='sparcet-summary'><img class='profile-pic to-user' style='width:40px;height:40px;' src='"
                    + baseImgURL + this.to.id
                    + "/img_Profile' alt='"
                    + this.from.name + "' /><span class='name to-user subject'>"
                    + this.to.name + "</span> got a sparcet from <span class='name from-user'>"
                    + this.from.name + "</span></a></p><div class='sparcet-detail'><span class='reason linkscrape'>"
                    + this.reason +"</span><span class='name from-user'>-"
                    + this.from.name + "</span><img class='profile-pic from-user' style='width:40px;height:40px;' src='"
                    + baseImgURL + this.from.id + "/img_Profile' /></div><div style='clear:both'></div>";

                $sparcetList.html(output);
            });




        });

    },

    initEvents: function () {

             // add some events, yo


    }


};