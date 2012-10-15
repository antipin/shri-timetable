define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        tpl =  require('text!views/toolbar/toolbar.tpl.html');


    return Backbone.View.extend({

        tpl: Handlebars.compile(tpl),

        className: 'row-fluid b-header-toolbar',

        initialize: function() {},

        render: function() {
            this.$el.html(
                this.tpl()
            );
            return this;
        }


    });

});