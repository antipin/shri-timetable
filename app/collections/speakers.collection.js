define(function(require){

    var
        Backbone = require('backbone'),
        cls_baseCollection = require("collections/base.collection"),
        cls_mSpeaker = require("models/speaker.model");

    return cls_baseCollection.extend({

        model: cls_mSpeaker,

        url: function() {
            return 'speakers';
        },

        comparator: function(chapter) {
            return chapter.get('name');
        }

    });

});