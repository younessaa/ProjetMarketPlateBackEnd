import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import Commander3 from "./step3";

import { Link } from "react-router-dom";
class Commander2 extends Component {
  constructor(props) {
    super(props);
    // let redirect = false;

    // this.onChange = this.onChange.bind(this);
  
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




  render() {
    const { selectedOptionVille } = this.props.data;
    const { optionsVille } = this.props.data;
    return (
      <div>
        <div class="container">
          <br></br>
          <div className="row">
            <div class="col-lg-6 col-md-6">
              <div class="checkout__form">
                <h4>Détails livraison</h4>
                <div class="checkout__input">
                  <b>
                    Votre ville de livraison<span>*</span>
                  </b>
                  <div>
                    <Select
                      value={selectedOptionVille}
                      onChange={this.props.handleChangeVille}
                      options={this.props.data.optionsVille}
                      placeholder="Ville"

                      // className="Select"
                    />
                    <br></br>
                  </div>

                  <div class="checkout__input">
                    <p>
                      <b>Le point de relais</b>
                    </p>
                    <span>Rue 233 Hassan II Oujda</span>
                  </div>

                  <div>
                    <div class="checkout__input">
                      <p>
                        <b>Date de livraison</b>
                      </p>
                      <span>La veille de l'Aid</span>
                    </div>

                    <div>
                      <div class="checkout__input bg-ligh text-danger h6 center">
                        <p>
                          <b>Heure de livraison</b>
                        </p>
                        <span>
                          Un agent ANOC va vous appeler pour vous informer de
                          l'heure exacte de livraison au point de relais
                          spécifié en haut
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div class="checkout__form">
                <h4>Détails paiement</h4>
                <div class="checkout__input bg-ligh text-danger h6 center">
                  <p>
                    <b>Mode de paiement</b>
                  </p>
                  <span>
                    <b>Virement bancaire</b>
                  </span>
                </div>
                <h6>
                  Vous devez accepter{" "}
                  <a href="./Regles">
                    <b>
                      <u>les conditions générales de vente et achat</u>
                    </b>
                  </a>{" "}
                  pour continuer.
                </h6>
                <br></br>
                <div class="checkout__input__checkbox">
                  <label for="regles">
                    J'accepte les conditions générales des règles de vente et
                    achat
                    <input
                      type="checkbox"
                      id="regles"
                      required
                      onChange={this.props.onChangecheck}
                    />
                    <span id="monCheck" class="checkmark"></span>
                  </label>
                </div>
                <div id="coul" class="checkout__input__checkbox">
                  <label for="regles">
                    Veuillez saisir votre ville et accepter les conditions
                    générales pour valider votre commande.
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Commander2;
