define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        // Child views
        cls_vHeader         = require('views/header/header.view'),
        cls_vToolbar        = require('views/toolbar/toolbar.view'),
        cls_vContentArea    = require('views/content-area/content-area.view'),
        cls_vFooter         = require('views/footer/footer.view'),

        tpl =  require('text!views/main/main.tpl.html');


    return Backbone.View.extend({

        el: $('#app-container'),

        vHeader: new cls_vHeader(),
        vToolbar: new cls_vToolbar(),
        vContentArea: new cls_vContentArea(),
        vFooter: new cls_vFooter(),

        tpl: tpl,

        initialize: function() {

//            this.vHeader = new cls_vHeader();
//            this.vToolbar = new cls_vToolbar();
//            this.vContentArea = new cls_vContentArea();
//            this.vFooter = new cls_vFooter();

            this.render();
        },

        render: function() {

            this.$el.html(this.tpl);

            // Render and insert child views
            this.$('#main-header').html(
                this.vHeader.render().el
            );
            this.$('#main-toolbar').html(
                this.vToolbar.render().el
            );
            this.$('#main-content').html(
                this.vContentArea.render().el
            );
            this.$('#main-footer').html(
                this.vFooter.render().el
            );


            return this;
        }


    });

});