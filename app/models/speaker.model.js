define(function(require){

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        defaults: function() {
            return {
                name: "",
                description: ""
            }
        },


        url: function() {
            return 'speakers/' + this.id;
        }

    });

});