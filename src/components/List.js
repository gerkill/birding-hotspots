
import React, { Component } from 'react';
import Place from './Place';

class List extends Component {
  // initial state
  state = {
    locations: '',
    query: '',
    suggestions: true
  };

  constructor(props) {
    super(props);
    this.filterLocations = this.filterLocations.bind(this);
  }

  // This filters locations based on user input
  filterLocations(event) {
    this.props.closeInfoWindow();
    const { value } = event.target;
    let locations = [];
    this.props.places.forEach((location) => {
      if (location.locName.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        location.marker.setVisible(true);
        locations.push(location);
      }
      else
      {
        location.marker.setVisible(false);
      }
    });

    // This updates the state
    this.setState({
      locations: locations,
      query: value
    });
  }

  componentWillMount() {
    this.setState({
      locations: this.props.places
    });
  }

  // Displays the location list.
  render() {
    let locationlist = this.state.locations.map((listItem, index) => {
      return (
        <Place
          key={index}
          openInfoWindow={this.props.openInfoWindow.bind(this)}
          data={listItem}
        />
      );
    }, this);

    return (
      <div className="search-area" id="search-box">
        <input
          className="search-input"
          role="search"
          aria-labelledby="search-box"
          type="text"
          placeholder="Search Good Birding Spots"
          value={this.state.query}
          onChange={this.filterLocations}
        />
        <ul className="location-list">
          {locationlist}
        </ul>
      </div>
    );
  }
}

export default List;
