define(function(require){

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        defaults: function() {
            return {
                title: "",
                description: "",
                date: "",
                time: "",
                speaker: "",
                link_presentation: "",
                link_video_online: "",
                link_video_download: "",
                link_github: ""
            }
        },


        url: function() {
            return 'lectures/' + this.get("id");
        }

    });

});