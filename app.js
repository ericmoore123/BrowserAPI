// parcel watch app.js *to execute*

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const listUsers = document.querySelector(".userList");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); //Stops page reload on submit button press
    const username = document.querySelector("input").value;

    let response = await fetch(`https://api.github.com/users/${username}`).then(
      (successResponse) => {
        if (successResponse.status != 200) {
          throw new Error("Error in data fetching");
          alert("User not found");
        } else {
          return successResponse;
        }
      }
    );

    let userData = await response.json();
    formatData(userData);
  });

  listUsers.addEventListener("click", async (event) => {
    event.preventDefault();
    let userInfo = document.querySelector("input").value;
    let response = await fetch(
      `https://api.github.com/repositories/${userInfo}`
    );
    let usersList = await response;
    console.log(usersList);
  });
});

const goToProfile = (url) => {
  window.open(url, "_blank");
};

let formatData = (data) => {
  // console.log(data);
  let infoArea = document.querySelector(".user-info-area");
  infoArea.innerHTML = `<div class="max-w-sm rounded overflow-hidden shadow-lg">
    <img class="w-full" src=${data.avatar_url} alt="${data.name} Info">
    <div class="px-6 py-4">
      <div class="profile-info font-bold text-xl mb-2">${data.name}
        <a href="${data.html_url}" target="_blank" class="profile-link">Profile</a>
      </div>
    </div>
    <p class="profile-info bio-pos text-gray-700">
        ${data.bio}
    </p>
    <div class="px-6 py-4">
      <span class="profile-info bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">${data.location}</span>
      <span class="profile-info bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Username: ${data.login}</span>
    </div>
  </div>`;
};
