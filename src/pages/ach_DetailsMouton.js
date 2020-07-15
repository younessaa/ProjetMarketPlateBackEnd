import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class DetailsMouton extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Mouton: {},
      eleveur: {},
      redirect: false,
      image: "",
      isDispo: false,
      isLoged:false,
    };
    this.onClickImageBoucle = this.onClickImageBoucle.bind(this);
    this.onClickImageProfile = this.onClickImageProfile.bind(this);
    this.onClickImageFace = this.onClickImageFace.bind(this);
  }

  onClickImageBoucle() {
    this.setState({ image: this.state.Mouton.image_boucle });
  }
  onClickImageProfile() {
    this.setState({ image: this.state.Mouton.image_profile });
  }
  onClickImageFace() {
    this.setState({ image: this.state.Mouton.image_face });
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
          eleveur: res.data.Eleveur[0],
          image: res.data.objet.image_profile,
        });
        if (res.data.objet.statut === "disponible") {
          this.setState({ isDispo: true });
        }
        const token = localStorage.getItem("usertoken");
        if (token) {
          this.setState({isLoged:true})
          // this.props.history.push("/login");
        } 
        console.log(res);
      });

    console.log(this.state.Mouton);
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
                      src={this.state.image}
                      alt=""
                    />
                  </div>

                  <div className="row">
                    <div className="container">
                      <div className="col-lg-12 col-md-12">
                        <img
                          className="col-lg-4 col-md-4"
                          // data-imgbigurl="Images/1.jpg"
                          src={this.state.Mouton.image_boucle}
                          alt=""
                          onClick={this.onClickImageBoucle}
                        />
                        <img
                          className="col-lg-4 col-md-4"
                          // data-imgbigurl="Images/1.jpg"
                          src={this.state.Mouton.image_face}
                          alt=""
                          onClick={this.onClickImageFace}
                        />
                        <img
                          className="col-lg-4 col-md-4"
                          // data-imgbigurl="Images/1.jpg"
                          src={this.state.Mouton.image_profile}
                          alt=""
                          onClick={this.onClickImageProfile}
                        />
                      </div>
                    </div>
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
                      {this.state.eleveur.nom +
                        "     " +
                        this.state.eleveur.prenom}
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
                    <li>{this.state.Mouton.description}</li>
                  </ul>

                  <ul>
                  {(this.state.isDispo && this.state.isLoged) ? (   <div>
                    <a href="./Panier" class="primary-btn">
                      Ajouter au panier
                    </a>
                    <Link
                      to={{
                        pathname: "/Commander",
                        state: {
                          id: this.state.Mouton._id,
                        },
                      }}
                    >
                      {" "}
                      <a href="#" class="primary-btn">
                        Commander
                      </a>{" "}
                    </Link>
                    </div>):null} 
                    
                    {(this.state.isDispo && !this.state.isLoged) ? (   <div>
                    <a href="./Panier" class="primary-btn">
                      Ajouter au panier
                    </a>
                    <Link
                      to={{
                        pathname: "/login",
                        state: {
                          id: this.state.Mouton._id,
                        },
                      }}
                    >
                      {" "}
                      <a href="#" class="primary-btn">
                        Commander
                      </a>{" "}
                    </Link>
                    </div>):null}

                    
                    
                    
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
