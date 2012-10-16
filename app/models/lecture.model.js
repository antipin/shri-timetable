define(function(require){

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        msInDay: 1000 * 60 * 60 * 24,

        defaults: function() {
            return {
                // DB properties
                title: "",
                description: "",
                date: "",
                speaker: "",
                link_presentation: "",
                link_video_online: "",
                link_video_download: "",
                link_github: "",
                // Calcilated properties (frontend use only)
                _date: null,
                _absDay: 0,
                _duration: 0,
                _time_start: "",
                _time_end: ""
            }
        },


        initialize: function() {
            this.on('change:date', this.update, this);
        },


        update: function() {
            console.log('Date changed');
            this.set(
                this.parse(this.toJSON())
            );
        },


        url: function() {
            return 'lectures/' + this.get("id");
        },


        parse: function(data) {
            data = _.extend(data, this.processDateTime(data.date));
            return data;
        },


        processDateTime: function(date) {

            var result = {
                _date: date.split(" ")[0],
                _time_start: date.split(" ")[1].split('-')[0],
                _time_end: date.split(" ")[1].split('-')[1]
            };

            var dmy = {
                day: result._date.split(".")[0],
                month: result._date.split(".")[1],
                year: result._date.split(".")[2]
            };

            result._date = new Date(
                Date.parse(dmy.month + '/' + dmy.day + '/' + dmy.year + ' ' + result._time_start + ' GMT+0400')
            );

            var _int_time_start = parseInt(result._time_start.split(":")[0]) + result._time_start.split(":")[1] / 60;
            var _int_time_end = parseInt(result._time_end.split(":")[0]) + result._time_end.split(":")[1] / 60;

            result._duration = _int_time_end - _int_time_start;

            result._absDay = Date.parse(dmy.month + '/' + dmy.day + '/' + dmy.year + ' 00:00 GMT+0000') / this.msInDay;

            return result;
        },


        toExportableJSON: function() {

            var result = this.toJSON();

            delete result.id;
            delete result._date;
            delete result._absDay;
            delete result._duration;
            delete result._time_start;
            delete result._time_end;

            return result;
        }


    });

});