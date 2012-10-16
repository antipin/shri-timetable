define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        cls_mLecture = require("models/lecture.model"),

        tpl_view =  require('text!views/lecture-full/lecture-full.tpl.html'),
        tpl_edit =  require('text!views/lecture-full/lecture-full-edit.tpl.html');


    return Backbone.View.extend({

        tpl_view: Handlebars.compile(tpl_view),
        tpl_edit: Handlebars.compile(tpl_edit),

        className: 'b-lecture-full row-fluid',

        mode: "",

        txt_week_days: ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        txt_months: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],


        initialize: function() {

            this.mode = this.options.mode != undefined ? this.options.mode : "view";

            switch(this.mode) {

                case "view":
                case "edit":
                    this.model = this.options.model;
                    this.model.on("change", this.render, this);
                    break;

                case "create":
                    this.model = new cls_mLecture();
                    this.render();
                    break;
            }

            this.model.on("change", this.render, this);
        },


        render: function() {

            switch(this.mode) {

                case "view" :
                    this.$el.html(
                        this.tpl_view(this.prepareTemplateData())
                    );
                    break;

                case "edit" :
                    this.$el.html(
                        this.tpl_edit(this.prepareTemplateData())
                    );
                    break;

                case "create" :
                    this.$el.html(
                        this.tpl_edit(this.model.toJSON())
                    );
                    break;
            }

            // Typeahead for speakers
            if (this.mode == "create" || this.mode == "create") {
                this.$("input[name='speaker']").typeahead({
                    source: App.cSpeakers.pluck("name")
                });
            }

            return this;
        },


        prepareTemplateData: function() {

            var
                data = this.model.toJSON(),
                dayDate = data._date;

            data.month_day = dayDate.getDate();
            data.week_day = this.txt_week_days[dayDate.getDay()];
            data.month = this.txt_months[dayDate.getMonth()];

            data.time_start = data._time_start;
            data.time_end = data._time_end;

            return data;
        },


        events: {
            "submit form.lecture-full-edit": "hSubmitLecture"
        },


        hSubmitLecture: function(e) {

            e.preventDefault();

            var
                self = this,
                $form = $(e.target),
                formJSON = App.utlis.serialize2json($form);


            switch(this.mode) {

                case "edit" :
                    this.model.save(formJSON);
                    App.router.navigate("lectures/" + this.model.get("id"), {trigger: true});
                    break;

                case "create" :

                    var is_error = false;

                    this.model.save(formJSON, {
                        success: function(model) {
                            // TODO: Succes don't call
                            //App.router.navigate("lectures/" + this.model.get("id"), {trigger: true});
                        },
                        error: function(model, errors) {
                            is_error = true;
                            alert(errors.join("\n\n"));
                        }
                    });

                    // Ugly hack :( No time for digging
                    if (!is_error) {
                        // TODO: find out why days rebuilds incorrectly after import (F5 helps)
                        window.location.href = "/lectures/" + this.model.get("id");
                    }
                    break;

            }

        }

    });

});