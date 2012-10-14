define(function(require){

    var
        $ = require('jquery'),
        $ = require('bootstrap'),
        _ = require('lodash'),
        Backbone = require('backbone'),
        utils = require("utils"),

        cls_mLecture = require("models/lecture.model");

            return {

                initialize : function() {

                    var mLecture = new cls_mLecture({
                        //id: "80c4a2e9-700c-3830-6f7c-3ee88e5fc7eb__",
                        title: "Trololo ",
                        description: "ololo",
                        date: "",
                        time: "",
                        speaker: "adsd",
                        link_presentation: "",
                        link_video_online: "",
                        link_video_download: "",
                        link_github: ""
                    });
                    console.log('Saving model');
                    //mLecture.save();

//                    console.log('Fetching model');
//                    mLecture.fetch({
//                        success: function(model, attributes, options) {
//                            console.log('arguments')
//                            console.log(arguments)
//                        },
//                        error: function() {
//                            console.log('MODEL NOT FOUND')
//                        }
//                    });


                    //mLecture.save();

                    var cls_cLectures = Backbone.Collection.extend();
                    var cLectures = new cls_cLectures();
                    cLectures.url = function() { return 'lectures' }
                    console.log('Fetching collection');
                    cLectures.fetch({
                        success: function() {
                            console.log('arguments')
                            console.log(arguments)
                        }
                    });


                    console.log(cLectures.models);




//
//            if (!utils.isInstalled()) {
//                console.log('Not installed');
//                console.log('Create install view');
//
//            }
//
//            else {
//                console.log('Installed')
//                console.log('Create app view');
//            }

        },

        utlis: utils
    }

});