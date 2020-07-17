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
        .get("http://127.0.0.1:8000/api/consommateur/"+token+"/favoris", {
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
            () => console.log("in call" + this.state.Favoris)
          );
    
        });
    }
  }

  render() {
    var fav=this.state.Favoris.filter(
      (Favoris) => (Favoris !== null)
    );
    console.log(fav)

    return (
      <div>
        {/* //   {/* <!-- Page Preloder --> */}
        {/* <div id="preloder">
           <div className="loader"></div>
        </div>  */}

        <section className="product spad">
          <div className="container">
            <h4 class="latest-product__item">Mes favoris</h4>
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
                         <centre> <img
                            src={Annonces.image_face}
                            className="product__item__pic set-bg"
                          /></centre>

                          <ul class="product__item__pic__hover">
                            <li>
                              <Link
                                to={{
                                  pathname: "/DetailsMouton",
                                  state: {
                                    id: Annonces._id,
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
