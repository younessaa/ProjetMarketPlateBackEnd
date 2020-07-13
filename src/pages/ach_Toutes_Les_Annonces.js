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
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const n = e.target.name,
      v = e.target.value;

    this.setState({
      conditions: Object.assign(this.state.conditions, { [n]: v }),
    });
    this.componentDidMount()
  }

  componentDidMount() {
    // await this.myPromise;

    axios
      .get("http://127.0.0.1:8000/api/mouton", {
        headers: {
          // "x-access-token": token, // the token is a variable which holds the token
          "Content-Type": "application/json",
        },
        params: this.state.conditions,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          Annonces: res.data,
        });
      });
  }

  onChange(e) {
    const n = e.target.name,
      v = e.target.value;

    this.setState({
      conditions: Object.assign(this.state.conditions, { [n]: v }),
    });
  }

  render() {
    return (
      <div>
        {/* <!-- Page Preloder --> */}
        <div id="preloder">
          <div className="loader"></div>
        </div>

        <section className="product spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-5">
                <div className="sidebar">
                  <div className="sidebar__item">
                    <h4>Rechercher</h4>

                    <h6 class="latest-product__item">Prix</h6>
                    <div class="row">
                      <div class="col-lg-6 col-md-6">
                        <input
                          type="text"
                          class="latest-product__item"
                          placeholder="Budget min"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6 col-md-6">
                        <input
                          type="text"
                          class="latest-product__item"
                          placeholder="Budget max"
                        />
                      </div>
                    </div>

                    <h6 class="latest-product__item">Race</h6>
                    <div class="row">
                      <div class="col-lg-6 col-md-6">
                        <input
                          type="text"
                          class="latest-product__item"
                          placeholder="Choisissez la race"
                        />
                      </div>
                    </div>

                    <h6 class="latest-product__item">Poids Environ</h6>
                    <div class="row">
                      <div class="col-lg-6 col-md-6">
                        <input
                          type="text"
                          class="latest-product__item"
                          placeholder="Poids approximatif"
                          name="piods"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>

                    <h6 class="latest-product__item">Ville</h6>
                    <div class="row">
                      <div class="col-lg-6 col-md-6">
                        <input
                          type="text"
                          class="latest-product__item"
                          placeholder="Ville"
                        />
                      </div>
                    </div>

                    <label class="latest-product__item">
                      <input name="withImages" type="checkbox" /> Avec photos
                    </label>

                    <label class="latest-product__item">
                      <input name="withVideos" type="checkbox" /> Avec video
                    </label>
                  </div>
                  {/*<div className="sidebar__item">
                                    <h4>Price</h4>
                                    <div className="price-range-wrap">
                                        <div className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" data-min="10" data-max="540">
                                            <div className="ui-slider-range ui-corner-all ui-widget-header"></div>
                                            <span tabindex="0" className="ui-slider-handle ui-corner-all ui-state-default" style="left: 0%;"></span>
                                            <span tabindex="0" className="ui-slider-handle ui-corner-all ui-state-default" style="left: 100%;"></span>
                                        <div className="ui-slider-range ui-corner-all ui-widget-header" style="left: 0%; width: 100%;"></div></div>
                                        <div className="range-slider">
                                            <div className="price-input">
                                                <input type="text" id="minamount"/>
                                                <input type="text" id="maxamount"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>*/}
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
                          <span class="current">Default</span>
                          <ul class="list">
                            <li data-value="0" class="option selected">
                              Default
                            </li>
                            <li data-value="0" class="option">
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

                <div class="row">
                  {this.state.Annonces.map((Annonces) => (
                    <div class="col-lg-4 col-md-6 col-sm-6">
                      <div class="product__item">
                        <div
                          class="product__item__pic set-bg"
                          data-setbg={Annonces.images}
                        >
                          {/* <img src={Annonces.images}/> */}
                          <li>
                            <a href="">
                              <i class="fa fa-heart"></i>
                            </a>
                          </li>

                          <ul class="product__item__pic__hover">
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
                                <i class="fa fa-eye"></i>
                              </Link>
                            </li>
                            <li>
                              <a href="./Panier">
                                <i class="fa fa-shopping-cart"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="product__item__text">
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
                    <i class="fa fa-long-arrow-right"></i>
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
