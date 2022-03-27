ymaps.ready(init);

function init() {
  const mapElem = document.querySelector('#map');
  const myMap = new ymaps.Map(
    "map",
    {
      center: [55.760178, 37.618575],
      zoom: 13,
      controls: ['geolocationControl', 'zoomControl']
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",

      geolocationControlPosition:  {
        top: mapElem.offsetHeight / 2 + 'px',
        right: "20px"
      },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: {
        top: mapElem.offsetHeight / 2 - 80 + 'px',
        right: "20px"
      }
    }
  )


  myMap.behaviors.disable('scrollZoom')

  const myPlacemark = new ymaps.Placemark(
    [55.769594, 37.639738],
    {},
    {
      iconLayout: 'default#image',
      iconImageHref: 'https://i.postimg.cc/vHvs0Lkp/Ellipse-2.png',
      iconImageSize: [12, 12],
      iconImageOffset: [-20, -40],
    }
  );

  myPlacemark.events.add('click', function () {
    document.querySelector('.popup').style.display = 'flex'
  })

  myMap.geoObjects.add(myPlacemark);

  setTimeout(() => {
    myMap.container.fitToViewport();
  }, 5000);


}

document.querySelector('.popup__closebtn').addEventListener('click', function () {
  document.querySelector('.popup').style.display = 'none'
  document.querySelector('ymaps').classList.remove('notonly')
  document.querySelector('ymaps').classList.add('only')
})