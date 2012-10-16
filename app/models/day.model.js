define(function(require){

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        defaults: function() {
            return {
                date: 0,
                items: []
            }
        },


        url: function() {
            return 'day/' + this.get("id");
        }

    });

});