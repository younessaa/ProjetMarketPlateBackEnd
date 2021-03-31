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
      Livraison:[],
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
              let liv=[];
              Object.values(res.data).map((m)=>m.map((k)=>liv.push(k)));
              this.setState({
                Livraison:  liv,
               
              });
              
            });
          });
      });
    }



  }

  render() {
    const { loading } = this.state;
    let k = [];
    this.state.Commandes.map((c) => {
      ;
      var found = false;
      for (var i = 0; i < c.espece.length; i++) {
        if (c.espece[i].statut == 'produit avarié') {
          found = true;
          if (found) { k.push(c) }
          break;
        }
      } 
    })

    //rejet
   let nbr=[] ;
   this.state.Livraison.map(liv=>(liv.commandes.filter(
     cmd=>cmd.especes.filter(stat=>(stat.statut_livraison=='Livré et refusé')).length>=1)).map((l)=>nbr.push(l)) );
    let nbr_rejet=nbr.length;
    let id_esp=[];
    nbr.map((m)=>id_esp.push(m.id_commande))
     // avarié
    let avarié=( this.state.Commandes.filter(cmd=>cmd.espece.filter(stat=>(stat.statut=='produit avarié')).length>=1
    &&cmd.especes.filter((esp)=>esp.motif_annulation!=null && esp.choix_client==null  ).length>=1))
 // console.log(avarié.filter(cmd=>cmd.espece.filter(stat=>(stat.statut=='produit avarié')).length>=1
  //&&cmd.especes.filter((esp)=>esp.motif_annulation!=null && esp.choix_client==null  ).length>=1))
     // Commandes annulées

const cmdDeadlineDépassé = this.state.Commandes.filter(
      (Commandes) => Commandes.statut === "commande annulée (deadline dépassé)" ||
        Commandes.statut === "reçu avance refusé" ||
        Commandes.statut === "reçu reste refusé" ||
        Commandes.statut==="annulé par client"
    );
  
     //Avances a payer
    const cmdAvancesEnAttenteDePaiement = this.state.Commandes.filter(
      (Commandes) => id_esp.includes(Commandes._id)==false
      && Commandes.statut === "en attente de paiement avance"
      &&(Commandes.espece.filter(stat=>(stat.statut=='produit avarié')).length<1||(Commandes.espece.filter(stat=>(stat.statut=='produit avarié')).length>=1 && Commandes.especes.filter((esp)=>(esp.motif_annulation!=null && esp.choix_client!=null)||(esp.motif_annulation==null && esp.choix_client==null)  ).length==Commandes.especes.length))
      );
  
    //Produit réservé
    const cmdAvancesEnAttenteDeValidationt = this.state.Commandes.filter(
      (Commandes) => id_esp.includes(Commandes._id)==false
      && Commandes.statut === "en attente de validation avance"
      &&(Commandes.espece.filter(stat=>(stat.statut=='produit avarié')).length<1||(Commandes.espece.filter(stat=>(stat.statut=='produit avarié')).length>=1 && Commandes.especes.filter((esp)=>(esp.motif_annulation!=null && esp.choix_client!=null)||(esp.motif_annulation==null && esp.choix_client==null)  ).length==Commandes.especes.length))
       
    );
    // Reste à payer

    const cmdAvancesMontantinalEnAttenteP = this.state.Commandes.filter(
      (Commandes) => id_esp.includes(Commandes._id)==false
      && Commandes.statut === "en attente de paiement du reste"
      &&(Commandes.espece.filter(stat=>(stat.statut=='produit avarié')).length<1||(Commandes.espece.filter(stat=>(stat.statut=='produit avarié')).length>=1 && Commandes.especes.filter((esp)=>(esp.motif_annulation!=null && esp.choix_client!=null)||(esp.motif_annulation==null && esp.choix_client==null)  ).length==Commandes.especes.length))

    );
 
    //Produit à livrer
  
    const cmdPaiementFinalvalidé = this.state.Commandes.filter(
     (Commandes) =>  
    id_esp.includes(Commandes._id)==false
      && Commandes.statut === "validé" || Commandes.statut === "en attente de validation reste" 
      &&(Commandes.espece.filter(stat=>(stat.statut=='produit avarié')).length<1||(Commandes.espece.filter(stat=>(stat.statut=='produit avarié')).length>=1 && Commandes.especes.filter((esp)=>(esp.motif_annulation!=null && esp.choix_client!=null)||(esp.motif_annulation==null && esp.choix_client==null)  ).length==Commandes.especes.length))

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
                          state: { id: "commande annulée (deadline dépassé)" },
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

                                <br></br>{" "}
                                <br></br>{" "}
                                <img
                                  src="Images/info.png"
                                  width="95px"
                                  height="95px"
                                />
                                <h4 style={{ color: "white" }}>
                                  <br></br> Comment utiliser cette rubrique ?
                              </h4>
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

                          state: { id: "commande annulée (deadline dépassé)#reçu avance refusé#reçu reste refusé#rejeté#produit avarié" },
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
                                  <b>{cmdDeadlineDépassé.length-(-avarié.length)-(-nbr_rejet)}{" "}<GiSheep className=" mr-1  " /></b>
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
                                <br></br>
                                <br></br>
                                <h4 style={{ color: "white" }}>
                                  Avances a payer
                              </h4>
                                <br></br>

                                <h2 style={{ color: "white" }}>
                                  <b>{cmdAvancesEnAttenteDePaiement.length}{" "} <GiSheep className=" mr-1  " /></b>
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
                                  <b>{cmdAvancesEnAttenteDeValidationt.length}{" "}<GiSheep className=" mr-1  " /></b>
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
                                  <b>{cmdAvancesMontantinalEnAttenteP.length}{" "}<GiSheep className=" mr-1  " /></b>
                                </h2>

                              </a>
                            </center>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Link
                        to={{ pathname: "/Commandes", state: { id: "validé#en attente de validation reste" } }}
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

                                <h2 style={{ color: "white" }}>
                                  <b>{cmdPaiementFinalvalidé.length}{" "}<GiSheep className=" mr-1  " /></b>
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
