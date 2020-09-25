import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
    const myToken = `Bearer ` + localStorage.getItem("myToken");
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
      .get("http://127.0.0.1:8000/api/Espece/" + cmd.id_espece, {
        headers: {
          // "x-access-token": token, // the token is a variable which holds the token
          "Content-Type": "application/json",
          "Authorization": myToken,
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
    const myToken = `Bearer ` + localStorage.getItem("myToken");
    axios
      .post("http://127.0.0.1:8000/api/commande", this.state.commande, {
        headers: {
          Accept: "application/json",
          "Authorization": myToken,
        },
      })
      .then((res) => {
        axios
          .put(
            "http://127.0.0.1:8000/api/Espece/" + this.state.commande.id_espece,
            {
              statut: "réservé",
              //   msg_refus_avance: this.state.dataUrl,
            },
            {
              headers: { "Content-Type": "application/json",
            "Authorization": myToken, },
            }
          )
          .then((res) => {
            this.props.history.push("/commandesParStatut");
          });
          
        Swal.fire({
          title: "Commande validée",
          text: "Finalisez votre commande dans Mes Commandes",
          icon: "success",
         
          heightAuto: false,
          confirmButtonColor: "#7fad39",

          confirmButtonText: "Ok!",
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // login(user).then(

    //   // console.log('loged')
    // );
  }

  annulerCommande () {
    Swal.fire("commande annulée");
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
                Vous pouvez maintenant payer l'avance de votre bête pour
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
                  <br></br>
                  <li>
                    <a
                      onClick={this.annulerCommande}
                      href="./Toutes"
                      class="primary-btn"
                      id="aStyle"
                    >
                      Annuler commande
                    </a>{" "}
                    <br></br>
                    <a
                      href="/commandesParStatut"
                      class="primary-btn"
                      onClick={this.handlPost}
                      id="aStyle"
                    >
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
