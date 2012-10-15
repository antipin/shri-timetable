/* ---------------------------------------- Helpers ---------------------------------------- */
if (typeof console == "undefined") { window.console = { log: function () {} }; }

function buildScriptPath(path, version) {
    var
        chunk_path = path,
        chunk_version = version != undefined ? "-" + version : "",
        path = chunk_path + chunk_version;

    return App.settings.debug ? path : path + ".min";
}


/* ---------------------------------------- App configuration ---------------------------------------- */
var App = App || {};
App.settings = App.settings || {};
App.settings.debug = true;


/* ---------------------------------------- Requirejs configuration ---------------------------------------- */
require.config({

    baseUrl: "/app",

    paths: {

        // Libs
        "text":                     buildScriptPath("../lib/requirejs/text",                         "2.0.3"),
        "jquery":                   buildScriptPath("../lib/jquery/jquery",                          "1.8.2"),
        "handlebars":               buildScriptPath("../lib/handlebars/handlebars",                  "1.0.rc.1"),
        "lodash":                   buildScriptPath("../lib/backbone/lodash",                        "0.8.2"),
        "backbone-raw":             buildScriptPath("../lib/backbone/backbone-raw",                  "0.9.2"),
        "backbone-localstorage":    buildScriptPath("../lib/backbone/backbone-localstorage",         "1.0"),
        "backbone":                 buildScriptPath("../lib/backbone/backbone-with-plugins"),

        // jQuery plugins
        "bootstrap":                buildScriptPath("../lib/bootstrap/js/bootstrap"),

        // App
        "app":             "app",
        "utils":           "utils/common"
    },

    shim: {

        "backbone-raw": {
            deps: ["lodash", "jquery"],
            exports: "Backbone"
        },

        "backbone-localstorage": ["backbone-raw"],

        // Backbone with plugins
        "backbone": {
            deps: ["backbone-raw", "backbone-localstorage"],
            exports: 'Backbone'
        },

        "handlebars": {
            exports: "Handlebars"
        },

        "lodash": {
            exports: "_"
        },

        "bootstrap": {
            deps: ['jquery'],
            exports: "$"
        }

    }

});



/* ---------------------------------------- App init ---------------------------------------- */
require(["jquery", "lodash", "app"],
    function( $, _, app) {
        $(function(){
            App = _.extend(app, App);
            App.initialize();
        });
    });