import React, { Component } from "react";
import axios from "axios";

//import menu_eleveur from '/public/Images/eleveurs.png'; // with import

class AlerteCommande extends Component {
  render() {
    return (
        <div>
            {/* <!-- Page Preloder --> */}
            <div id="preloder">
                <div className="loader"></div>
            </div>

            <section className="product spad">
                <div className="container">
                    <div class="col-lg-12 col-md-6">
                        <h3>Votre commande s'est déroulé avec succès</h3> <br></br>
                        <h5>Vous pouvez maintenant payer l'avance de votre mouton pour valider votre commande avec le moyen de paiement que vous avez choisi précedement en vous munissant du numéro du RIB du vendeur.</h5>
                        <br></br>
                        <h3>Montant avance à payer : 460 MAD</h3><br></br>
                        <div class="checkout__input bg-ligh text-danger h6 center">Attention: Il vous reste jusqu'au <span><b>22/05/2020 à 16h</b></span> pour payer et importer votre reçu de paiement.</div>
                        <div class="checkout__input bg-ligh text-danger h6 center">Au delà de ce délai, votre commande sera annulée automatiquement !</div>

                        <div class="shoping__checkout">
                            <ul>
                                <li><a href="./Commandes" class="primary-btn">Annuler commande</a>  <br></br>
                                    <a href="./Commandes" class="primary-btn">Valider</a>  
                                </li>
                            </ul>
                        </div>
                    </div>        
                </div>
            </section>
        </div>
     );
    }
  }
  
  export default AlerteCommande;