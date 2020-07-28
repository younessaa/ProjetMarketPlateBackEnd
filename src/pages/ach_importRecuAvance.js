import React, { Component } from "react";
import axios from "axios";
class ach_importRecuAvance extends Component {
  constructor(props) {
    super(props);
    // let redirect = false;
    this.state = {
      dataUrl: "",

      redirect: false,
    };
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handlePut = this.handlePut.bind(this);
  }

  handleChangeImage(evt) {
    var dataURL = "";
    var reader = new FileReader();
    var file = evt.target.files[0];
    const scope = this;
    reader.onload = function () {
      dataURL = reader.result;
      console.log(dataURL);
      scope.setState({ dataUrl: dataURL });
    };
    reader.readAsDataURL(file);
    console.log(this.props.location.state.id)
  }

  handlePut = (e) => {
    e.preventDefault();

    const id = this.props.location.state.id;
    // const idm = this.props.location.state.idm;
    axios
      .put(
        "http://127.0.0.1:8000/api/commande/" + id.idc,
        {
          statut: "en attente de validation avance",
          reçu_avance: this.state.dataUrl,
          id_consommateur:id.idc
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        axios
          .put(
            "http://127.0.0.1:8000/api/mouton/" + id.idm,
            {
              statut: "réservé",
              //   msg_refus_avance: this.state.dataUrl,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            alert("Vous allez recevoir un email de validation de votre reçu sur votre email : "+ id.email)
            this.props.history.push("/commandesParStatut");
          });
      });
  };

  render() {
    return (
      <center>
        <div className="col-lg-6 col-md-6">
          <form onSubmit={this.handlePut}>
            <h2>importer le reçu : paiement d'avance</h2> <br />
            <div>
              <input
                type="file"
                name="recuAvance"
                onChange={this.handleChangeImage}
                encType="multipart/form-data"
                required
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
            <button className="site-btn" type="submit">
              Valider
            </button>
            <br />
            <br />
          </form>
        </div>
      </center>
    );
  }
}

export default ach_importRecuAvance;
