define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Backbone = require('backbone');

    return Backbone.Router.extend({

        initialize: function() {
            // Start history monitor
            Backbone.history.start({pushState: true});
        },


        routes: {
            "":                          "rLectures",
            "lectures":                  "rLectures",
            "lectures/:lecture":         "rLecture",
            "import":                    "rImport",
            "export":                    "rExport"
        },


        rLectures: function(){
            console.log('rLectures');
        },

        rLectures: function(){
            console.log('rLectures');
        },

        rLecture: function(lecture){
            console.log('rLecture: ' + lecture);
        },

        rImport: function(){
            console.log('rImport');
        },

        rExport: function(){
            console.log('rExport');
        }

    });

});