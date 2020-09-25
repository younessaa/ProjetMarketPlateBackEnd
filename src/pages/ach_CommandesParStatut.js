import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


class CommandesParStatut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Commandes: [],
      redirect: false,
    };
  }

  componentDidMount() {
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
      // console.log(token);
      axios
        .get("http://127.0.0.1:8000/api/commande", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            "Content-Type": "application/json",
            Authorization: myToken,
          },
          params: {
            id_consommateur: token,
            order_by: "date_creation",
            order_mode: "asc",
          },
        })

        .then((res) => {
          this.setState({
            Commandes: res.data,
          });
        });
    }
  }

  render() {
    const cmdDeadlineDépassé = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "commande annulée (deadline dépassé)"
    );
    const cmdAvancesEnAttenteDePaiement = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "en attente de paiement avance"
    );
    const cmdAvancesEnAttenteDeValidationt = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "en attente de validation avance"
    );
    const cmdAvancesRefusées = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "reçu avance refusé"
    );

    const cmdAvancesValidées = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "en attente de paiement du reste"
    );

    const cmdAvancesMontantinalEnAttenteP = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "en attente de paiement du reste"
    );
    const cmdPaiementFinalEnAttenteDeValidation = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "en attente de validation reste"
    );
    const cmdPaiementFinalR = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "reçu reste refusé"
    );

    const cmdPaiementFinalvalidé = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "validé"
    );

    return (
      <div>
        <center>
          <div>
            <section className="featured spad">
              <div className="container">
                {/*<!-- Categorie Menus Grid Section Begin --> */}
                <div class="row featured__filter">
                  {/* à ajouter */}
                  <div class="col-lg-12 col-md-12 col-sm-12">
                    <Link
                      to={{
                        pathname: "/Commandes",
                        state: { id: "commande annulée (deadline dépassé)" },
                      }}
                    >
                      {" "}
                      <div id="cadre" class="featured__item">
                        <div
                          class="featured__item__pic set-bg"
                          data-setbg="Images/bg_purple.jpg"
                          padding-left="10px"
                          padding-right="10px"
                        >
                          <center>
                            <a href="">
                              <br></br>{" "}
                              <h2 style={{ color: "white" }}>
                                <b>{cmdDeadlineDépassé.length}</b>
                              </h2>
                              <br></br>
                              <h6 style={{ color: "white" }}>
                                Commandes annulées automatiquement{" "}
                              </h6>
                              <br></br>
                              <img
                                src="Images/warning.png"
                                width="95px"
                                height="95px"
                              />
                              <h6 style={{ color: "white" }}>
                                <br></br> <b>Deadline dépassé</b>
                              </h6>
                              <br></br>
                            </a>
                          </center>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* à ajouter */}
                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link
                      to={{
                        pathname: "/Commandes",
                        state: { id: "en attente de paiement avance" },
                      }}
                    >
                      <div id="cadre" class="featured__item">
                        <div
                          class="featured__item__pic set-bg"
                          data-setbg="Images/bg_red.jpg"
                          padding-left="10px"
                          padding-right="10px"
                        >
                          <center>
                            <a href="">
                              <br></br>{" "}
                              <h2 style={{ color: "white" }}>
                                <b>{cmdAvancesEnAttenteDePaiement.length}</b>
                              </h2>
                              <br></br>
                              <h6 style={{ color: "white" }}>
                                Avances en attente de paiement
                              </h6>
                              <br></br>
                              <img
                                src="Images/waiting_payment.png"
                                width="95px"
                                height="95px"
                              />
                            </a>
                          </center>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link
                      to={{
                        pathname: "/Commandes",
                        state: { id: "en attente de validation avance" },
                      }}
                    >
                      <div id="cadre" class="featured__item">
                        <div
                          class="featured__item__pic set-bg"
                          data-setbg="Images/bg_bleu.jpg"
                          padding-left="10px"
                          padding-right="10px"
                        >
                          <center>
                            <a href="">
                              <br></br>{" "}
                              <h2 style={{ color: "white" }}>
                                <b>{cmdAvancesEnAttenteDeValidationt.length}</b>
                              </h2>
                              <br></br>
                              <h6 style={{ color: "white" }}>
                                Avances en attente de validation
                              </h6>
                              <br></br>
                              <img
                                src="Images/hourglass.png"
                                width="95px"
                                height="95px"
                              />
                            </a>
                          </center>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link
                      to={{
                        pathname: "/Commandes",
                        state: { id: "reçu avance refusé" },
                      }}
                    >
                      <div id="cadre" class="featured__item">
                        <div
                          class="featured__item__pic set-bg"
                          data-setbg="Images/bg_orange.jpg"
                          padding-left="10px"
                          padding-right="10px"
                        >
                          <center>
                            <a href="">
                              <br></br>{" "}
                              <h2 style={{ color: "white" }}>
                                <b>{cmdAvancesRefusées.length}</b>
                              </h2>
                              <br></br>
                              <h6 style={{ color: "white" }}>
                                Avances refusées
                              </h6>
                              <br></br>
                              <img
                                src="Images/sad.png"
                                width="95px"
                                height="95px"
                              />
                            </a>
                          </center>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link
                      to={{
                        pathname: "/Commandes",
                        state: { id: "en attente de paiement du reste" },
                      }}
                    >
                      <div id="cadre" class="featured__item">
                        <div
                          class="featured__item__pic set-bg"
                          data-setbg="Images/bg_green.png"
                          padding-left="10px"
                          padding-right="10px"
                        >
                          <center>
                            <a href="">
                              <br></br>{" "}
                              <h2 style={{ color: "white" }}>
                                <b>{cmdAvancesValidées.length}</b>
                              </h2>
                              <br></br>
                              <h6 style={{ color: "white" }}>
                                Avances validées
                              </h6>
                              <br></br>
                              <img
                                src="Images/smile.png"
                                width="95px"
                                height="95px"
                              />
                            </a>
                          </center>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* à ajouter */}

                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link
                      to={{
                        pathname: "/Commandes",
                        state: { id: "en attente de paiement du reste" },
                      }}
                    >
                      <div id="cadre" class="featured__item">
                        <div
                          class="featured__item__pic set-bg"
                          data-setbg="Images/bg_red1.jpg"
                          padding-left="10px"
                          padding-right="10px"
                        >
                          <center>
                            <a href="">
                              <br></br>{" "}
                              <h2 style={{ color: "white" }}>
                                <b>{cmdAvancesMontantinalEnAttenteP.length}</b>
                              </h2>
                              <br></br>
                              <h6 style={{ color: "white" }}>
                                Montant final en attente <br></br> de paiement
                              </h6>
                              <br></br>
                              <img
                                src="Images/waiting_payment.png"
                                width="95px"
                                height="95px"
                              />
                            </a>
                          </center>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link
                      to={{
                        pathname: "/Commandes",
                        state: { id: "en attente de validation reste" },
                      }}
                    >
                      <div id="cadre" class="featured__item">
                        <div
                          class="featured__item__pic set-bg"
                          data-setbg="Images/bg_bleu1.png"
                          padding-left="10px"
                          padding-right="10px"
                        >
                          <center>
                            <a href="">
                              <br></br>
                              <h2 style={{ color: "white" }}>
                                <b>
                                  {cmdPaiementFinalEnAttenteDeValidation.length}
                                </b>
                              </h2>
                              <br></br>
                              <h6 style={{ color: "white" }}>
                                Paiement final en attente de validation
                              </h6>
                              <br></br>
                              <img
                                src="Images/hourglass.png"
                                width="95px"
                                height="95px"
                              />
                            </a>
                          </center>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link
                      to={{
                        pathname: "/Commandes",
                        state: { id: "reçu reste refusé" },
                      }}
                    >
                      <div id="cadre" class="featured__item">
                        <div
                          class="featured__item__pic set-bg"
                          data-setbg="Images/bg_orange1.jpg"
                          padding-left="10px"
                          padding-right="10px"
                        >
                          <center>
                            <a href="">
                              <br></br>{" "}
                              <h2 style={{ color: "white" }}>
                                <b>{cmdPaiementFinalR.length}</b>
                              </h2>
                              <br></br>
                              <h6 style={{ color: "white" }}>
                                Paiement final refusé
                              </h6>
                              <br></br>
                              <img
                                src="Images/sad.png"
                                width="95px"
                                height="95px"
                              />
                            </a>
                          </center>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div class="col-lg-3 col-md-4 col-sm-6">
                    <Link
                      to={{ pathname: "/Commandes", state: { id: "validé" } }}
                    >
                      <div id="cadre" class="featured__item">
                        <div
                          class="featured__item__pic set-bg"
                          data-setbg="Images/bg_green1.jpg"
                          padding-left="10px"
                          padding-right="10px"
                        >
                          <center>
                            <a href="">
                              <br></br>{" "}
                              <h2 style={{ color: "white" }}>
                                <b>{cmdPaiementFinalvalidé.length}</b>
                              </h2>
                              <br></br>
                              <h6 style={{ color: "white" }}>
                                Paiement final validé
                              </h6>
                              <br></br>
                              <img
                                src="Images/smile.png"
                                width="95px"
                                height="95px"
                              />
                            </a>
                          </center>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* <!-- Categorie Menus Grid Section End --> */}
              </div>
            </section>
          </div>
        </center>
      </div>
    );
  }
}

export default CommandesParStatut;
