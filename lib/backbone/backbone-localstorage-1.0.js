/**
 * Backbone localStorage Adapter
 * by Alex Antipin
 */

(function() {

    // Backbone.sync
    // -------------

    // A simple module to replace `Backbone.sync` with *localStorage*-based
    // persistence. Models are given GUIDS, and saved into a JSON object. Simple
    // as that.

    // Hold reference to Underscore.js and Backbone.js in the closure in order
    // to make things work even if they are removed from the global namespace
    var _ = this._;
    var Backbone = this.Backbone;

    function generateGUID ()
    {
        var S4 = function () {
            return Math.floor(
                Math.random() * 0x10000 /* 65536 */
            ).toString(16);
        };

        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4() );
    }


    // Override this function to change the manner in which Backbone persists
    // models to the server. You will be passed the type of request, and the
    // model in question. By default, makes a RESTful Ajax request
    // to the model's `url()`. Some possible customizations could be:
    //
    // * Use `setTimeout` to batch rapid-fire updates into a single request.
    // * Send up the models as XML instead of JSON.
    // * Persist models via WebSockets instead of Ajax.
    //
    // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
    // as `POST`, with a `_method` parameter containing the true HTTP method,
    // as well as all requests with the body as `application/x-www-form-urlencoded`
    // instead of `application/json` with the model in a param named `model`.
    // Useful when interfacing with server-side languages like **PHP** that make
    // it difficult to read the body of `PUT` requests.
    Backbone.sync = function(method, model, options) {

        // Default options, unless specified.
        options = _.extend({
            success: function(){},
            error: function(){}
        }, options);

        switch(method) {

            case "read":
                // Model fetch
                if (model.attributes != undefined && model.length == undefined) {
                    var fetchedModel = localStorage.getItem(model.url());
                    if (fetchedModel) {
                        fetchedModel = JSON.parse(fetchedModel);
                        model.set(fetchedModel);
                        options.success(fetchedModel);
                    } else {
                        options.error();
                    }
                }
                // Collection fetch
                else {

                    console.log('Fetching collection with url ' + model.url())

                    var
                        keyPattern = new RegExp('^' + model.url() + '/', 'i'),
                        result = new Array();

                    // Iterate over all localstorage
                    for (var i = 0, len = localStorage.length; i < len; i++) {
                        var key = localStorage.key(i);
                        if (keyPattern.test(key)) {
                            result.push(
                                JSON.parse(localStorage.getItem(key))
                            );
                        }
                    }
                    model.reset(result);
                    options.success(result);
                }
                break;


            case "create":
                // Add id to newly created model
                model.attributes.id = generateGUID();

                window.localStorage.setItem(
                    model.url(),
                    JSON.stringify(model.toJSON())
                );

                console.log('model CREATED with id = ' + model.get('id'));

                break;


            case "update":
                window.localStorage.setItem(
                    model.url(),
                    JSON.stringify(model.toJSON())
                );

                console.log('model UPDATED. id = ' + model.get('id'));

                break;


            case "delete":
                window.localStorage.removeItem(
                    model.url()
                );
                console.log('model DELETED with id = ' + model.get('id'));
                break;
        }


    };

})();