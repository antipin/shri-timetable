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
        },


        events: {
            "submit .export": "hImportSubmit"
        },


        hImportSubmit: function(e) {

            e.preventDefault();

            var
                self = this,
                $form = $(e.target),
                jsonData = {};

            jsonData[App.cLectures.url()] = App.cLectures.export();
            jsonData[App.cSpeakers.url()] = App.cSpeakers.export();

            $form.find('textarea')
                .val(
                    JSON.stringify(jsonData,null, 4)
                )
                .fadeIn();


        }


    });

});