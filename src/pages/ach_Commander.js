import React, { Component } from "react";

class Commander extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Commandes: {
        Nboucle: "122554",
        prix: "3100",
        Race: "Sardi",
        poids: "58",
        age:"12",
        Eleveur: "Mohamed Erraji",
        image: "Images/Sardi3.jpg",
        eleveur: "Mohamed Talmssi",
        avance: "400",
        statut:"en attente de validation",
        dateAjout: "20/06/2020",
        point_relais: "Rue 1234 Hassan II Oujda",
      },

      redirect: false,
    };
  }
  render() {
    return (
      <div>
        <section class="product-details spad">
          <div class="container">
            <div className="row">
              <div class="col-lg-6 col-md-6">
                <div class="product__details__pic">
                  <div class="product__details__pic__item">
                    <img
                      class="product__details__pic__item--large"
                      src="Images/1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="product__details__pic__slider owl-carousel">
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
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div class="checkout__form">
                  <h3>Commander votre mouton</h3> <br></br>

                  <h4>Résumé de vote commande</h4>

                  <div class="col-lg-12 col-md-6">

                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="checkout__input">
                                       <p><b>Boucle</b></p> 
                                       <span>{this.state.Commandes.Nboucle}</span>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="checkout__input">
                                        <p><b>Race</b></p> 
                                        <span>{this.state.Commandes.Race}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="checkout__input">
                                       <p><b>Poids</b></p> 
                                       <span>{this.state.Commandes.poids} Kg</span>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="checkout__input">
                                        <p><b>Age</b></p> 
                                        <span>{this.state.Commandes.age} mois</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="checkout__input">
                                        <p><b>Avance</b></p> 
                                        <span>{this.state.Commandes.avance} MAD</span>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                      <div class="checkout__input">
                                          <p><b>Prix mouton</b></p> 
                                          <span>{this.state.Commandes.prix} MAD</span>
                                      </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="checkout__input">
                                        <p><b>Eleveur</b></p> 
                                        <span>{this.state.Commandes.eleveur}</span>
                                    </div>
                                </div>
                            </div>

                  </div>   

                  <h4>Détails livraison</h4>

                  <div class="col-lg-12 col-md-6">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="checkout__input">
                                        <b>Votre ville de livraison<span>*</span></b>
                                        <input type="text"/>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="checkout__input">
                                        <p><b>Le point de relais</b></p>
                                        <span>Rue 233 Hassan II Oujda</span>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-6">
                                  <div class="checkout__input">
                                      <p><b>Date de livraison</b></p>
                                      <span>La veille de l'Aid</span>
                                  </div>
                                </div>
                                <div class="col-lg-6">
                                  <div class="checkout__input bg-ligh text-danger h6 center">
                                        <p><b>Heure de livraison</b></p>
                                        <span>Un agent ANOC va vous appeler pour vous informer de l'heure exacte de livraison au point de relais spécifié en haut</span>
                                  </div>
                                </div>
                            </div>
                  </div>

                  <h4>Détails paiement</h4>

                  <div class="checkout__input bg-ligh text-danger h6 center">
                                        <p><b>Mode de paiement</b></p>
                                        <span><b>Virement bancaire</b></span>
                  </div>

                  <h6>Vous devez accepter <a href="./Regles"><b><u>les conditions générales de vente et achat</u></b></a> pour continuer.</h6>
                  <br></br>
                  <div class="checkout__input__checkbox">
                      <label for="regles">
                        J'accepte les conditions générales des règles de vente et achat
                        <input type="checkbox" id="regles"/>
                        <span class="checkmark"></span>
                      </label>
                  </div>
                 
                  <h4>Détails du prix</h4>
                  <div class="shoping__checkout">
                        <ul>
                            <li>Avance <span>{this.state.Commandes.avance} MAD</span></li>
                            <li>Prix Transport <span>60 MAD</span></li>
                            <li>Prix Total <span>{this.state.Commandes.prix}+60 MAD</span></li>
                            <li><a href="./Commandes" class="primary-btn">Annuler commande</a>   <br></br>   
                            <a href="./AlerteCommande" class="primary-btn">Valider</a>  </li>
                        </ul>
                  </div>
                </div>  
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Commander;
