let loadCatagories = async () => {
  let url = `https://openapi.programming-hero.com/api/news/categories`;
  let res = await fetch(url);
  let data = await res.json();
  return showCatagories(data.data.news_category);
};

let showCatagories = (catagories) => {
  // console.log(catagories);
  let catagoriesContainer = document.getElementById("catagories-container");
  catagoriesContainer.innerHTML = `
  <button onclick = "loadBreakingNews('${catagories[0].category_id}')"  class="btn btn-primary my-2">${catagories[0].category_name}</button> 
  <button onclick = "loadRegularNews('${catagories[1].category_id}')" class="btn btn-primary my-2">${catagories[1].category_name}</button>
  <button onclick = "loadInternationalNews('${catagories[2].category_id}')" class="btn btn-primary my-2">${catagories[2].category_name}</button>
  <button onclick = "loadSportsNews('${catagories[3].category_id}')" class="btn btn-primary my-2">${catagories[3].category_name}</button>
  <button onclick = "loadEntertainment('${catagories[4].category_id}')" class="btn btn-primary my-2">${catagories[4].category_name}</button>
  <button onclick = "loadCulture('${catagories[5].category_id}')" class="btn btn-primary my-2">${catagories[5].category_name}</button>
  <button onclick = "loadArtNews('${catagories[6].category_id}')" class="btn btn-primary my-2">${catagories[6].category_name}</button>
  <button onclick = "loadAllNews('${catagories[7].category_id}')" class="btn btn-primary my-2">${catagories[7].category_name}</button>
  `;
};
// spinner function
let spinner = (spin) => {
  let spinnerContainer = document.getElementById("spinner");
  if (spin) {
    spinnerContainer.classList.remove("d-none");
  } else {
    spinnerContainer.classList.add("d-none");
  }
};
//counter function
let counter = (count) => {
  let itemsNumbers = document.getElementById("show-items-numbers");
  itemsNumbers.innerText =
    count.length + " " + "item's are found from this category";
};

//Breaking news
let loadBreakingNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showBreakingNews(data.data))
    .catch((error) => {
      console.log(error);
    });
  spinner(true);
};

let showBreakingNews = (newses) => {
  // console.log(newses);
  counter(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  //sort
  newses.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  newses.forEach((news) => {
    // console.log(news);
    let createCard = document.createElement("div");
    createCard.classList.add("mb-5");
    createCard.classList.add("p-2");
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
              <div class = " mt-4 container-fluid d-flex justify-content-between align-items-center flex-lg-row flex-column ">
              <div class = "d-flex justify-content-between align-items-center ">
              <img class = "me-3 d-block" style = "width:40px;border-radius:50%" src = "${
                news.author.img
              }">
              <p>${news.author.name}</p>
              </div>
              <p>View: <span class = "fw-bold">${news.total_view}</span> </p>
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
  spinner(false);
};

//load modal

let loadModal = (userId) => {
  let url = `https://openapi.programming-hero.com/api/news/${userId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showModal(data.data[0]))
    .catch((error) => {
      console.log(error);
    });
};

let showModal = (modals) => {
  let modalContainer = document.getElementById("modal-body-container");
  modalContainer.innerHTML = `
  <img class = "img-fluid w-100 rounded" src = "${modals.thumbnail_url}">
  <h5 class = "my-2 "><b>title:</b> ${modals.title}</h5>
  <br>
  <b>Author</b>
  <img class = "img-fluid rounded" src = "${modals.author.img}">
  <p class = "my-2"><b>Name:</b> ${modals.author.name}</p>
  <p><b>Published date:</b> ${modals.author.published_date}</p>
  `;
};

//Regular news
let loadRegularNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showRegularNews(data.data))
    .catch((error) => {
      console.log(error);
    });
  spinner(true);
};

let showRegularNews = (newses) => {
  counter(newses);
  // console.log(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  //sort
  newses.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  newses.forEach((news) => {
    // console.log(news);
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
                <p>${
                  news.author.name === null
                    ? "No data available"
                    : news.author.name
                }</p>
                </div>
                <h5>View: <span class = "fw-bold">${
                  news.total_view === null
                    ? "No data available"
                    : news.total_view
                }</span> </h5>
                <button class = "btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Detail</button>
                </div>
              </div>
            </div>
          </div>
      `;
    cardContainer.appendChild(createCard);
  });
  spinner(false);
};

//International news
let loadInternationalNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showInternationalNews(data.data))
    .catch((error) => {
      console.log(error);
    });
  spinner(true);
};

let showInternationalNews = (newses) => {
  counter(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  //sort
  newses.sort((a, b) => {
    return b.total_view - a.total_view;
  });
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
  spinner(false);
};

//Sports news
let loadSportsNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showSportsNews(data.data))
    .catch((error) => {
      console.log(error);
    });
  spinner(true);
};

let showSportsNews = (newses) => {
  counter(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  //sort
  newses.sort((a, b) => {
    return b.total_view - a.total_view;
  });
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
  spinner(false);
};

//Entertainment news
let loadEntertainment = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showEntertainmentNews(data.data))
    .catch((error) => {
      console.log(error);
    });
  spinner(true);
};

let showEntertainmentNews = (newses) => {
  counter(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  //sort
  newses.sort((a, b) => {
    return b.total_view - a.total_view;
  });
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
  spinner(false);
};

//Culture news
let loadCulture = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showCultureNews(data.data))
    .catch((error) => {
      console.log(error);
    });
  spinner(true);
};

let showCultureNews = (newses) => {
  counter(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  //sort
  newses.sort((a, b) => {
    return b.total_view - a.total_view;
  });
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
  spinner(false);
};

//Art news
let loadArtNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showArtNews(data.data))
    .catch((error) => {
      console.log(error);
    });
  spinner(true);
};

let showArtNews = (newses) => {
  counter(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  //sort
  newses.sort((a, b) => {
    return b.total_view - a.total_view;
  });
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
                  <p>${
                    news.author.name === ""
                      ? "No data available"
                      : news.author.name
                  }</p>
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
  spinner(false);
};
//All news
let loadAllNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => showAllNews(data.data))
    .catch((error) => {
      console.log(error);
    });
  spinner(true);
};

let showAllNews = (newses) => {
  counter(newses);
  let cardContainer = document.getElementById("news-card-container");
  cardContainer.innerHTML = "";
  //sort
  newses.sort((a, b) => {
    return b.total_view - a.total_view;
  });
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
  spinner(false);
};
//catching error
loadCatagories().catch((error) => {
  console.log(error);
});
