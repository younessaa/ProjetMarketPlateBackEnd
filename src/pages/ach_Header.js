import React, { Component } from "react";

class Header extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      isLoged: false,
    };
    this.HandelLogout = this.HandelLogout.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("usertoken");
    if (token) {
      this.setState({ isLoged: true });
      // this.props.history.push("/login");
    }
  }

  HandelLogout() {
    localStorage.removeItem("usertoken");

    
    window.location.reload();
    this.props.history.push("login");
  }
  render() {
    return (
      <div>
        <header className="header">
          <div className="header__top">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="header__top__left">
                    <ul>
                      <li>
                        <a href="./Regles"> Règles de vente et achat</a>
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
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                      <a href="https://www.youtube.com/channel/UCzX4064MubkoUVL1ecFDGpQ">
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
                          <a href="#">العربية</a>
                        </li>
                        
                      </ul>
                      
                    </div>
                    <div className="header__top__right__auth">

                    {this.state.isLoged ? (
                      <div>
                        {" "}
                        
                          <a href="#" onClick={this.HandelLogout}>
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
                  <a href="./index.html">
                    <img src="assets/img/logo.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-8">
                <nav className="header__menu">
                  <ul>
                    <li>
                      <a href="./ToutesLesAnnonces"> Annonces moutons </a>
                    </li>
                    <li>
                      <a href="./AnnoncesParEleveurs"> Annonces par éleveurs</a>
                    </li>
                    <li>
                      <a href="./Favoris"> Favoris</a>
                    </li>
                    {/* <li>
                      <a href="./Panier"> Panier</a>
                   </li>*/}
                    <li>
                      <a href="./Commandes"> Commandes</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-lg-2">
                <div className="header__cart">
                  <ul>
                    {/* <li>
                      <a href="#">
                        <i className="fa fa-envelope"></i> <span>3</span>
                      </a>
                    </li> */}

                    <li>
                      <a href="./Panier">
                        <i className="fa fa-shopping-cart"></i> <span>3</span>
                      </a>
                    </li>

                    
                  </ul>
                </div>
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
              <div>English</div>
              <span className="arrow_carrot-down"></span>
              <ul>
                <li>
                  <a href="#">Spanish</a>
                </li>
                <li>
                  <a href="#">English</a>
                </li>
              </ul>
            </div>
            <div className="header__top__right__auth">
              <a href="#">
                <i className="fa fa-user"></i> Login
              </a>
            </div>
          </div>
          <nav className="humberger__menu__nav mobile-menu">
            <ul>
              <li className="active">
                <a href="./ToutesLesAnnonces">Annonces moutons </a>
              </li>
              <li>
                <a href="./AnnoncesParEleveurs"> Annonces par éleveurs</a>
              </li>
              <li>
                <a href="./Favoris">Favoris</a>
              </li>
              <li>
                <a href="./Panier">Panier</a>
              </li>
              <li>
                <a href="./Commandes">Commandes</a>
              </li>

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
