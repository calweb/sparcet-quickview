var sparcet;
$(function() {
    sparcet.initStyling();
    sparcet.initEvents();
});

sparcet = {

    initStyling: function () {
      var tenant_option = localStorage.sparcet_tenant ? localStorage.sparcet_tenant : "sparc";
      var numSparcet_option = localStorage.sparcet_number ? localStorage.sparcet_number : "10";
      var url = 'https://' + tenant_option + '.sparcet.com/api/sparcets?limit=' + numSparcet_option;
      var tenantStore = localStorage.sparcet_tenant;
      var sNum = localStorage.sparcet_number;
        $.getJSON(url, function(results) {
            var output = '';
            var $sparcetList = $(".result ul");

            var baseImgURL = "https://sparc.sparcet.com/profiles/"; // is this tenant specific?

             // build our html
            $.each(results.data, function(index, value) {

               output += "<p class='sparcet-summary'><img class='profile-pic to-user' src='"
                    + baseImgURL + this.to.id
                    + "/img_Profile?v=1' alt='"
                    + this.from.name + "' /><img class='award' src='img/"
                   + this.type
                   + ".png' alt='"
                   + this.from.name + "' /><span class='name to-user subject'>"
                    + this.to.name + "</span> got a sparcet from <span class='name from-user'>"
                    + this.from.name + "</span></a></p><div class='sparcet-detail'><span class='reason linkscrape'>"
                    + this.reason +"</span><span class='name from-user'>-"
                    + this.from.name + "</span><img class='profile-pic from-user' style='width:40px;height:40px;' src='"
                    + baseImgURL + this.from.id + "/img_Profile?v=1' /></div><hr><div style='clear:both'></div>";
                $sparcetList.remove("#ajaxloader");
                $sparcetList.html(output);
            });

        });

        if (!tenantStore) {
                tenantStore = "sparc";
            $("#tenant_choice").val("sparc");
        } else {
            $("#tenant_choice").val(tenantStore);
        }
        if (!sNum) {
            sNum = "10";
            $("#num_sparcets").val("10");

        } else {
            $("#num_sparcets").val(sNum);
        }

    },
    save_options: function() {
        var $select = $("#tenant_choice");
        var tenant = $select.val();
        var numSparcets = $("#num_sparcets").val();
        //checking empty field values in options ToDo: validation of field input!
        if (!tenant) {
            tenant = "sparc";
        } else {
            localStorage.sparcet_tenant = tenant;
        }

        if (!numSparcets) {
            localStorage.sparcet_number = 10;
        } else {
            localStorage.sparcet_number = numSparcets;
        }

        // Update status to let user know options were saved.
        var $status = $("#status");
        $status.html("<h2 style='color:green'>Options Saved.</h2>");
        setTimeout(function() {
            $status.html("");
        }, 750);

    },
    restore_options: function() {
        var tenant = localStorage.sparcet_tenant;
        if (!tenant) {
            return;
        }
    },
    initEvents: function () {


        $("#main").delegate("#save","click", function() {
            sparcet.save_options();

         });

    }

};