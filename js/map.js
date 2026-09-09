ymaps.ready(initMap);

function initMap() {
  const myMap = new ymaps.Map("map", {
    center: [59.936, 30.249],
    zoom: 12,
    controls: ["zoomControl", "fullscreenControl", "typeSelector"],
  });

  const mfkPlacemark = new ymaps.Placemark(
    [59.941865, 30.23045],
    {
      hintContent: "МФК Горный",
      balloonContent: "Многофункциональный комплекс",
      iconCaption: "МФК Горный",
    },
    {
      preset: "islands#orangeIcon",
    },
  );

  const universityPlacemark = new ymaps.Placemark(
    [59.930007, 30.268504],
    {
      hintContent: "Горный университет",
      balloonContent: "Санкт-Петербургский горный университет",
      iconCaption: "Горный университет",
    },
    {
      preset: "islands#blueIcon",
    },
  );

  myMap.geoObjects.add(mfkPlacemark);
  myMap.geoObjects.add(universityPlacemark);
}
