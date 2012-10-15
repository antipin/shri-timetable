define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        tpl =  require('text!views/header/header.tpl.html');


    return Backbone.View.extend({

        tpl: Handlebars.compile(tpl),

        className: 'row-fluid',

        initialize: function() {
            console.log('header init');
        },

        render: function() {
            this.$el.html(this.tpl());
            return this;
        }


    });

});