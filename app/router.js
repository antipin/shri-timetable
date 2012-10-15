define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Backbone = require('backbone'),

        // Views
        cls_vMain = require("views/main/main.view"),
        cls_vLectures = require("views/lectures/lectures.view"),
        cls_vImport = require("views/import/import.view"),
        cls_vExport = require("views/export/export.view");


    return Backbone.Router.extend({

        initialize: function() {

            console.log(App);

            // Init main view
            App.vMain = new cls_vMain();

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
            console.log('rLecture');

        },

        rLectures: function(){
            console.log('rLectures');
            App.vMain.vContentArea.setContent(cls_vLectures);
        },

        rLecture: function(lecture){
            console.log('rLecture: ' + lecture);
        },

        rImport: function(){
            console.log('rImport');
            App.vMain.vContentArea.setContent(cls_vImport);
        },

        rExport: function(){
            console.log('rExport');
            App.vMain.vContentArea.setContent(cls_vExport);
        }

    });

});