let loadCatagories = async () => {
  let url = `https://openapi.programming-hero.com/api/news/categories`;
  let res = await fetch(url);
  let data = await res.json();
  return showCatagories(data.data.news_category);
};

let showCatagories = (catagories) => {
  console.log(catagories);
  let catagoriesContainer = document.getElementById("catagories-container");
  catagoriesContainer.innerHTML = `
  <button onclick = "loadBreakingNews('${catagories[0].category_id}')"  class="btn btn-primary">${catagories[0].category_name}</button> 
  <button onclick = "loadRegularNews('${catagories[1].category_id}')" class="btn btn-primary">${catagories[1].category_name}</button>
  <button onclick = "loadInternationalNews('${catagories[2].category_id}')" class="btn btn-primary">${catagories[2].category_name}</button>
  <button onclick = "loadSportsNews('${catagories[3].category_id}')" class="btn btn-primary">${catagories[3].category_name}</button>
  <button onclick = "loadEntertainment('${catagories[4].category_id}')" class="btn btn-primary">${catagories[4].category_name}</button>
  <button onclick = "loadCulture('${catagories[5].category_id}')" class="btn btn-primary">${catagories[5].category_name}</button>
  <button onclick = "loadArtNews('${catagories[6].category_id}')" class="btn btn-primary">${catagories[6].category_name}</button>
  <button onclick = "loadAllNews('${catagories[7].category_id}')" class="btn btn-primary">${catagories[7].category_name}</button>
  `;
};

//Breaking news
let loadBreakingNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showBreakingNews(data.data));
};

let showBreakingNews = (newses) => {
  console.log(newses);

  let itemsNumbers = document.getElementById("show-items-numbers");
  itemsNumbers.innerText =
    newses.length + " " + "item's are found from this category";

  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  newses.forEach((news) => {
    let createCard = document.createElement("div");
    createCard.classList.add("mb-5");
    createCard.classList.add("p-3");
    createCard.classList.add("rounded");
    createCard.classList.add("shadow-lg");
    createCard.classList.add("container");
    createCard.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${
              news.thumbnail_url
            }" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h2 class="card-title mb-3">${news.title}</h2>
              <p class="card-text">
                ${
                  news.details.length > 300
                    ? news.details.slice(0, 300) + "...."
                    : news.details
                }
              </p>
              <div class = " mt-4 container-fluid d-flex justify-content-between align-items-center">
              <div class = "d-flex justify-content-between align-items-center ">
              <img class = "me-3" style = "width:80px;border-radius:50%" src = "${
                news.author.img
              }">
              <p>${news.author.name}</p>
              </div>
              <h5>View: <span class = "fw-bold">${news.total_view}</span> </h5>
              <button onclick ="loadModal('${
                news._id
              }')" class = "btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detail</button>
              </div>
            </div>
          </div>
        </div>
    `;
    cardContainer.appendChild(createCard);
  });
};

//load modal

let loadModal = (userId) => {
  let url = `https://openapi.programming-hero.com/api/news/${userId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showModal(data.data[0]));
};

let showModal = (modals) => {
  let modalContainer = document.getElementById("modal-body-container");
  modalContainer.innerHTML = `
  <img class = "img-fluid w-100 rounded" src = "${modals.thumbnail_url}">
  <h5 class = "my-3 "><b>title:</b> ${modals.title}</h5>
  <br>
  <b>Author</b>
  <img class = "img-fluid rounded" src = "${modals.author.img}">
  <p class = "my-3"><b>Name:</b> ${modals.author.name}</p>
  <p><b>Published date:</b> ${modals.author.published_date}</p>
  `;
};

//Regular news
let loadRegularNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showBreakingNews(data.data));
};

let showRegularNews = (newses) => {
  console.log(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  newses.forEach((news) => {
    let createCard = document.createElement("div");
    createCard.classList.add("mb-5");
    createCard.classList.add("p-3");
    createCard.classList.add("rounded");
    createCard.classList.add("shadow-lg");
    createCard.classList.add("container");
    createCard.innerHTML = `
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${
                news.thumbnail_url
              }" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title mb-3">${news.title}</h2>
                <p class="card-text">
                ${
                  news.details.length > 300
                    ? news.details.slice(0, 300) + "...."
                    : news.details
                }
                </p>
                <div class = " mt-4 container-fluid d-flex justify-content-between align-items-center">
                <div class = "d-flex justify-content-between align-items-center ">
                <img class = "me-3" style = "width:80px;border-radius:50%" src = "${
                  news.author.img
                }">
                <p>${news.author.name}</p>
                </div>
                <h5>View: <span class = "fw-bold">${
                  news.total_view
                }</span> </h5>
                <button onclick ="loadModal('${
                  news._id
                }')" class = "btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detail</button>
                </div>
              </div>
            </div>
          </div>
      `;
    cardContainer.appendChild(createCard);
  });
};

//International news
let loadInternationalNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showBreakingNews(data.data));
};

let showInternationalNews = (newses) => {
  console.log(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  newses.forEach((news) => {
    let createCard = document.createElement("div");
    createCard.classList.add("mb-5");
    createCard.classList.add("p-3");
    createCard.classList.add("rounded");
    createCard.classList.add("shadow-lg");
    createCard.classList.add("container");
    createCard.innerHTML = `
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${
                  news.thumbnail_url
                }" class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title mb-3">${news.title}</h2>
                  <p class="card-text">
                  ${
                    news.details.length > 300
                      ? news.details.slice(0, 300) + "...."
                      : news.details
                  }
                  </p>
                  <div class = " mt-4 container-fluid d-flex justify-content-between align-items-center">
                  <div class = "d-flex justify-content-between align-items-center ">
                  <img class = "me-3" style = "width:80px;border-radius:50%" src = "${
                    news.author.img
                  }">
                  <p>${news.author.name}</p>
                  </div>
                  <h5>View: <span class = "fw-bold">${
                    news.total_view
                  }</span> </h5>
                  <button onclick ="loadModal('${
                    news._id
                  }')" class = "btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detail</button>
                  </div>
                </div>
              </div>
            </div>
        `;
    cardContainer.appendChild(createCard);
  });
};

//Sports news
let loadSportsNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showBreakingNews(data.data));
};

let showSportsNews = (newses) => {
  console.log(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  newses.forEach((news) => {
    let createCard = document.createElement("div");
    createCard.classList.add("mb-5");
    createCard.classList.add("p-3");
    createCard.classList.add("rounded");
    createCard.classList.add("shadow-lg");
    createCard.classList.add("container");
    createCard.innerHTML = `
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${
                  news.thumbnail_url
                }" class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title mb-3">${news.title}</h2>
                  <p class="card-text">
                  ${
                    news.details.length > 300
                      ? news.details.slice(0, 300) + "...."
                      : news.details
                  }
                  </p>
                  <div class = " mt-4 container-fluid d-flex justify-content-between align-items-center">
                  <div class = "d-flex justify-content-between align-items-center ">
                  <img class = "me-3" style = "width:80px;border-radius:50%" src = "${
                    news.author.img
                  }">
                  <p>${news.author.name}</p>
                  </div>
                  <h5>View: <span class = "fw-bold">${
                    news.total_view
                  }</span> </h5>
                  <button onclick ="loadModal('${
                    news._id
                  }')" class = "btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detail</button>
                  </div>
                </div>
              </div>
            </div>
        `;
    cardContainer.appendChild(createCard);
  });
};

//Entertainment news
let loadEntertainment = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showBreakingNews(data.data));
};

let showEntertainmentNews = (newses) => {
  console.log(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  newses.forEach((news) => {
    let createCard = document.createElement("div");
    createCard.classList.add("mb-5");
    createCard.classList.add("p-3");
    createCard.classList.add("rounded");
    createCard.classList.add("shadow-lg");
    createCard.classList.add("container");
    createCard.innerHTML = `
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${
                  news.thumbnail_url
                }" class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title mb-3">${news.title}</h2>
                  <p class="card-text">
                  ${
                    news.details.length > 300
                      ? news.details.slice(0, 300) + "...."
                      : news.details
                  }
                  </p>
                  <div class = " mt-4 container-fluid d-flex justify-content-between align-items-center">
                  <div class = "d-flex justify-content-between align-items-center ">
                  <img class = "me-3" style = "width:80px;border-radius:50%" src = "${
                    news.author.img
                  }">
                  <p>${news.author.name}</p>
                  </div>
                  <h5>View: <span class = "fw-bold">${
                    news.total_view
                  }</span> </h5>
                  <button onclick ="loadModal('${
                    news._id
                  }')" class = "btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detail</button>
                  </div>
                </div>
              </div>
            </div>
        `;
    cardContainer.appendChild(createCard);
  });
};

//Culture news
let loadCulture = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showBreakingNews(data.data));
};

let showCultureNews = (newses) => {
  console.log(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  newses.forEach((news) => {
    let createCard = document.createElement("div");
    createCard.classList.add("mb-5");
    createCard.classList.add("p-3");
    createCard.classList.add("rounded");
    createCard.classList.add("shadow-lg");
    createCard.classList.add("container");
    createCard.innerHTML = `
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${
                  news.thumbnail_url
                }" class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title mb-3">${news.title}</h2>
                  <p class="card-text">
                  ${
                    news.details.length > 300
                      ? news.details.slice(0, 300) + "...."
                      : news.details
                  }
                  </p>
                  <div class = " mt-4 container-fluid d-flex justify-content-between align-items-center">
                  <div class = "d-flex justify-content-between align-items-center ">
                  <img class = "me-3" style = "width:80px;border-radius:50%" src = "${
                    news.author.img
                  }">
                  <p>${news.author.name}</p>
                  </div>
                  <h5>View: <span class = "fw-bold">${
                    news.total_view
                  }</span> </h5>
                  <button onclick ="loadModal('${
                    news._id
                  }')" class = "btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detail</button>
                  </div>
                </div>
              </div>
            </div>
        `;
    cardContainer.appendChild(createCard);
  });
};

//Art news
let loadArtNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showBreakingNews(data.data));
};

let showArtNews = (newses) => {
  console.log(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  newses.forEach((news) => {
    let createCard = document.createElement("div");
    createCard.classList.add("mb-5");
    createCard.classList.add("p-3");
    createCard.classList.add("rounded");
    createCard.classList.add("shadow-lg");
    createCard.classList.add("container");
    createCard.innerHTML = `
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${
                  news.thumbnail_url
                }" class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title mb-3">${news.title}</h2>
                  <p class="card-text">
                  ${
                    news.details.length > 300
                      ? news.details.slice(0, 300) + "...."
                      : news.details
                  }
                  </p>
                  <div class = " mt-4 container-fluid d-flex justify-content-between align-items-center">
                  <div class = "d-flex justify-content-between align-items-center ">
                  <img class = "me-3" style = "width:80px;border-radius:50%" src = "${
                    news.author.img
                  }">
                  <p>${news.author.name}</p>
                  </div>
                  <h5>View: <span class = "fw-bold">${
                    news.total_view
                  }</span> </h5>
                  <button onclick ="loadModal('${
                    news._id
                  }')" class = "btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detail</button>
                  </div>
                </div>
              </div>
            </div>
        `;
    cardContainer.appendChild(createCard);
  });
};
//All news
let loadAllNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showBreakingNews(data.data));
};

let showAllNews = (newses) => {
  console.log(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  newses.forEach((news) => {
    let createCard = document.createElement("div");
    createCard.classList.add("mb-5");
    createCard.classList.add("p-3");
    createCard.classList.add("rounded");
    createCard.classList.add("shadow-lg");
    createCard.classList.add("container");
    createCard.innerHTML = `
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${
                  news.thumbnail_url
                }" class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h2 class="card-title mb-3">${news.title}</h2>
                  <p class="card-text">
                  ${
                    news.details.length > 300
                      ? news.details.slice(0, 300) + "...."
                      : news.details
                  }
                  </p>
                  <div class = " mt-4 container-fluid d-flex justify-content-between align-items-center">
                  <div class = "d-flex justify-content-between align-items-center ">
                  <img class = "me-3" style = "width:80px;border-radius:50%" src = "${
                    news.author.img
                  }">
                  <p>${news.author.name}</p>
                  </div>
                  <h5>View: <span class = "fw-bold">${
                    news.total_view
                  }</span> </h5>
                  <button onclick ="loadModal('${
                    news._id
                  }')" class = "btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detail</button>
                  </div>
                </div>
              </div>
            </div>
        `;
    cardContainer.appendChild(createCard);
  });
};

loadCatagories();
