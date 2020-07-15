import React, { Component } from "react";
import axios from "axios";

//import menu_eleveur from '/public/Images/eleveurs.png'; // with import

class Espaces extends Component {
  render() {
    return (
      <center>
        <div col-lg-8 col-md-8 col-sm-8>
          <section className="featured spad">
            <div className="container">
              {/*<!-- Categorie Menus Grid Section Begin --> */}
              <div class="row featured__filter">
                <div class="col-lg-2 col-md-4 col-sm-8">
                  <div class="featured__item">
                    <div
                      class="featured__item__pic set-bg"
                      data-setbg="Images/menu_agriculteur.png"
                    >
                      {/*<img src={menu_eleveur} />*/}
                      <ul class="featured__item__pic__hover">
                        <li>
                          <a href="#">
                            <i class="fa fa-eye"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="col-lg-2 col-md-4 col-sm-6">
                  <div class="featured__item">
                    <div
                      class="featured__item__pic set-bg"
                      data-setbg="Images/menu_consommateur.png"
                    >
                      {/*<img src={menu_eleveur} />*/}
                      <ul class="featured__item__pic__hover">
                        <li>
                          <a href="/ToutesLesAnnonces">
                            <i class="fa fa-eye"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="col-lg-2 col-md-4 col-sm-6">
                  <div class="featured__item">
                    <div
                      class="featured__item__pic set-bg"
                      data-setbg="Images/menu_eleveur.png"
                    >
                      {/*<img src={menu_eleveur} />*/}
                      <ul class="featured__item__pic__hover">
                        <li>
                          <a href="#">
                            <i class="fa fa-eye"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-6">
                  <div class="featured__item">
                    <div
                      class="featured__item__pic set-bg"
                      data-setbg="Images/menu_livreur.png"
                    >
                      {/*<img src={menu_eleveur} />*/}
                      <ul class="featured__item__pic__hover">
                        <li>
                          <a href="#">
                            <i class="fa fa-eye"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-6">
                  <div class="featured__item">
                    <div
                      class="featured__item__pic set-bg"
                      data-setbg="Images/menu_boucher.png"
                    >
                      {/*<img src={menu_eleveur} />*/}
                      <ul class="featured__item__pic__hover">
                        <li>
                          <a href="#">
                            <i class="fa fa-eye"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Categorie Menus Grid Section End --> */}
            </div>
          </section>
        </div>
      </center>
    );
  }
}

export default Espaces;
