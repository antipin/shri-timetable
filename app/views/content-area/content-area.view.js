define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        tpl =  require('text!views/content-area/content-area.tpl.html');


    return Backbone.View.extend({

        tpl: Handlebars.compile(tpl),

        vContent: null,

        initialize: function() {},

        render: function() {
            this.$el.html(
                this.tpl()
            );
            return this;
        }


    });

});