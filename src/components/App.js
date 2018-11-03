import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  handleFilterChange = value => {
    this.setState({ filters: { type: value } });
  };

  fetchPets = () => {
    let filterQuery =
      this.state.filters.type === "all"
        ? ""
        : `?type=${this.state.filters.type}`;
    console.log(`/api/pets${filterQuery}`);
    fetch(`/api/pets${filterQuery}`)
      .then(response => response.json())
      .then(response => this.setState({ pets: response }));
  };

  adoptPet = id => {
    let pets = this.state.pets.map(
      pet => (pet.id === id ? { ...pet, isAdopted: true } : pet)
    );

    this.setState({ pets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.handleFilterChange}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
