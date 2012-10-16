define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        tpl =  require('text!views/lecture/lecture.tpl.html');


    return Backbone.View.extend({

        tpl: Handlebars.compile(tpl),

        className: 'b-lecture',

        initialize: function() {

            this.model = this.options.model;

            this.model.on("change", this.render, this);
        },

        render: function() {
            this.$el.html(this.tpl(this.prepareTemplateData()));
            return this;
        },


        prepareTemplateData: function() {
            console.log(this.model.toJSON());
            return this.model.toJSON();
        }

    });

});