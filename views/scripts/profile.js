function init() {
    $.ajax({
        url: "/profile",
        type: "POST",
        data: {
            "email": localStorage.email
        },
        dataType: "json",
        success: function(res) {
            console.log(res);
            populateProfile(res.user);
            populateTweets(res.tweets, res.user);
        }
    });
}

function populateProfile(user) {
    document.getElementsByClassName("profile-username")[0].innerHTML = user.username;
    document.getElementsByClassName("profile-email")[0].innerHTML = user.email;
    document.getElementsByClassName("profile-picture")[0].src = `./images/${user.profilePic}`
}

function populateTweets(tweets, user) {
    for (var i=0; i<tweets.length; i++) {
        var datetime = tweets[i].createdAt.replace('T', '\t');
        var datetime = datetime.replace(/\..*$/, '');
        
        document.getElementsByClassName("user-posts")[0].innerHTML += 
            "<div class=\"post-card\"><div class=\"post-profile-picture-border\">" + 
            `<img alt=\"post profile picture\" class=\"post-profile-picture\" src=./images/${user.profilePic}></div>` + 
            `<p class=\"post-username\">${user.username}</p>` + 
            "<i class=\"fas fa-pen edit-btn\"></i>" +
            `<p class=\"post-datetime\">${datetime}</p>` +
            `<p class=\"post-content\">${tweets[i].content}</p></div>`;
    }
}
