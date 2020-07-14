import React, { Component } from "react";

class ach_importRecuAvance extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      dataUrl:"",

      redirect: false,
    };
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

  //   getDataUrl(evt) {
  //     console.log("Uploading");
  //     var dataURL = "";
  //     var reader = new FileReader();
  //     var file = evt.target.files[0];

  //     reader.onload = function () {
  //      dataURL = reader.result;
  //       console.log(dataURL);
  //     //   this.setState({ dataUrl: dataURL });
  //     return dataURL
  //     };
  //     reader.readAsDataURL(file);
  //     this.setState({ dataUrl: dataURL });
  //     // console.log(dataURL)
  //     // this.setState({ dataUrl: "Images/sardi.jpg" });
  //   }

  handleChangeImage(evt) {
    console.log("Uploading");
    var dataURL = "";
    var reader = new FileReader();
    var file = evt.target.files[0];
    const scope = this
    reader.onload = function () {
      dataURL = reader.result;
      console.log(dataURL);
         scope.setState({ dataUrl: dataURL });
    }
    reader.readAsDataURL(file);
    // this.setState({ dataUrl: dataURL });
    // console.log(dataURL)
    // this.setState({ dataUrl: "Images/sardi.jpg" });
  }

  render() {
    return (
      <center>
        <div className="col-lg-6 col-md-6">
          <h2>importer le reçu : paiement d'avance</h2> <br />
          <div>
            <input
              type="file"
              name="recuAvance"
              onChange={this.handleChangeImage}
              encType="multipart/form-data"
            />
            <br />
          </div>
          <br />
          <div class="product__details__pic__item">
            <br />
            <img
              class="product__details__pic__item--large"
              src={this.state.dataUrl}
            />
          </div>
          <button className="site-btn">Valider</button>
          <br />
          <br />
        </div>
      </center>
    );
  }
}

export default ach_importRecuAvance;
