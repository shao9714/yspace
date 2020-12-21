function login() {
  var email = document.getElementById('login-email').value;
  var password = document.getElementById('login-password').value;
  $.ajax({
    url: '/api/login',
    type: 'POST',
    data: {
      "email": email,
      "password": password
    },
    dataType: 'json',
    success: function(res) {
      localStorage.token = res.token;
      localStorage.email = res.email;
      window.location.href = "/profile"
    },
    error: function(error) {
      alert("Email or password incorrect!");
      document.getElementsByClassName("form-container__login")[0].reset();
    }
  });
}

function signup() {
  var username = document.getElementById('signup-username').value;
  var email = document.getElementById('signup-email').value;
  var password = document.getElementById('signup-password').value;
  $.ajax({
    url: '/api/signup',
    type: 'POST',
    data: {
      "username": username,
      "email": email,
      "password": password
    },
    dataType: 'json',
    complete: function (response) {
    }
  });
}

// login/signup toggle

// const loginForm = $('.form-container__login')
// const signupForm = $('.form-container__signup')

// const promptBtn = $('.prompt-btn')
// const promptText = $('.prompt-text')

// promptBtn.on('click', () => {
//   console.log("i'm here");
//   if (signupForm.className === "hidden") {
//     loginForm.classList.add("hidden")
//     signupForm.classList.remove("hidden")
//   } else {
//     signupForm.classList.add("hidden")
//     loginForm.classList.remove("hidden")
//   }

// })

$(document).on('click', '.prompt-btn', function() {

  var loginForm = document.getElementsByClassName('form-container__login')[0];
  var signupForm = document.getElementsByClassName('form-container__signup')[0];
  var promptBtn = document.getElementsByClassName('prompt-btn')[0];
  var promptText = document.getElementsByClassName('prompt-text')[0];

  if (signupForm.className === "form-container__signup hidden") {
    loginForm.classList.add("hidden")
    signupForm.classList.remove("hidden")
    promptBtn.innerHTML = "Login";
    promptText.innerHTML = "Already have an account?";
  } else {
    signupForm.classList.add("hidden")
    loginForm.classList.remove("hidden")
    promptBtn.innerHTML = "Signup";
    promptText.innerHTML = "Don't have an account?";
  }
});