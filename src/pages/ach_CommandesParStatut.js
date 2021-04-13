import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import blu from ;
import Loader from "react-loader-spinner";
import { GiSheep } from 'react-icons/gi';

class CommandesParStatut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      Commandes: [],
      redirect: false,
      Livraison: [],
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


    const expiredTimeToken = localStorage.getItem("expiredTimeToken");
    const token = localStorage.getItem("usertoken");
    const myToken = `Bearer ` + localStorage.getItem("myToken");

    if (!token || expiredTimeToken < formatted_date) {
      this.props.history.push("/login");
    } else {
      this.setState({ loading: true }, () => {
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
              loading: false,
            });
            axios
              .get("http://127.0.0.1:8000/api/livraisons", {
                headers: {
                  // "x-access-token": token, // the token is a variable which holds the token
                  "Content-Type": "application/json",
                  Authorization: myToken,
                }
              })

              .then((res) => {
                let liv = [];
                Object.values(res.data).map((m) => m.map((k) => liv.push(k)));
                this.setState({
                  Livraison: liv,

                });

              });
          });
      });
    }
  }

  render() {
    const { loading } = this.state;
    //commandes annulees
    const cmdAnnulee = [...new Set(this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "commande annulée (deadline dépassé)" ||
        Commandes.statut === "reçu avance refusé" ||
        Commandes.statut === "reçu reste refusé" ||
        Commandes.statut === "reçu complément refusé" ||
        Commandes.statut === "annulée manuellement" ||
        Commandes.statut === "avarié" ||
        Commandes.statut === "remboursement" ||
        Commandes.statut === "avarié_changement" ||
        Commandes.statut === "avarié_remboursement" ||
        Commandes.statut === "avarié_annulé"

    ))];

    //Avances a payer
    const cmdAvancePayer = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "en attente de paiement avance"
    );

    //Produit réservé
    const cmdReserve = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "en attente de validation avance"
    );
    // Reste à payer

    const cmdRestePayer = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "en attente de paiement du reste"
    );

    //Produit à livrer
    const cmdLivrer = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "validé" ||
        Commandes.statut === "en attente de validation reste" ||
        Commandes.statut === "en attente de validation du complément"
    );

    //Produit Complement
    const cmdComplement = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "en attente de paiement du complément"
    );

    return (
      <div>
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "100",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <br></br>
            <Loader
              type="Oval"
              color="#7fad39"
              height="80"
              width="80"
            />
          </div>
        ) : (
          <center>
            <div>
              <section className="featured spad">
                <div className="container">
                  {/*<!-- Categorie Menus Grid Section Begin --> */}
                  <div className="row featured__filter">
                    {/* à ajouter */}
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Link
                        to={{
                          pathname: "/Commandes",
                          state: { id: "en attente de paiement du complément" },
                        }}
                      >
                        {" "}
                        <div id="cadre" className="featured__item">
                          <div
                            className="featured__item__pic"
                            // data-setbg="Images/bg_purple.jpg"
                            style={{
                              backgroundImage: "url(" + require("./Images/bg_orange.jpg") + ")"
                            }}
                            padding-left="10px"
                            padding-right="10px"
                          >
                            <center>
                              <a href="">
                                <br></br>{" "}
                                {cmdComplement.length == 0 ? <><br></br>{" "}<br></br>{" "}</> : null}
                                <img
                                  src="Images/info.png"
                                  width="95px"
                                  height="95px"
                                />
                                <h4 style={{ color: "white" }}>
                                  <br></br>{cmdComplement.length == 0 ? "Comment utiliser cette rubrique ?" : "Compléments à payer "}
                                </h4>
                                <br></br>
                                {cmdComplement.length != 0 ?
                                  <h2 style={{ color: "white" }}>
                                     <b>{cmdComplement.length}{" "}
                                     <img style={{ width: "40px", height: "40px", marginBottom: "8px" }}
                                      data-imgbigurl="Images/sheep-headB.png"
                                      src="Images/sheep-headB.png"
                                      alt=""
                                    /></b>
                                  </h2> : null}
                              </a>
                            </center>
                          </div>
                        </div>
                      </Link>
                    </div>


                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Link
                        to={{
                          pathname: "/Commandes",

                          state: { id: "commande annulée (deadline dépassé)#reçu avance refusé#reçu reste refusé#reçu complément refusé#avarié#rejetée#annulée manuellement#remboursement#avarié_changement#avarié_remboursement#avarié_annulé" },
                        }}
                      >
                        {" "}
                        <div id="cadre" className="featured__item">
                          <div
                            className="featured__item__pic"
                            // data-setbg="Images/bg_purple.jpg"
                            style={{
                              backgroundImage: "url(" + require("./Images/bg_orange1.jpg") + ")"
                            }}
                            padding-left="10px"
                            padding-right="10px"
                          >
                            <center>
                              <a href="">
                                <br></br>{" "}

                                <img
                                  src="Images/sad.png"
                                  width="95px"
                                  height="95px"
                                />
                                <br></br>
                                <br></br>
                                <h4 style={{ color: "white" }}>
                                  Commandes annulées{" "}
                                </h4>
                                <br></br>
                                <h2 style={{ color: "white" }}>
                                  <b>{[...new Set(cmdAnnulee)].length}{" "}<img style={{ width: "40px", height: "40px", marginBottom: "8px" }}
                                      data-imgbigurl="Images/sheep-headB.png"
                                      src="Images/sheep-headB.png"
                                      alt=""
                                    /></b>
                                </h2>
                                <br></br>
                              </a>
                            </center>
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* à ajouter */}
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Link
                        to={{
                          pathname: "/Commandes",
                          state: { id: "en attente de paiement avance" },
                        }}
                      >
                        <div id="cadre" className="featured__item">
                          <div
                            className="featured__item__pic"
                            // data-setbg="Images/bg_red.jpg"
                            style={{
                              backgroundImage: "url(" + require("./Images/bg_bleu.jpg") + ")"
                            }}
                            padding-left="10px"
                            padding-right="10px"
                          >
                            <center>
                              <a href="">
                                <br></br>{" "}
                                <img
                                  src="Images/waiting_payment.png"
                                  width="95px"
                                  height="95px"
                                />
                                <br></br><br></br>
                                <h4 style={{ color: "white" }}>
                                  Avances a payer
                              </h4>
                                <br></br>

                                <h2 style={{ color: "white" }}>
                                  <b>{cmdAvancePayer.length}{" "} <img style={{ width: "40px", height: "40px", marginBottom: "8px" }}
                                      data-imgbigurl="Images/sheep-headB.png"
                                      src="Images/sheep-headB.png"
                                      alt=""
                                    /></b>
                                </h2>
                                <br></br>
                              </a>
                            </center>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Link
                        to={{
                          pathname: "/Commandes",
                          state: { id: "en attente de validation avance" },
                        }}
                      >
                        <div id="cadre" className="featured__item">
                          <div
                            style={{
                              backgroundImage: "url(" + require("./Images/bg_bleu.jpg") + ")"
                            }}
                            className="featured__item__pic "
                            // data-setbg="Images/bg_bleu.jpg"
                            padding-left="10px"
                            padding-right="10px"
                          >
                            <center>
                              <a href="">
                                <br></br>{" "}
                                <img
                                  src="Images/hourglass.png"
                                  width="95px"
                                  height="95px"
                                />

                                <br></br>
                                <br></br>
                                <h4 style={{ color: "white" }}>
                                  Produit réservé
                              </h4>
                                <br></br>
                                <h2 style={{ color: "white" }}>
                                  <b>{cmdReserve.length}{" "}<img style={{ width: "40px", height: "40px", marginBottom: "8px" }}
                                      data-imgbigurl="Images/sheep-headB.png"
                                      src="Images/sheep-headB.png"
                                      alt=""
                                    /></b>
                                </h2>
                              </a>
                            </center>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Link
                        to={{
                          pathname: "/Commandes",
                          state: { id: "en attente de paiement du reste" },
                        }}
                      >
                        <div id="cadre" className="featured__item">
                          <div
                            className="featured__item__pic "
                            // data-setbg="Images/bg_red1.jpg"
                            style={{
                              backgroundImage: "url(" + require("./Images/bg_green.png") + ")"
                            }}
                            padding-left="10px"
                            padding-right="10px"
                          >
                            <center>
                              <a href="">
                                <br></br>{" "}
                                <img
                                  src="Images/waiting_payment.png"
                                  width="95px"
                                  height="95px"
                                />
                                <br></br><br></br>
                                <h4 style={{ color: "white" }}>
                                  Reste à payer
                              </h4>
                                <br></br>
                                <h2 style={{ color: "white" }}>
                                  <b>{cmdRestePayer.length}{" "}<img style={{ width: "40px", height: "40px", marginBottom: "8px" }}
                                      data-imgbigurl="Images/sheep-headB.png"
                                      src="Images/sheep-headB.png"
                                      alt=""
                                    /></b>
                                </h2>

                              </a>
                            </center>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Link
                        to={{ pathname: "/Commandes", state: { id: "validé#en attente de validation reste#en attente de validation du complément" } }}
                      >
                        <div id="cadre" className="featured__item">
                          <div
                            className="featured__item__pic "
                            // data-setbg="Images/bg_green1.jpg"
                            style={{
                              backgroundImage: "url(" + require("./Images/bg_green.png") + ")"
                            }}
                            padding-left="10px"
                            padding-right="10px"
                          >
                            <center>
                              <a href="">
                                <br></br>{" "}
                                <img
                                  src="Images/smile.png"
                                  width="95px"
                                  height="95px"
                                />

                                <br></br><br></br>
                                <h4 style={{ color: "white" }}>
                                  Produit à livrer
                              </h4>
                              <br></br>

                                <h2 style={{ color: "white" }}>
                                  <b>{cmdLivrer.length}{" "}<img style={{ width: "40px", height: "40px", marginBottom: "8px" }}
                                      data-imgbigurl="Images/sheep-headB.png"
                                      src="Images/sheep-headB.png"
                                      alt=""
                                    /></b>
                                </h2>
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
        )}
      </div>
    );
  }
}

export default CommandesParStatut;
