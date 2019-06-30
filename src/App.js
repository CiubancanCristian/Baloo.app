import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Register from "./components/Register/Register";
import Signin from "./components/Signin/Signin";
import "./App.css";

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: "2528daf25f7540c6acdfde7851ecacff"
});

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  onRouteChange = route => {
    this.setState({ route: route });
  };

  calculateFacesLocations = data => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return data.outputs[0].data.regions.map(face => {
      let clarifaiFace = face.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
      };
    });
  };

  displayFaceBoxes = boxes => {
    this.setState({ boxes: boxes });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
      .then(response =>
        this.displayFaceBoxes(this.calculateFacesLocations(response))
      )
      .catch(err => console.log(err));
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        {route === "home" ? (
          <div>
            <div className="Navbar flex items-center h3 mb4 shadow-3">
              <Logo />
              <Navigation
                isSignedIn={isSignedIn}
                onRouteChange={this.onRouteChange}
              />
            </div>
            <div>
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>
          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
