import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class AllOffers extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Eleveurs: [
        // {
        //   Nom: "Mohamed Rachidi ",
        //   Région: "Oujda",
        //   image: "Images/Eleveur.jpg",
        //   nombre_moutons: "50"
        // },
        // {
        //   Nom: "Taher Hamid ",
        //   Région: "Berkane",
        //   image: "Images/Eleveur.jpg",
        //   nombre_moutons: "25"
        // },
        // {
        //   Nom: "Madani Ali",
        //   Région: "Nador",
        //   image: "Images/Eleveur.jpg",
        //   nombre_moutons: "60"
        // },
        // {
        //   Nom: "Mohamed Rachidi ",
        //   Région: "Oujda",
        //   image: "Images/Eleveur.jpg",
        //   nombre_moutons: "20"
        // },
        // {
        //   Nom: "Mohamed Oujidi ",
        //   Région: "Berkane",
        //   image: "Images/Eleveur.jpg",
        //   nombre_moutons: "15"
        // },
      ],
      // Annonces:[],
      redirect: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/eleveurs", {
        headers: {
          // "x-access-token": token, // the token is a variable which holds the token
        },
      })
      .then((res) => {
        // console.log(res);
        this.setState({
          Eleveurs: res.data,
        });
      });
  }

  // componentMoutons= (ide) =>  {
  //   // const ide = this.props.location.state.id;

  //   axios
  //     .get("http://127.0.0.1:8000/api/eleveur/" + ide, {
  //       headers: {
  //         // "x-access-token": token, // the token is a variable which holds the token
  //       },
  //     })
  //     .then((res) => {

  //       res.data.moutons.map((mouton) =>

  //         axios
  //           .get("http://127.0.0.1:8000/api/mouton/" + mouton.id_mouton, {
  //             headers: {
  //               // "x-access-token": token, // the token is a variable which holds the token
  //             },
  //           })
  //           .then((resp) => {
  //             this.setState({
  //               Annonces: this.state.Annonces.concat(resp.data.objet)
  //             });
  //             // this.state.Annonces.concat(resp.data.objet)
  //           })
  //       );
  //       // window.location.reload();
  //     });
  //     return this.state.Annonces
  // }

  render() {
    var elv = this.state.Eleveurs.filter(
      (Eleveurs) => Eleveurs.moutons !== undefined
    );
    console.log(elv);

    return (
      <div>
        {/* <!-- Page Preloder --> */}
        <div id="preloder">
          <div className="loader"></div>
        </div>

        <section className="product spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-7">
                <div className="filter__item">
                  <div className="row">
                    <div className="col-lg-4 col-md-5"></div>
                    <div className="col-lg-12 col-md-12">
                      <div className="filter__found text-left">
                        <h6>
                          <span>{elv.length}</span> Eleveurs{" "}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                {/*<!-- Sheeps Grid Section Begin --> */}

                <div class="row">
                  {elv.map((Eleveurs) => (
                    <div class="col-lg-4 col-md-6 col-sm-6">
                      <div class="product__item">
                        <div
                          class="product__item__pic set-bg"
                          // data-setbg="Images/Eleveur.jpg"
                        >
                          <center>
                            <img
                              src="Images/profilEleveur.jpg"
                              className="product__item__pic set-bg"
                            />
                          </center>
                          <ul class="product__item__pic__hover">
                            <Link
                              key={Eleveurs._id}
                              // onClick={this.componentMoutons(Eleveurs._id)}
                              to={{
                                pathname: "/HomeSheepsParEleveur",
                                state: {
                                  id: {
                                    id: Eleveurs._id,
                                    nom: Eleveurs.nom,
                                    prenom: Eleveurs.prenom,
                                  },
                                },
                              }}
                              // id={Eleveurs._id}
                            >
                              <li>
                                <a href="ToutesLesAnnoncesElveur">
                                  {" "}
                                  <i class="fa fa-eye"></i>{" "}
                                </a>
                              </li>
                            </Link>
                          </ul>
                        </div>
                        <div class="product__item__text">
                          <h6>
                            {Eleveurs.prenom + "         " + Eleveurs.nom}
                          </h6>
                          <h6>{"         " + Eleveurs.adresse}</h6>
                          <h5>
                            {"         " + Eleveurs.moutons.length} Têtes de
                            moutons au total
                          </h5>
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

export default AllOffers;
