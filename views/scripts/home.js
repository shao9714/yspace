function init() {
  $.ajax({
    url: 'https://randomapi.com/api/8f342d25ac1eb562bd1e76f0d266a48b',
    dataType: 'json',
    success: function (data) {
      let feedData = data.results[0];
      let processedData = feedData.map(f => addAvatar(f))
      console.log(processedData[0]);
      populateFeedData(processedData);
      if(!localStorage.profilePicture) {
        setDefaultAvatar(localStorage.username)
      }
      populateProfile()
      addFeedEnd()
    },
    error: function(error) {
      console.log(error)
      console.log("can't get feed data")
    }
  });
}

function populateFeedData(feedData) {
  console.log('inside feed')
  const feedContainer = document.querySelector('.feed__data')
  feedData.forEach(f=>{
    let postContainer = document.createElement('div')
    postContainer.setAttribute("class","feed__data__post-container")
    postContainer.innerHTML = `
      <div class="post-container__img-container">
        <img class="post-container__img" src=${f.avatar}>
      </div>
      <div class="post-container__post-info">
        <p class="post-info__name">${f.name}</p>
        <p class="post-info__date">${f.posts[0].date}</p>
        <p class="post-info__post">${f.posts[0].post}</p>
      </div>
      ` 
    feedContainer.appendChild(postContainer)
  })
}

function populateProfile() {
  document.getElementsByClassName("profile-username")[0].innerHTML = localStorage.username;
}

function setDefaultAvatar(username) {
  console.log('inside setdefaultavatar')
    let avatar = `https://avatars.dicebear.com/api/female/${username}.svg?w=200&h=200&mood[]=surprised`
    document.querySelector('.profile-img').setAttribute("src",`${avatar}`)
}

function addAvatar(el) {
  let newEl = {...el}
  newEl.avatar = `https://avatars.dicebear.com/api/human/${el.username}.svg?w=200&h=200&mood[]=happy`
  return newEl
}

function addFeedEnd() {
  document.querySelector('.feed__end').style.display = 'block';
}