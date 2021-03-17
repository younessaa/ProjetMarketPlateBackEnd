import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { GiSheep } from 'react-icons/gi';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

class AllOffers extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      loading: true,

      Eleveurs: [],
      activePage: 1,
      nombrePages: [],
      currentPage: 1,
      eleveursPerPage: 3,
      redirect: false,
      Disabled: true,
      selectedOptionRace: null,
      race: [],
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
      selectedOptionRegions: null,
      optionsRegions: [],
      selectedOptionVille: null,
      optionsVille: [],
      conditions: {
        order_by: "categorie",
        order_mode: "asc",
      },
      redirect: false,

      selectedOptionSort: null,
      optionsSort: [
        { value: "rating", label: (<> <i className="fa fa-star-o text-warning fa-sm"></i>  Etoile [5 <i className="fa fa-long-arrow-right  "></i> 1] </>) },
        { value: "rating_dec", label: (<> <i className="fa fa-star-o fa-sm" style={{ color: "#ebebeb" }}></i>  Etoile [1 <i className="fa fa-long-arrow-right  "> 5]</i> </>) },
      ],
    };

    this.onChange = this.onChange.bind(this);
    this.handleChangeCategorie = this.handleChangeCategorie.bind(this);
    this.handelChercher = this.handelChercher.bind(this);
    this.handelReinitialiser = this.handelReinitialiser.bind(this);
    this.sortData = this.sortData.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  componentDidMount() {
    const myToken = `Bearer ` + localStorage.getItem("myToken");
    this.setState({ loading: true }, () => {
      axios
        .get("http://127.0.0.1:8000/api/eleveurs", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token

          },
        })
        .then((res) => {
          this.setState({
            Eleveurs: res.data,
            loading: false,

          });

          const elv = this.state.Eleveurs.filter(
            (Eleveurs) => Eleveurs.Especes !== undefined
          );
          /**ville et region  */
          let allville = []; let allregion = [];
          elv.map((e) => {
            allville.splice(0, 0, {"value":e.ville,"label":e.ville}); allregion.splice(0, 0,  {"value":e.region,"label":e.region})
          });
        
          allregion = Array.from(new Set(allregion.map(s => s.value))).map(value => {
            return {
              value: value,
              label: allregion.find(s => s.value === value).label
            }
          });
          allville = Array.from(new Set(allville.map(s => s.value))).map(value => {
            return {
              value: value,
              label: allville.find(s => s.value === value).label
            }
          });
          this.setState({ optionsVille: allville, optionsRegions: allregion })
          /**ville et region  */
          const pageNumbers = [];
          for (
            let i = 1;
            i <=
            Math.ceil(elv.length / this.state.eleveursPerPage);
            i++
          ) {
            pageNumbers.push(i);
          }
          this.setState({ nombrePages: pageNumbers });
        });
    });
  }

  handleChangeCategorie = (selectedOptionCategorie) => {
    this.setState({ selectedOptionRace: null })
    if (selectedOptionCategorie.value == "vache") {
      this.setState({
        race: this.state.optionsRaceVache,
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
        race: this.state.optionsRace,
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
        race: this.state.optionsRaceCaprine,
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
        Disabled: true,
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

  handleChangeVille = (selectedOptionVille) => {
    this.setState({ selectedOptionVille }, () =>
      this.setState({
        conditions: Object.assign(this.state.conditions, {
          ville: this.state.selectedOptionVille.value,

        }),
      })
    );
  };
  handleChangeRegion = (selectedOptionRegions) => {
    this.setState({ selectedOptionRegions }, () =>
      this.setState({
        conditions: Object.assign(this.state.conditions, {
          region: this.state.selectedOptionRegions.value,
        }),
      })
    );
  };

  sortData(e) {
    const sortProperty = Object.values(e)[0];
    const sorted = this.state.Eleveurs;

    if (sortProperty === "rating_dec") {
      this.setState({ loading: true }, () => {
        sorted.sort((a, b) => a["rating"] - b["rating"]);
        this.setState({
          Eleveurs: sorted,
          loading: false
        });
      });
    } else if (sortProperty === "rating") {
      const sort_ = sortProperty;
      this.setState({ loading: true }, () => {
        sorted.sort((a, b) => b[sort_] - a[sort_]);
        this.setState({ Eleveurs: sorted, loading: false });
      });
    }
  }

  paginate(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  handelReinitialiser() {

    this.setState({ loading: true }, () => {
      axios
        .get("http://127.0.0.1:8000/api/eleveur", {
          headers: {

            "Content-Type": "application/json",

          },
          params: {
            order_by: "categorie",
            order_mode: "asc",
          },
        })
        .then((res) => {
          this.setState({
            Eleveurs: res.data,
            loading: false,
            conditions: {
              order_by: "categorie",
              order_mode: "asc",
            },
            selectedOptionCategorie: null,
            selectedOptionRace: null,
            Disabled: true,
            selectedOptionVille: null,
            selectedOptionRegions: null,
          });

          const pageNumbers = [];
          for (
            let i = 1;
            i <=
            Math.ceil(this.state.Eleveurs.length / this.state.eleveursPerPage);
            i++
          ) {
            pageNumbers.push(i);
          }
          this.setState({ nombrePages: pageNumbers });
        });
    });
  }

  handelChercher() {
    this.setState({ loading: true }, () => {
      axios
        .get("http://127.0.0.1:8000/api/eleveur", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            "Content-Type": "application/json",
          },
          params: this.state.conditions,
        })
        .then((res) => {
          this.setState({
            Eleveurs: res.data,
            loading: false,
          });

          const pageNumbers = [];
          for (
            let i = 1;
            i <=
            Math.ceil(
              this.state.Eleveurs.length / this.state.eleveursPerPage
            );
            i++
          ) {
            pageNumbers.push(i);
          }
          this.setState({ nombrePages: pageNumbers });
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

  render() {
    var elv = this.state.Eleveurs.filter(
      (Eleveurs) => Eleveurs.Especes !== undefined
    );

    const indexOfLastEleveur =
      this.state.currentPage * this.state.eleveursPerPage;
    const indexOfFirstEleveur =
      indexOfLastEleveur - this.state.eleveursPerPage;
    const currentEleveurs = elv.slice(
      indexOfFirstEleveur,
      indexOfLastEleveur);
    const { loading } = this.state;
    const { selectedOptionRace } = this.state;
    const { selectedOptionCategorie } = this.state;
    const { optionsCategorie } = this.state;
    const { selectedOptionVille } = this.state;
    const { selectedOptionRegions } = this.state;
    const { optionsVille } = this.state;
    const { optionsRegions } = this.state;
    const { optionsSort } = this.state;
    return (
      <div>
        <section className="">
          <br></br>
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

                        <Select
                          value={selectedOptionCategorie}
                          onChange={this.handleChangeCategorie}
                          options={optionsCategorie}
                          placeholder="Espece"
                          required
                        />
                        <br></br>
                      </div>
                    </div>

                    <h6 id="gras" className="latest-product__item">
                      Race
                    </h6>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <Select
                          id="recherchePlace"
                          isDisabled={this.state.Disabled}
                          value={selectedOptionRace}
                          onChange={this.handleChangeRace}
                          options={this.state.race}
                          placeholder=" Race"
                          required
                        />
                       
                      </div>
                    </div>
                    <br></br>
                    <h6 id="gras" className="latest-product__item">
                      Region
                    </h6>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <Select
                          value={selectedOptionRegions}
                          onChange={this.handleChangeRegion}
                          options={optionsRegions}
                          placeholder=" Region"
                        />
                        <br></br>
                      </div>
                    </div>

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

                        />
                        <br></br>
                        <br></br>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
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
                  </div>
                </div>
              </div>

              <div className="col-lg-9 col-md-7">
                <div id="centrerT" className="container">
                  <p>Insert text here</p>
                </div>

                <div className="filter__item">
                  <div>
                    <div id="filterPlace" className="col-lg-5 col-md-5 fa ">
                      <Select
                        id="filterPlace"
                        value={this.state.selectedOptionSort}
                        onChange={this.sortData}
                        options={optionsSort}
                        placeholder="&#xf161;  Trie par le nombre d'etoiles"
                      />
                    </div>
                  </div>

                  <br></br>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="filter__found text-left">
                    <h4>    Nos eleveurs{" : "}<span id="nbEspece">
                            {" "}
                            {currentEleveurs.length}
                          </span>{" "} </h4>
                      </div>
                    </div>
                  </div>
                </div>

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
                        {currentEleveurs.map((Eleveurs) => (
                          <div className="col-lg-4  col-sm-6">

                            <div id="anonce" class="product__item">
                              <div
                                class="product__item__pic set-bg"
                                data-setbg={Eleveurs.photo_profil} >

                                <img
                                  src={Eleveurs.photo_profil}
                                  class="product__item__pic set-bg"  />

                                <ul class="product__item__pic__hover">
                                  <Link
                                    key={Eleveurs._id}
                                    to={{
                                      pathname: "/HomeSheepsParEleveur",
                                      state: {
                                        id: {
                                          id: Eleveurs._id,
                                          nom: Eleveurs.nom,
                                          prenom: Eleveurs.prenom,
                                        },
                                      },
                                    }}
                                    id={Eleveurs._id}  >
                                    <li>
                                      <a href="ToutesLesAnnoncesElveur"> {" "} <i class="fa fa-eye"></i>{" "} </a>
                                    </li>
                                  </Link>
                                </ul>
                              </div>
                              {Eleveurs.anoc ?
                                <h1 style={{ borderRadius: "0% 0% 0% 40%", fontSize: "14px" }} class=" badge badge-success pt-2 w-100  ">
                                  <HiOutlineBadgeCheck className=" mr-1 fa-lg " />
                                  <span>Labélisé ANOC</span>  </h1>
                                :
                                <span className="badge pt-3 w-100 mt-1   ">{"  "}</span>}
                              <div className="product__item__text p-2 text-justify">
                                <h6 >
                                  <i class="fa fa-user-circle-o"></i>{" " + Eleveurs.prenom + "         " + Eleveurs.nom}
                                  <span className="float-right rounded  border-dark border pr-1">
                                    <GiSheep className="  mr-1 fa-lg" />{" " + Eleveurs.Especes.length + " "}
                                  </span>
                                </h6>
                                <h6 >  <i class="fa fa-map"></i>{" " + Eleveurs.region} </h6>
                                <h6><i class="fa fa-home"></i> {Eleveurs.ville}</h6>
                                <h5>
                                  <Box style={{ textAlign: "center" }} component="fieldset" mb={3} borderColor="transparent">
                                    <Rating name="read-only" value={Eleveurs.rating} readOnly />
                                  </Box>
                                </h5>
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
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default AllOffers;
