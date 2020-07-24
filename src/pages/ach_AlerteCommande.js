import React, { Component } from "react";
import axios from "axios";

//import menu_eleveur from '/public/Images/eleveurs.png'; // with import

class AlerteCommande extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      commande: {},
      date: Date,
      avance: "",
      rib:"",
      redirect: false,
    };
    this.handlPost = this.handlPost.bind(this);
  }
  // componentDidMount() {
  //   const cmd = this.props.location.state.id;
  //   const datee = new Date();

  //   const D = datee.setHours(datee.getHours() + 8).toLocaleString();
  //   // console.log(datee.toLocaleString().getHours())
  //   this.setState({ commande: cmd, date: D });
  // }

  componentDidMount() {
    const cmd = this.props.location.state.id;
    // console.log(cmd)
    var currentdate = cmd.date_creation;
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
    // this.setState({ commande: cmd, date: datetime });
    var dateTest = year + "-" + month + "-" + day + " " + hours + ":00:00";
    var TestDate = new Date(dateTest);
    console.log(TestDate);

    this.setState({
      commande: Object.assign(cmd, { deadline: dateTest }),
      date: datetime,
    });

    axios
      .get("http://127.0.0.1:8000/api/mouton/" + cmd.id_mouton, {
        headers: {
          // "x-access-token": token, // the token is a variable which holds the token
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        this.setState({
          avance: res.data.objet.avance,
          rib:res.data.Eleveur[0].rib
        });
      });
  }

  handlPost(e) {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/commande", this.state.commande, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        axios
          .put(
            "http://127.0.0.1:8000/api/mouton/" + this.state.commande.id_mouton,
            {
              statut: "réservé",
              //   msg_refus_avance: this.state.dataUrl,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            this.props.history.push("/commandesParStatut");
          });
        // this.props.history.push("/Commandes");
      })
      .catch((err) => {
        console.log(err);
      });

    // login(user).then(

    //   // console.log('loged')
    // );
  }

  render() {
    return (
      <div>
        {/* <!-- Page Preloder --> */}
        {/* <div id="preloder">
                <div className="loader"></div>
            </div> */}

        <section className="product spad">
          <div className="container">
            <div class="col-lg-12 col-md-6">
              <h3>Votre commande s'est déroulé avec succès</h3> <br></br>
              <h5>
                Vous pouvez maintenant payer l'avance de votre mouton pour
                valider votre commande avec le moyen de paiement que vous avez
                choisi précedement en vous munissant du numéro du RIB du
                vendeur: <b>{this.state.rib}</b>
              </h5>
              {/* {console.log("rib"+this.state.rib)} */}
              <br></br>
              <h3>
                Montant avance à payer : {parseInt(this.state.avance) + 60} MAD
              </h3>
              <br></br>
              <div class="checkout__input bg-ligh text-danger h6 center">
                Attention: Il vous reste jusqu'au{" "}
                <span>
                  <b> {this.state.date}</b>
                </span>{" "}
                pour payer et importer votre reçu de paiement.
              </div>
              <div class="checkout__input bg-ligh text-danger h6 center">
                Au delà de ce délai, votre commande sera annulée automatiquement
                !
              </div>
              <div class="shoping__checkout">
                <ul>
                  <li>
                    <a href="./Toutes" class="primary-btn">
                      Annuler commande
                    </a>{" "}
                    <br></br>
                    <a href="#" class="primary-btn" onClick={this.handlPost}>
                      Valider
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AlerteCommande;
