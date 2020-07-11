import React, { Component } from "react";
import axios from "axios";
class Favoris extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Annonces: [
        {
          Nboucle: "122554",
          prix: "3100",
          Race: "Sardi",
          poids: "58",
          Eleveur: "Mohamed Erraji",
          image: "Images/Sardi3.jpg",
        },
        {
          Nboucle: "122554",
          prix: "3000",
          Race: "Sardi",
          poids: "60",
          Eleveur: "Mohamed Erraji",
          image: "Images/Sardi1.jpg",
        },
        {
          Nboucle: "122554",
          prix: "2500",
          Race: "Timahdit",
          poids: "50",
          Eleveur: "Mohamed Erraji",
          image: "Images/Sardi2.jpg",
        },
        {
          Nboucle: "122554",
          prix: "3500",
          Race: "Timahdit",
          poids: "65",
          Eleveur: "Mohamed Erraji",
          image: "Images/Sardi2.jpg",
        },
      ],
      redirect: false,
    };
  }
  // componentDidMount() {
  //   axios
  //     .get("http://127.0.0.1:8000/api/clients", {
  //       headers: {
  //         // "x-access-token": token, // the token is a variable which holds the token
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({
  //         clients: res.data.data,
  //       });
  //     });
  // }

  render() {
    return (
      <div>
        {/* <!-- Page Preloder --> */}
        <div id="preloder">
          <div className="loader"></div>
        </div>

      <section className="product spad">
        <div className="container">
            <h4 class="latest-product__item">Mes favoris</h4>
            <div className="row">

                  <div className="col-lg-12 col-md-7">
                    
                    { /*<!-- Sheeps Grid Section Begin --> */}

                    <div class="row">
                      {this.state.Annonces.map((Annonces) => (
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <div class="product__item">
                                        <div class="product__item__pic set-bg" data-setbg={Annonces.image} >
                                            <ul class="product__item__pic__hover">
                                                <li><a href="./Favoris"><i class="fa fa-heart"></i></a></li>
                                                <li><a href="./DetailsMouton"><i class="fa fa-eye"></i></a></li>
                                                <li><a href="./Panier"><i class="fa fa-shopping-cart"></i></a></li>
                                            </ul>
                                        </div>
                                        <div class="product__item__text">
                                          <h6>
                                            {"         " + Annonces.Race}
                                          </h6>
                                          <h6>
                                            {"         " + Annonces.poids+ " Kg"}
                                          </h6>
                                          <h5>
                                            {"         " + Annonces.prix + " MAD"}
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

export default Favoris;
