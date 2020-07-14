import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Commandes extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Commandes: [],
      redirect: false,
      // mouton: {},
      showAvance: false,
      showReste: false,
    };
    // this.elv = this.elv.bind(this);
  }
  // elv = (id) => {
  //   axios
  //     .get("http://127.0.0.1:8000/api/mouton/" + id)
  //     .then((res) => {
  //       //  console.log(res.data.objet)
  //       this.setState({ mouton: res.data.objet });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  componentDidMount() {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      this.props.history.push("/login");
    } else {
      // console.log(token);
      axios
        .get("http://127.0.0.1:8000/api/commande", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            "Content-Type": "application/json",
          },
          params: {
            id_consommateur: token,
            order_by: "date_creation",
            order_mode: "asc",
          },
        })

        .then((res) => {
          // console.log(res.data);
          this.setState({
            Commandes: res.data,
          });
          if (res.data.reçu_avance==null) {
            this.setState({ showAvance: true });
          } 

          if (res.data.reçu_montant_restant ==null && res.data.reçu_avance!=null ) {
            this.setState({ showRest: true });
          }
        });
    }
  }

  render() {
    return (
      <div>
        {/* //   {/* <!-- Page Preloder --> */}
        {/* <div id="preloder">
           <div className="loader"></div>
        </div>  */}

        <section className="product spad">
          <div className="container">
            <h4 class="latest-product__item">Mes commandes</h4>
            <div className="row">
              <div className="col-lg-12 col-md-7">
                {/*<!-- Sheeps Grid Section Begin --> */}

                <div class="row">
                  {this.state.Commandes.map((Annonces) => (
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div class="product__item">
                        <div
                          class="product__item__pic set-bg"
                          // data-setbg={Annonces.image}
                        >
                          {/* {this.elv(Annonces.id_mouton)} */}
                          <img
                            src={Annonces.mouton.images}
                            class="product__item__pic set-bg"
                          />
                          <ul class="product__item__pic__hover">
                            <li>
                            <Link
                          to={{
                            pathname: "/DetailsCommande",
                            state: {
                              id: Annonces,
                            },
                          }}
                          type="submit"
                        >  <a href="#">
                                <i class="fa fa-eye"></i>
                              </a></Link>
                            </li>
                          </ul>
                        </div>
                        <div class="product__item__text">
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="checkout__input">
                                <b>Boucle</b>
                                <br></br>
                                {"         " + Annonces.mouton.boucle}
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div class="checkout__input">
                                <b>Race</b>
                                <br></br>
                                {"         " + Annonces.mouton.race}
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-lg-6">
                              <div class="checkout__input">
                                <b>Sexe</b>
                                <br></br>
                                {"         " + Annonces.mouton.sexe}
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div class="checkout__input">
                                <b>Poids</b>
                                <br></br>
                                {"         " + Annonces.mouton.poids + "  Kg"}
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-lg-6">
                              <div class="checkout__input">
                                <b>Prix</b>
                                <br></br>
                                {"         " + Annonces.mouton.prix + "Dh"}
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div class="checkout__input">
                                <b>Ville livraison</b>
                                <br></br>
                                {/* {"         " + Annonces.ville_livraison} */}
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="checkout__input">
                                <b>Point de relais</b>
                                <br></br>
                                {"         " + Annonces.point_relais}
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div class="checkout__input">
                                <b>Date création</b>
                                <br></br>
                                {"         " + Annonces.date_creation}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="shoping__checkout">
                        {this.state.showAvance ? (
                          <div>
                            <a href="" class="primary-btn">
                              Importer : reçu Avance
                            </a>{" "}
                          </div>
                        ) : null}
                           {this.state.showReste? (
                          <div>
                            <a href="" class="primary-btn">
                              Importer reçu : montant restant
                            </a>{" "}
                          </div>
                        ) : null}

                        <br></br>
                        <a href="./Commandes" class="primary-btn">
                          Annuler commande
                        </a>
                      </div>
                      <br/><br/>
                    </div>
                  ))}
                </div>
                {/* <!-- Sheeps Grid Section End --> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Commandes;
