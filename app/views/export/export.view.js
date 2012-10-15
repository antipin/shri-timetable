define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        tpl =  require('text!views/export/export.tpl.html');


    return Backbone.View.extend({

        tpl: Handlebars.compile(tpl),

        className: 'row-fluid b-export',

        initialize: function() {
            console.log('import init');
        },

        render: function() {
            this.$el.html(this.tpl());
            return this;
        }


    });

});