
const containerNews = document.querySelector("tbody");

let formatDate = (date) => {
  return moment(date).locale("fa").format("D MMM YYYY");
};

let page = 1;
window.onscroll = function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("post", "/getNews");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.onloadend = function () {
      ++page;
      JSON.parse(xhttp.response).result.forEach((item) => {
        containerNews.innerHTML += `<tr>
              <td><a href=${item.urlNews} class="text-dark">${item.title}</a></td>
              <td>${formatDate(item.createAt)}</td>
              <td><a href="/dashboard/deleteNews/${item._id}" class="btn btn-danger">حذف</a></td>
            </tr>`;
      });
    };

    xhttp.send(JSON.stringify({ page }));
  }
};
