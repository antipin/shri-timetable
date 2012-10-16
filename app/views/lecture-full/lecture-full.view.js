define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

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

            this.model = this.options.model;
            this.mode = this.options.mode != undefined ? this.options.mode : "view";

            if (this.model !== undefined) {
                this.model.on("change", this.render, this);
            }
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
        }

    });

});