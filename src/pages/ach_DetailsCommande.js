import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
class DetailsCommande extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Commandes: {},
      showAvance: true,
      showReste: true,
      showMsgreste: false,
      showMsgavance: false,
      showBtnAnnuler: true,
      showMsgR: false,
      redirect: false,
      image: "",
      date: Date,
    };
    this.handelDelete = this.handelDelete.bind(this);
    this.onClickImageBoucle = this.onClickImageBoucle.bind(this);
    this.onClickImageProfile = this.onClickImageProfile.bind(this);
    this.onClickImageFace = this.onClickImageFace.bind(this);
  }

  onClickImageBoucle() {
    const cmd = this.props.location.state.id;
    this.setState({ image: cmd.mouton.image_boucle });
  }
  onClickImageProfile() {
    const cmd = this.props.location.state.id;
    this.setState({ image: cmd.mouton.image_profile });
  }
  onClickImageFace() {
    const cmd = this.props.location.state.id;
    this.setState({ image: cmd.mouton.image_face });
  }

  componentDidMount() {
    const cmd = this.props.location.state.id;
    // console.log(cmd.date_creation)
    var currentdate = new Date(cmd.date_creation);
    //  currentdate = Date.parse(cmd.date_creation);
    var day = currentdate.getDate();
    var month = currentdate.getMonth() + 1;
    var year = currentdate.getFullYear();
    var hours = currentdate.getHours();

    if (hours > 8 && hours < 16) {
      var day = day;
      var month = month;
      var year = year;
      var hours = 16;
    }
    if ((hours > 16 && hours < 24) || hours == "00") {
      var day = day + 1;
      var month = month;
      var year = year;
      var hours = 12;
    }
    if (hours > 1 && hours < 8) {
      var day = day;
      var month = month;
      var year = year;
      var hours = 12;
    }

    var datetime = day + "/" + month + "/" + year + " à " + hours + ":00:00";
    // this.setState({ date: datetime });

    // console.log(cmd)
    this.setState({
      commandes: cmd,
      image: cmd.mouton.image_face,
      date: datetime,
    });

    // const cmd = this.state.Commandes;
    // console.log(cmd);
    if (cmd.reçu_avance == null) {
      this.setState({ showAvance: false, showMsgavance: true });
    }
    if (cmd.reçu_montant_restant == null && cmd.reçu_avance !== null ) {
      // console.log("reste  null");
      this.setState({ showReste: false, showMsgreste: true }, () =>
        console.log(this.state.showReste)
      );
    }
    if (cmd.reçu_montant_restant !== null && cmd.reçu_avance !== null) {
      this.setState({ showBtnAnnuler: false });
    }
    if (cmd.reçu_montant_restant === null && cmd.reçu_avance === null) {
      this.setState({ showAvance: false, showMsgavance: true, showMsgR: true });
    }
// if(cmd.statut=="en attente de paiement du reste"){

//   this.setState({ showAvance: true, showMsgavance: false, showMsgR: true });
// }

 

  }

  handelDelete() {
    // const token = localStorage.getItem("usertoken");
    // if (!token) {
    //   this.props.history.push("/login");
    // } else {
    if (window.confirm(`  ... !`)) {
      axios
        .delete(
          "http://127.0.0.1:8000/api/commande/" + this.state.commandes._id,
          {
            headers: {
              // "x-access-token": token, // the token is a variable which holds the token
            },
          }
        )
        .then((res) => {
          axios
            .put(
              "http://127.0.0.1:8000/api/mouton/" +
                this.state.commandes.id_mouton,
              {
                statut: "disponible",
                //   msg_refus_avance: this.state.dataUrl,
              },
              {
                headers: { "Content-Type": "application/json" },
              }
            )
            .then((res) => {
              this.props.history.push("/Commandes");
            });
        });
    } else {
    }
  }

  render() {
    const commandes = this.props.location.state.id;
    console.log(commandes);
    // let commandes = "";
    // if (this.props.location.state.id !== undefined) {
    //   commandes = this.props.location.state.id;
    //   localStorage.setItem("commandes", commandes);
    // } else {
    //   commandes = localStorage.getItem("commandes");
    // }
    // // localStorage.setItem("commandes", res.data.success.token.token.user_id);
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
                          src={commandes.mouton.image_boucle}
                          alt=""
                          onClick={this.onClickImageBoucle}
                        />
                        <img
                          className="col-lg-4 col-md-4"
                          // data-imgbigurl="Images/1.jpg"
                          src={commandes.mouton.image_face}
                          alt=""
                          onClick={this.onClickImageFace}
                        />
                        <img
                          className="col-lg-4 col-md-4"
                          // data-imgbigurl="Images/1.jpg"
                          src={commandes.mouton.image_profile}
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
                  <h3>Détails commande</h3>
                  <h4>
                    Réf : <span>{commandes._id} </span>
                  </h4>
                  <div class="product__details__price">{commandes.statut}</div>
                  {this.state.showBtnAnnuler ? (
                    <div>
                      {/* <a  href="#" class="primary-btn" onClick={this.handelDelete}>
                        Annuler commande
                      </a> */}
                      <button class="primary-btn" onClick={this.handelDelete}>
                        {" "}
                        Annuler commande{" "}
                      </button>
                    </div>
                  ) : null}
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
                      {commandes.eleveur.nom + " " + commandes.eleveur.prenom}
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

            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="product__details__text">
                  <br></br>
                  <br></br>
                  <h4>Reçu paiement avance</h4>
                  <ul>
                    {/* <div class="product__details__pic">
                      <div class="product__details__pic__item">
                        <img
                          class="product__details__pic__item--large"
                          src={commandes.reçu_avance}
                          alt=""
                        />
                      </div>
                    </div> */}

                    {this.state.showAvance ? (
                      <div>
                        <div class="product__details__pic">
                          <div class="product__details__pic__item">
                            <img
                              class="product__details__pic__item--large"
                              src={commandes.reçu_avance}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {this.state.showMsgavance ? (
                      <div>
                        <div class="product__details__pic">
                          <div class="product__details__pic__item">
                            <br />{" "}
                            <h4>
                              {" "}
                              Vous n'avez pas encore importé votre reçu ! <br />
                             <b className="text-danger"> Attention: Il vous reste jusqu'au{" "}
                              <span>
                                {this.state.date}
                              </span>{" "}
                              pour payer et importer votre reçu de paiement.</b>
                            </h4>{" "}
                            <br />
                            <Link
                              to={{
                                pathname: "/importRecuAvance",
                                state: {
                                  id: {
                                    idc: commandes._id,
                                    idm: commandes.id_mouton,
                                  },
                                },
                              }}
                            >
                              {" "}
                              <a href="" class="primary-btn">
                                Importer votre reçu
                              </a>{" "}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </ul>
                </div>
              </div>

              <div className="col-lg-6 col-md-6">
                <div className="product__details__text">
                  <br></br>
                  <br></br>
                  <h4>Reçu paiement du reste du montant</h4>
                  <ul>
                    {this.state.showReste ? (
                      <div>
                        <div class="product__details__pic">
                          <div class="product__details__pic__item">
                            <img
                              class="product__details__pic__item--large"
                              src={commandes.reçu_montant_restant}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {this.state.showMsgR ? (
                      <div>
                        <div class="product__details__pic">
                          <div class="product__details__pic__item">
                            <br />{" "}
                            <h4>
                              {" "}
                              Vous n'avez pas encore importé votre reçu ! <br />
                              <b className="text-danger">
                                Vous avez jusqu'au 28/07/2020 avant 12h00 pour
                                payer le reste du montant et importer le reçu{" "}
                              </b>
                            </h4>{" "}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {this.state.showMsgreste ? (
                      <div>
                        <div class="product__details__pic">
                          <div class="product__details__pic__item">
                            <br />{" "}
                            <h4>
                              {" "}
                              Vous n'avez pas encore importé votre reçu !{" "}
                            </h4>{" "}
                            <br />
                            <Link
                              to={{
                                pathname: "/importRecuReste",
                                state: {
                                  id: {
                                    idc: commandes._id,
                                    idm: commandes.id_mouton,
                                  },
                                },
                              }}
                            >
                              {" "}
                              <a href="" class="primary-btn">
                                Importer votre reçu
                              </a>{" "}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : null}
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
