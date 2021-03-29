import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
 


//import menu_eleveur from '/public/Images/eleveurs.png'; // with import

class AlerteCommande extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      commande: {},
      cooperative: null,
      rib: '',
      tech: '',
      deadline: '',
      avance: '',
      date: Date,
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

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

   
 
  componentDidMount = async () => {
    const cmd = this.props.location.state.id;
    const myToken = `Bearer ` + localStorage.getItem("myToken");
    this.setState({
      commande: this.props.location.state.id,
      deadline: (this.props.location.state.id.deadline.replace(",", "  à ")).substr(0, 20),
      avance: this.props.location.state.id.avance,
      //date: datetime,
    });





    axios
      .get("http://127.0.0.1:8000/api/cooperative/" + cmd.id_cooperative, {
        headers: {
          // "x-access-token": token, // the token is a variable which holds the token
          "Content-Type": "application/json",
          "Authorization": myToken,
        },
      })

      .then((res) => {
        this.setState({ cooperative: res.data, tech: res.data.tech[0].prenom + " " + res.data.tech[0].nom, rib: res.data.rib });
      });
    await this.sleep(1000)



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
        console.log(this.state.commande.especes)
        this.state.commande.especes.map((e) =>
        (
          axios
            .put(
              "http://127.0.0.1:8000/api/Espece/" + e.id_espece,
              {
                statut: "réservé",
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
              this.props.history.push("./commandesParStatut");
            })
        ))

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

  annulerCommande() {
    Swal.fire("commande annulée");
  }

  render() {
    //control-arrow control-next

    return (
      <div className="">  
        <style>{` .carousel {    height:400px;}`}</style>
        <section className="product spad">
          <div className="container">
            <div class="col-lg-12 col-md-6 mx-5 ">
              <h3>Votre commande s'est déroulé avec succès</h3> <br></br>
              <h5 className="mw-75 " style={{ marginLeft: "2%", marginRight: "10%" }} >
                Pour valider votre commande , il vous suffit de payer les frais de reservation en effectuant
               {this.state.commande.mode_paiement_choisi == "transfert" ? <span>
                  {" un transfert d'argent au  technicien : "}<span className="text-danger">{this.state.tech.toUpperCase()}</span> </span> :
                  <span>
                    {"  un virement sur le rib suivant : "}<span className="text-danger">{this.state.rib}</span></span>}
                <br></br>
                <br></br>
                Frais de reservation  à payer  : <span className="text-danger" >{this.state.avance} Dhs</span>
              </h5>
              <br></br>
        
              <div style={{ maxHeight:"600px",maxWidth: "50%", marginLeft: "20%" }}>

                <Carousel  >
                  {this.state.commande.mode_paiement_choisi == "transfert" ? <div>
                    <img src="/Images/1p.jpg" />
                   </div> : <div>
                    <img src="/Images/11p.jpg" />
                   </div>}

                  <div>
                    <img src="/Images/2p.jpg" />
                     
                  </div>
                  <div>
                    <img src="/Images/3p.png" />
                   </div>
                  <div>
                    <img src="/Images/4p.png" />
                  </div>
                  <div>
                    <img src="/Images/5p.png" />
                  </div>
                  <div>
                    <img src="/Images/6p.png" />

                  </div>
                  <div>
                    <img src="/Images/7p.jpg" />
                   </div>
                </Carousel>
              </div>
              <div class="checkout__input bg-ligh text-danger h6 center">
                Attention: Il vous reste jusqu'au{" "}{this.state.deadline}
                <span>
                  <b> {/*this.state.date*/}</b>
                </span>{" "}
                pour payer et importer votre reçu de paiement.
              </div>
              <div class="checkout__input bg-ligh text-danger h6 center  " style={{ marginBottom: "90px" }}>
                Au delà de ce délai, votre commande sera annulée automatiquement
                !
              </div>
              <div className="mw-75 " style={{ marginRight: "45%" }} >
                <Link
                  to={{
                    pathname: "./commandesParStatut",
                  }}
                >
                  <b className="text-danger float-right">
                    <button

                      className=" rounded text-white bg-success py-1 px-3 "
                      onClick={this.handlPost}
                      style={{ fontSize: "19px", border: "none" }}
                    //  onClick={(e) => {
                    //   this.handlePanier(e.currentTarget.id);
                    //  }
                    // }
                    > Valider la commande</button>
                  </b></Link>
              </div>
              <br></br>
              <br></br>


              <div className="mw-75  " style={{ marginRight: "45%" }} >
                <Link
                  to={{
                    pathname: "./",
                  }}
                >
                  <b className="text-danger float-right ">
                    <button

                      className=" rounded text-white bg-danger py-1 px-2 "
                      onClick={this.annulerCommande}
                      style={{ fontSize: "20px", border: "none" }}
                    //  onClick={(e) => {
                    //   this.handlePanier(e.currentTarget.id);
                    //  }
                    // }
                    >{""} Annuler la commande{" "} </button>
                  </b></Link>
              </div>


            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AlerteCommande;
