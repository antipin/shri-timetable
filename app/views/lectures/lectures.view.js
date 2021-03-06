define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        cls_vDay = require('views/day/day.view'),

        tpl =  require('text!views/lectures/lectures.tpl.html'),
        tpl_empty =  require('text!views/lectures/lectures-empty.tpl.html');



    return Backbone.View.extend({

        tpl: Handlebars.compile(tpl),
        tpl_empty: Handlebars.compile(tpl_empty),

        className: 'row-fluid b-lectures',

        vLectures: null,
        vDays: null,

        initialize: function() {
            this.vLectures = [];
            this.vDays = [];
            this.dayLine = {};

            if (App.vLectures != undefined) {
                App.vLectures.on("change", this.render, this);
            }
        },

        render: function() {

            if (App.cLectures.length === 0) {
                this.$el.html(
                    this.tpl_empty()
                );
            }

            else {

                App.cDays.each(function(mDay) {
                    this.vDays.push(
                        new cls_vDay({model: mDay})
                    );
                }, this);

                var current_week = 0;
                _.each(this.vDays, function(vDay) {

                    if(vDay.model.get('date').getDay() === 1) {
                        current_week++;
                        this.$el.append('<h3 class="current-week">Неделя ' + current_week + '</h3>');
                    }

                    this.$el.append(
                        vDay.render().el
                    )
                }, this);

            }

            return this;
        }



    });

});