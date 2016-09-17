/**
 * Created by Binny Gandhi on 17-09-2016.
 */

var app = {};

$(document).ready(function () {
    app.template = Handlebars.compile(document.getElementById('handlebar-template').innerHTML);
    if (!localStorage.getItem('likes')) {
        localStorage.setItem("likes", "{}");
    }
    fetchData();

    $('#addModal').on('hidden.bs.modal', function () {
        var alert = $('#addModalAlert');
        alert.addClass('sr-only');
        alert.html('');
        $('#add-title').html('');
        $('#add-tag').html('');
        $('#add-url-address').html('');
    });
});

function fetchData() {
    reqwest({
        url: config.fetchUrl,
        method: 'GET',
        type: 'json',
        crossOrigin: true,
        success: function (response) {
            var lengthWebsites = response.websites.length;
            var likes = JSON.parse(localStorage.getItem("likes"));
            for (var i = countKeys(likes); i < lengthWebsites; i++) {
                likes[response.websites[i].id] = 0;
            }

            for (var i in response.websites) {
                response.websites[i].likes = likes[response.websites[i].id];
            }

            app.message = response;
            displayLinks(app.message);
        },
        error: function (error) {
            //ToDo: Display user-friendly error
            console.log(JSON.stringify(error, null, 2));
        }
    });
}

function incrementLikes(id) {
    var likes = JSON.parse(localStorage.getItem("likes"));

    for (var i = 0; i < app.message.websites.length; i++) {
        if (app.message.websites[i].id == id) {
            app.message.websites[i].likes += 1;
            likes[id] = app.message.websites[i].likes;
            break;
        }
    }

    localStorage.setItem("likes", JSON.stringify(likes));
    displayLinks(app.message);
}

function displayLinks(websites) {
    document.getElementById('list-all-data').innerHTML = '';
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

function search() {
    var query = document.getElementById('searchWebsite').value.trim();

    var results = [];
    var websites = app.message.websites;

    for (var i = 0; i < websites.length; i++) {
        if (websites[i].title.startsWith(query) || websites[i].tag.startsWith(query) || websites[i].url_address.startsWith(query)) {
            results.push(websites[i]);
        }
    }

    displayLinks({websites: results});
}

function countKeys(obj) {
    var counter = 0;
    for (var key in obj) {
        counter++;
    }
    return counter;
}