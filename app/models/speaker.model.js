define(function(require){

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        defaults: function() {
            return {
                name: "",
                photo: "",
                description: ""
            }
        },


        url: function() {
            return 'speakers/' + this.get("id");
        },


        toExportableJSON: function() {
            var result = this.toJSON();
            delete result.id;
            return result;
        }

    });

});