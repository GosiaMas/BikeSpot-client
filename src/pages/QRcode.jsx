import React, { Component } from "react";
import axios from "axios";

export default class QRcode extends Component {
  state = {
    src: "",
  };

  componentDidMount = () => {
    const spotId = this.props.match.params.id;
    // console.log(spotId);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/profile/QRcode/${spotId}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((responseURL) => {
        // console.log(response.data.allTrans);
        console.log(responseURL.data.url);
        this.setState({
          src: responseURL.data.url,
        });
      })
      .catch((err) => console.log(err.response));
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <br />
        <br />
        <h3>Below is your QR code to enter the facility</h3>
        <br />
        <br />
        <img src={this.state.src} alt="qrCode pic" />
      </div>
    );
  }
}
