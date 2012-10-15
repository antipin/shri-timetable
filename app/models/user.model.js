define(function(require){

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        defaults: function() {
            return {
                id: 1,
                role : "admin"
            }
        },


        url: function() {
            return 'user';
        },


        roles: {
            'user': "Пользователь",
            'admin': "Администратор"
        }

    });

});