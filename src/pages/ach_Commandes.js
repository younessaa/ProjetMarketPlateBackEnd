import React, { Component } from "react";
import axios from "axios";
class Commandes extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Annonces: [
        {
          Nboucle: "122554",
          prix: "3100",
          Race: "Sardi",
          Sexe: "Male",
          poids: "58",
          ville_livraison:"Oujda",
          point_relais: "Rue 245 Hassan II Oujda",
          date_cration:"12/07/2020",
          Eleveur: "Mohamed Erraji",
          image: "Images/Sardi3.jpg",
          
        },
        {
          Nboucle: "122554",
          prix: "3000",
          Race: "Sardi",
          Sexe: "Male",
          poids: "60",
          ville_livraison:"Oujda",
          point_relais: "Rue 245 Hassan II Oujda",
          date_cration:"12/07/2020",
          Eleveur: "Mohamed Erraji",
          image: "Images/Sardi1.jpg",
        },
        {
          Nboucle: "122554",
          prix: "2500",
          Race: "Timahdit",
          Sexe: "Male",
          poids: "50",
          ville_livraison:"Oujda",
          point_relais: "Rue 245 Hassan II Oujda",
          date_cration:"12/07/2020",
          Eleveur: "Mohamed Erraji",
          image: "Images/Sardi2.jpg",
        },
        {
          Nboucle: "122554",
          prix: "3500",
          Race: "Timahdit",
          Sexe: "Male",
          poids: "65",
          ville_livraison:"Oujda",
          point_relais: "Rue 245 Hassan II Oujda",
          date_cration:"12/07/2020",
          Eleveur: "Mohamed Erraji",
          image: "Images/Sardi2.jpg",
        },
      ],
      redirect: false,
    };
  }

  render() {
    return (
      <div>
        {/* <!-- Page Preloder --> */}
        <div id="preloder">
          <div className="loader"></div>
        </div>

       <section className="product spad">
         <div className="container">
            <h4 class="latest-product__item">Mes commandes</h4>
            <div className="row">

                  <div className="col-lg-12 col-md-7">
                    
                    { /*<!-- Sheeps Grid Section Begin --> */}

                    <div class="row">
                      {this.state.Annonces.map((Annonces) => (
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg={Annonces.image} >
                                            <ul class="product__item__pic__hover">
                                                <li><a href="./DetailsCommande"><i class="fa fa-eye"></i></a></li>
                                            </ul>
                                        </div>
                                        <div class="product__item__text">

                                          <div class="row">
                                              <div class="col-lg-6">
                                                  <div class="checkout__input">
                                                      <b>Boucle</b><br></br>
                                                      {"         " + Annonces.Nboucle}
                                                  </div>
                                              </div>
                                              <div class="col-lg-6">
                                                  <div class="checkout__input">
                                                      <b>Race</b><br></br>
                                                      {"         " + Annonces.Race}
                                                  </div>
                                              </div>
                                          </div>

                                          <div class="row">
                                              <div class="col-lg-6">
                                                  <div class="checkout__input">
                                                      <b>Sexe</b><br></br>
                                                      {"         " + Annonces.Sexe}
                                                  </div>
                                              </div>
                                              <div class="col-lg-6">
                                                  <div class="checkout__input">
                                                      <b>Poids</b><br></br>
                                                      {"         " + Annonces.poids+ " Kg"}
                                                  </div>
                                              </div>
                                          </div>

                                          <div class="row">
                                              <div class="col-lg-6">
                                                  <div class="checkout__input">
                                                      <b>Prix</b><br></br>
                                                      {"         " + Annonces.prix + " MAD"}
                                                  </div>
                                              </div>
                                              <div class="col-lg-6">
                                                  <div class="checkout__input">
                                                      <b>Ville livraison</b><br></br>
                                                      {"         " + Annonces.ville_livraison}
                                                  </div>
                                              </div>
                                          </div>
                                          <div class="row">
                                              <div class="col-lg-6">
                                                  <div class="checkout__input">
                                                      <b>Point de relais</b><br></br>
                                                      {"         " + Annonces.point_relais}
                                                  </div>
                                              </div>
                                              <div class="col-lg-6">
                                                  <div class="checkout__input">
                                                      <b>Date création</b><br></br>
                                                      {"         " + Annonces.date_cration}
                                                  </div>
                                              </div>
                                          </div>

                                        </div>
                                        <div class="shoping__checkout">
                                          <a href="" class="primary-btn">Importer reçu</a>    <br></br> 
                                          <a href="./Commandes" class="primary-btn">Annuler commande</a>  
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/* <!-- Sheeps Grid Section End --> */}

                </div>
              </div>
            </div>

        </section>
    </div>
    
    );
  }
}

export default Commandes;
