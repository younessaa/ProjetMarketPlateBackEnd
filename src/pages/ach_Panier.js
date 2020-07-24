import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Commandes extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Favoris: [],
      redirect: false,
      // mouton: {},
      // showAvance: false,
      // showReste: false,
    };
    // this.elv = this.elv.bind(this);
    this.handleDeleteFromPanier = this.handleDeleteFromPanier.bind(this);
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
      axios
        .get("http://127.0.0.1:8000/api/consommateur/" + token + "/panier", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            "Content-Type": "application/json",
          },
        })

        .then((res) => {
          this.setState(
            {
              Favoris: res.data,
            },
            () =>
              this.setState({
                Favoris: this.state.Favoris.filter(
                  (Favoris) => Favoris.statut === "disponible"
                ),
              })
          );
        });
    }
  }

  handleDeleteFromPanier(Mid) {
    // const idm = this.props.location.state.id;
    // console.log(Mid);
    const token = localStorage.getItem("usertoken");
    if (!token) {
      this.props.history.push("/login");
    } else {
      // console.log(token);
      axios
        .put(
          "http://127.0.0.1:8000/api/consommateur/" + token + "/panier/" + Mid,

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(this.props.history.push("ToutesLesAnnonces"));
    }
  }

  render() {
    var fav = this.state.Favoris.filter((Favoris) => Favoris !== null);
    console.log(fav);

    return (
      <div>
        {/* //   {/* <!-- Page Preloder --> */}
        {/* <div id="preloder">
           <div className="loader"></div>
        </div>  */}

        <section className="">
          <div className="container">
            <h4 class="latest-product__item">Mon Panier</h4>
            <div className="row">
              <div className="col-lg-12 col-md-7">
                {/*<!-- Sheeps Grid Section Begin --> */}

                <div class="row">
                  {fav.map((Annonces) => (
                    //  {if(Annonces){}}
                    <div className="col-lg-3 col-md-3 col-sm-6">
                      {console.log(Annonces)}
                      <div className="product__item">
                        <div
                          className="product__item__pic set-bg"
                          // data-setbg={Annonces.images}
                          // src="Images/sardi1.jpg"
                        >
                          <centre>
                            {" "}
                            <img
                              src={Annonces.image_face}
                              className="product__item__pic set-bg"
                            />
                          </centre>

                          <ul class="product__item__pic__hover">
                            <li>
                              <Link to={`/DetailsMouton/${Annonces._id}`}>
                                <a href="#">
                                  <i class="fa fa-eye"></i>
                                </a>
                              </Link>
                            </li>
                            <li>
                              <a
                                id={Annonces._id}
                                onClick={(e) =>
                                  this.handleDeleteFromPanier(
                                    e.currentTarget.id
                                  )
                                }
                              >
                                <i class="fa fa-trash"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="product__item__text">
                          {/* <h6 className="text-danger">{"         " + Annonces.statut}</h6> */}

                          {/* <h6>{"   Livrer à :      " + Annonces.point_relais}</h6> */}
                          {/* <h6> {"         " + Annonces.prix + "  MAD"}</h6> */}

                          <h5>{"         " + Annonces.prix + " MAD"}</h5>
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
