import React, { Component } from 'react';
import './App.css';
import List from './components/List';

class App extends Component {
  state = {
    places: require('./places.json'),
    map: '',
    infoWindow: '',
    lastMarker: ''
  };

  constructor(props) {
    super(props);
    // Keep objects locally accessible
    this.initMap = this.initMap.bind(this);
    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
  }

  componentDidMount() {
    window.initMap = this.initMap;
    // asynchronously load map
    setupMap(
      "https://maps.googleapis.com/maps/api/js?key=SyBahhCeE9ajAlnwpg5tHWCEIVajSU1WaOs&v=3&callback=initMap"
    );
     // Google api authentication error alert
	window.gm_authFailure = function() {
  	alert('Sorry! This map is not loading properly: Google API authentication key error.');
  }

  // Initializes the Map, Infowindow, event-listeners, markers
  initMap() {
    let self = this;
    let mapView = document.getElementById('map');
    mapView.style.height = window.innerHeight + 'px';
    // create the map
    let map = new window.google.maps.Map(mapView, {
      mapTypeControlOptions: {
              style: window.google.maps.MapTypeControlStyle.DEFAULT,
              position: window.google.maps.ControlPosition.BOTTOM_LEFT
          },
      center: { lat: 45.32281, lng: -123.9999377 },
      zoom: 10,
      styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#000099'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#000099'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
            ]
    });

    // this creates the infoWindow
    let InfoWindow = new window.google.maps.InfoWindow({});
    let places = [];
    // this is the close-click event listener
    window.google.maps.event.addListener(InfoWindow, 'closeclick', () => {
      self.closeInfoWindow();
    });

    // this updates the state
    this.setState({
      map: map,
      infoWindow: InfoWindow
    });

    // needed to keep map centered
    window.google.maps.event.addDomListener(window, 'resize', () => {
      let center = map.getCenter();
      window.google.maps.event.trigger(map, 'resize');
      self.state.map.setCenter(center);
    });

    // closes the infoWindow if the user clicks anywhere on the map
    window.google.maps.event.addListener(map, 'click', () => {
      self.closeInfoWindow();
    });

    // Here we create the location markers
    this.state.places.forEach((location) => {
      let locName = location.name;
      let marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(
          location.lat,
          location.lng,
        ),
        animation: window.google.maps.Animation.DROP,
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          strokeWeight: 1,
          scale: 6.0,
          fillColor: 'red',
          fillOpacity: 0.6
          },
        title: location.name
      });
      // This creates an eventListener for clicks on markers
      marker.addListener('click', () => {
        self.openInfoWindow(marker);
      });

      //This sets up the markers themselves
      location.locName = locName;
      location.marker = marker;
      location.display = true;
      places.push(location);
    });

    // This updates the state
    this.setState({
      places: places
    });
  }

  // This opens the infoWindow for a marker
  openInfoWindow(marker) {
    // but first, we need to close the current window
    this.closeInfoWindow();
        this.setState({
      lastMarker: marker
    });
    // Marker animation
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.state.infoWindow.setContent('Please Wait');
    this.state.infoWindow.open(this.state.map, marker);
    // Use 3rd-Party API for place data
    this.getFourSqData(marker);
  }

  // Close the infoWindow
  closeInfoWindow() {
    if (this.state.lastMarker) {
      this.state.lastMarker.setAnimation(null);
    }
    this.setState({
      lastMarker: ''
    });

    this.state.infoWindow.close();
  }

  // Gets more data from 3rd-Party via API: Foursquare
  getFourSqData(marker) {
    let self = this;
    // My FourSquare Client Details
    let FSclientId = "FEKW2Q30OO1DUYBOTVUSXOWE";
    let FSclientSecret = "4GBR2LJPZ1FNJQCFOAFHIJ";
    // Latest Version
    let FSVersion = "20180721";

    // This is the API call
    let url =
    'https://api.foursquare.com/v2/venues/search?client_id=' + FSclientId + '&client_secret=' +
      FSclientSecret + '&v=' + FSVersion + '&ll=' + marker.getPosition().lat() + ',' +
      marker.getPosition().lng() + '&limit=1';

    // This gets the data
    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          self.state.infoWindow.setContent('Server-side problem encountered');
          return;
        }
        // Reads response and writes the HTML for the infoWindow
        response.json().then((data) => {
          let location_data = data.response.venues[0];
          let place = `<h4>${location_data.name}</h4>`;
          let category = `<p class=category>(${location_data.categories[0].name})</p>`;
          let addln1 = `<ul class="addressList"><li>${location_data.location.formattedAddress[0]}</li>`;
          let addln2 = `<li>${location_data.location.formattedAddress[1]}</li>`;
          let postcode = `<li>${location_data.location.postalCode}</li></ul></p>`;
          let more =
            '<a href="https://foursquare.com/v/' + location_data.id +
            '" target="_blank"><b>View on FourSquare</b></a>';
          // Writes to the infoWindow
          self.state.infoWindow.setContent( '<div tabIndex="0">' + place + category + addln1 + addln2 + postcode + more + '</div>');
        });
      })
      .catch((err) => {
        self.state.infoWindow.setContent('<h4>Error connecting to FourSquare</h4>Check Network Connection');
      });
  }

  // Renders the view
  render() {
    return (
      <div>
        <header className="app-header">
          <h1 className="app-title">Birding Hotspots On The Central Oregon Coast</h1>
        </header>
        <List
          key = "10"
          places = {this.state.places}
          openInfoWindow = {this.openInfoWindow}
          closeInfoWindow = {this.closeInfoWindow}
        />
      <div id="map" />
      </div>
    );
  }
}

export default App;

//Finally, creates the HTML <script> element in order to load the Map
function setupMap(mapURL) {
  let ref = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = mapURL;
  script.async = true;
  script.onerror = () => {
    document.write('Failed to load Google Map');
  };
  ref.parentNode.insertBefore(script, ref);
}
