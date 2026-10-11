const inp = document.getElementById("inp");
const btn = document.getElementById("btn");
const content = document.querySelector(".container");
const loading = document.getElementById("loading");

btn.addEventListener("click", function () {
  let user = inp.value;

  if (user == "") {
    alert("Please enter a corect user");
  } else {
    loading.classList.remove("d-none");
    loading.innerHTML = "Searching for " + user;
    btn.disabled = true;
    fetch("https://api.github.com/users/" + user)
      .then(function (res) {
        if (res.ok == false) {
          throw new Error("User not found");
        }

        return res.json();
      })
      .then(function (data) {
        loading.classList.add("d-none");
        let Card = document.getElementById("userCard");

        if (Card != null) {
          Card.remove();
        }

        content.innerHTML += `
<div id="userCard"
    class="card bg-dark text-white border-0 rounded-4 p-4 w-100 text-center shadow mb-4">

    <div class="d-flex justify-content-center mb-3">
        <img
            src="${data.avatar_url}"
            class="rounded-circle border border-3 border-white"
            width="90"
            height="90"
            alt="User Avatar"
        >
    </div>

    <h3 class="fw-bold fs-4 mb-0">
        ${data.name || data.login}
    </h3>

    <p class="text-secondary small mb-3">
        @${data.login}
    </p>

    <p class="text-info small mb-4">
        ${data.bio || "This user doesn't have a bio."}
    </p>

    <div class="row g-2 justify-content-center">

        <div class="col-4">
            <div class="card bg-white text-dark border-0 rounded-3 p-2 text-center">
                <span class="fw-bold fs-5">
                    ${data.public_repos}
                </span>
                <span class="text-muted" style="font-size: 0.8rem">
                    Repositories
                </span>
            </div>
        </div>

        <div class="col-4">
            <div class="card bg-white text-dark border-0 rounded-3 p-2 text-center">
                <span class="fw-bold fs-5">
                    ${data.followers}
                </span>
                <span class="text-muted" style="font-size: 0.8rem">
                    Followers
                </span>
            </div>
        </div>

        <div class="col-4">
            <div class="card bg-white text-dark border-0 rounded-3 p-2 text-center">
                <span class="fw-bold fs-5">
                    ${data.following}
                </span>
                <span class="text-muted" style="font-size: 0.8rem">
                    Following
                </span>
            </div>
        </div>

    </div>

    <a href="${data.html_url}"
        target="_blank"
        class="btn btn-primary mt-4">
        View GitHub Profile
    </a>

  </div>
 `;
      })
      .catch(function (e) {
        loading.innerHTML = e.message;
        loading.classList.remove("d-none");
      })
      .finally(function () {
        btn.disabled = false;
      });
  }
});
