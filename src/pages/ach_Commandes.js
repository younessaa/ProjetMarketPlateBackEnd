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
      // showAvance: false,
      // showReste: false,
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
    const statut= this.props.location.state.id;
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
          this.setState(
            {
              Commandes: res.data,
            },
            () =>
              this.setState({
                Commandes: this.state.Commandes.filter(
                  (Commandes) => Commandes.statut === statut
                ),
              })
          );
          const cmd = this.state.Commandes;
          // console.log(cmd);
          // foreach (cmd as cmd_item)
          // for(var cmd_item in cmd) {
          // if (cmd_item.reçu_avance == null) {
          //   console.log(res.data.reçu_avance);
          //   this.setState({ showAvance: true });
          // } else if (
          //   cmd_item.reçu_montant_restant == null &&
          //   cmd_item.reçu_avance != null
          // ) {
          //   // console.log("reste  null");
          //   this.setState({ showReste: true }, () =>
          //     console.log(this.state.showReste)
          //   );
          // }}
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
                    // <div className="col-lg-4 col-md-4 col-sm-4">
                    //  <div className="product__item">
                    //   <div class="product__item shoping__checkout">
                    //     <div
                    //       class="product__item__pic set-bg"
                    //       // data-setbg={Annonces.image}
                    //     >
                    //       {/* {this.elv(Annonces.id_mouton)} */}
                    //       <img
                    //         src={Annonces.mouton.image_face}
                    //         class="product__item__pic set-bg"
                    //       />

                    //       <ul class="product__item__pic__hover">
                    //         <li>
                    //           <Link
                    //             to={{
                    //               pathname: "/DetailsCommande",
                    //               state: {
                    //                 id: Annonces,
                    //               },
                    //             }}
                    //             type="submit"
                    //           >
                    //             {" "}
                    //             <a href="#">
                    //               <i class="fa fa-eye"></i>
                    //             </a>
                    //           </Link>
                    //         </li>
                    //       </ul>
                    //     </div>
                    //     <div class="product__item__text">
                    //       <div class="row">
                    //         <div class="col-lg-6">
                    //           <div class="checkout__input">
                    //             <b>Boucle</b>
                    //             <br></br>
                    //             {"         " + Annonces.mouton.boucle}
                    //           </div>
                    //         </div>
                    //         <div class="col-lg-6">
                    //           <div class="checkout__input">
                    //             <b>Race</b>
                    //             <br></br>
                    //             {"         " + Annonces.mouton.race}
                    //           </div>
                    //         </div>
                    //       </div>

                    //       <div class="row">
                    //         <div class="col-lg-6">
                    //           <div class="checkout__input">
                    //             <b>Sexe</b>
                    //             <br></br>
                    //             {"         " + Annonces.mouton.sexe}
                    //           </div>
                    //         </div>
                    //         <div class="col-lg-6">
                    //           <div class="checkout__input">
                    //             <b>Poids</b>
                    //             <br></br>
                    //             {"         " + Annonces.mouton.poids + "  Kg"}
                    //           </div>
                    //         </div>
                    //       </div>

                    //       <div class="row">
                    //         <div class="col-lg-6">
                    //           <div class="checkout__input">
                    //             <b>Prix</b>
                    //             <br></br>
                    //             {"         " + Annonces.mouton.prix + "Dh"}
                    //           </div>
                    //         </div>
                    //         <div class="col-lg-6">
                    //           <div class="checkout__input">
                    //             <b>Point de relais</b>
                    //             <br></br>
                    //             {"         " + Annonces.point_relais}
                    //           </div>
                    //         </div>
                    //       </div>
                    //       <div class="row">
                    //         <div class="col-lg-6">
                    //           <div class="checkout__input">
                    //             {/* <b>Point de relais</b> */}
                    //             {/* <br></br> */}
                    //             <b>Statut</b>
                    //           </div>
                    //         </div>
                    //         <div class="col-lg-6">
                    //           <div class="checkout__input">

                    //             {/* <br></br> */}
                    //             {"         " + Annonces.statut}

                    //             </div></div>
                    //       </div>
                    //     </div>
                    //   </div>
                    //   {/* <div class="shoping__checkout">
                    //     {/* {this.state.showAvance ? (
                    //       <div>
                            // <Link
                            //   to={{
                            //     pathname: "/importRecuAvance",
                            //     state: {
                            //       id: {
                            //         idc: Annonces._id,
                            //         idm: Annonces.id_mouton,
                            //       },
                            //     },
                            //   }}
                            // >
                    //           {" "}
                    //           <a href="" class="primary-btn">
                    //             Importer : reçu Avance
                    //           </a>{" "}
                    //         </Link>
                    //       </div>
                    //     ) : null}
                    //     {this.state.showReste ? (
                    //       <div>
                    //         <Link
                    //           to={{
                    //             pathname: "/importRecuReste",
                    //             state: {
                    //               id: {
                    //                 idc: Annonces._id,
                    //                 idm: Annonces.id_mouton,
                    //               },
                    //             },
                    //           }}
                    //         >
                    //           {" "}
                    //           <a href="" class="primary-btn">
                    //             Importer reçu : montant restant
                    //           </a>{" "}
                    //         </Link>
                    //       </div>
                    //     ) : null} */}

                    //     {/* <br></br>
                    //     <a href="./Commandes" class="primary-btn">
                    //       Annuler commande
                    //     </a> */}

                    // </div></div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                      {console.log(Annonces.image_face)}
                      <div className="product__item">
                        <div
                          className="product__item__pic set-bg"
                          // data-setbg={Annonces.images}
                          // src="Images/sardi1.jpg"
                        >
                          <centre>
                            {" "}
                            <img
                              src={Annonces.mouton.image_face}
                              className="product__item__pic set-bg"
                            />
                          </centre>

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
                              >
                                {" "}
                                <a href="#">
                                  <i class="fa fa-eye"></i>
                                </a>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="product__item__text">
                          <h6 className="text-danger">
                            {"         " + Annonces.statut}
                          </h6>

                          <h6>
                            {"   Livrer à :      " + Annonces.point_relais}
                          </h6>
                          <h6>
                            {" "}
                            {"         " + Annonces.mouton.prix + "  MAD"}
                          </h6>

                          {/* <h5>{"         " + Annonces.prix + " MAD"}</h5>  */}
                        </div>
                      </div>
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
