define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        tpl =  require('text!views/import/import.tpl.html');


    return Backbone.View.extend({

        tpl: Handlebars.compile(tpl),

        className: 'row-fluid b-import',


        initialize: function() {
            console.log('import init');
        },


        render: function() {
            this.$el.html(this.tpl());
            return this;
        },


        events: {
            "submit .import": "hImportSubmit"
        },


        hImportSubmit: function(e) {

            e.preventDefault();

            var
                self = this,
                $form = $(e.target),
                rawData = $form.find('textarea').val(),
                jsonData = "";

            if (rawData != '') {
                try {
                    jsonData = JSON.parse(rawData);

                    if (confirm("ВНИМАНИЕ!\nВсе текщие данные будут утеряны!\nПродолжить импорт?")) {

                        var lectures_count = App.cLectures.import(jsonData.lectures);
                        var speakers_count = App.cSpeakers.import(jsonData.speakers);

                        alert(
                            "Данные успешно импортированы." + "\n" +
                                "Лекций: " + lectures_count + "\n" +
                                "Докладчиков: " + speakers_count
                        );

                        App.router.navigate('/', {trigger: true});

                    }

                } catch (e) {
                    console.log(e);
                    alert("Данные имеют неверный формат.");
                }
            }
            else {
                alert("Введите данные.");
            }

        }


    });

});