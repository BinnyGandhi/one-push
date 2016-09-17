/**
 * Created by Binny Gandhi on 17-09-2016.
 */

var app = {};

$(document).ready(function () {
    app.template = Handlebars.compile(document.getElementById('handlebar-template').innerHTML);
    fetchData();

    $('#addModal').on('hidden.bs.modal', function () {
        var alert = $('#addModalAlert');
        alert.addClass('sr-only');
        alert.html('');
    });
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

function contributeWebsite() {
    var title = document.getElementById('add-title').value;
    var tag = document.getElementById('add-tag').value;
    var url = document.getElementById('add-url-address').value;
    var parameterString = 'title=' + encodeURI(title) + '&url=' + encodeURI(url) + '&tag=' + encodeURI(tag);

    reqwest({
        url: config.contributeUrl + parameterString,
        method: 'GET',
        type: 'json',
        crossOrigin: true,
        success: function (response) {
            if (response.status == "200") {
                $('#addModal').modal('hide');
                document.getElementById('list-all-data').innerHTML = '';
                fetchData();
            } else {
                var alert = $('#addModalAlert');
                var message = response.message;
                alert.html(message);
                alert.removeClass('sr-only');
            }
        },
        error: function (error) {
            //ToDo: Display user-friendly error
            console.log(JSON.stringify(error, null, 2));
        }
    });


}