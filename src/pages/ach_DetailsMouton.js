import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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
      Espece: {},
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
    this.setState({ image: this.state.Espece.image_boucle });
  }
  onClickImageProfile() {
    this.setState({ image: this.state.Espce.image_profile });
  }
  onClickImageFace() {
    this.setState({ image: this.state.Espece.image_face });
  }

  componentDidMount() {
    // const idm = this.props.location.state.id;
    const idm = this.props.match.params.idMouton;
     const token = localStorage.getItem("usertoken");
     const myToken = `Bearer ` + localStorage.getItem("myToken");
        

    axios
      .get("http://127.0.0.1:8000/api/Espece/" + idm, {
        headers: {
          // "x-access-token": token, // the token is a variable which holds the token
          "Authorization": myToken,
        },
      })
      .then((res) => {
        this.setState({
          Espece: res.data.objet,
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
   

    if (!token) {
      // this.props.history.push("/login");
      this.setState(
        {
          Favoris: [],
        },
        () => this.setState({ isFav: false })
      );
    } else {
      axios
        .get("http://127.0.0.1:8000/api/consommateur/" + token + "/favoris", {
          headers: {
            "Authorization": myToken,
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
            "Authorization": myToken,
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
    const myToken = `Bearer ` + localStorage.getItem("myToken");
    if (!token) {
      this.props.history.push("/login");
    } else {
      console.log("token " + token);
      axios
        .put(
          "http://127.0.0.1:8000/api/consommateur/" + token + "/favoris",
          { id_espece: Mid },

          {
            headers: {
              // "Access-Control-Allow-Origin": "*",
             // "Content-Type": "application/json",
              // Accept: "application/json",
              "Authorization": myToken,
            },
          }
        )
        .then(this.setState({ isFav: true }));
      Swal.fire({
        title: "Favoris",
        text: "Ajouté avec succès dans vos Favoris",
        /*   icon: "success", */
        width: 400,
        heightAuto: false,
        confirmButtonColor: "#7fad39",

        confirmButtonText: "Ok!",
      });
    }
  }

  handlePanier(Mid) {
    console.log(Mid);
    const token = localStorage.getItem("usertoken");
    const myToken = `Bearer ` + localStorage.getItem("myToken");
    if (!token) {
      this.props.history.push("/login");
    } else {
      // console.log(token);
      axios
        .put(
          "http://127.0.0.1:8000/api/consommateur/" + token + "/panier",
          { id_espece: Mid },

          {
            headers: {
              // "Access-Control-Allow-Origin": "*",
             // "Content-Type": "application/json",
              // Accept: "application/json",
              "Authorization": myToken,
            },
          }
        )
        .then(this.setState({ isInpanier: true }));
      Swal.fire({
        title: "Ajouté dans Pannier",
        icon: "success",
        width: 400,
        heightAuto: false,
        timer: 1500,
        showConfirmButton: false,
        /* confirmButtonColor: "#7fad39",

        confirmButtonText: "Ok!",*/
      });
    }
  }

  handleDeleteFav(Mid) {
    // const idm = this.props.location.state.id;
    const idm = this.props.match.params.idMouton;

    console.log(Mid);
    const token = localStorage.getItem("usertoken");
    const myToken = `Bearer ` + localStorage.getItem("myToken");
    if (!token) {
      this.props.history.push("/login");
    } else {
      // console.log(token);
      axios
        .put(
          "http://127.0.0.1:8000/api/consommateur/" + token + "/favoris/" + idm,

          {  },
          {
            headers: {
              //"Content-Type": "application/json",

              Authorization: myToken,
            },
          }
        )
        .then(this.setState({ isFav: false }));
    }
  }

  render() {
    const shareUrl = "http://localhost:3000/DetailsEspece";
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
                      id="roundB"
                    />
                  </div>

                  <div className="row">
                    <div className="container">
                      <div id="lesImagesM" className="col-lg-12 col-md-12">
                        <img
                          className="col-lg-4 col-md-4"
                          // data-imgbigurl="Images/1.jpg"
                          src={this.state.Espece.image_boucle}
                          alt=""
                          onClick={this.onClickImageBoucle}
                        />
                        <img
                          className="col-lg-4 col-md-4"
                          // data-imgbigurl="Images/1.jpg"
                          src={this.state.Espece.image_face}
                          alt=""
                          onClick={this.onClickImageFace}
                        />
                        <img
                          className="col-lg-4 col-md-4"
                          // data-imgbigurl="Images/1.jpg"
                          src={this.state.Espece.image_profile}
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
                      Détails annonce espèce{"              "}
                    </span>
                  </h3>
                  <h3 id="centrer2">
                    <h5 id="centrerH">
                      Ajouter comme Favori
                      {this.state.isFav ? (
                        <span className="text-left text-danger col-lg-2 col-md-2">
                          {" "}
                          <a
                            id={this.state.Espece._id}
                            onClick={(e) => {
                              this.handleDeleteFav(e.currentTarget.id);
                              console.log(e.currentTarget.id);
                            }}
                          >
                            <i className="fa fa-heart"></i>
                          </a>{" "}
                        </span>
                      ) : null}
                      {!this.state.isFav ? (
                        <span className="text-left text-muted col-lg-2 col-md-2">
                          {" "}
                          <a
                            id={this.state.Espece._id}
                            onClick={(e) =>
                              this.handleFavoris(e.currentTarget.id)
                            }
                          >
                            <i className="fa fa-heart"></i>
                          </a>{" "}
                        </span>
                      ) : null}
                    </h5>
                  </h3>
                  <div id="centrer" className="container">
                    <ul>
                      <li>
                        <b>Date d'ajout</b>
                        <span>{this.state.Espece.created_at}</span>
                      </li>
                      <li>
                        <b>Boucle</b> <span>{this.state.Espece.boucle}</span>
                      </li>
                      <li>
                        <b>Race</b> <span>{this.state.Espece.race}</span>
                      </li>
                      <li>
                        <b>Poids</b> <span>{this.state.Espece.poids} Kg</span>
                      </li>
                      <li>
                        <b>Age</b> <span>{this.state.Espece.age} mois</span>
                      </li>

                      <li>
                        <b>Avance</b>
                        <span>{this.state.Espece.avance} MAD</span>
                      </li>
                      <li>
                        <b>Eleveur</b>
                        {this.state.eleveur.nom +
                          "     " +
                          this.state.eleveur.prenom}
                      </li>

                      <li className="bg-ligh text-danger h6 center">
                        <b>Prix total</b>
                        {this.state.Espece.prix} MAD
                      </li>
                    </ul>
                  </div>
                  <br></br>
                  <br></br>
                </div>
              </div>

              <div id="centrer2">
                <div>
                  <h4>Description</h4>
                  <div
                    id="gris"
                    className="container"
                    
                  >
                    {this.state.Espece.description ? (
                      <p>{this.state.Espece.description}</p>
                    ) : (
                      <p>Pas de description supplementaire pour cet animal!</p>
                    )}
                  </div>
                </div>
                <br></br>
                <br></br>
                <div>
                  <div>
                    {this.state.isDispo && this.state.isLoged ? (
                      <div>
                        {!this.state.isInpanier ? (
                          <button
                            id={this.state.Espece._id}
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
                              id: this.state.Espece._id,
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
                            id={this.state.Espece._id}
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
                              id: this.state.Espece._id,
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
                    <div id="centrer2">
                      {/* Ajouter ici Social Sharing Button */}
                      <h4 id="centrer2">
                        Partager l'annonce avec vos proches sur :
                      </h4>
                      <br></br>
                      <div>
                        <EmailShareButton
                          url={shareUrl + "/" + this.state.Espece._id}
                          subject="Annonce intéressante à voir (Animal à vendre)"
                          body="Voici une annonce d'un mouton/vache/chèvre à vendre qui peut vous interesser"
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
                          url={shareUrl + "/" + this.state.Espece._id}
                          quote="Annonce intéressante à voir (Mouton, Vache ou chèvre à vendre)"
                        >
                          <FacebookIcon size={36} round />
                        </FacebookShareButton>{" "}
                        <WhatsappShareButton
                          // url= "https://youtube.com"
                          url={shareUrl + "/" + this.state.Espece._id}
                          title="Annonce intéressante à voir (Mouton, Vache ou chèvre à vendre)"
                          separator=":: "
                        >
                          <WhatsappIcon size={36} round />
                        </WhatsappShareButton>{" "}
                        <TwitterShareButton
                          url={shareUrl + "/" + this.state.Espece._id}
                          title="Annonce intéressante à voir (Mouton, Vache ou chèvre à vendre)"
                        >
                          <TwitterIcon size={36} round />
                        </TwitterShareButton>
                      </div>
                    </div>
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

export default DetailsMouton;
