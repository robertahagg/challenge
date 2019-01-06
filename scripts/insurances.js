function create(element) {
  return document.createElement(element);
}

function loadInsurances() {
  const logo = document.getElementById("logo");
  const ul = document.getElementById("insurances");
  const url = "assets/api.json";

  //Fetching from API doesn't work due to Access-Control-Allow-Origin header is not present and my code is not on the same domain.
  //const url = 'http://modernacodechallenge.azurewebsites.net/api/insurances/';

  fetch(url)
    .then(resp => resp.json())
    .then(function(data) {
      const logoUrl = data.embedded.logo.href;
      const root = data.meta.root;
      const insurances = data.insurances;
      let i = 0;

      logo.src = root + logoUrl;

      insurances.forEach(function(insurance) {
        const li = create("li");
        const img = create("img");
        const span = create("span");
        const a = create("a");

        i++;
        if (i > 8) {
          li.classList.add("additional");
        }

        logo.classList.add("header-logo");
        img.src = root + insurance.image.href;
        a.href = root + insurance.url;
        span.innerHTML = `${insurance.name}`;

        ul.appendChild(li);
        li.appendChild(a);
        a.appendChild(img);
        a.appendChild(span);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

function toggleBtn() {
  const container = document.getElementsByClassName("insurance-container")[0];
  container.classList.toggle("hide-additional");
}

window.onload = loadInsurances;
