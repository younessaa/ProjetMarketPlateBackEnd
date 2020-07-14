import React, { Component } from "react";

class DetailsCommande extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Commandes: {},

      redirect: false,
    };
  }

  componentDidMount() {
    const cmd = this.props.location.state.id;

    this.setState({ commandes: cmd });
    
  }

  render() {
    const commandes= this.props.location.state.id
  //  { console.log(this.state.commandes.mouton)}
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
                  <h3>
                    Détails commande Numéro: <span>{commandes._id}</span>
                  </h3>

                  <div class="product__details__price">
                    {commandes.statut}
                  </div>

                  <ul>
                    <li>
                      <b>Effectuée le </b>
                      <span>{commandes.date_creation.toLocaleString()}</span>
                    </li>
                    <li>
                      <b>Boucle</b> <span>{commandes.mouton.boucle}</span>
                    </li>
                    <li>
                      <b>Race</b> <span>{commandes.mouton.race}</span>
                    </li>
                    <li>
                      <b>Poids</b> <span>{commandes.mouton.poids} Kg</span>
                    </li>
                    <li>
                      <b>Age</b> <span>{commandes.mouton.age} mois</span>
                    </li>

                    <li>
                      <b>Avance</b>
                      <span>{commandes.mouton.avance} MAD</span>
                    </li>
                    <li>
                      <b>Eleveur</b>
                      {commandes.eleveur.nom + " " +commandes.eleveur.prenom }
                    </li>

                    <li className="bg-ligh text-danger h6 center">
                      <b>Prix total</b>
                      {commandes.mouton.prix} MAD
                    </li>
                  </ul>

                  <ul>
                    <li className="bg-ligh text-danger h6 center">
                      <b>A livrer</b>
                      La veille de l'Aid
                    </li>
                    <li className="bg-ligh text-danger h6 center">
                      <b>Au point de relais </b>
                      <span>{commandes.point_relais}</span>
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
