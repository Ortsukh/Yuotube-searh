const input = document.querySelector("input[type='text']");
const navBlock = document.querySelector(".nav_block");
const result = document.querySelector(".result");
let searchValue = "";
let newData = [];
let titleName = "";
let discriptionName = "";
let preview = "";
let videoId = "";
let chanelName = "";
let viewCountNumber = "";
let datapublished = "";
let datapublishedNew;
const firstblock = document.createElement("div");
firstblock.classList.add("firstblock");
firstblock.classList.add("resultblock");
const secondblock = document.createElement("div");
secondblock.classList.add("secondblock");
secondblock.classList.add("resultblock");
secondblock.classList.add("hidden");
const thirdblock = document.createElement("div");
thirdblock.classList.add("thirdblock");
thirdblock.classList.add("resultblock");
thirdblock.classList.add("hidden");
const fourthblock = document.createElement("div");
fourthblock.classList.add("fourthblock");
fourthblock.classList.add("resultblock");
fourthblock.classList.add("hidden");
const searhButton = document.querySelector("button");
searhButton.addEventListener("click", event => {
  while (firstblock.firstChild) {
    firstblock.removeChild(firstblock.firstChild);
  }
  while (secondblock.firstChild) {
    secondblock.removeChild(secondblock.firstChild);
  }
  while (thirdblock.firstChild) {
    thirdblock.removeChild(thirdblock.firstChild);
  }
  while (fourthblock.firstChild) {
    fourthblock.removeChild(fourthblock.firstChild);
  }
  newData = [];
  searchValue = "";
  searchValue += input.value;
  console.log(searchValue);
  getInf();
});

const getInf = function() {
  return fetch(
    `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAEIYrkuN5W9gSEs6foyw0QS37tL-PIBjc&type=video&part=snippet&maxResults=16&q=${searchValue}`
  )
    .then(response => response.json())
    .then(data => {
      newData.push(data.items);

      newData[0].forEach(function(elem, index) {
        videoId = "";
        videoId += elem.id.videoId;

        if (index < 4) {
          getInfView(elem, firstblock);
        } else if (index < 8) {
          getInfView(elem, secondblock);
        } else if (index < 12) {
          getInfView(elem, thirdblock);
        } else {
          getInfView(elem, fourthblock);
        }
      });

      console.log(data);
    });
};
const getInfView = function(elem, numberblock) {
  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyAEIYrkuN5W9gSEs6foyw0QS37tL-PIBjc&part=statistics`
  )
    .then(response => response.json())
    .then(data => {
      viewCountNumber = "";
      viewCountNumber += data.items[0].statistics.viewCount;
      addInf(elem, numberblock);
    });
};
const addInf = function(elem, numberblock) {
  titleName = "";
  titleName += elem.snippet.title;
  datapublished = "";
  datapublished += elem.snippet.publishedAt;
  datapublishedNew = datapublished.slice(0, 10);
  discriptionName = "";
  discriptionName += elem.snippet.description;
  // console.log(discriptionName);
  preview = "";
  preview += elem.snippet.thumbnails.medium.url;

  chanelName = "";
  chanelName += elem.snippet.channelTitle;
  addList(numberblock);
};

result.appendChild(firstblock);
result.appendChild(secondblock);
result.appendChild(thirdblock);
result.appendChild(fourthblock);

function addList(numberblock) {
  const div = document.createElement("div");
  div.classList.add("block");
  const title1 = document.createElement("a");
  const title = document.createElement("div");
  title.classList.add("title");
  title1.textContent = `${titleName}`;
  title1.setAttribute("href", `https://www.youtube.com/watch?v=${videoId}`);
  title.append(title1);
  title.style.background = `url(${preview}) center no-repeat`;

  const discription1 = document.createElement("span");
  const discription = document.createElement("div");
  discription.classList.add("discription");
  discription1.textContent = `${discriptionName}`;
  discription.append(discription1);
  const viewCount1 = document.createElement("span");
  const viewCount = document.createElement("div");
  const viewCountImg = document.createElement("img");
  viewCountImg.setAttribute("src", "./img/viewCount.png");
  viewCount.classList.add("viewCount");
  viewCount1.textContent = `${viewCountNumber}`;
  viewCount.append(viewCountImg);
  viewCount.append(viewCount1);
  const chanelTitle1 = document.createElement("span");
  const chanelTitle = document.createElement("div");
  const chanelTitleImg = document.createElement("img");
  chanelTitleImg.setAttribute("src", "./img/chanelTitle.png");
  chanelTitle1.textContent = `${chanelName}`;
  chanelTitle.append(chanelTitleImg);
  chanelTitle.append(chanelTitle1);
  const publishedAt1 = document.createElement("span");
  const publishedAt = document.createElement("div");
  const publishedAtImg = document.createElement("img");
  publishedAtImg.setAttribute("src", "./img/pablishedAt.png");
  publishedAt.append(publishedAtImg);
  publishedAt.classList.add("publishedAt");
  publishedAt1.textContent = `${datapublishedNew}`;
  publishedAt.append(publishedAt1);
  div.append(title, chanelTitle, publishedAt, viewCount, discription);
  numberblock.appendChild(div);
  navBlock.classList.remove("hidden");
}

const nav = function() {
  const nav1 = document.querySelector(".control_nav1");
  const nav2 = document.querySelector(".control_nav2");
  const nav3 = document.querySelector(".control_nav3");
  const nav4 = document.querySelector(".control_nav4");
  nav1.addEventListener("click", event => {
    firstblock.classList.remove("hidden");
    secondblock.classList.add("hidden");
    thirdblock.classList.add("hidden");
    fourthblock.classList.add("hidden");
    nav1.classList.add("active");
    nav2.classList.remove("active");
    nav3.classList.remove("active");
    nav4.classList.remove("active");
  });
  nav2.addEventListener("click", event => {
    secondblock.classList.remove("hidden");
    firstblock.classList.add("hidden");
    thirdblock.classList.add("hidden");
    fourthblock.classList.add("hidden");
    nav2.classList.add("active");
    nav1.classList.remove("active");
    nav3.classList.remove("active");
    nav4.classList.remove("active");
  });
  nav3.addEventListener("click", event => {
    thirdblock.classList.remove("hidden");
    secondblock.classList.add("hidden");
    firstblock.classList.add("hidden");
    fourthblock.classList.add("hidden");
    nav3.classList.add("active");
    nav2.classList.remove("active");
    nav1.classList.remove("active");
    nav4.classList.remove("active");
  });
  nav4.addEventListener("click", event => {
    fourthblock.classList.remove("hidden");
    secondblock.classList.add("hidden");
    thirdblock.classList.add("hidden");
    firstblock.classList.add("hidden");
    nav4.classList.add("active");
    nav2.classList.remove("active");
    nav3.classList.remove("active");
    nav1.classList.remove("active");
  });
};
nav();
