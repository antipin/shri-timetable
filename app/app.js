define(function(require){

    var
        $ = require('jquery'),
        $ = require('bootstrap'),
        _ = require('lodash'),
        Backbone = require('backbone'),
        utils = require("utils"),

        // Models
        cls_mUser = require("models/user.model"),
        cls_mLecture = require("models/lecture.model"),
        cls_mSpeaker = require("models/speaker.model"),

        // Collections
        cls_cLectures = require("collections/lectures.collection"),
        cls_cSpeakers = require("collections/speakers.collection"),

        // Views
        cls_vMain = require("views/main/main.view"),

        // Router
        cls_Router = require("router");



    return {

        initialize : function() {

            var self = this;

            // Create models and collections
            this.mUser = new cls_mUser();
            this.mUser.fetch({
                error: function() {
                    // Save default user if localStorage has no user model
                    self.mUser.save();
                }
            });

            this.cLectures = new cls_cLectures({model: cls_mLecture});
            this.cLectures.fetch();
            console.log('cLectures.fetch');
            console.log(this.cLectures.toJSON());

            this.cSpeakers = new cls_cSpeakers({model: cls_mSpeaker});
            this.cSpeakers.fetch();
            console.log('this.cSpeakers.fetch');
            console.log(this.cSpeakers.toJSON());

            // Init main view
            this.vMain = new cls_vMain();

            // Init router
            this.router = new cls_Router();

        },

        utlis: utils
    }

});