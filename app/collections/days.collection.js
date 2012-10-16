define(function(require) {

    var
        _ = require('lodash'),
        Backbone = require('backbone'),
        cls_mDay = require("models/day.model");


    return Backbone.Collection.extend({

        model: cls_mDay,

        initialize: function() {
            App.cLectures.on("reset change", this.rebuild, this);
        },


        url: function() {
            return 'days';
        },


        comparator: function(mDay) {
            return mDay.get('date');
        },


        rebuild: function(cLectures) {

            if (cLectures.length > 0) {

                var
                    msInDay = 1000 * 60 * 60 * 24,
                    firstDay = cLectures.first().get('_absDay'),
                    lastDay = cLectures.last().get('_absDay');

                this.reset();

                for (var absDay = firstDay; absDay <= lastDay; absDay++) {

                    var items = cLectures.where({"_absDay": absDay});

                    this.add({
                        "date": new Date(absDay * msInDay),
                        "items": items
                    });
                }
            }
        }

    });

});