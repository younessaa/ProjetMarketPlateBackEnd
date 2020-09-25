import React, { Component } from "react";
import axios from "axios";

class Header extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      isLoged: false,
    };
    // this.HandelLogout = this.HandelLogout.bind(this);
    this.logout = this.logout.bind(this);
  }

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

    if (token && expiredTimeToken > formatted_date) {
      this.setState({ isLoged: true });
      console.log(myToken);
      // this.props.history.push("/login");

      //Ce bout de code permet de vérifier les commandes avec un deadline dépassé et les annuler
      // avec envoie d'un email au consommateur relatif à la commande pour l'informer de l'annulation automatique
      // var now = new Date("22 Jul 2020 16:00:00 GMT");
      var now = new Date();
      axios
        .get(
          "http://127.0.0.1:8000/api/commandes/",

          {
            headers: {
              Authorization: myToken,
            },
          }
        )
        .then((res) => {
          var resultat = res;
          for (let i = 0; i < res.data.length; i++) {
            console.log(res.data[i].deadline);
            var deadline = new Date(res.data[i].deadline);
            if (
              now.getTime() >= deadline.getTime() &&
              res.data[i].statut == "en attente de paiement avance"
            ) {
              axios
                .put(
                  "http://127.0.0.1:8000/api/commande/" + res.data[i]._id,
                  {
                    //   msg_refus_avance: this.state.dataUrl,
                    statut: "commande annulée (deadline dépassé)",
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: myToken,
                    },
                  }
                )
                .then(() => {
                  console.log(resultat);
                  const to = resultat.data[i].consommateur.email;
                  //console.log(to);
                  const content =
                    "Votre commande a été annulée automatiquement car vous avez dépassé le deadline prévu pour l'importation de votre reçu de paiement.";
                  const subject =
                    "Votre commande a été annulée (dépassement du deadline)";
                  axios.post(
                    "http://127.0.0.1:8000/api/sendmail/" +
                      to +
                      "/" +
                      content +
                      "/" +
                      subject,
                    {
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",

                        // "Access-Control-Allow-Origin": "*",
                      },
                    }
                  );
                });
            }
          }
        });
    } else if (!token || expiredTimeToken < formatted_date) {
      // this.props.history.push("/login");
      this.setState({
        isLoged: false,
      });
    }
  }

  logout() {
    this.setState(
      {
        isLoged: false,
      },
      () => {
        localStorage.removeItem("usertoken");
        localStorage.removeItem("myToken");
      }
    );
  }

  render() {
    return (
      <div>
        <header className="header">
          {/* Comment goes here */}
          <div className="header__top">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="header__top__left">
                    <ul>
                      <li>
                        <a href="./Regles" class="btn btn-light btn-sm">
                          {" "}
                          Règles de vente et d'achat
                        </a>
                      </li>
                      <li>
                        <a href="./Apropos"> A propos</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="header__top__right">
                    <div className="header__top__right__social">
                      <a href="https://www.facebook.com/Association.nationale.ovine.et.caprine/">
                        <i id="facebook" className="fa fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i id="twitter" className="fa fa-twitter"></i>
                      </a>
                      <a
                        id="youtube"
                        href="https://www.youtube.com/channel/UCzX4064MubkoUVL1ecFDGpQ"
                      >
                        <i className="fa fa-youtube"></i>
                      </a>
                    </div>
                    <div className="header__top__right__language">
                      <img src="assets/img/language.png" alt="" />
                      <div>Français</div>
                      <span className="arrow_carrot-down"></span>
                      <ul>
                        <li>
                          <a href="#">Français</a>
                        </li>
                        <li>
                          <a href="#"> العربية</a>
                        </li>
                      </ul>
                    </div>
                    <div className="header__top__right__auth">
                      {this.state.isLoged ? (
                        <div>
                          {" "}
                          <a href="/login" onClick={this.logout}>
                            <i className="fa fa-user"> Se déconnecter</i>
                          </a>
                        </div>
                      ) : null}
                      {!this.state.isLoged ? (
                        <div>
                          {" "}
                          <a href="/login">
                            <i className="fa fa-user"> Se connecter</i>
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-lg-2">
                <div className="header__logo">
                  <a href="./">
                    <img src="assets/img/logo.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-10">
                <nav className="header__menu">
                  <ul>
                    <li class="header__menu__dropdown">
                      <a>Espèces</a>
                      <ul class="header__menu__dropdown">
                        <li>
                          <a href="./mouton">Ovins</a>
                        </li>
                        <li>
                          <a href="./">Bovins</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="Header" href="./AnnoncesParEleveurs">Nos eleveurs</a>
                    </li>
                    {this.state.isLoged ? (
                      <span>
                        <li>
                          <a className="Header" href="./commandesParStatut">Mes commandes</a>
                        </li>
                        <span class="form-inline my-2 my-lg-0">
                          <li>
                            <a className="Header" href="./Favoris">
                              <i className="fa fa-heart"> </i>
                              <span> Favoris</span>
                            </a>
                          </li>

                          <li>
                            <a className="Header" href="basket.html">
                              <i class="fa fa-shopping-cart"></i>
                              <span> Pannier</span>
                            </a>
                          </li>
                        </span>
                      </span>
                    ) : null}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="humberger__open">
              <i className="fa fa-bars"></i>
            </div>
          </div>
        </header>
        {/* <!-- Humberger Begin --> */}
        <div className="humberger__menu__overlay"></div>
        <div className="humberger__menu__wrapper">
          <div className="humberger__menu__logo">
            <a href="#">
              <img src="assets/img/logo.png" alt="" />
            </a>
          </div>
          <div className="humberger__menu__widget">
            <div className="header__top__right__language">
              <img src="assets/img/language.png" alt="" />
              <div>Français</div>
              <span className="arrow_carrot-down"></span>
              <ul>
                <li>
                  <a href="#">Français</a>
                </li>
                <li>
                  <a href="#">العربية</a>
                </li>
              </ul>
            </div>
            <div className="header__top__right__auth">
              <a href="#">
                <i className="fa fa-user"></i>Login
              </a>
            </div>
          </div>
          <nav className="humberger__menu__nav mobile-menu">
            <ul>
              <li className="active">
                <a className="Header" href="./ToutesLesAnnonces">Nos Espèces </a>
              </li>
              <li>
                <a className="Header" href="./AnnoncesParEleveurs"> Nos éleveurs</a>
              </li>
              {this.state.isLoged ? (
                <span>
                  <li>
                    <a className="Header" href="./Favoris">Mes favoris</a>
                  </li>
                  <li>
                    <a className="Header" href="./Panier">Mon panier</a>
                  </li>
                  <li>
                    <a className="Header" href="./commandesParStatut">Mes commandes</a>
                  </li>
                </span>
              ) : null}
              <li>
                <a href="./Regles">Règles de vente et achat</a>
              </li>
              <li>
                <a href="./Apropos">A propos de nous</a>
              </li>
            </ul>
          </nav>
          <div id="mobile-menu-wrap"></div>
          <div className="header__top__right__social">
            <a href="https://www.facebook.com/Association.nationale.ovine.et.caprine/">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCzX4064MubkoUVL1ecFDGpQ">
              <i className="fa fa-youtube"></i>
            </a>
          </div>
        </div>
        {/* <!-- Humberger End -->*/}
      </div>
    );
  }
}

export default Header;
