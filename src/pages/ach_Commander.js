import React, { Component } from "react";
import ReactDOM from "react-dom";
import MultiStep from "../react-multistep";
import Commander1 from './step1'
import Commander2 from "./step2";
import Commander3 from "./step3";


import axios from "axios";
import Select from "react-select";

import { Link } from "react-router-dom";
class Commander extends Component {
  constructor(props) {
    super(props);
    // let redirect = false;
    this.state = {
      date_min: null,
      check1: false,
      check2: false,
      check3: false,
      adresse: "",
      date: null,
      id_cooperative: null,
      prix: null,
      avance: 0,
      reste: 0,
      prix_total: 0,
      prix_transport: 0,
      Commande: {},
      Espece: {},
      eleveur: {},
      Especes: [],
      eleveurs: [],
      occasion: "",
      avant_aid: null,
      deadline: new Date(),
      checked: false,
      vide: true,
      image: "",
      paiement: null,
      livraison: [],
      selectedOptionVille: "",
      optionsVille: [],
      selectedOptionPoint: "",
      optionsPoint: [],
      redirect: false,
    };
    this.onPaiementChanged = this.onPaiementChanged.bind(this);
    this.onChangecheck = this.onChangecheck.bind(this);
    this.handleChangeVille = this.handleChangeVille.bind(this);
    this.handleChangePoint = this.handleChangePoint.bind(this);

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
  }
  handleChange1(e) { this.setState({ checked: false, check1: !this.state.check1, check2: false, check3: false, selectedOptionPoint: "", selectedOptionVille: "" }); }

  handleChange2(e) { this.setState({ checked: false, check2: !this.state.check2, check1: false, check3: false, adresse: "" }) }

  handleChange3(e) { this.setState({ checked: false, check3: !this.state.check3, check1: false, check2: false, selectedOptionPoint: "" }) }

  handleChangeVille = (selectedOptionVille) => {

    this.setState({ selectedOptionVille }, () =>
      this.setState({
        checked: false,
        prix_transport: this.state.livraison.find((f) => f.Ville_livraison == selectedOptionVille.value).prix_transport,
        vide: false,
      })

    );
    this.setState({

      optionsPoint:
        [{
          "value": this.state.livraison.find((f) => f.Ville_livraison == selectedOptionVille.value).point_relais,
          "label": this.state.livraison.find((f) => f.Ville_livraison == selectedOptionVille.value).point_relais
        }],
    })
  };

  handleChangePoint = (selectedOptionPoint) => {
    this.setState({ selectedOptionPoint }, () =>

      this.setState({
        checked: false,
      })

    );
  };
  onChangecheck(e) {
    if (this.state.checked == true) {
      this.setState({ checked: false });
    }
    else {
      this.setState({ checked: true });

    }
    this.setState({
      Commande: {

        // localisation: e.target.value,
        point_relais: this.state.check1 ? "Récupérer à la coopérative" : this.state.selectedOptionPoint.value,
        ville_livraison: this.state.check1 ? "Récupérer à la coopérative" : this.state.selectedOptionVille.value,
        especes: this.state.especes,

        id_cooperative: this.state.id_cooperative,
        reference: null,
        id_consommateur: localStorage.getItem("usertoken"),
        statut: "en attente de paiement avance",
        ancien_statut: "",
        deadline: this.state.deadline,
        avance: this.state.avance,
        prix_total: this.state.prix - (-this.state.prix_transport),
        reste: this.state.prix - (-this.state.prix_transport) - this.state.avance,

        reçu_avance: "",
        feedback_avance: "",
        msg_refus_avance: null,

        reçu_montant_restant: null,
        feedback_reçu_montant_restant: null,
        msg_refus_reste: null,

        reçu_montant_complement: null,
        feedback_reçu_montant_complement: null,
        msg_refus_complement: null,

        date_creation: new Date(),
        date_de_livraison: this.state.date,
        mode_paiement_choisi: this.state.paiement,
        date_annulation: null,
        date_suppression_max: null,
        isDelivered: false,
        rating_livraison: null,
        justification_rating_livraison: null,
        rating_produit: null,
        justification_rating_produit: null,

        avance_transmis_le: null,
        reste_transmis_le: null,
        complement_transmis_le: null,
        motif_rejet: null,
        justification_rejet: null,

        rating: null,
        isDeliveredTo_Home: this.state.check3,
        adresse_domicile: this.state.adresse,
        isDeliveredTo_PointRelais: this.state.check2,
        isTakenFrom_Cooperative: this.state.check1,
      },
      vide: false,
    })


  }
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  onPaiementChanged(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState({ loading: false, checked: false });
    });


  }


  componentDidMount() {
    const idm = this.props.location.state.id;
    function appendLeadingZeroes(n) {
      if (n <= 9) {
        return "0" + n;
      }
      return n;
    }
    let current_datetime = new Date();
    let formatted_date =
      current_datetime.getFullYear() +
      "-" +
      appendLeadingZeroes(current_datetime.getMonth() + 1) +
      "-" +
      appendLeadingZeroes(current_datetime.getDate()) +
      " " +
      appendLeadingZeroes(current_datetime.getHours()) +
      ":" +
      appendLeadingZeroes(current_datetime.getMinutes()) +
      ":" +
      appendLeadingZeroes(current_datetime.getSeconds());

    // console.log(formatted_date);

    const expiredTimeToken = localStorage.getItem("expiredTimeToken");
    const token = localStorage.getItem("usertoken");
    const myToken = `Bearer ` + localStorage.getItem("myToken");
    //  console.log(expiredTimeToken);

    if (!token || expiredTimeToken < formatted_date) {
      this.props.history.push("/login");
    } else {
      let p = [];
      let ids = [];
      if (!Array.isArray(idm)) { ids.push(idm) }
      else { ids = idm }
      console.log(this.props.location.state.id_cooperative)
      axios

        .get("http://127.0.0.1:8000/api/cooperative/" + this.props.location.state.id_cooperative, {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            Authorization: myToken,
          },
        })
        .then((res) => {
          let d = "";
          if (res.data.Parametres.occasion != "aid") {
            d = new Date(
              new Date().getTime()
              - (-3600 * (res.data.Parametres.delais_paiement.delai_reste - (-res.data.Parametres.delais_paiement.delai_avance) - (-res.data.Parametres.delais_paiement.bonus)) * 1000)
              - ((new Date()).getTimezoneOffset() * 60 * 1000)).toISOString()
            this.setState({ date_min: d.substr(0, 10) }, () => { })
          }
          this.setState({
            livraison: res.data.Parametres.livraison,
            occasion: res.data.Parametres.occasion,
            avant_aid: res.data.Parametres.jourLivraisonAvant,

            deadline: new Date(new Date().getTime()
              - (-3600 * (res.data.Parametres.delais_paiement.delai_avance - 1) * 1000)
              - ((new Date()).getTimezoneOffset() * 60 * 1000)).toLocaleString(),

          }, () => {
            res.data.Parametres.livraison.map((l) => (
              this.state.optionsVille.splice(0, 0, { "value": l.Ville_livraison, "label": l.Ville_livraison })
            ))



            ids.map((i) => (
              axios
                .get("http://127.0.0.1:8000/api/Espece/" + i, {
                  headers: {
                    // "x-access-token": token, // the token is a variable which holds the token
                    Authorization: myToken,
                  },
                })
                .then((res) => {
                  this.setState({
                    Espece: res.data.objet,
                    eleveur: res.data.Eleveur,
                    id_cooperative: res.data.objet.id_cooperative,
                    prix: this.state.prix - (-res.data.objet.prix),
                    avance: this.state.avance - (-res.data.objet.avance),

                    // image: res.data.objet.image_profile,
                  }, () => {
                    p.splice(0, 0, {
                      "id_espece": res.data.objet._id,
                      "id_eleveur": res.data.Eleveur[0]._id,
                      "motif_annulation": null,
                      "produits_changement": [],
                      "choix_client": "",
                      "details_remboursement": {
                        "rib_client": null,
                        "nom_prenom_client": null,
                        "montant_de_remboursement": null,
                        "isPaid": null
                      },
                    })
                    this.setState({ especes: p }, () => { })
                  });
                }

                )))


          })
        })






    }
  }

  render() {
    const steps = [
      {
        name: "Etape",
        component: (
          <Commander1 location={this.props.location} data={this.state}
            handleChange1={this.handleChange1}
            handleChange2={this.handleChange2}
            handleChange3={this.handleChange3}
            onPaiementChanged={this.onPaiementChanged}
            handleChangeVille={this.handleChangeVille}
            handleChangePoint={this.handleChangePoint} />
        ),
      },
      {
        name: "Etape",
        component: (
          <Commander2
            location={this.props.location}
            data={this.state}

          />
        ),
      },
      {
        name: "Etape",
        component: (
          <Commander3 location={this.props.location} data={this.state} onChangecheck={this.onChangecheck}
            onPaiementChanged={this.onPaiementChanged} />
        ),
      },
    ];

    const prevStyle = {
      background: "#7fad39",
      "border-width": "2px",
      display: "inline-block",
      "font-size": "14px",
      size: "25px 54px",
      padding: "10px 28px 10px",
      color: "#ffffff",
      "text-transform": "uppercase",
      "font-weight": "700",
      "letter-spacing": "2px",
      "border-radius": "5px",
    };

    const nextStyle = {
      position: "absolute",
      right: "7.3%",
      background: "#7fad39",
      "border-width": "2px",
      display: "inline-block",
      "font-size": "14px",
      size: "25px 54px",
      padding: "10px 28px 10px",
      color: "#ffffff",
      "text-transform": "uppercase",
      "font-weight": "700",
      "letter-spacing": "2px",
      "border-radius": "5px",
    };

    const stepStyle = { background: "#7fad39" };

    /*const { selectedOptionVille } = this.state;
    const { optionsVille } = this.state;*/
    return (
      <div>
        <div class="container">
          <br></br>
          <h3>Commander votre bête  </h3>

          <MultiStep
            showNavigation={true}
            steps={steps}
            prevStyle={prevStyle}
            nextStyle={nextStyle}
          />
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default Commander;
