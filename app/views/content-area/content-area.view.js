define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Backbone = require('backbone');


    return Backbone.View.extend({

        tagName: 'section',

        className: "b-content-area page-section-wrapper",

        tpl: '<div class="content-area-inner"></div>',

        vContent: null,

        $inner: null,


        initialize: function() {},

        render: function() {
            this.$el.html(this.tpl);
            this.$inner = this.$('.content-area-inner');
            return this;
        },


        setContent: function(viewClass) {

            var self = this;

            // Remove old layout
            if (this.vContent != null) {
                this.$inner.fadeOut('fast', function(){
                    self.vContent.remove();
                    self.setNewContent(viewClass);
                });
            }
            else {
                this.setNewContent(viewClass);
            }

        },


        setNewContent: function(viewClass) {

            this.$inner.hide();

            this.vContent = new viewClass();
            this.$inner.html(
                this.vContent.render().el
            );

            this.$inner.fadeIn('fast');
        }

    });

});