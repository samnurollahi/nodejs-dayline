const containerNews = document.getElementById("container-news");

let page = 1;
window.addEventListener("scrollend", () => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("post", "/getNews");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhttp.onloadend = function () {
    ++page;
    result = JSON.parse(xhttp.response);
    result.result.forEach((item) => {
      containerNews.innerHTML += `<div class="col-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center">
                    <div style="width: 90%;" class="box-news border-top border-bottom">
                        <div class="box-img">
                            <img src=${item.img} alt="">
                        </div>
                        <a href=${
                          item.urlNews
                        } class="text-decoration-none" target="_blank">
                            ${item.title}
                        </a>
                        <div class="mt-2 data-news">
                            <p class="m-0">
                                <img src="./logo/${
                                  item.manbagIcon
                                }.ico" alt=""  style="width: 10px;">
                                ${item.manbagName} . ${moment(item.createAt)
        .locale("fa")
        .format("D MMM YYYY")}
                            </p>
                        </div>
                    </div>
                </div>`;
    });
    try {
      containerNews.innerHTML += `
        <a href=${result.bannerOne.url} class="text-center" target="_blank">
              <img src="/uploads/${result.bannerOne.img}" />
        </a>`;
    } catch (err) {
      console.log("err");
    }
  };

  xhttp.send(JSON.stringify({ page }));
});
