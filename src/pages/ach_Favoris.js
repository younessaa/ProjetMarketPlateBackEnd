import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import "bootstrap-less";
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
      activePage: 15,
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
      axios
        .get("http://127.0.0.1:8000/api/consommateur/" + token + "/favoris", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            // "Content-Type": "application/json",
            Authorization: myToken,
          },
        })
        .then((res) => {
          this.setState(
            {
              Favoris: res.data,
            },
            () => console.log("in call" + this.state.Favoris)
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
    }
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  paginate(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  render() {
    var fav = this.state.Favoris.filter((Favoris) => Favoris !== null);
     const indexOfLastAnnonce =
       this.state.currentPage * this.state.annoncesPerPage;
     const indexOfFirstAnnonce =
       indexOfLastAnnonce - this.state.annoncesPerPage;
     const currentAnnonces = this.state.Favoris.slice(
       indexOfFirstAnnonce,
       indexOfLastAnnonce
     );
     const { loading } = this.state;
    console.log(fav);
    let titre;
    if (fav.length == 1 || fav.length == 0) {
      titre = (
        <h6>
          <span>{fav.length}</span> Bête{" "}
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
              Mes favoris <i className="fa fa-heart"> </i>
            </h3>
            <div className="row">
              
              <div className="col-lg-12 col-md-7">
                {/*<!-- Sheeps Grid Section Begin --> */}
                <div className="filter__found text-left">
                  <h6>
                    <span>{titre}</span>
                  </h6>
                </div>
                <div class="row">
                  {fav.map((Annonces) => (
                    //  {if(Annonces){}}
                    <div className="col-lg-3 col-md-3 col-sm-6">
                      {console.log(Annonces)}
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
                <div className="center-div">
                  <nav className="row">
                    <ul className="pagination center-div">
                      {this.state.nombrePages.map((number) => (
                        <li key={number} className="page-item stylePagination">
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
