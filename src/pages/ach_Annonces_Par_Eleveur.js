import React, { Component } from "react";
import axios from "axios";
class AllOffers extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Eleveurs: [
        {
          Nom: "Mohamed Rachidi ",
          Région: "Oujda",
          image: "Images/Eleveur.jpg",
          nombre_moutons: "50"
        },
        {
          Nom: "Taher Hamid ",
          Région: "Berkane",
          image: "Images/Eleveur.jpg",
          nombre_moutons: "25"
        },
        {
          Nom: "Madani Ali",
          Région: "Nador",
          image: "Images/Eleveur.jpg",
          nombre_moutons: "60"
        },
        {
          Nom: "Mohamed Rachidi ",
          Région: "Oujda",
          image: "Images/Eleveur.jpg",
          nombre_moutons: "20"
        },
        {
          Nom: "Mohamed Oujidi ",
          Région: "Berkane",
          image: "Images/Eleveur.jpg",
          nombre_moutons: "15"
        },
       
      ],
      redirect: false,
    };
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

                <div className="col-lg-12 col-md-7">
                    <div className="filter__item">
                        <div className="row">
                            <div className="col-lg-4 col-md-5">
                                <div className="filter__sort">
                                    <span>Sort By</span>
                                    { /* Select not supported // */}
                                    <select>
                                        <option value="0">Default</option>
                                        <option value="1">Default</option>
                                    </select>
                                    <div className="nice-select" tabindex="0"><span class="current">Default</span><ul class="list"><li data-value="0" class="option selected">Default</li><li data-value="0" class="option">Default</li></ul></div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="filter__found">
                                    <h6><span>5</span> Eleveurs </h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    { /*<!-- Sheeps Grid Section Begin --> */}

                    <div class="row">
                      {this.state.Eleveurs.map((Eleveurs) => (
                                <div class="col-lg-4 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg={Eleveurs.image} >
                                            <ul class="product__item__pic__hover">
                                                <li><a href="./ToutesLesAnnonces"><i class="fa fa-eye"></i></a></li>
                                            </ul>
                                        </div>
                                        <div class="product__item__text">
                                          <h6>
                                            {"         " + Eleveurs.Nom}
                                          </h6>
                                          <h6>
                                            {"         " + Eleveurs.Région}
                                          </h6>
                                          <h5>
                                            {"         " + Eleveurs.nombre_moutons} moutons à vendre
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
