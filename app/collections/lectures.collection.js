define(function(require){

    var
        Backbone = require('backbone'),
        cls_baseCollection = require("collections/base.collection");
        cls_mLecture = require("models/lecture.model");

    return cls_baseCollection.extend({

        model: cls_mLecture,

        url: function() {
            return 'lectures';
        }

    });

});