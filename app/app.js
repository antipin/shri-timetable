define(function(require){

    var
        $ = require('jquery'),
        $ = require('bootstrap'),
        _ = require('lodash'),
        Backbone = require('backbone'),

        // Utils
        utils = require("utils"),

        // Models
        cls_mUser = require("models/user.model"),

        // Collections
        cls_cDays = require("collections/days.collection"),
        cls_cLectures = require("collections/lectures.collection"),
        cls_cSpeakers = require("collections/speakers.collection"),

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


            // Create collections
            this.cLectures = new cls_cLectures();
            this.cSpeakers = new cls_cSpeakers();
            this.cDays = new cls_cDays();

            // Fetch data
            this.cLectures.fetch();
            this.cSpeakers.fetch();

            // Init router
            this.router = new cls_Router();

            utils.processLinks();
        },

        utlis: utils
    }

});