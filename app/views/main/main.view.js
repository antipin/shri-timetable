define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        // Child views
        cls_vHeader         = require('views/header/header.view'),
        cls_vContentArea    = require('views/content-area/content-area.view'),
        cls_vFooter         = require('views/footer/footer.view');


    return Backbone.View.extend({

        el: $('.b-app-container'),

        vHeader: new cls_vHeader(),
        vContentArea: new cls_vContentArea(),
        vFooter: new cls_vFooter(),

        initialize: function() {
            this.render();
        },

        render: function() {

            // Prepend header
            this.$el.prepend(
                this.vHeader.render().el
            );

            // Append content area
            this.$el.append(
                this.vContentArea.render().el
            );

            // Append footer
            this.$el.append(
                this.vFooter.render().el
            );

            return this;
        }


    });

});