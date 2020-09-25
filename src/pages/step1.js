import React, { Component } from "react";
import axios from "axios";

class Commander1 extends Component {
  constructor(props) {
    super(props);
  

    this.onClickImageBoucle = this.onClickImageBoucle.bind(this);
    this.onClickImageProfile = this.onClickImageProfile.bind(this);
    this.onClickImageFace = this.onClickImageFace.bind(this);
  }

  // onChange(e) {

  //   const token = localStorage.getItem("usertoken");
  //   // if
  //   // console.log("tuseroken"+ token)
  //   let cmd = {
  //     // localisation: e.target.value,
  //     point_relais: e.target.value,
  //     id_mouton: this.props.location.state.id,
  //     id_eleveur: this.state.eleveur._id,
  //     id_consommateur: token,
  //     statut: "en attente de paiement avance",
  //     reçu_avance: "",
  //     feedback_avance: "",
  //     msg_refus_avance: null,
  //     reçu_montant_restant: null,
  //     feedback_reçu_montant_restant: null,
  //     msg_refus_reste: null,
  //     date_creation: new Date(),
  //     // .toLocaleString()
  //   };
  //   this.setState({
  //     Commande: cmd,
  //     Empty:false
  //   });
  // }

  

  onClickImageBoucle() {
    this.setState({ image: this.props.data.Espece.image_boucle });
  }
  onClickImageProfile() {
    this.setState({ image: this.props.data.Espece.image_profile });
  }
  onClickImageFace() {
    this.setState({ image: this.props.data.Espece.image_face });
  }

  render() {
    // const { iamge, image_boucle, image_face, image_profile } = this.props;
    return (
      <div>
        <div id="coul" class="container">
          <br></br>
          <div className="row">
            <div class="col-lg-6 col-md-6">
              <div class="product__details__pic">
                <div class="product__details__pic__item">
                  <img
                    class="product__details__pic__item--large"
                    src={this.props.data.image}
                    alt=""
                  />
                </div>
                {/* <div className="product__details__pic__slider owl-carousel">
                    <img
                      data-imgbigurl="Images/1.jpg"
                      src="Images/1.jpg"
                      alt=""
                    />
                    <img
                      data-imgbigurl="Images/1.jpg"
                      src="Images/1.jpg"
                      alt=""
                    />
                  </div> */}

                <div className="row">
                  <div className="container">
                    <div className="col-lg-12 col-md-12">
                      <img
                        className="col-lg-4 col-md-4"
                        // data-imgbigurl="Images/1.jpg"
                        src={this.props.data.Espece.image_boucle}
                        alt=""
                        onClick={this.onClickImageBoucle}
                      />
                      <img
                        className="col-lg-4 col-md-4"
                        // data-imgbigurl="Images/1.jpg"
                        src={this.props.data.Espece.image_face}
                        alt=""
                        onClick={this.onClickImageFace}
                      />
                      <img
                        className="col-lg-4 col-md-4"
                        // data-imgbigurl="Images/1.jpg"
                        src={this.props.data.Espece.image_profile}
                        alt=""
                        onClick={this.onClickImageProfile}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div class="checkout__form">
                <form action="#" onSubmit="" name="commander">
                  <h4>Résumé de vote commande</h4>
                  <div id="centrer" class="col-lg-12 col-md-6">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="checkout__input">
                          <p>
                            <b>Boucle</b>
                          </p>
                          <span>{this.props.data.Espece.boucle}</span>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="checkout__input">
                          <p>
                            <b>Race</b>
                          </p>
                          <span>{this.props.data.Espece.race}</span>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="checkout__input">
                          <p>
                            <b>Poids</b>
                          </p>
                          <span>{this.props.data.Espece.poids} Kg</span>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="checkout__input">
                          <p>
                            <b>Age</b>
                          </p>
                          <span>{this.props.data.Espece.age} mois</span>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="checkout__input">
                          <p>
                            <b>Avance</b>
                          </p>
                          <span>{this.props.data.Espece.avance} MAD</span>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="checkout__input">
                          <p>
                            <b>Prix bête</b>
                          </p>
                          <span>{this.props.data.Espece.prix} MAD</span>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="checkout__input">
                          <p>
                            <b>Eleveur</b>
                          </p>
                          <span>
                            {this.props.data.eleveur.nom +
                              "   " +
                              this.props.data.eleveur.prenom}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <br></br>
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default Commander1;
