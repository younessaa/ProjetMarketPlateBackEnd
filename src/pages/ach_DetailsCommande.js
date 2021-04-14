import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { FaClipboardCheck } from 'react-icons/fa';
import { GiWeight, GiSheep, GiNautilusShell } from 'react-icons/gi';
import { BsFileEarmarkPlus, BsTrash } from 'react-icons/bs'
import { BiTrash } from 'react-icons/bi'

import { HiOutlineBadgeCheck } from 'react-icons/hi';
import { Modal, Button } from 'react-bootstrap';
import { Redirect } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
class DetailsCommande extends Component {
  constructor(props) {
    super(props);
    // let redirect = false;
    this.state = {
      cooperative: null,
      cooperative_rib: '',
      tech: '',
      payer: '',
      Commandes: {},
      Especes: [],
      showAvance: false,
      showSolution: false,
      especeAv: {},

      redirect: false,
      image: "",
      date: Date,
      paiement: this.props.location.state.id.mode_paiement_choisi,
      dataUrl: "",

    };
    this.onPaiementChanged = this.onPaiementChanged.bind(this);
    this.Modal = this.Modal.bind(this);
    this.ModalS = this.ModalS.bind(this);
    this.handelDelete = this.handelDelete.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handlePut = this.handlePut.bind(this);

  }
  getEspece(espece) {
    let esp = this.props.location.state.id.especes.filter((e) => (e.id_espece === espece._id))[0];
    return esp;
  }
  handelDelete = (e) => {
    e.preventDefault();
    // const token = localStorage.getItem("usertoken");
    const myToken = `Bearer ` + localStorage.getItem("myToken");
    let espece = this.props.location.state.id.espece;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "mx-3 btn btn-success",
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
            "http://127.0.0.1:8000/api/commande/" + this.props.location.state.id._id,
            {
              headers: {
                "Authorization": myToken,
              },
            }
          )
          .then((res) => {
            espece.map((esp) => {
              axios
                .put(
                  "http://127.0.0.1:8000/api/Espece/" + esp._id,
                  {
                    statut: "disponible",
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": myToken,
                    },
                  }
                )
                .then((res) => {
                });
            })

            swalWithBootstrapButtons.fire(
              'Annulation !',
              'Votre commande a bien été annulée',
              'success'
            )
            this.props.history.push("./commandesParStatut");

          });

      } else if (
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

  handlePut = (e) => {
    e.preventDefault();
    const myToken = `Bearer ` + localStorage.getItem("myToken");
    if (this.state.payer === "avance") {
      axios
        .put(
          "http://127.0.0.1:8000/api/commande/" + this.props.location.state.id._id,
          {
            statut: "en attente de validation avance",
            reçu_avance: this.state.dataUrl,
            avance_transmis_le: new Date(),

          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": myToken,
            },
          }
        )
        .then((res) => {
          Swal.fire({
            text:
              "Vous allez recevoir un email de validation de votre reçu sur votre email : " + this.props.location.state.id.consommateur.email,
            icon: "success",
            width: 400,
            heightAuto: false,
            confirmButtonColor: "#7fad39",

            confirmButtonText: "Ok!",
          });
          this.props.history.push("/commandesParStatut");
        });
    }
    else if (this.state.payer === "reste") {
      axios
        .put(
          "http://127.0.0.1:8000/api/commande/" + this.props.location.state.id._id,
          {
            statut: "en attente de validation reste",
            reçu_montant_restant: this.state.dataUrl,
            reste_transmis_le: new Date(),
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": myToken,
            },
          }
        )
        .then((res) => {
          Swal.fire({
            text:
              "Vous allez recevoir un email de validation de votre reçu sur votre email : " + this.props.location.state.id.consommateur.email,
            icon: "success",
            width: 400,
            heightAuto: false,
            confirmButtonColor: "#7fad39",

            confirmButtonText: "Ok!",
          });
          this.props.history.push("/commandesParStatut");
        });
    }
    else if (this.state.payer === "complement") {
      axios
        .put(
          "http://127.0.0.1:8000/api/commande/" + this.props.location.state.id._id,
          {
            statut: "en attente de validation du complément",
            reçu_montant_complement: this.state.dataUrl,
            complement_transmis_le: new Date(),

          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": myToken,
            },
          }
        )
        .then((res) => {
          Swal.fire({
            text:
              "Vous allez recevoir un email de validation de votre reçu sur votre email : " + this.props.location.state.id.consommateur.email,
            icon: "success",
            width: 400,
            heightAuto: false,
            confirmButtonColor: "#7fad39",

            confirmButtonText: "Ok!",
          });
          this.props.history.push("/commandesParStatut");
        });
    }

  };



  handleChangeImage(evt) {
    var dataURL = "";
    var reader = new FileReader();
    var file = evt.target.files[0];
    const scope = this;
    reader.onload = function () {
      dataURL = reader.result;
      scope.setState({ dataUrl: dataURL });
    };
    reader.readAsDataURL(file);
  }

  Modal(payer) {

    this.setState({ showAvance: !this.state.showAvance, payer: payer }, () => { });

  }
  ModalS(espece) {
    let tab = [];

    this.setState({ showSolution: !this.state.showSolution, especeAv: espece }, () => {
      if (espece != undefined && espece != {} && espece != null && Object.keys(espece).length > 0) {
        tab[0] = espece;
        tab[1] = this.props.location.state.id.especes.filter((e) => (e.id_espece == espece._id))[0];
        tab[2] = [];
        tab[1].produits_changement.map((e) => {
          tab[2].push(this.props.location.state.id.espece_avariee.filter((esp) => (esp._id == e.id_espece))[0]);
        })
      }
      this.setState({ Especes: tab }, () => { })
    });

  }
  onPaiementChanged(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {

    });
  }



  componentDidMount() {
    const myToken = `Bearer ` + localStorage.getItem("myToken");

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



    axios
      .get("http://127.0.0.1:8000/api/cooperative/" + this.props.location.state.id.id_cooperative, {
        headers: {
          // "x-access-token": token, // the token is a variable which holds the token
          "Content-Type": "application/json",
          "Authorization": myToken,
        },
      })

      .then((res) => {
        this.setState({ cooperative: res.data }
          , () => { this.setState({ cooperative_rib: this.state.cooperative.rib, tech: this.state.cooperative.tech[0].prenom + " " + this.state.cooperative.tech[0].nom }) })
      });
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
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": myToken,
                  },
                }
              )
              .then((res) => {

                // this.props.history.replace("/commandesParStatut");
                this.setState({ redirect: true });
              }); swalWithBootstrapButtons.fire(
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
    //.card

    let prix = this.props.location.state.id.espece.reduce(function (prev, cur) { return prev - (- cur.prix); }, 0)

    if (this.state.redirect) {
      return <Redirect to="./commandesParStatut" />;
    }

    const commandes = this.props.location.state.id;

    return (
      <div>
        <style>{`.btn-link {  color:white} .btn-link:hover {color:white;} .card { background-color: #fafafa !important } .container {max-width: 90%;}  `}</style>
        <div class="container">

          <h3>Détails commande</h3>
          <br></br>
          <div>
            <div id="accordion">
              <div class="card">
                <div class="card-header p-0" style={{ backgroundColor: "#009141" }} id="headingOne">
                  <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <h5 style={{ color: "white" }}><FaClipboardCheck className="mb-2" /> {" "}  Détails produit </h5>  </button>

                  </h5>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body">
                    <div class="row">
                      {commandes.espece.map((esp) =>
                        <div class="col-lg-6  col-sm-6 mb-4">

                          <div class="row">
                            <div class="col-lg-6  col-sm-6 pr-0 border-0" style={{ height: "220px" }}>

                              <div class="product__item">
                                <div
                                  class="product__item__pic set-bg"
                                  style={esp.anoc !== null ? { height: "193px" } : { height: 220 }}
                                  data-setbg={esp.images}
                                >

                                  <img
                                    src={esp.image_face}
                                    style={esp.anoc !== null ? { height: "193px" } : { height: "220px" }}
                                    class="product__item__pic set-bg"
                                  />

                                  <ul class="product__item__pic__hover">

                                    <li>
                                      <Link to={`/DetailsMouton/${esp._id}`}>
                                        <a href="#">
                                          <i class="fa fa-eye"></i>
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to={`/DetailsMouton/${esp._id}`}>
                                        <a href="#">
                                          <i class="fa fa-trash"></i>
                                        </a>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                                {esp.anoc ?
                                  <h1 style={{ borderRadius: "0% 0% 0% 40%", fontSize: "14px" }} class=" badge badge-success py-1 w-100  ">
                                    <HiOutlineBadgeCheck className=" mr-1 fa-lg " />
                                    <span>Labélisé ANOC</span>  </h1>
                                  :
                                  <span className="badge pt-3 w-100  mt-1  ">{"  "}</span>}

                              </div>

                            </div>
                            <div class="col-lg-6  col-sm-6 border" style={{ height: "220px", backgroundRepeat: "no-repeat", backgroundImage: esp.statut === "produit avarié" ? "linear-gradient(rgb(255,153,153), rgb(255,204,204))" : null, backgroundSize: "cover" }}>
                              <div className="product__item__text p-2 text-justify">
                                <h6 className=""><b>№ Boucle</b> : {esp.boucle}</h6>
                                <h6 className=""><b>Categorie</b> : {esp.categorie}</h6>
                                <h6 className=""><b>Race :</b> {esp.race}</h6>
                                <h6 className=""><b>Poids : </b>{esp.poids} Kg</h6>
                                <h6 className=""><b>Age :</b> {esp.age} mois</h6>
                                <h6 className=""><b>Localisation :</b> {esp.localisation}</h6>


                                <h5 className=" text-danger mt-4">
                                  <i class="fa fa-usd" aria-hidden="true"></i>
                                  {" "}
                                  {esp.prix + "  Dhs"}
                                </h5>
                              </div>
                            </div>
                          </div>

                        </div>
                      )}

                    </div>




                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header p-0" style={{ backgroundColor: "#009141" }} id="headingTwo">
                  <h5 class="mb-0">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      <h5 style={{ color: "white" }}><FaClipboardCheck className="mb-2" /> {" "}  Détails livraison </h5>  </button>
                  </h5>
                </div>
                <div className="">
                  <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div class="card-body">
                      <div id="centrer" className="col-lg-12 col-md-6">
                        <div className="shoping__checkout mt-2 pb-0">
                          <ul>
                            <li>
                              <i class="fa fa-calendar-o" aria-hidden="true"></i>
                              {" "}Date de livraison :<b style={{ fontWeight: "normal" }}>{" "}{commandes.date_de_livraison.replace(/-/g, " / ")} </b>
                            </li>
                            <li>
                              <i class="fa fa-map-o" aria-hidden="true"></i>
                              {" "}Ville de livraison : <b style={{ fontWeight: "normal" }}>{" " + commandes.ville_livraison}</b>  </li>
                            <li>
                              <i class="fa fa-map-marker" aria-hidden="true"></i>
                              {" "}Adresse de livraison : <b style={{ fontWeight: "normal" }}>{commandes.adresse_domicile ? commandes.adresse_domicile : commandes.point_relais}</b>  </li>
                          </ul>
                        </div>
                        <br></br>





                      </div>
                    </div></div></div>
              </div>
              <div class="card">
                <div class="card-header p-0" style={{ backgroundColor: "#009141" }} id="headingThree">
                  <h5 class="mb-0">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">

                      <h5 style={{ color: "white" }}><FaClipboardCheck className="mb-2" /> {" "}  Détails prix</h5>  </button>

                  </h5>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                  <div class="card-body">
                    <div id="centrer" className="col-lg-12 col-md-6">
                      <div className="shoping__checkout mt-2 pb-0">
                        <br></br>

                        <div className="shoping__checkout mt-2 pb-0">
                          <ul>
                            <li>
                              Prix Net <span> {prix} Dhs</span>
                            </li>
                            <li style={{ borderBottomStyle: "dashed", borderColor: "black" }}>
                              Prix Transport <span> {commandes.prix_total - prix}  Dhs    </span>
                            </li>

                            <li>
                              Prix Total{" "}
                              <span>   {commandes.prix_total}Dhs</span>
                            </li>
                            {commandes.statut === "en attente de paiement avance" ?
                              <li className="text-danger">
                                Avance a payer{" "}
                                <span>   {commandes.avance}Dhs</span>
                              </li> : null}
                            {commandes.statut === "en attente de validation avance" ?
                              <li>
                                Avance deja payee{" "}
                                <span>   {commandes.avance}Dhs</span>
                              </li> : null}
                            {commandes.statut === "en attente de paiement du reste" ?
                              <>
                                <li>
                                  Avance deja payee{" "}
                                  <span>   {commandes.avance}Dhs</span>
                                </li>
                                <li className="text-danger">
                                  Reste a payer{" "}
                                  <span>   {commandes.avance}Dhs</span>
                                </li></> : null}

                            {commandes.statut === "en attente de validation reste" || commandes.statut === "validé" ?
                              <>
                                <li>
                                  Avance deja payee{" "}
                                  <span>   {commandes.avance}Dhs</span>
                                </li>
                                <li>
                                  Reste deja payee{" "}
                                  <span>   {commandes.avance}Dhs</span>
                                </li></> : null}
                            {commandes.statut === "en attente de paiement du complément" ?
                              <>
                                <li>
                                  Avance deja payee{" "}
                                  <span>   {commandes.avance}Dhs</span>
                                </li>
                                <li>
                                  Reste deja payee{" "}
                                  <span>   {commandes.avance}Dhs</span>
                                </li>
                                <li className="text-danger">
                                  Complement a payer{" "}
                                  <span>   {commandes.avance}Dhs</span>
                                </li></> : null}
                            {commandes.statut === "en attente de validation du complément" ?
                              <>
                                <li>
                                  Avance deja payee{" "}
                                  <span>   {commandes.avance}Dhs</span>
                                </li>
                                <li>
                                  Reste deja payee{" "}
                                  <span>   {commandes.avance}Dhs</span>
                                </li>
                                <li>
                                  Complement deja payee{" "}
                                  <span>   {commandes.avance}Dhs</span>
                                </li></> : null}
                            {commandes.statut === "validé" ?
                              <li className=" text-success">
                                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                                {" "}  Commande validee
                         </li>
                              : null}


                          </ul>
                        </div>

                      </div>       </div></div>
                </div>

              </div>
              <div class="card">
                <div class="card-header p-0" style={{ backgroundColor: "#009141" }} id="headingfour">
                  <h5 class="mb-0">
                    <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                      <h5 style={{ color: "white" }}><FaClipboardCheck className="mb-2" /> {" "}
                        {commandes.statut === "en attente de paiement avance" || commandes.statut === "en attente de validation avance" ? "Paiement des frais de resevation" : null}
                        {commandes.statut === "en attente de paiement du reste" || commandes.statut === "en attente de validation reste" || commandes.statut === "validé" ? "Paiement du reste du montant" : null}
                        {commandes.statut === "en attente de paiement du complément" || commandes.statut === "en attente de validation du complément" ? "Paiement du complément du montant" : null}
                        {commandes.statut !== "en attente de paiement avance" && commandes.statut !== "en attente de validation avance" &&
                          commandes.statut !== "en attente de paiement du reste" && commandes.statut !== "en attente de validation reste" && commandes.statut !== "validé" &&
                          commandes.statut !== "en attente de paiement du complément" && commandes.statut !== "en attente de validation du complément" ? "Motif de l'annulation" : null}
                      </h5>  </button>
                  </h5>
                </div>
                <div id="collapsefour" class="collapse" aria-labelledby="headingfour" data-parent="#accordion">
                  <div class="card-body">

                    <br></br>

                    <ul>


                      {commandes.statut === "en attente de paiement avance" ?
                        <div>

                          <h5>  <b>Frais de reservation (non remboursable) </b><small>{commandes.avance} {" Dhs"}</small></h5>
                          <br></br>
                          <div className="form-check">
                            <input checked={commandes.mode_paiement_choisi === this.state.paiement} onChange={this.onPaiementChanged} className="form-check-input" type="radio" name="paiement" id="virement" value="virement" />
                            <label className="form-check-label" htmlFor="virement">
                              <b> Virement bancaire</b>
                            </label>
                          </div>
                          <p>pour payer les frais de reservation, il vous suffit d'effectuer un virement sur le RIB suivant
                            <span className="text-danger">{" " + this.state.cooperative_rib}</span></p>
                          <div className="form-check mt-2">
                            <input checked={commandes.mode_paiement_choisi === this.state.paiement} onChange={this.onPaiementChanged} className="form-check-input" type="radio" name="paiement" id="transfert" value="transfert" />
                            <label className="form-check-label" htmlFor="transfert">
                              <b>Par agence de transfert d'argent (*)</b>
                            </label>
                          </div>

                          <span><small>* les frais de transfert sont a la charge de l'achteur</small></span>
                          <p>
                            pour payer les frais de reservation, il vous suffit d'effectuer un transfert d'argent à l'eleveur suivant
                         {<span className="text-danger">{" " + this.state.tech}</span>}
                          </p>
                          <br></br>
                          <p className="text-danger"><b>Attention :</b><br></br>
                          Vous avez jusqu'au {" " + commandes.deadline + " "} pour nous transmettre la copie (scan / photo) de l'ordre de virement ou de transfert .Au-delà de ce delai, votre commande sera annulee.</p>

                        </div> : null}
                      {commandes.statut === "en attente de validation avance" ?
                        <div>
                          <b>Validation en cours</b> {commandes.avance + " Dhs"}
                          <p className="text-danger">Votre reçu a bien ete receptionne. Il sera verifie dans les plus brefs delais. Des reception du virement, votre produit sera reserve</p>
                          <br></br>
                          <br></br>
                          <br></br>
                          <div class="row ">
                            <div className="col">{" "}</div>
                            <div className="col">   <div class="product__details__pic">
                              <div class="product__details__pic__item">
                                <img
                                  class="product__details__pic__item--large"
                                  src={commandes.reçu_avance}
                                  alt=""
                                />
                              </div>
                            </div></div>
                            <div className="col">{" "}</div>
                          </div>
                        </div> : null}
                      {commandes.statut === "en attente de paiement du reste" ?
                        <div>
                          <b>Reste du montant : {commandes.reste + "Dhs"}</b>
                        </div> : null}

                      {commandes.statut === "en attente de validation reste" ?
                        <div>
                          <b>Validation en cours</b> {commandes.reste + " Dhs"}
                          <p className="text-danger">Votre reçu a bien ete receptionne. Il sera verifie dans les plus brefs delais. Des reception du virement, nous vous contacterons pour la livraison</p>
                          <br></br>
                          <br></br>
                          <br></br>
                          <div class="row ">
                            <div className="col">{" "}</div>
                            <div className="col">   <div class="product__details__pic">
                              <div class="product__details__pic__item">
                                <img
                                  class="product__details__pic__item--large"
                                  src={commandes.reçu_montant_restant}
                                  alt=""
                                />
                              </div>
                            </div></div>
                            <div className="col">{" "}</div>
                          </div>
                        </div> : null}
                      {commandes.statut === "en attente de paiement du complément" ?
                        <div>
                          <b>Complément du montant : {commandes.complement + "Dhs"}</b>
                        </div> : null}
                      {commandes.statut === "en attente de validation du complément" ?
                        <div>
                          <b>Validation en cours</b> {commandes.complement + " Dhs"}
                          <p className="text-danger">Votre reçu a bien ete receptionne. Il sera verifie dans les plus brefs delais. Des reception du virement, nous vous contacterons pour la livraison</p>
                          <br></br>
                          <br></br>
                          <br></br>
                          <div class="row ">
                            <div className="col">{" "}</div>
                            <div className="col">   <div class="product__details__pic">
                              <div class="product__details__pic__item">
                                <img
                                  class="product__details__pic__item--large"
                                  src={commandes.reçu_montant_complement}
                                  alt=""
                                />
                              </div>
                            </div></div>
                            <div className="col">{" "}</div>
                          </div>
                        </div> : null}
                      {commandes.statut === "validé" ?
                        <div>
                          <p className="text-danger">Votre virement est valide. la livraison est prevu le {commandes.date_de_livraison} . Nous vous contacterons par telephone  pour preciser l'heure exacte</p>
                          <br></br>
                          <br></br>
                          <br></br>
                          <div class="row ">
                            <div className="col">{" "}</div>
                            <div className="col">   <div class="product__details__pic">
                              <div class="product__details__pic__item">
                                {commandes.reçu_montant_complement == null || commandes.reçu_montant_complement == undefined ?
                                  <img
                                    class="product__details__pic__item--large"
                                    src={commandes.reçu_montant_restant}
                                    alt=""
                                  /> :
                                  <img
                                    class="product__details__pic__item--large"
                                    src={commandes.reçu_montant_complement}
                                    alt=""
                                  />}

                              </div>
                            </div></div>
                            <div className="col">{" "}</div>
                          </div>
                        </div>
                        : null}
                      {commandes.statut !== "en attente de paiement avance" && commandes.statut !== "en attente de validation avance" &&
                        commandes.statut !== "en attente de paiement du reste" && commandes.statut !== "en attente de validation reste" && commandes.statut !== "validé" &&
                        commandes.statut !== "en attente de paiement du complément" && commandes.statut !== "en attente de validation du complément" ?
                        commandes.statut !== "avarié" ? <div>
                          <p className="text-danger">{commandes.statut}</p>
                          <p><b>Pour toute reclamation, contactez le service client au 0601120156. Disponible de 9h à  19h sauf Samedi et Dimanche </b></p>
                        </div> :
                          <div className="row">
                            {commandes.espece.filter((e) => e.statut == "produit avarié").map((Annonces) =>
                            (
                              <div className="col-lg-3  col-sm-6">
                                <span className="text-danger">
                                  <i class="fa fa-long-arrow-right" aria-hidden="true">

                                  </i><b>{this.getEspece(Annonces).motif_annulation}</b> </span>
                                <div id="anonce" class="product__item">
                                  <div
                                    class="product__item__pic set-bg"
                                    data-setbg={Annonces.images}
                                  >

                                    <img
                                      src={Annonces.image_face}
                                      class="product__item__pic set-bg"
                                    />

                                    <ul class="product__item__pic__hover">
                                      <li>
                                        <Link to={`/DetailsMouton/${Annonces._id}`}>
                                          <a href="#">
                                            <i class="fa fa-eye"></i>
                                          </a>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                  {Annonces.anoc ?
                                    <h1 style={{ borderRadius: "0% 0% 0% 40%", fontSize: "14px" }} class=" badge badge-success py-1 w-100  ">
                                      <HiOutlineBadgeCheck className=" mr-1 fa-lg " />
                                      <span>Labélisé ANOC</span>  </h1>
                                    :
                                    <span className="badge pt-3 w-100  mt-1  ">{"  "}</span>
                                  }
                                  <div className="product__item__text p-2 text-justify">
                                    <h6 className=""><b>№ Boucle</b> : {Annonces.boucle}</h6>
                                    <h6 className=""><b>Categorie</b> : {Annonces.categorie}</h6>
                                    <h6 className=""><b>Race :</b> {Annonces.race}</h6>
                                    <h6 className=""><b>Poids : </b>{Annonces.poids} Kg</h6>
                                    <h6 className=""><b>Age :</b> {Annonces.age} mois</h6>
                                    <h6 className=""><b>Localisation :</b> {Annonces.localisation}</h6>
                                    <h5 className=" text-danger  ">
                                      <i class="fa fa-usd" aria-hidden="true"></i>
                                      {" "}
                                      {Annonces.prix + "  Dhs"}
                                    </h5>
                                    <div className="row mt-3">
                                      <div className="col-2">{" "}</div>
                                      <button type="button" onClick={this.ModalS.bind(this, Annonces)} class="col-8 py-1 btn btn-danger">Solutions proposées</button>
                                      <div className="col-2">{" "}</div>
                                    </div>
                                  </div> </div>

                              </div>

                            ))}

                          </div>
                        : null}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br><br></br>
          <div className="my-5">
            <div class="row">
              <div class="col-md-4 offset-md-4">

                {commandes.statut === "en attente de paiement avance" ?
                  <button style={{ fontSize: "19px" }} id="centre" onClick={this.Modal.bind(this, "avance")}
                    class="btn-success py-1 px-4 mb-3 w-75" ><BsFileEarmarkPlus className="fa-lg" /> {" "}
                        Payer l'avance{" "}
                  </button> : null}
                {commandes.statut === "en attente de paiement du reste" ?
                  <button style={{ fontSize: "19px" }} id="centre" onClick={this.Modal.bind(this, "reste")}
                    class="btn-success py-1 px-4 mb-3 w-75" ><BsFileEarmarkPlus className="fa-lg" /> {" "}
                        Payer le reste{" "}
                  </button> : null}
                {commandes.statut === "en attente de paiement du complément" ?
                  <button style={{ fontSize: "19px" }} id="centre" onClick={this.Modal.bind(this, "complement")}
                    class="btn-success py-1 px-4 mb-3 w-75" > <BsFileEarmarkPlus className="fa-lg" />{" "}
                        Payer le complement{" "}
                  </button> : null}


              </div>
              <div class="col-md-3 offset-md-3">{" "}</div>
            </div>
            <div class="row mb-5">
              <div class="col-md-4 offset-md-4 ">
                <button style={{ fontSize: "19px" }}
                  id="centre"
                  class="btn-danger py-1 px-4 mb-3 w-75"
                  onClick={this.handelDelete}
                >  <BiTrash class="fa-lg" />{" "}Annuler la commande{" "}
                </button></div>
              <div class="col-md-3 offset-md-3">{" "}</div>
              <div class="col-md-3 offset-md-3">{" "}</div>
            </div>
          </div>
        </div>
        {/**modal de changement*/}
        <Modal
          size="xl"
          show={this.state.showSolution}
          onHide={this.ModalS.bind(this, this.state.especeAv)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Solutions proposées</h4>   </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {this.state.Especes[2] !== undefined ?
              <div className="row">
                {this.state.Especes[2].map((Annonces) =>
                (
                  <div className="col-lg-3  col-sm-6">

                    <div id="anonce" class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        data-setbg={Annonces.images}
                      >

                        <img
                          src={Annonces.image_face}
                          class="product__item__pic set-bg"
                        />

                        <ul class="product__item__pic__hover">
                          <li>
                            <Link to={`/DetailsMouton/${Annonces._id}`}>
                              <a href="#">
                                <i class="fa fa-eye"></i>
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {Annonces.anoc ?
                        <h1 style={{ borderRadius: "0% 0% 0% 40%", fontSize: "14px" }} class=" badge badge-success py-1 w-100  ">
                          <HiOutlineBadgeCheck className=" mr-1 fa-lg " />
                          <span>Labélisé ANOC</span>  </h1>
                        :
                        <span className="badge pt-3 w-100  mt-1  ">{"  "}</span>
                      }
                      <div className="product__item__text p-2 text-justify">
                        <h6 className=""><b>№ Boucle</b> : {Annonces.boucle}</h6>
                        <h6 className=""><b>Categorie</b> : {Annonces.categorie}</h6>
                        <h6 className=""><b>Race :</b> {Annonces.race}</h6>
                        <h6 className=""><b>Poids : </b>{Annonces.poids} Kg</h6>
                        <h6 className=""><b>Age :</b> {Annonces.age} mois</h6>
                        <h6 className=""><b>Localisation :</b> {Annonces.localisation}</h6>
                        <h5 className=" text-danger  ">
                          <i class="fa fa-usd" aria-hidden="true"></i>
                          {" "}
                          {Annonces.prix + "  Dhs"}
                        </h5>
                        {this.state.Especes[2].length > 1 ? <div className="row mt-3">
                          <div className="col-3">{" "}</div>
                          <button type="button" class="col-6 py-1 btn btn-success">Accepter</button>
                          <div className="col-3">{" "}</div>
                        </div> : null}
                        {this.state.Especes[2].length == 1 ?
                          <div className="row mt-3">
                            <div className="col-1">{" "}</div>
                            <button type="button" class="col-4 py-1 btn btn-success">Accepter</button>
                            <div className="col-1">{" "}</div>
                            <button type="button" class="col-4 py-1 btn btn-danger">Reffuser</button>
                            <div className="col-2">{" "}</div>
                          </div> : null}

                      </div> </div>

                  </div>

                ))}

            
              </div> : null}




          </Modal.Body>

        </Modal>


        {/**modal de changement*/}
        {/**modal de paiement*/}
        <Modal
          size="lg"
          show={this.state.showAvance}
          onHide={this.Modal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.payer === "avance" ? <h4>Importer le reçu : paiement d'avance</h4> : null}
              {this.state.payer === "reste" ? <h4>Importer le reçu : paiement du reste</h4> : null}
              {this.state.payer === "complement" ? <h4>Importer le reçu : paiement du complement</h4> : null} </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="col-lg-12 col-md-12">


              <br></br>

              <div id="centreT">
                <input
                  id="selectedFile"
                  style={{ display: "none" }}
                  type="file"
                  name="recuAvance"
                  onChange={this.handleChangeImage}
                  encType="multipart/form-data"
                  required
                />
                <br />
              </div>
              <br />

              <label htmlFor="selectedFile" class="product__details__pic__item w-100">
                {this.state.dataUrl ?
                  <img
                    id="img-background"

                    class="product__details__pic__item--large"
                    src={this.state.dataUrl}
                  /> : <img
                    id="img-background"

                    class="product__details__pic__item--large"

                  />}
              </label>

              <br />
              <br />
            </div>
          </Modal.Body>
          <Modal.Footer>

            <button type="button" onClick={this.Modal} class="btn btn-danger">Annuler </button>
            <button type="button" onClick={this.handlePut} class="btn btn-success">Valider</button>
          </Modal.Footer>
        </Modal>




        {/**modal  de paiement*/}
      </div>
    );
  }
}

export default DetailsCommande;
