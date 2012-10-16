define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        cls_vLecture = require('views/lecture/lecture.view'),

        tpl =  require('text!views/day/day.tpl.html');


    return Backbone.View.extend({

        tpl: Handlebars.compile(tpl),

        className: 'b-day',

        vLectures: [],
        mLectures: [],
        $lectures: null,

        txt_week_days: ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        txt_months: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],

        // TODO: if there will be more than 3 lecture per day, layout will be fucked up. Fix it!
        max_duration: 3,

        initialize: function() {

            this.model = this.options.model;

            this.vLectures = [];
            this.mLectures = this.model.get('items');

        },


        render: function() {

            this.$el.html(
                this.tpl(this.prepareTemplateData())
            );

            // Cache placeholders
            this.$lectures = this.$('.day-lectures');

            // Create lecture views
            _.each(this.mLectures, function(mLecture){
                this.vLectures.push(
                    new cls_vLecture({model: mLecture})
                );
            }, this);

            // Render lecture views
            _.each(this.vLectures, function(vLecture) {
                console.log(this.getDurationClass(vLecture));
                this.$lectures.append(
                    vLecture.render()
                        .$el
                        .addClass(this.getDurationClass(vLecture))
                )
            }, this);

            if (this.mLectures.length === 0) {
                this.$el.addClass('empty');
            }

            return this;
        },


        getDurationClass: function(vLecture) {
            return 'span' + parseInt(vLecture.model.get('_duration')) * (12 / this.max_duration);
        },


        prepareTemplateData: function() {

            var
                jsonData = this.model.toJSON(),
                dayDate = jsonData.date;

            jsonData.month_day = dayDate.getDate();
            jsonData.week_day = this.txt_week_days[dayDate.getDay()];
            jsonData.month = this.txt_months[dayDate.getMonth()];


            return jsonData;
        }

    });

});