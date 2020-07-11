import React, { Component } from "react";

class DetailsCommande extends Component {
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
                <div className="product__details__text">
                  <h3>Détails commande Numéro: <span>45789654</span></h3> 

                  <div class="product__details__price">
                     {this.state.Commandes.statut}
                  </div>

                  <ul>
                    <li>
                      <b>Effectuée le </b>
                      <span>{this.state.Commandes.dateAjout}</span>
                    </li>
                    <li>
                      <b>Boucle</b> <span>{this.state.Commandes.Nboucle}</span>
                    </li>
                    <li>
                      <b>Race</b> <span>{this.state.Commandes.Race}</span>
                    </li>
                    <li>
                      <b>Poids</b> <span>{this.state.Commandes.poids} Kg</span>
                    </li>
                    <li>
                      <b>Age</b> <span>{this.state.Commandes.age} mois</span>
                    </li>

                    <li>
                      <b>Avance</b>
                      <span>{this.state.Commandes.avance} MAD</span>
                    </li>
                    <li>
                      <b>Eleveur</b>
                      {this.state.Commandes.eleveur}
                    </li>

                    <li className="bg-ligh text-danger h6 center">
                      <b>Prix total</b> 
                      {this.state.Commandes.prix} MAD
                    </li>
                  </ul>

                  <ul>
                    <li className="bg-ligh text-danger h6 center">
                      <b>A livrer</b> 
                      La veille de l'Aid 
                    </li>
                    <li className="bg-ligh text-danger h6 center">
                      <b>Au point de relais </b> 
                      <span>{this.state.Commandes.point_relais}</span>
                    </li>
                  </ul>
                  


                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default DetailsCommande;
