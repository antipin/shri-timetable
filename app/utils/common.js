define(function(require){

    var
        _ = require('lodash'),
        Backbone = require('backbone');

    return {

        processLinks: function() {
            $("body").on("click", 'a[href^="/"]', function(e) {
                e.preventDefault();
                App.router.navigate(
                    $(this).attr('href'),
                    {trigger: true}
                );
            });
        },


        serialize2json: function($form) {
            var
                json = {},
                formData = $form.serializeArray();
            _.each(formData, function(param){
                json[param.name] = param.value;
            }, this);
            return json;
        }

    }

});