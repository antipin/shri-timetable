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
            this.$lectures = this.$('.day-lectures-wrapper');

            // Create lecture views
            _.each(this.mLectures, function(mLecture){
                this.vLectures.push(
                    new cls_vLecture({model: mLecture})
                );
            }, this);

            // Render lecture views
            _.each(this.vLectures, function(vLecture) {
                this.$lectures.append(
                    vLecture.render().el
                )
            }, this);

            return this;
        },


        prepareTemplateData: function() {

            jsonData = this.model.toJSON()

            return jsonData;
        }

    });

});