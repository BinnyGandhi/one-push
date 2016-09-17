/**
 * Created by Binny Gandhi on 17-09-2016.
 */

var app = {};

$(document).ready(function () {
    app.template = Handlebars.compile(document.getElementById('handlebar-template').innerHTML);
    fetchData();
});

function fetchData() {
    reqwest({
        url: config.fetchUrl,
        method: 'GET',
        type: 'json',
        crossOrigin: true,
        success: function (response) {
            app.message = response;
            displayLinks(app.message);
        },
        error: function (error) {
            //ToDo: Display user-friendly error
            console.log(JSON.stringify(error, null, 2));
        }
    });
}

function displayLinks(websites) {
    var templateData = app.template(websites);
    document.getElementById('list-all-data').innerHTML = templateData;
}