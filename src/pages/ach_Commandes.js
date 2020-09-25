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
     
    };
    // this.elv = this.elv.bind(this);
  }
  

  componentDidMount() {
    const token = localStorage.getItem("usertoken");
    const statut= this.props.location.state.id;
    const myToken = `Bearer ` + localStorage.getItem("myToken");
    if (!token) {
      this.props.history.push("/login");
    } else {
      // console.log(token);
      axios
        .get("http://127.0.0.1:8000/api/commande", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            "Content-Type": "application/json",
            "Authorization": myToken,
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
          console.log(cmd);
          
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

        <section className="">
          <div className="container">
            <br></br>
            <h3 class="latest-product__item">Mes commandes <i class="fa fa-sheep"></i></h3>
            <div className="row">
              <div className="col-lg-12 col-md-7">
                {/*<!-- Sheeps Grid Section Begin --> */}

                <div class="row">
                  {this.state.Commandes.map((Annonces) => (
                   
                    <div className="col-lg-3 col-md-3 col-sm-6">
                      {console.log(Annonces.espece.image_face)}
                      <div id="anonce" className="product__item">
                        <div
                          className="product__item__pic set-bg"
                          // data-setbg={Annonces.images}
                          // src="Images/sardi1.jpg"
                        >
                          <centre>
                            {" "}
                            <img
                              src={Annonces.espece.image_face}
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
                          <h6 id="gras" className="text-danger">
                            {"         " + Annonces.statut}
                          </h6>

                          <h6 id="gras">
                            {"   Livrer à :      " + Annonces.point_relais}
                          </h6>
                          <h6 id="mad">
                            {" "}
                            {"         " + Annonces.espece.prix + "  MAD"}
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
