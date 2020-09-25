import React, { Component } from "react";


import { Link } from "react-router-dom";
class Commander3 extends Component {
  constructor(props) {
    super(props);
  }

 
  render() {
    return (
      <div>
        <div class="container">
          <div class="product-details spad">
            <div id="centrer" class="col-lg-12 col-md-6">
              <br></br>
              <h3>Détails du prix</h3>
              <div class="shoping__checkout">
                <ul>
                  <li>
                    Avance <span>{this.props.data.Espece.avance} MAD</span>
                  </li>
                  <li>
                    Prix Transport <span>60 MAD</span>
                  </li>
                  <li>
                    Prix Total{" "}
                    <span>{parseInt(this.props.data.Espece.prix) + 60} MAD</span>
                  </li>
                  <li>
                    <a
                      href="/ToutesLesAnnonces"
                      id="aStyle"
                      class="primary-btn"
                    >
                      Annuler commande
                    </a>{" "}
                    <br></br>
                    {this.props.data.checked && !this.props.data.vide ? (
                      <Link
                        to={{
                          pathname: "/AlerteCommande",
                          state: {
                            id: this.props.data.Commande,
                          },
                        }}
                      >
                        {" "}
                        <a
                         
                          id="aStyle"
                          class="primary-btn"
                          disabled
                        >
                          Valider
                        </a>{" "}
                      </Link>
                    ) : null}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Commander3;
