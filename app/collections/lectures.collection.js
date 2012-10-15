define(function(require){

    var
        Backbone = require('backbone'),
        cls_mLecture = require("models/lecture.model");

    return Backbone.Collection.extend({

        model: cls_mLecture,

        url: function() {
            return 'lectures';
        }

    });

});