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
      // point_relais: "",
      Commande: {},
      Espece: {},
      eleveur: {},

      checked: false,
      vide: true,
      image: "",
      selectedOptionVille: null,
      optionsVille: [
        { value: "Berkane", label: "Berkane" },
        { value: "Driouch", label: "Driouch" },
        { value: "Figuig", label: "Figuig" },
        { value: "Guercif", label: "Guercif" },
        { value: "Jerada", label: "Jerada" },
        { value: "Nador", label: "Nador" },
        { value: "Oujda-Angad", label: "Oujda-Angad" },
        { value: "Taourirt", label: "Taourirt" },
        { value: "Ahfir", label: "Ahfir" },
        { value: "Saida", label: "Saidia" },
        { value: "Tafoughalt", label: "Tafoughalt" },
      ],

      redirect: false,
    };
      this.onChangecheck = this.onChangecheck.bind(this);
      this.handleChangeVille = this.handleChangeVille.bind(this);
  }

  handleChangeVille = (selectedOptionVille) => {
    this.setState({ selectedOptionVille }, () =>
      // const token = localStorage.getItem("usertoken");
      // if
      // console.log("tuseroken"+ token)
      // let cmd = {
      //   // localisation: e.target.value,
      //   point_relais: e.target.value,
      //   id_mouton: this.props.location.state.id,
      //   id_eleveur: this.state.eleveur._id,
      //   id_consommateur: localStorage.getItem("usertoken");,
      //   statut: "en attente de paiement avance",
      //   reçu_avance: "",
      //   feedback_avance: "",
      //   msg_refus_avance: null,
      //   reçu_montant_restant: null,
      //   feedback_reçu_montant_restant: null,
      //   msg_refus_reste: null,
      //   date_creation: new Date(),
      //   // .toLocaleString()
      // }
      this.setState({
        Commande: {
          // localisation: e.target.value,
          point_relais: this.state.selectedOptionVille.value,
          id_espece: this.props.location.state.id,
          id_eleveur: this.state.eleveur._id,
          id_consommateur: localStorage.getItem("usertoken"),
          statut: "en attente de paiement avance",
          reçu_avance: "",
          feedback_avance: "",
          msg_refus_avance: null,
          reçu_montant_restant: null,
          feedback_reçu_montant_restant: null,
          msg_refus_reste: null,
          date_creation: new Date(),
          // .toLocaleString()
        },
        vide: false,
      })
    );
  };

  onChangecheck(e) {
    const checkmark = document.getElementsByTagName("span");
    if (this.state.checked == true) {
      this.setState({ checked: false });
    }
    else {this.setState({ checked: true });
    checkmark.checked=true;
  }
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

    console.log(formatted_date);

    const expiredTimeToken = localStorage.getItem("expiredTimeToken");
    const token = localStorage.getItem("usertoken");
    const myToken = `Bearer ` + localStorage.getItem("myToken");
    console.log(expiredTimeToken);

    if (!token || expiredTimeToken < formatted_date) {
      this.props.history.push("/login");
    } else {
      axios
        .get("http://127.0.0.1:8000/api/Espece/" + idm, {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            Authorization: myToken,
          },
        })
        .then((res) => {
          this.setState({
            Espece: res.data.objet,
            eleveur: res.data.Eleveur[0],
            image: res.data.objet.image_profile,
          });
          console.log(res);
        });
    }
  }

  render() {
    const steps = [
      {
        name: "Etape",
        component: (
          <Commander1 location={this.props.location} data={this.state} />
        ),
      },
      {
        name: "Etape",
        component: (
          <Commander2
            location={this.props.location}
            data={this.state}
            onChangecheck={this.onChangecheck}
            handleChangeVille={this.handleChangeVille}
          />
        ),
      },
      {
        name: "Etape",
        component: (
          <Commander3 location={this.props.location} data={this.state} />
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
          <h3>Commander votre bête </h3>

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
