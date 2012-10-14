define(function(require){

    var
        $ = require('jquery'),
        $ = require('bootstrap'),
        _ = require('lodash'),
        Backbone = require('backbone'),
        utils = require("utils"),

        // Collections
        cls_cLectures = Backbone.Collection.extend({url: 'lectures'}),
        cls_cSpeakers = Backbone.Collection.extend({url: 'speakers'});

        // Models
        cls_mLecture = require("models/lecture.model");

    return {

        initialize : function() {

            if (!utils.isInstalled()) {
                console.log('Not installed');
                console.log('Create install view');

            }

            else {
                console.log('Installed')
                console.log('Create app view');
            }

        },

        utlis: utils
    }

});