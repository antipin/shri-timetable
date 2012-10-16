define(function(require){

    var
        _ = require('lodash'),
        Backbone = require('backbone'),

        // Views
        cls_vMain = require("views/main/main.view"),
        cls_vLectures = require("views/lectures/lectures.view"),
        cls_vFullLecture = require("views/lecture-full/lecture-full.view"),
        cls_vImport = require("views/import/import.view"),
        cls_vExport = require("views/export/export.view");


    return Backbone.Router.extend({

        initialize: function() {

            // Init main view
            App.vMain = new cls_vMain();

            // Start history monitor
            Backbone.history.start({pushState: true});
        },


        routes: {
            "":                          "rLectures",
            "lectures":                  "rLectures",
            "lectures/:lecture":         "rLecture",
            "lectures/:lecture/edit":    "rLectureEdit",
            "import":                    "rImport",
            "export":                    "rExport"
        },

        rLectures: function() {
            App.vMain.vContentArea.setContent(cls_vLectures);
        },

        rLecture: function(lecture) {
            var mLecture = App.cLectures.get(lecture);
            if (mLecture != undefined) {
                App.vMain.vContentArea.setContent(cls_vFullLecture, {model:mLecture});

                App.vMain.vHeader.vToolbar.setNav([
                    {
                        title: "← К расписанию",
                        href: "/lectures"
                    },
                    {
                        title: "Редактировать",
                        href: "/lectures/" + lecture + "/edit"
                    }
                ]);
            }
            else {
                this.navigate('/', {trigger: true});
            }
        },

        rLectureEdit: function(lecture) {
            var mLecture = App.cLectures.get(lecture);
            if (mLecture != undefined) {

                App.vMain.vContentArea.setContent(cls_vFullLecture, {model:mLecture, mode: "edit"});

                App.vMain.vHeader.vToolbar.setNav([
                    {
                        title: "← К расписанию",
                        href: "/lectures"
                    },
                    {
                        title: "Просмотр",
                        href: "/lectures/" + lecture
                    }
                ]);
            }
            else {
                this.navigate('/', {trigger: true});
            }
        },

        rImport: function() {
            App.vMain.vContentArea.setContent(cls_vImport);
        },

        rExport: function() {
            App.vMain.vContentArea.setContent(cls_vExport);
        }

    });

});