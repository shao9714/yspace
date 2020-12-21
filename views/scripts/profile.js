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
        }
    });
}

function populateProfile(user) {
    document.getElementsByClassName("profile-username")[0].innerHTML = user.username;
    document.getElementsByClassName("profile-email")[0].innerHTML = user.email;
}