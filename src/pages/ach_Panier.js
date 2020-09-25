import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
class Commandes extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      loading: true,
      activePage: 1,
      nombrePages: [],
      currentPage: 1,
      annoncesPerPage: 5,
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
      appendLeadingZeroes(current_datetime.getHours() - 2) +
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
      this.setState({ loading: true }, () => {
        axios
          .get("http://127.0.0.1:8000/api/consommateur/" + token + "/panier", {
            headers: {
              // "x-access-token": token, // the token is a variable which holds the token
              "Content-Type": "application/json",
              Authorization: myToken,
            },
          })
          .then((res) => {
            this.setState(
              {
                Favoris: res.data,
                loading: false,
              },
              () =>
                this.setState({
                  Favoris: this.state.Favoris.filter(
                    (Favoris) => Favoris.statut === "disponible"
                  ),
                })
            );

            const pageNumbers = [];
            for (
              let i = 1;
              i <=
              Math.ceil(this.state.Favoris.length / this.state.annoncesPerPage);
              i++
            ) {
              pageNumbers.push(i);
            }
            this.setState({ nombrePages: pageNumbers });
          });
      });
    }
  }
  handleDeleteFromPanier(Mid) {
    // const idm = this.props.location.state.id;
    // console.log(Mid);
    const token = localStorage.getItem("usertoken");
    const myToken = `Bearer ` + localStorage.getItem("myToken");
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
              Authorization: myToken,
            },
          }
        )
        .then(this.props.history.push("ToutesLesAnnonces"));
    }
  }

  paginate(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  render() {
    var fav = this.state.Favoris.filter((Favoris) => Favoris !== null);
    // console.log(fav);
    const indexOfLastAnnonce =
      this.state.currentPage * this.state.annoncesPerPage;
    const indexOfFirstAnnonce = indexOfLastAnnonce - this.state.annoncesPerPage;
    const currentAnnonces = this.state.Favoris.slice(
      indexOfFirstAnnonce,
      indexOfLastAnnonce
    );
    const { loading } = this.state;

    let titre;
    if (fav.length == 1 || fav.length == 0) {
      titre = (
        <h6>
          <span>{fav.length}</span> Bêtes{" "}
        </h6>
      );
    } else {
      titre = (
        <h6>
          <span>{fav.length}</span> Bêtes{" "}
        </h6>
      );
    }
    return (
      <div>
        {/* //   {/* <!-- Page Preloder --> */}
        {/* <div id="preloder">
           <div className="loader"></div>
        </div>  */}
        <section className="">
          <div className="container">
            <br></br>
            <h3 class="latest-product__item">
              Mon Panier <i class="fa fa-shopping-cart"></i>
            </h3>
            <div className="row">
              
              <div className="col-lg-12 col-md-7">
                {/*<!-- Sheeps Grid Section Begin --> */}
                <div className="filter__found text-left">
                  <h6>
                    <span>{titre}</span>
                  </h6>
                </div>
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
                      <Loader
                        type="Oval"
                        color="#7fad39"
                        height="80"
                        width="80"
                      />
                    </div>
                  ) : (
                    <div>
                      <div class="row">
                        {currentAnnonces.map((Annonces) => (
                          //  {if(Annonces){}}
                          <div className="col-lg-3 col-md-3 col-sm-6">
                            {console.log(Annonces.created_at)}
                            <div id="anonce" className="product__item">
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
                                <h5>{"         " + Annonces.poids + " Kg"}</h5>
                                <h5 id="prixFav">
                                  {"         " + Annonces.prix + " MAD"}
                                </h5>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* <!-- Sheeps Grid Section End --> */}

                      <div className="center-div">
                        <nav className="row">
                          <ul className="pagination center-div">
                            {this.state.nombrePages.map((number) => (
                              <li
                                key={number}
                                className="page-item stylePagination"
                              >
                                <a
                                  onClick={() => this.paginate(number)}
                                  className="page-link"
                                >
                                  {number}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </div>
                      <br></br>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <br></br>
          </div>
        </section>
      </div>
    );
  }
}
export default Commandes;
