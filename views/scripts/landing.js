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
    dataType: 'application/json',
    complete: function (response) {
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
    dataType: 'application/json',
    complete: function (response) {
    }
  });
}

// login/signup toggle

const loginForm = $('.form-container__login')
const signupForm = $('.form-container__signup')

const promptBtn = $('.prompt-btn')
const promptText = $('.prompt-text')

promptBtn.on('click', () => {
  if (signupForm.className === "hidden") {
    loginForm.classList.add("hidden")
    signupForm.classList.remove("hidden")
  } else {
    signupForm.classList.add("hidden")
    loginForm.classList.remove("hidden")
  }

})
