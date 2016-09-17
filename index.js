/**
 * Created by Binny Gandhi on 17-09-2016.
 */

var app = {};

$(document).ready(function () {
    app.template = Handlebars.compile(document.getElementById('handlebar-template').innerHTML);
    fetchData();
});

function fetchData() {
    $.ajax({
        url: config.fetchUrl,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (result, xhr, status) {
            app.message = result;
            displayLinks(app.message);
        },
        error: function (error, xhr, status) {
            //ToDo: Display user-friendly error
            // document.alert(JSON.stringify(error, null, 2));
            console.log(JSON.stringify(error, null, 2));
        }
    });
}

function displayLinks(websites) {
    var templateData = app.template(websites);
    document.getElementById('list-all-data').innerHTML = templateData;
}