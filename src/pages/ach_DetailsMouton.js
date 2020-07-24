import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  FacebookShareCount,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

class DetailsMouton extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Mouton: {},
      eleveur: {},
      Favoris: [],
      Panier: [],
      redirect: false,
      image: "",
      isDispo: false,
      isLoged: false,
      isFav: true,
      isInpanier: false,
    };
    this.onClickImageBoucle = this.onClickImageBoucle.bind(this);
    this.onClickImageProfile = this.onClickImageProfile.bind(this);
    this.onClickImageFace = this.onClickImageFace.bind(this);
    this.handleFavoris = this.handleFavoris.bind(this);
    this.handleDeleteFav = this.handleDeleteFav.bind(this);
    this.handlePanier = this.handlePanier.bind(this);
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
    // const idm = this.props.location.state.id;
    const idm = this.props.match.params.idMouton;

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
        // const token = localStorage.getItem("usertoken");
        // if (token) {
        //   this.setState({ isLoged: true });
        //   // this.props.history.push("/login");
        // }
        // console.log(res);
      });

    //-------------------favoris--------------------------//
    const token = localStorage.getItem("usertoken");
    if (!token) {
      // this.props.history.push("/login");
      this.setState({
        Favoris: [],
      },()=>this.setState({ isFav: false }));
    } else {
      axios
        .get("http://127.0.0.1:8000/api/consommateur/" + token + "/favoris", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            "Content-Type": "application/json",
          },
        })

        .then((res) => {
          var fav = res.data;
          var favoris = fav.filter((fav) => fav._id == idm);
          console.log(res.data);
          this.setState({
            Favoris: favoris,
          });
          if (this.state.Favoris.length == 0) {
            this.setState({ isFav: false });
          }
        });
    }
    //------------------Panier----------------------------//

    if (!token) {
      // this.props.history.push("/login");
      this.setState({
        Panier: [],
      });
    } else {
      axios
        .get("http://127.0.0.1:8000/api/consommateur/" + token + "/panier", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            "Content-Type": "application/json",
          },
        })

        .then((res) => {
          var fav = res.data;
          var favoris = fav.filter((fav) => fav._id == idm);
          console.log(res.data);
          this.setState(
            {
              Panier: favoris,
            },
            () => console.log("fav" + favoris.length)
          );
          if (this.state.Panier.length != 0) {
            this.setState({ isInpanier: true });
          }
        });
    }
  }

  handleFavoris(Mid) {
    console.log("idm" + Mid);
    const token = localStorage.getItem("usertoken");
    if (!token) {
      this.props.history.push("/login");
    } else {
      console.log("token " + token);
      axios
        .put(
          "http://127.0.0.1:8000/api/consommateur/" + token + "/favoris",
          { id_mouton: Mid },

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(this.setState({ isFav: true }));
    }
  }

  handlePanier(Mid) {
    console.log(Mid);
    const token = localStorage.getItem("usertoken");
    if (!token) {
      this.props.history.push("/login");
    } else {
      // console.log(token);
      axios
        .put(
          "http://127.0.0.1:8000/api/consommateur/" + token + "/panier",
          { id_mouton: Mid },

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(this.setState({ isInpanier: true }));
    }
  }

  handleDeleteFav(Mid) {
    // const idm = this.props.location.state.id;
    const idm = this.props.match.params.idMouton;

    console.log(Mid);
    const token = localStorage.getItem("usertoken");
    if (!token) {
      this.props.history.push("/login");
    } else {
      // console.log(token);
      axios
        .put(
          "http://127.0.0.1:8000/api/consommateur/" + token + "/favoris/" + idm,

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(this.setState({ isFav: false }));
    }
  }

  render() {
    const shareUrl = "http://localhost:3000/DetailsMouton";
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
                  <h3 ClassName="col-lg-12 col-md-12">
                    <span ClassName="col-lg-11 col-md-11">
                      {" "}
                      Détails annonce mouton{"              "}
                    </span>
                    {this.state.isFav ? (
                      <span className="text-left text-danger col-lg-2 col-md-2">
                        {" "}
                        <a
                          id={this.state.Mouton._id}
                          onClick={(e) =>
                            this.handleDeleteFav(e.currentTarget.id)
                          }
                        >
                          <i className="fa fa-heart"></i>
                        </a>{" "}
                      </span>
                    ) : null}

                    {!this.state.isFav ? (
                      <span className="text-left text-muted col-lg-2 col-md-2">
                        {" "}
                        <a
                          id={this.state.Mouton._id}
                          onClick={(e) =>
                            this.handleFavoris(e.currentTarget.id)
                          }
                        >
                          <i className="fa fa-heart"></i>
                        </a>{" "}
                      </span>
                    ) : null}
                  </h3>

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
                    {this.state.isDispo && this.state.isLoged ? (
                      <div>
                        {!this.state.isInpanier ? (
                          <button
                            id={this.state.Mouton._id}
                            class="primary-btn"
                            onClick={(e) =>
                              this.handlePanier(e.currentTarget.id)
                            }
                          >
                            <i className="fa fa-shopping-cart"></i> Ajouter au
                            panier
                          </button>
                        ) : null}

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
                      </div>
                    ) : null}

                    {this.state.isDispo && !this.state.isLoged ? (
                      <div>
                        {!this.state.isInpanier ? (
                          <button
                            id={this.state.Mouton._id}
                            class="primary-btn"
                            onClick={(e) =>
                              this.handlePanier(e.currentTarget.id)
                            }
                          >
                            <i className="fa fa-shopping-cart"></i> Ajouter au
                            panier
                          </button>
                        ) : null}

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
                      </div>
                    ) : null}
                    <br></br>
                    {/* Ajouter ici Social Sharing Button */}
                    <h6>Partager l'annonce avec vos proches sur :</h6>
                    <br></br>
                    <div className="">
                      <EmailShareButton
                        url={shareUrl + "/" + this.state.Mouton._id}
                        subject="Annonce intéressante à voir (Mouton à vendre)"
                        body="Voici une annonce d'un mouton à vendre qui peut vous interesser"
                      >
                        <EmailIcon size={36} round />
                      </EmailShareButton>{" "}
                      {/*<FacebookMessengerShareButton
                            url="https://github.com/nygardk/react-share"
                            appId="521270401588372"
                          >
                            <FacebookMessengerIcon size={36} round />
                          </FacebookMessengerShareButton> {" "}*/}
                      <FacebookShareButton
                        // url= "https://youtube.com"
                        url={shareUrl + "/" + this.state.Mouton._id}
                        quote="Annonce intéressante à voir (Mouton à vendre)"
                      >
                        <FacebookIcon size={36} round />
                      </FacebookShareButton>{" "}
                      <WhatsappShareButton
                        // url= "https://youtube.com"
                        url={shareUrl + "/" + this.state.Mouton._id}
                        title="Annonce intéressante à voir (Mouton à vendre)"
                        separator=":: "
                      >
                        <WhatsappIcon size={36} round />
                      </WhatsappShareButton>{" "}
                      <TwitterShareButton
                        url={shareUrl + "/" + this.state.Mouton._id}
                        title="Annonce intéressante à voir (Mouton à vendre)"
                      >
                        <TwitterIcon size={36} round />
                      </TwitterShareButton>
                    </div>
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
