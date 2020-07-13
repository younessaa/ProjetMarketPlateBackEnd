import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class DetailsMouton extends Component {
    constructor() {
        super();
        // let redirect = false;
        this.state = {
          Mouton: {
            // Nboucle: "122554",
            // prix: "3100",
            // Race: "Sardi",
            // poids: "58",
            // age:"12",
            // Eleveur: "Mohamed Erraji",
            // image: "Images/Sardi3.jpg",
            // eleveur: "Mohamed Talmssi",
            // avance: "400",
            // dateAjout: "20/06/2020",
            // description:"La race Sardi est une bonne race locale ....etc"
          },
          eleveur:{},
          redirect: false,
        };
      }
      componentDidMount() {
        const idm = this.props.location.state.id;
        axios
          .get("http://127.0.0.1:8000/api/mouton/" + idm, {
            headers: {
              // "x-access-token": token, // the token is a variable which holds the token
            },
          })
          .then((res) => {
            this.setState({
              Mouton: res.data.objet,
               eleveur:res.data.Eleveur[0]
            });
            console.log(res)
          });

          console.log(this.state.Mouton)
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
                      <h3>Détails annonce mouton</h3> 
                      <ul>
                        <li>
                          <b>Date d'ajout</b>
                          <span>{this.state.Mouton.created_at}</span>
                        </li>
                        <li>
                          <b>Boucle</b> <span>{this.state.Mouton.boucle}</span>
                        </li>
                        <li>
                          <b>Race</b> <span>{this.state.Mouton.race}</span>
                        </li>
                        <li>
                          <b>Poids</b> <span>{this.state.Mouton.poids} Kg</span>
                        </li>
                        <li>
                          <b>Age</b> <span>{this.state.Mouton.age} mois</span>
                        </li>
    
                        <li>
                          <b>Avance</b>
                          <span>{this.state.Mouton.avance} MAD</span>
                        </li>
                        <li>
                          <b>Eleveur</b>
                          {this.state.eleveur.nom +"     "+ this.state.eleveur.prenom}
                        </li>
    
                        <li className="bg-ligh text-danger h6 center">
                          <b>Prix total</b> 
                          {this.state.Mouton.prix} MAD
                        </li>
                      </ul>   
                      <ul>
                        <li>
                          <b>Description</b>
                        </li>
                        <li>
                          {this.state.Mouton.description}
                        </li>
                      </ul>    

                      <ul>
                         <a href="./Panier" class="primary-btn">Ajouter au panier</a>      
                         <a href="./Commander" class="primary-btn">Commander</a>  
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

export default DetailsMouton;
