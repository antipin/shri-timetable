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

        nav: [],

        initialize: function() {},

        render: function() {
            this.$el.html(
                this.tpl(this.prepareTemplateData())
            );

            this.$('.toolbar-nav').html('');
            _.each(this.nav, function(item){
                this.$('.toolbar-nav').append(
                    '<li><a href="' + item.href + '">' + item.title + '</a></li>'
                );
            }, this);

            return this;
        },


        setNav: function(items) {
            this.nav = items;
            this.render();
        },


        prepareTemplateData: function() {
            var data = {}
            data.items = this.nav;
            return data;
        }


    });

});