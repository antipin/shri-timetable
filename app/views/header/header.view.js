define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        cls_vToolbar = require('views/toolbar/toolbar.view'),

        tpl =  require('text!views/header/header.tpl.html');


    return Backbone.View.extend({

        tagName: "header",

        className: 'b-header',

        tpl: Handlebars.compile(tpl),

        vToolbar: new cls_vToolbar(),

        initialize: function() {},

        render: function() {
            this.$el.html(this.tpl());

            this.$('.header-toolbar-wrapper > .page-section-wrapper').html(
                this.vToolbar.render().el
            );

            return this;
        }


    });

});