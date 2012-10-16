define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        tpl =  require('text!views/lecture-full/lecture-full.tpl.html');


    return Backbone.View.extend({

        tpl: Handlebars.compile(tpl),

        className: 'b-lecture-full row-fluid',


        txt_week_days: ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        txt_months: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],


        initialize: function() {

            this.model = this.options.model;

            if (this.model !== undefined) {
                this.model.on("change", this.render, this);
            }
        },


        render: function() {
            this.$el.html(this.tpl(this.prepareTemplateData()));
            return this;
        },


        prepareTemplateData: function() {

            console.log(this.model.toJSON());

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
            "click": "hGoToDetails"
        },


        hGoToDetails: function() {
            App.router.navigate("lectures/" + this.model.get("id"), {trigger: true});
        }

    });

});