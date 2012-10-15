define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        // Child views
        cls_vHeader         = require('views/header/header.view'),
        cls_vContentArea    = require('views/content-area/content-area.view'),
        cls_vFooter         = require('views/footer/footer.view'),

        tpl =  require('text!views/main/main.tpl.html');


    return Backbone.View.extend({

        el: $('.b-app-container'),

        vHeader: new cls_vHeader(),
        vContentArea: new cls_vContentArea(),
        vFooter: new cls_vFooter(),

        tpl: tpl,

        initialize: function() {
            this.render();
        },

        render: function() {

            this.$el.html(this.tpl);

            // Render and insert child views
            this.$('.main-header-wrapper').html(
                this.vHeader.render().el
            );
            this.$('.main-content-wrapper').html(
                this.vContentArea.render().el
            );
            this.$('.main-footer-wrapper').html(
                this.vFooter.render().el
            );

            return this;
        }


    });

});