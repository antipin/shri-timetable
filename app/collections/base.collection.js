define(function(require) {

    var
        _ = require('lodash'),
        Backbone = require('backbone');


    return Backbone.Collection.extend({

        import: function(data) {

            // Destroy previous data
            this.destroy();

            // Fill in collections
            this.reset(data);

            // Put all models to LS
            this.save();

            return this.length;
        },


        export: function() {
            var result = [];
            this.each(function(model) {
                if (_.isFunction(model.toExportableJSON)) {
                    result.push(model.toExportableJSON());
                }
                else {
                    result.push(model.toJSON());
                }
            }, this);
            return result;
        },


        save: function(options) {
            // Save all models
            this.each(function(model) {
                model.save(options);
            }, this);
        },


        destroy: function(options) {

            options = options ? _.clone(options) : {};
            var model = this;
            var success = options.success;

            options.success = function(resp) {
                if (success) success(model, resp, options);
            };

            this.sync('delete', this, options);
        }

    });

});