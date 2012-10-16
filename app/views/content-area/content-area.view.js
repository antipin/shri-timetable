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


        setContent: function(viewClass, options) {

            var self = this;

            // Flush nav
            App.vMain.vHeader.vToolbar.setNav([]);

            // Remove old layout
            if (this.vContent != null) {
                this.$inner.fadeOut('fast', function(){
                    self.vContent.remove();
                    self.setNewContent(viewClass, options);
                });
            }
            else {
                this.setNewContent(viewClass, options);
            }

        },


        setNewContent: function(viewClass, options) {

            this.$inner.hide();

            this.vContent = new viewClass(options);
            this.$inner.html(
                this.vContent.render().el
            );

            this.$inner.fadeIn('fast');
        }

    });

});