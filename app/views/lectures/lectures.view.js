define(function(require){

    var
        $ = require('jquery'),
        _ = require('lodash'),
        Handlebars = require('handlebars'),
        Backbone = require('backbone'),

        cls_vLecture = require('views/lecture/lecture.view'),

        tpl =  require('text!views/lectures/lectures.tpl.html'),
        tpl_empty =  require('text!views/lectures/lectures-empty.tpl.html');



    return Backbone.View.extend({

        tpl: Handlebars.compile(tpl),
        tpl_empty: Handlebars.compile(tpl_empty),

        className: 'row-fluid b-lectures',

        vLectures: null,

        initialize: function() {
            this.vLectures = [];
        },

        render: function() {

            if (App.cLectures.length === 0) {
                this.$el.html(
                    this.tpl_empty()
                );
            }

            else {

                App.cLectures.each(function(mLecture) {
                    this.vLectures.push(
                        new cls_vLecture({model: mLecture})
                    );
                }, this);

                _.each(this.vLectures, function(vLecture) {
                    this.$el.append(
                        vLecture.render().el
                    )
                }, this);

            }

            return this;
        }


    });

});