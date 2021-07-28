import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap-less";
import Loader from "react-loader-spinner";
import Swal from "sweetalert2";
import { GiWeight, GiSheep } from "react-icons/gi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { FaShapes } from "react-icons/fa";
require("bootstrap-less/bootstrap/bootstrap.less");

class Compte extends Component {
  constructor() {
    super();
    this.state = {
      Data: [],
      nbr: null,
      loading: true,
    };
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
    const expiredTimeToken = localStorage.getItem("expiredTimeToken");
    const token = localStorage.getItem("usertoken");
    const myToken = `Bearer ` + localStorage.getItem("myToken");

    if (!token || expiredTimeToken < formatted_date) {
      this.props.history.push("/login");
    } else {
      this.setState({ loading: true }, () => {
        axios
          .get("http://127.0.0.1:8000/api/consommateur/" + token, {
            headers: {
              // "x-access-token": token, // the token is a variable which holds the token
              // "Content-Type": "application/json",
              Authorization: myToken,
            },
          })
          .then((res) => {
            this.setState({
              Data: res.data,
              loading: false,
            });
          });
      });
    }
  }
  render() {
    return (
      <div className="container">
        {this.state.Data.length != 0 ? (
          <>
            <div className="cont">
              <div className="first item">
                <div className="picture item">
                  <centre>
                    {this.state.Data.civilisation == "Mr" ? (
                      <img
                        src="/Images/man.png"
                        alt="item"
                        className="product__item__pic set-bg"
                        style={{
                          width: "200px",
                          height: "200px",
                        }}
                      />
                    ) : (
                      <img
                        src="/Images/woman.png"
                        alt="item"
                        className="product__item__pic set-bg"
                        style={{
                          width: "200px",
                          height: "200px",
                        }}
                      />
                    )}
                  </centre>{" "}
                </div>
                <div className="information item">
                  <div className="details">
                    <ul className="pt-4">
                      <li>
                        <b>Civilisation</b>{" "}
                        <span>{this.state.Data.civilisation}</span>{" "}
                        <button>
                          {" "}
                          <img src="/Images/edit.png" alt="item" />
                        </button>{" "}
                      </li>
                      <li>
                        <b>Nom</b> <span>{this.state.Data.nom}</span>{" "}
                        <button>
                          {" "}
                          <img src="/Images/edit.png" alt="item" />
                        </button>{" "}
                      </li>
                      {/*<li>
                          <b>Categorie</b> <span>{this.state.Espece.categorie}</span>
                        </li>*/}
                      <li>
                        <b>Prenom</b> <span>{this.state.Data.prenom}</span>{" "}
                        <button>
                          {" "}
                          <img src="/Images/edit.png" alt="item" />
                        </button>{" "}
                      </li>
                      <li>
                        <b>Tel</b> <span>{this.state.Data.tel} </span>{" "}
                        <button>
                          {" "}
                          <img src="/Images/edit.png" alt="item" />
                        </button>{" "}
                      </li>
                      <li>
                        <b>Email</b> <span>{this.state.Data.email} </span>{" "}
                        <button>
                          {" "}
                          <img src="/Images/edit.png" alt="item" />
                        </button>{" "}
                      </li>
                      <li>
                        <b>Adresse</b> <span>{this.state.Data.adresse} </span>{" "}
                        <button>
                          {" "}
                          <img src="/Images/edit.png" alt="item" />
                        </button>{" "}
                      </li>
                      <li>
                        <b>Ville</b> <span>{this.state.Data.ville} </span>{" "}
                        <button>
                          {" "}
                          <img src="/Images/edit.png" alt="item" />
                        </button>{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="item"></div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div style={{ height: "80em" }}></div>
          </>
        )}
      </div>
    );
  }
}
export default Compte;
