const sectionToWatch = document.querySelector(".loading");
const loading = document.querySelector(".loading");
const container = document.querySelector(".container");
const MAX_IMAGES_TO_LOAD = 40;

const loadMoreData = () => {
  fetch(
    "https://gist.githubusercontent.com/myogeshchavan97/2202735a1c3d63a16800b91f38921e14/raw/02326380aff81fbae3321426eed19e3cfb83907b/images.json"
  )
    .then((response) => response.json())
    .then((result) => {
      const images = result.images;

      images.forEach((image) => {
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("image");
        const img = document.createElement("img");
        img.src = image.source;
        imageDiv.appendChild(img);
        container.appendChild(imageDiv);
      });
    });
};

const observer = new IntersectionObserver((entries, observer) => {
  const [end] = entries;

  if (end.isIntersecting) {
    loadMoreData();
  }
  if (container.querySelectorAll(".image").length === MAX_IMAGES_TO_LOAD) {
    observer.unobserve(end.target);
    sectionToWatch.parentNode.removeChild(sectionToWatch);
  }
});

observer.observe(sectionToWatch);