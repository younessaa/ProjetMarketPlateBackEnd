import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
class DetailsCommande extends Component {
  constructor(props) {
    super(props);
    // let redirect = false;
    this.state = {
      Commandes: {},
      showAvance: true,
      showReste: true,
      showStatut: false,
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
    this.setState({ image: cmd.espece.image_boucle });
  }
  onClickImageProfile() {
    const cmd = this.props.location.state.id;
    this.setState({ image: cmd.espece.image_profile });
  }
  onClickImageFace() {
    const cmd = this.props.location.state.id;
    this.setState({ image: cmd.espece.image_face });
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
      image: cmd.espece.image_face,
      date: datetime,
    });

    // const cmd = this.state.Commandes;
    // console.log(cmd);
    if (cmd.reçu_avance == null) {
      if (cmd.statut != "commande annulée (deadline dépassé)")
        this.setState({ showAvance: false, showMsgavance: true });
      else if (cmd.statut === "commande annulée (deadline dépassé)")
        this.setState({
          showAvance: false,
          showMsgavance: false,
          showStatut: true,
          showReste: false,
          showMsgreste: false,
        });
    }
    if (cmd.reçu_montant_restant == null && cmd.reçu_avance !== null) {
      // console.log("reste  null");
      this.setState({ showReste: false, showMsgreste: true }, () =>
        console.log(this.state.showReste)
      );
    }
    if (cmd.reçu_montant_restant !== null && cmd.reçu_avance !== null) {
      this.setState({ showBtnAnnuler: false });
    }
    if (
      cmd.reçu_montant_restant === null &&
      cmd.reçu_avance === null &&
      cmd.statut != "commande annulée (deadline dépassé)"
    ) {
      this.setState({ showAvance: false, showMsgavance: true, showMsgR: true });
    }
    // if(cmd.statut=="en attente de paiement du reste"){

    //   this.setState({ showAvance: true, showMsgavance: false, showMsgR: true });
    // }
  }

  handelDelete() {
    // const token = localStorage.getItem("usertoken");
     const myToken = `Bearer ` + localStorage.getItem("myToken");
    // if (!token) {
    //   this.props.history.push("/login");
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: "Etes-vous sûr?",
      text: "Voulez-vous annuler votre commande!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "  Oui!  ",
      cancelButtonText: "  Non!  ",
      reverseButtons: true,
    }).then((result) => {
  if (result.isConfirmed) {
      //debut
      axios
        .delete(
          "http://127.0.0.1:8000/api/commande/" + this.state.commandes._id,
          {
            headers: {
              // "x-access-token": token, // the token is a variable which holds the token
              "Authorization": myToken,
            },
          }
        )
        .then((res) => {
          axios
            .put(
              "http://127.0.0.1:8000/api/Espece/" +
                this.state.commandes.id_espece,
              {
                statut: "disponible",
                //   msg_refus_avance: this.state.dataUrl,
              },
              {
                headers: { "Content-Type": "application/json",
              "Authorization": myToken,},
              }
            )
            .then((res) => {

              // this.props.history.replace("/commandesParStatut");
              this.setState({ redirect: true });
            });swalWithBootstrapButtons.fire(
      'Annulation !',
      'Votre commande a bien été annulée',
      'success'
    ) 
        }); 

//fin
    } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Annulation',
      'Commande non annulée !',
      'error'
    )
  }
})
  }

  render() {

    if (this.state.redirect) {
      return <Redirect  to="./commandesParStatut" />;
    }

    const commandes = this.props.location.state.id;
    console.log(commandes);
    
    return (
      <div>
        <div class="container">
          <h3>Détails commande</h3>
          <br></br>
          <div>
            <div className="row">
              <h3></h3>
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
                          src={commandes.espece.image_boucle}
                          alt=""
                          onClick={this.onClickImageBoucle}
                        />
                        <img
                          className="col-lg-4 col-md-4"
                          // data-imgbigurl="Images/1.jpg"
                          src={commandes.espece.image_face}
                          alt=""
                          onClick={this.onClickImageFace}
                        />
                        <img
                          className="col-lg-4 col-md-4"
                          // data-imgbigurl="Images/1.jpg"
                          src={commandes.espece.image_profile}
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
                  <div id="gris">
                    <h4 id="centrerT">
                      Réf : <span>{commandes._id} </span>
                    </h4>
                    <div id="centrerT" class="product__details__price">
                      {commandes.statut}
                    </div>
                  </div>
                  <br></br>
                  {this.state.showBtnAnnuler ? (
                    <div>
                      {/* <a  href="#" class="primary-btn" onClick={this.handelDelete}>
                        Annuler commande
                      </a> */}
                      <button
                        id="centre"
                        class="primary-btn"
                        onClick={this.handelDelete}
                      >
                        {" "}
                        Annuler commande{" "}
                      </button>
                    </div>
                  ) : null}
                  <br></br>
                  <div id="centrer" className="container">
                    <ul>
                      <li>
                        <b>Effectuée le </b>
                        <span>{commandes.date_creation.toLocaleString()}</span>
                      </li>
                      <li>
                        <b>Boucle</b> <span>{commandes.espece.boucle}</span>
                      </li>
                      <li>
                        <b>Race</b> <span>{commandes.espece.race}</span>
                      </li>
                      <li>
                        <b>Poids</b> <span>{commandes.espece.poids} Kg</span>
                      </li>
                      <li>
                        <b>Age</b> <span>{commandes.espece.age} mois</span>
                      </li>

                      <li>
                        <b>Avance</b>
                        <span>{commandes.espece.avance} MAD</span>
                      </li>
                      <li>
                        <b>Eleveur</b>
                        {commandes.eleveur.nom + " " + commandes.eleveur.prenom}
                      </li>
                      <li>
                        <b>Numéro du RIB</b>
                        {commandes.eleveur.rib}
                      </li>

                      <li className="bg-ligh text-danger h6 center">
                        <b>Prix total</b>
                        {commandes.espece.prix} MAD
                      </li>
                    </ul>
                  </div>

                  <ul>
                    <li className="bg-ligh text-danger h4 center">
                      <b>A livrer : </b>
                      La veille de l'Aid
                    </li>
                    <li className="bg-ligh text-danger h4 center">
                      <b>Au point de relais : </b>
                      <span>{commandes.point_relais}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
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

                    {/* ------------------------------ */}

                    {this.state.showStatut ? (
                      <div>
                        <div class="product__details__pic">
                          <div class="product__details__pic__item">
                            {/* <img
                              class="product__details__pic__item--large"
                              src={commandes.reçu_avance}
                              alt=""
                            /> */}
                            <h2 className="text-danger">{commandes.statut}</h2>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {/* ------------------------------ */}

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
                              <b className="text-danger">
                                {" "}
                                Attention: Il vous reste jusqu'au{" "}
                                <span>{this.state.date}</span> pour payer et
                                importer votre reçu de paiement.
                              </b>
                            </h4>{" "}
                            <br />
                            <Link
                              to={{
                                pathname: "/importRecuAvance",
                                state: {
                                  id: {
                                    idc: commandes._id,
                                    idm: commandes.id_espece,
                                    email: commandes.consommateur.email,
                                  },
                                },
                              }}
                            >
                              {" "}
                              <a href="" id="roundB" class="primary-btn">
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
                                    idm: commandes.id_espece,
                                    email: commandes.consommateur.email,
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
        </div>
      </div>
    );
  }
}

export default DetailsCommande;
