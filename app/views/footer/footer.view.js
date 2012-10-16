define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        tpl =  require('text!views/footer/footer.tpl.html');


    return Backbone.View.extend({

        tagName: "footer",

        className: 'b-footer',

        tpl: Handlebars.compile(tpl),

        initialize: function() {},

        render: function() {
            this.$el.html(
                this.tpl()
            );
            return this;
        }


    });

});