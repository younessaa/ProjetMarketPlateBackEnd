import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { GiWeight,GiSheep } from 'react-icons/gi';
import{HiOutlineBadgeCheck} from  'react-icons/hi';
import ReactPaginate from "react-paginate";
class HomeSheepsParEleveur extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Annonces: [],
      loading: true,
      Disabled: true,
      /* AnnoncesPage: [],
      offset: 0,
      data: [],
      elements: [],
      perPage: 3,
      currentPage: 0,*/
      longueur: 0,
      activePage: 1,
      nombrePages: [],
      currentPage: 1,
      annoncesPerPage: 6,
       selectedOptionRace: null,
      optionsRace: [
        { value: "Sardi", label: "Sardi" },
        { value: "Bargui", label: "Bargui" },
      ],
      optionsRaceVache: [
        { value: "brune de l’Atlas", label: "Brune de l’Atlas" },
        { value: "oulmés-Zear", label: "Oulmés-Zear" },
        { value: "noir-Pie de Meknés", label: "Noir-Pie de Meknés" },
        { value: "tidili", label: "Tidili" },
      ],
      optionsRaceCaprine: [
        { value: "benadir", label: "Benadir" },
        { value: "boer", label: "Boer" },
        { value: "drâa", label: "Drâa" },
        { value: "rahali", label: "Rahali" },
      ],
      selectedOptionCategorie: null,
      optionsCategorie: [
        { value: "mouton", label: "Mouton" },
        { value: "vache", label: "Vache" },
        { value: "chevre", label: "Chèvre" },
      ],
      selectedOptionVille: null,
      optionsVille: [
        { value: "Berkane", label: "Berkane" },
        { value: "Driouch", label: "Driouch" },
        { value: "Figuig", label: "Figuig" },
        { value: "Guercif", label: "Guercif" },
        { value: "Jerada", label: "Jerada" },
        { value: "Nador", label: "Nador" },
        { value: "Oujda-Angad", label: "Oujda-Angad" },
        { value: "Taourirt", label: "Taourirt" },
        { value: "Ahfir", label: "Ahfir" },
        { value: "Saida", label: "Saidia" },
        { value: "Tafoughalt", label: "Tafoughalt" },
      ],
      conditions: {
        // statut: "disponible",
        order_by: "race",
        order_mode: "asc",
      },
      redirect: false,
      selectedOptionSort: null,
      optionsSort: [
 
        { value: "prix", label: "Moins cher au plus cher" },
        { value: "prix_dec", label: "Plus cher au moins cher" },

        { value: "age", label: "Plus jeune au plus age" },
        { value: "age_dec", label: "plus age au plus jeune" },

        { value: "poids", label: "Moins lourd au plus lourd" },
        { value: "poids_dec", label: "Plus lourd au moins lourd" },
      ],
    };
    this.onChange = this.onChange.bind(this);
    this.handleChangeCategorie = this.handleChangeCategorie.bind(this);
    this.handelChercher = this.handelChercher.bind(this);
    this.handelReinitialiser = this.handelReinitialiser.bind(this);

    this.sortData = this.sortData.bind(this);

    this.paginate = this.paginate.bind(this);
  }

  handleChangeCategorie = (selectedOptionCategorie) => {
    this.setState({selectedOptionRace:null})
    if (selectedOptionCategorie.value == "vache") {
      this.setState({
        
        race:this.state.optionsRaceVache ,
        Disabled: false,
      });
      this.setState({ selectedOptionCategorie }, () =>
      this.setState({
        conditions: Object.assign(this.state.conditions, {
          categorie: this.state.selectedOptionCategorie.value,
        }),
      })
    );
    } 
    else if (selectedOptionCategorie.value == "mouton") {
      this.setState({
        race:this.state.optionsRace ,
        Disabled: false,
      });
      this.setState({ selectedOptionCategorie }, () =>
      this.setState({
        conditions: Object.assign(this.state.conditions, {
          categorie: this.state.selectedOptionCategorie.value,
        }),
      })
    );
    } 
    else if (selectedOptionCategorie.value == "chevre") {
      this.setState({
        race:this.state.optionsRaceCaprine ,
        Disabled: false,
      });
      this.setState({ selectedOptionCategorie }, () =>
      this.setState({
        conditions: Object.assign(this.state.conditions, {
          categorie: this.state.selectedOptionCategorie.value,
        }),
      })
    );
    } else
      this.setState({
        Disabled: false,
      });
    this.setState({ selectedOptionCategorie }, () =>
      this.setState({
        conditions: Object.assign(this.state.conditions, {
          categorie: this.state.selectedOptionCategorie.value,
        }),
      })
    );
  };
  handleChangeRace = (selectedOptionRace) => {
    this.setState({ selectedOptionRace }, () =>
      this.setState({
        conditions: Object.assign(this.state.conditions, {
          race: this.state.selectedOptionRace.value,
        }),
      })
    );
  };

  handleChangeSort = (selectedOptionSort) => {
    this.setState({ selectedOptionSort }, () =>
      this.setState({
        selectedOptionSort: selectedOptionSort,
      })
    );
  };

  handleChangeVille = (selectedOptionVille) => {
    this.setState({ selectedOptionVille }, () =>
      this.setState({
        conditions: Object.assign(this.state.conditions, {
          localisation: this.state.selectedOptionVille.value,
        }),
      })
    );
  };
  handelReinitialiser() {
    this.setState({ loading: true }, () => {
      axios
        .get("http://127.0.0.1:8000/api/Espece", {
          headers: {

            "Content-Type": "application/json",

          },
          params: {
            statut: "disponible",
            order_by: "categorie",
            order_mode: "asc",
          },
        })
        .then((res) => {
          this.setState({
            Annonces: res.data.filter((data)=>data.id_eleveur===this.props.location.state.id.id),
            loading: false,
            conditions: {
               order_by: "categorie",
              order_mode: "asc",
            },
            selectedOptionCategorie: null,
            selectedOptionRace: null,
            Disabled: true,
            selectedOptionVille: null,
          });
          var all = document.querySelectorAll('input[name="reference"],input[name="prix_min"],input[name="prix_max"],input[name="poids_min"],input[name="poids_max"]')
          Array.from(all).map((a) => (a.value = null))

          const pageNumbers = [];
          for (
            let i = 1;
            i <=
            Math.ceil(this.state.Annonces.length / this.state.annoncesPerPage);
            i++
          ) {
            pageNumbers.push(i);
          }
          this.setState({ nombrePages: pageNumbers });
        });
    });

  }

  componentDidMount() {
    // const myToken = `Bearer ` + localStorage.getItem("myToken");
    // const ide = this.props.location.state.id;
    this.setState({ loading: true }, () => {
      axios
        .get("http://127.0.0.1:8000/api/Espece", {
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
            loading: false,
            /* pageCount: Math.ceil(res.data.length / this.state.perPage),*/
          });
          /*this.setElementsForCurrentPage();*/
       //   console.log(this.state.Annonces);
          const pageNumbers = [];
          for (
            let i = 1;
            i <=
            Math.ceil(this.state.Annonces.length / this.state.annoncesPerPage);
            i++
          ) {
            pageNumbers.push(i);
          }
          this.setState({ nombrePages: pageNumbers });
        });
    });
  }

  sortData(e) {
    //this.setState({ selectedOptionSort: Object.values(e)[0] });
    //console.log(this.state.selectedOptionSort);
    // console.log(Object.values(e)[0]);
    // console.log( (Object.values(e)[0]).getFullYear());
    // created_date.getTime();
    const sortProperty = Object.values(e)[0];
    const sorted = this.state.Annonces;
    if (sortProperty === "prix" || sortProperty === "poids" || sortProperty === "age") {
      this.setState({ loading: true }, () => {
        sorted.sort((a, b) => a[sortProperty] - b[sortProperty]);
        this.setState({
          Annonces: sorted,
          loading: false
        });
      });
    } else if (sortProperty === "prix_dec") {
      const sort_ = "prix";
      this.setState({ loading: true }, () => {
        sorted.sort((a, b) => b[sort_] - a[sort_]);
        this.setState({ Annonces: sorted, loading: false });
      });
    } else if (sortProperty === "poids_dec") {
      const sort_ = "poids";
      this.setState({ loading: true }, () => {
        sorted.sort((a, b) => b[sort_] - a[sort_]);
        this.setState({ Annonces: sorted, loading: false });
      });
    } else if (sortProperty === "age_dec") {
      const sort_ = "age";
      this.setState({ loading: true }, () => {
        sorted.sort((a, b) => b[sort_] - a[sort_]);
        this.setState({ Annonces: sorted, loading: false });
      });
    }
    else {
      this.setState({ loading: true }, () => {
        sorted.sort(
          function (a, b) {

            return new Date(b[sortProperty]) - new Date(a[sortProperty]);
          });
        this.setState({ Annonces: sorted, loading: false });
      });
    }
  }

  paginate(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  /* setElementsForCurrentPage() {
    let elements = this.state.Annonces.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({ AnnoncesPage: elements });
  }

  handlePageClick = (data) => {
    const selectedPage = data.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({ currentPage: selectedPage, offset: offset }, () => {
      this.setElementsForCurrentPage();
    });
  };
*/
  onChange(e) {
    const n = e.target.name,
      v = e.target.value;

    this.setState({
      conditions: Object.assign(this.state.conditions, { [n]: v }),
    });
  }

  handelChercher() {
    this.setState({ loading: true }, () => {
      axios
        .get("http://127.0.0.1:8000/api/Espece", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            "Content-Type": "application/json",
          },
        
          params: this.state.conditions,
        })
        .then((res) => {
          this.setState({
            Annonces: res.data.filter((data)=>data.id_eleveur===this.props.location.state.id.id),
            loading: false,
          });
          const pageNumbers = [];
          for (
            let i = 1;
            i <=
            Math.ceil(this.state.Annonces.length / this.state.annoncesPerPage);
            i++
          ) {
            pageNumbers.push(i);
          }
          this.setState({ nombrePages: pageNumbers });
        });
    });
  }

  annonceVision(a) {
    if (a.race === undefined) {
      return " ";
    } else return a.race;
  }

  render() {
    var mois = new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");

    /* let paginationElement;
    if (this.state.pageCount > 1) {
      paginationElement = (
        <ReactPaginate
          previousLabel={"← Préc"}
          nextLabel={"Suiv →"}
          breakLabel={<span className="gap">...</span>}
          pageCount={this.state.pageCount}
          onPageChange={this.handlePageClick}
          forcePage={this.state.currentPage}
          containerClassName={"pagination"}
          previousLinkClassName={"previous_page"}
          nextLinkClassName={"next_page"}
          disabledClassName={"disabled"}
          activeClassName={"active"}
        />
      );
    }*/
    const indexOfLastAnnonce =
      this.state.currentPage * this.state.annoncesPerPage;
    const indexOfFirstAnnonce = indexOfLastAnnonce - this.state.annoncesPerPage;
    const currentAnnonces = this.state.Annonces.slice(
      indexOfFirstAnnonce,
      indexOfLastAnnonce
    );
    const { selectedOptionCategorie } = this.state;
    const { optionsCategorie } = this.state;
    const { selectedOptionRace } = this.state;
    const { optionsRace } = this.state;
    const { selectedOptionVille } = this.state;
    const { optionsVille } = this.state;
    const { optionsSort } = this.state;
    const { loading } = this.state;
    var reserv = this.state.Annonces.filter(
      (Annonces) => Annonces.statut == "réservé"
    );
    var dispo = this.state.Annonces.filter(
      (Annonces) => Annonces.statut == "disponible"
    );
    var vendu = this.state.Annonces.filter(
      (Annonces) => Annonces.statut == "vendu"
    );
    return (
      <div>
        <section className="">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div id="rechercher" className="col-lg-12">
                  <br></br>
                  <br></br>
                  <div className="sidebar__item">
                    <h4>Rechercher</h4>

                    <h6 id="gras" className="latest-product__item">
                      Espece
                    </h6>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        {/* <input
                          type="text"
                          className="latest-product__item"
                          placeholder="Choisissez la race"
                          onChange={this.onChange}
                          name="race"
                        /> */}
                        <Select
                          value={selectedOptionCategorie}
                          onChange={this.handleChangeCategorie}
                          options={optionsCategorie}
                          placeholder="Espece"
                          required
                        // className="Select"
                        />
                        <br></br>
                      </div>
                    </div>

                    <h6 id="gras" className="latest-product__item">
                      Race
                    </h6>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        {/* <input
                          type="text"
                          className="latest-product__item"
                          placeholder="Choisissez la race"
                          onChange={this.onChange}
                          name="race"
                        /> */}
                       <Select
                          id="recherchePlace"
                          isDisabled={this.state.Disabled}
                          value={selectedOptionRace}
                          onChange={this.handleChangeRace}
                          options={this.state.race}
                          placeholder=" Race"
                          required
                        // className="Select"
                        />
                        <br></br>
                      </div>
                    </div>
                    <h6 id="gras" className="latest-product__item">
                      Reference
                    </h6>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <input
                          id="recherchePlace"

                          type="text"
                          class="form-control"
                          placeholder=" Reference de l'annonce"
                          name="reference"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <br/>
                    <h6 id="gras" className="latest-product__item">
                      Prix
                    </h6>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <input
                          id="recherchePlace"
                          type="text"
                          class="form-control"
                          placeholder=" Budget min"
                          name="prix_min"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <input
                          id="recherchePlace"
                          type="text"
                          class="form-control"
                          placeholder=" Budget max"
                          name="prix_max"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <br></br>

                    <h6 id="gras" className="latest-product__item">
                      Poids Environ
                    </h6>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <input
                          id="recherchePlace"
                          type="text"
                          class="form-control"
                          placeholder=" Poids min"
                          name="poids_min"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <input
                          id="recherchePlace"
                          type="text"
                          class="form-control"
                          placeholder=" Poids max"
                          name="poids_max"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <br></br>

                    <h6 id="gras" className="latest-product__item">
                      Ville
                    </h6>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <Select
                          value={selectedOptionVille}
                          onChange={this.handleChangeVille}
                          options={optionsVille}
                          placeholder=" Ville"

                        // className="Select"
                        />
                        <br></br>
                        <br></br>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        {/* <button className="btn btn-success" onClick={this.handelChercher}> Rechercher </button><br/> */}
                        <button
                          id="roundB"
                          className="newBtn site-btn"
                          onClick={this.handelChercher} >
                          <i className="fa fa-search "></i>

                          {" "}
                          Rechercher{" "}
                        </button>
                        <br></br>
                        <br></br>
                        <button
                          id="roundB"
                          className="newBtn site-btn"
                          onClick={this.handelReinitialiser} >
                          <i className="fa fa-refresh"></i>
                          {" "}
                          Reinitialiser{" "}
                        </button>
                        <br></br>
                        <br></br>
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
                <div>
                    <div id="filterPlace" className="col-lg-5 col-md-5 fa ">
                      <Select
                        id="filterPlace"
                        value={this.state.selectedOptionSort}
                        onChange={this.sortData}
                        options={optionsSort}
                        placeholder="&#xf161; Trier par"
                      //
                      //f0b0

                      // className="Select"
                      />
                    </div>
                  </div>
                  <br></br>

                  <div className="row">
                    <div className="col-lg-4 col-md-5"></div>
                    <div className="col-lg-12 col-md-12">
                      <h3>
                        Espace éleveur :{" "}
                        {this.props.location.state.id.nom +
                          " " +
                          this.props.location.state.id.prenom}
                      </h3>{" "}
                      <br />
                      <div className="filter__found text-left">
                        <h6>
                          <span id="nbEspece">
                            {this.state.Annonces.length}
                          </span>{" "}
                          Têtes de moutons au total
                        </h6>
                        <br />
                      </div>
                      <h6 id="centrerT">
                        <b id="nbEspece">{vendu.length}</b> Vendus{" "}
                        <b id="nbEspece">{dispo.length}</b> Disponibles{" "}
                        <b id="nbEspece">{reserv.length}</b> Réservés
                      </h6>
                    </div>
                  </div>
                </div>

                {/*<!-- Sheeps Grid Section Begin --> */}
                <div>
                  {loading ? (
                    <div
                      style={{
                        width: "100%",
                        height: "100",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Loader
                        type="Oval"
                        color="#7fad39"
                        height="80"
                        width="80"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="row">
                        {currentAnnonces.map((Annonces) => (
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            {/*console.log(Annonces.image_face)*/}
                            <div id="anonce" className="product__item">
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
                                    <Link to={`/DetailsMouton/${Annonces._id}`}>
                                      <a href="#">
                                        <i class="fa fa-eye"></i>
                                      </a>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              {Annonces.anoc ?
                                <h1 style={{ borderRadius: "0% 0% 0% 40%",fontSize:"14px" }} class=" badge badge-success pt-2 w-100  ">
                                   <HiOutlineBadgeCheck className=" mr-1 fa-lg " />
                             <span>Labélisé ANOC</span>  </h1>
                                :
                                <span className="badge pt-3 w-100  mt-1  ">{"  "}</span>}
                             <div className="product__item__text p-2 text-justify">
                                <h6 ><GiSheep className=" mr-1 fa-lg " />{  Annonces.categorie}

                                  <span className="float-right">
                                    <i   class="fa fa-dot-circle-o"></i> {this.annonceVision(Annonces)}
                                  </span> </h6>

                                <h6><GiWeight className=" mr-1 fa-lg " />
                                  {Annonces.poids + " Kg"}
                                  <img  style={{width:"10%",marginLeft:"38%",marginBottom:"10px"}} src="./Images/age.png"></img>

                                  <span className="float-right mt-1">
                                    { Annonces.age + " mois"}</span></h6>

                                    <h5 id="mad">{"         " + Annonces.prix + " MAD"}
                                <h5 className="text-danger float-right" >
                                    {"         " + Annonces.statut}</h5></h5>
                               </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="center-div">
                        <nav className="row">
                          <ul className="pagination center-div">
                            {this.state.nombrePages.map((number) => (
                              <li
                                key={number}
                                className="page-item stylePagination"
                              >
                                <a
                                  onClick={() => this.paginate(number)}
                                  className="page-link"
                                >
                                  {number}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </div>
                      <br></br>
                    </div>
                  )}
                </div>

                {/*paginationElement*/}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomeSheepsParEleveur;
