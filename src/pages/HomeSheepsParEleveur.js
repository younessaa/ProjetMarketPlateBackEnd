import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class HomeSheepsParEleveur extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Annonces: [],
      conditions: {
        // statut: "disponible",
        order_by: "race",
        order_mode: "asc",
      },
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handelChercher = this.handelChercher.bind(this);
  }

  componentDidMount() {
    // const ide = this.props.location.state.id;
    axios
      .get("http://127.0.0.1:8000/api/mouton/", {
        headers: {
          // "x-access-token": token, // the token is a variable which holds the token
        },
        params: {
          id_eleveur: this.props.location.state.id.id,
          // statut: "disponible",
          order_by: "race",
          order_mode: "asc",
        },
      })
      .then((res) => {
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

  handelChercher() {
    const token = localStorage.getItem("usertoken");
    if (!token) {
      this.props.history.push("/login");
    } else {
      console.log(token);
      axios
        .get("http://127.0.0.1:8000/api/mouton", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            "Content-Type": "application/json",
          },
          params: this.state.conditions,
        })
        .then((res) => {
          this.setState({
            Annonces: res.data,
          });
        });
    }
  }

  render() {
    // item => item.news_id == id 
//     X Têtes de moutons au total 
// 
    var reserv=this.state.Annonces.filter(Annonces => Annonces.statut=="réservé")
    var dispo=this.state.Annonces.filter(Annonces => Annonces.statut=="disponible")
    var vendu=this.state.Annonces.filter(Annonces => Annonces.statut=="vendu")
    return (
      <div>


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
                          name="prix_min"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <input
                          type="text"
                          className="latest-product__item"
                          placeholder="Budget max"
                          name="prix_max"
                          onChange={this.onChange}
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
                          onChange={this.onChange}
                          name="race"
                        />
                      </div>
                    </div>

                    <h6 className="latest-product__item">Poids Environ</h6>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <input
                          type="text"
                          className="latest-product__item"
                          placeholder="Poids min"
                          name="poids_min"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <input
                          type="text"
                          className="latest-product__item"
                          placeholder="Poids max"
                          name="poids_max"
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
                          name="localisation"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        {/* <button className="btn btn-success" onClick={this.handelChercher}> Rechercher </button><br/> */}
                        <button
                          className=" site-btn"
                          onClick={this.handelChercher}
                        >
                          {" "}
                          Rechercher{" "}
                        </button>
                      </div>
                    </div>

                    {/* <label className="latest-product__item">
                      <input name="withImages" type="checkbox" /> Avec photos
                    </label> */}

                    {/* <label className="latest-product__item">
                      <input name="withVideos" type="checkbox" /> Avec video
                    </label> */}
                  </div>
                </div>
              </div>

              <div className="col-lg-9 col-md-7">
                <div className="filter__item">
                  <div className="row">
                    <div className="col-lg-4 col-md-5"></div>
                    <div className="col-lg-12 col-md-12">
                  <h3>Espace éleveur : {this.props.location.state.id.nom +" "+this.props.location.state.id.prenom }</h3> <br/>
                      <div className="filter__found text-left">
                        <h6>
                          <span>{this.state.Annonces.length}</span> Têtes de moutons au total 
                        </h6>
                        <br/>
                        
                        
                      </div>
                      <h6>
                          <b>{vendu.length}</b> Vendus  <b>{dispo.length}</b> Disponibles    <b>{reserv.length}</b> Réservés
                        </h6>
                    </div>
                  </div>
                </div>

                {/*<!-- Sheeps Grid Section Begin --> */}

                <div className="row">
                  {this.state.Annonces.map((Annonces) => (
                    <div className="col-lg-4 col-md-6 col-sm-6">
                      {console.log(Annonces.image_face)}
                      <div className="product__item">
                        <div
                          className="product__item__pic set-bg"
                          data-setbg={Annonces.images}
                          // src="Images/sardi1.jpg"
                        >
                          <img
                            src={Annonces.image_face}
                            // src=Annonces.images
                            className="product__item__pic set-bg"
                          />

                          <ul className="product__item__pic__hover">
                            {/* <li>
                              <a href="">
                                <i className="fa fa-heart"></i>
                              </a>
                            </li> */}
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
                            {/* <li>
                              <a href="./Panier">
                                <i className="fa fa-shopping-cart"></i>
                              </a>
                            </li> */}
                          </ul>
                        </div>
                        <div className="product__item__text">
                          <h6>{"         " + Annonces.race}</h6>
                          <h6>{"         " + Annonces.poids + " Kg"}</h6>
                          <h6>{"         " + Annonces.age + " mois"}</h6>
                          <h5>{"         " + Annonces.prix + " MAD"}</h5>
                          <h5 className="text-danger">{"         " + Annonces.statut  }</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomeSheepsParEleveur;
