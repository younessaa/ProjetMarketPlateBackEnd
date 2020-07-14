import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class HomeSheeps extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Annonces: [],
      conditions: {
        statut: "disponible",
        order_by: "race",
        order_mode: "asc",
      },
      redirect: false,
    };
    // this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      this.props.history.push("/login");
    } else {
      console.log(token)
    axios
      .get("http://127.0.0.1:8000/api/mouton", {
        headers: {
          // "x-access-token": token, // the token is a variable which holds the token
          "Content-Type": "application/json",
        },
        params: {
          statut: "disponible",
          order_by: "race",
          order_mode: "asc",
        },
      })
      .then((res) => {
        this.setState({
          Annonces: res.data,
        });
      });
  }}

  // onChange(e) {
  //   const n = e.target.name,
  //     v = e.target.value;

  //   this.setState({
  //     conditions: Object.assign(this.state.conditions, { [n]: v }),
  //   });
  // }

  render() {
    return (
      <div>
        {/* <!-- Page Preloder --> */}
        {/* <div id="preloder">
          <div className="loader"></div>
        </div> */}

        <section className="product spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-5">
                <div className="sidebar">
                  <div className="sidebar__item">
                    <h4>Rechercher</h4>

                    <h6 className="latest-product__item">Prix</h6>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <input
                          type="text"
                          className="latest-product__item"
                          placeholder="Budget min"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <input
                          type="text"
                          className="latest-product__item"
                          placeholder="Budget max"
                        />
                      </div>
                    </div>

                    <h6 className="latest-product__item">Race</h6>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <input
                          type="text"
                          className="latest-product__item"
                          placeholder="Choisissez la race"
                        />
                      </div>
                    </div>

                    <h6 className="latest-product__item">Poids Environ</h6>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <input
                          type="text"
                          className="latest-product__item"
                          placeholder="Poids approximatif"
                          name="piods"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>

                    <h6 className="latest-product__item">Ville</h6>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <input
                          type="text"
                          className="latest-product__item"
                          placeholder="Ville"
                        />
                      </div>
                    </div>

                    <label className="latest-product__item">
                      <input name="withImages" type="checkbox" /> Avec photos
                    </label>

                    <label className="latest-product__item">
                      <input name="withVideos" type="checkbox" /> Avec video
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-lg-9 col-md-7">
                <div className="filter__item">
                  <div className="row">
                    <div className="col-lg-4 col-md-5">
                      <div className="filter__sort">
                        <span>Sort By</span>
                        {/* Select not supported // */}
                        <select>
                          <option value="0">Default</option>
                          <option value="1">Default</option>
                        </select>
                        <div className="nice-select" tabindex="0">
                          <span className="current">Default</span>
                          <ul className="list">
                            <li data-value="0" className="option selected">
                              Default
                            </li>
                            <li data-value="0" className="option">
                              Default
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="filter__found">
                        <h6>
                          <span>{this.state.Annonces.length}</span> Products
                          found
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>

                {/*<!-- Sheeps Grid Section Begin --> */}

                <div className="row">
                  {this.state.Annonces.map((Annonces) => (
                    <div className="col-lg-4 col-md-6 col-sm-6">
                      <div className="product__item">
                        <div
                          className="product__item__pic set-bg"
                          data-setbg={Annonces.images}
                        >
                          <img
                            src={Annonces.images}
                            className="product__item__pic set-bg"
                          />
                          <li>
                            <a href="">
                              <i className="fa fa-heart"></i>
                            </a>
                          </li>

                          <ul className="product__item__pic__hover">
                            <li>
                              <Link
                                key={Annonces._id}
                                to={{
                                  pathname: "/DetailsMouton",
                                  state: {
                                    id: Annonces._id,
                                  },
                                }}
                                // id={Eleveurs._id}
                              >
                                <i className="fa fa-eye"></i>
                              </Link>
                            </li>
                            <li>
                              <a href="./Panier">
                                <i className="fa fa-shopping-cart"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="product__item__text">
                          <h6>{"         " + Annonces.race}</h6>
                          <h6>{"         " + Annonces.poids + " Kg"}</h6>
                          <h6>{"         " + Annonces.age + " mois"}</h6>
                          <h5>{"         " + Annonces.prix + " MAD"}</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <!-- Sheeps Grid Section End --> */}

                <div className="product__pagination">
                  <a href="#">1</a>
                  <a href="#">2</a>
                  <a href="#">3</a>
                  <a href="#">
                    <i className="fa fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomeSheeps;
