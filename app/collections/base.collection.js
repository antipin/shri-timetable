define(function(require){

    var
        Backbone = require('backbone');

    return Backbone.Collection.extend({

        import: function(data) {
            this.reset(data);
            return this.length;
        },

        export: function(data) {
            return this.toJSON();
        }

    });

});