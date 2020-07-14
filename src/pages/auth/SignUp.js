import React, { Component } from "react";
import axios from "axios";
// import { register } from "./UserFunctions";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      // first_name: "",
      // last_name: "",
      login: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.register = this.register.bind(this);
  }

  register = (newUser) => {
    return axios
      .post(
        "http://127.0.0.1:8000/api/register",
        {
          login: newUser.login,
          password: newUser.password,
          role: "Consommateur",
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        const consommateur = {
          civilisation: "Mr",
          nom: this.state.nom,
          prenom: this.state.prenom,
          tel: this.state.tel,
          email: this.state.login,
          adresse: this.state.adresse,
          favoris: [],
          panier: [],
          id_user: res.data.success.token.token.user_id,
        };

        axios.post("http://127.0.0.1:8000/api/consommateur", consommateur, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
          },
        });

        console.log(consommateur);
      });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      // first_name: this.state.first_name,
      // last_name: this.state.last_name,
      login: this.state.login,
      password: this.state.password,
    };

    this.register(user).then((res) => {
      // this.props.history.push(`/login`);
      // console.log(res.data)
    });
  }
  render() {
    return (
      <div>
        <div className="contact-form spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12"></div>
            </div>

            <form action="#" className="text-center" onSubmit={this.onSubmit}>
              <center>
                {" "}
                <div className="row col-lg-6 col-md-6 text-center shoping__checkout">
                  <div className="col-lg-12 col-md-12">
                    <center>
                      {" "}
                      <br /> <h2 className="text-center">S'inscrire</h2>
                    </center>
                    <br />{" "}
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <input
                      type="text"
                      placeholder="Nom*"
                      name="nom"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <input
                      type="text"
                      placeholder="Prénom"
                      name="prenom"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <input
                      type="text"
                      placeholder="Email*"
                      name="login"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <input
                      type="text"
                      placeholder="Numéro de téléphone*"
                      onChange={this.onChange}
                      name="tel"
                    />
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <input
                      type="password"
                      placeholder="Mot de passe*"
                      name="password"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <input
                      type="text"
                      placeholder="Adresse*"
                      name="adresse"
                      onChange={this.onChange}
                    />
                  </div>
                  <br></br>
                  <div className="col-lg-12 text-center">
                    <button type="submit" className="site-btn">
                      S'inscrire
                    </button>
                    <br />
                    <br />
                    <i className="text-right">(*) Champs obligatoires</i>
                  </div>
                </div>
              </center>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
