// github user finder example

function getGithubInfo(username, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        callback(this);
    };
    xhr.open('GET', 'https://api.github.com/users/' + username, true);
    xhr.send();
}

$(function(){ // shortcut for $(document).ready
    $(document).on('keypress', '#username', function(e) {
        if (e.which === 13) {
            var input = $(this).val();
            getGithubInfo(input, processResponse);
        }
    });
});

function processResponse (e) {
    if (e.status === 200) {
        var response = JSON.parse(e.responseText);
        showUser(response);
    } else {
        $("#profile").find("h2").text("That user is not on Github.");
    }
}

function showUser (user) {
    console.log(user);
    $("#profile").find("h2").text(user.name); // this is faster, no regex to figure it out
    $(".avatar").html("<img src="+user.avatar_url+">");
}