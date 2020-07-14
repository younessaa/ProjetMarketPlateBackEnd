import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Header from "../pages/ach_Header";
import Footer from "../pages/ach_Footer";
import Home from "../pages/Home";
import HomeEleveur from "../pages/HomeEleveur";
import AddMouton from "../pages/AddMouton";
// import HomeCommande from "../pages/HomeCommande";
// import AddEleveur from "../pages/AddEleveur";
// import DetailsEleveur from "../pages/DetailsEleveur";


import DetailsCommande from "../pages/ach_DetailsCommande";
import Commander from "../pages/ach_Commander";
import ToutesLesAnnonces from "../pages/ach_Toutes_Les_Annonces";
import AnnoncesParEleveurs from "../pages/ach_Annonces_Par_Eleveur"
import Panier from "../pages/ach_Panier"
import Favoris from "../pages/ach_Favoris"
import Commandes from "../pages/ach_Commandes"
import DetailsMouton from "../pages/ach_DetailsMouton";
// import Login from "../pages/ach_Login";
// import SignUp from "../pages/ach_SignUp";
import Espaces from "../pages/ach_Espaces";
import Regles from "../pages/ach_Regles";
import Apropos from "../pages/ach_Apropos";
import AlerteCommande from "../pages/ach_AlerteCommande";
import ElvMoutons from '../pages/ach_Toutes_Les_Annonces_Eleveur';
import importpRecu from '../pages/ach_importRecuAvance'
class Container extends Component {
    render() {
        return (
            <div>
                <Header />
                <BrowserRouter>
                <Route exact path="/Annonces" component={Home} />
                {/*<Route exact path="/Commandes" component={HomeCommande} />*/}
                <Route exact path="/Eleveurs" component={HomeEleveur} />
                <Route exact path="/AddAnnonce" component={AddMouton} />

                <Route exact path="/DetailsCommande" component={DetailsCommande} />
                <Route exact path="/Commander" component={Commander} />
                <Route exact path="/AlerteCommande" component={AlerteCommande} />
                {/* <Route exact path="/Login" component={Login} />
                <Route exact path="/SignUp" component={SignUp} /> */}
                <Route exact path="/" component={Espaces} />
                <Route exact path="/ToutesLesAnnonces" component={ToutesLesAnnonces} />
                <Route exact path="/AnnoncesParEleveurs" component={AnnoncesParEleveurs} />
                <Route exact path="/Panier" component={Panier} />
                <Route exact path="/Favoris" component={Favoris} />
                <Route exact path="/Commandes" component={Commandes} />
                <Route exact path="/DetailsMouton" component={DetailsMouton} />
                <Route exact path="/Regles" component={Regles} />
                <Route exact path="/Apropos" component={Apropos} />
                <Route exact path="/ToutesLesAnnoncesEleveur" component={ElvMoutons} />
                <Route exact path="/importRecuAvance" component={importpRecu} />
                {/* DetailsCommande */}
                </BrowserRouter>
                <Footer/>
            </div>
        );
    }
}

export default Container;