import React, { Component } from "react";
import { login } from "./UserFunctions";
import axios from "axios";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: "",
      password: "",

      redirect: true,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      login: this.state.login,
      password: this.state.password,
    };

    axios
      .post("http://127.0.0.1:8000/api/login", user)
      .then((res) => {
        console.log(res.data.success.token.token.user_id);
        localStorage.setItem("usertoken", res.data.success.token.token.user_id);
        // return res.data.success.token;

        this.props.history.push("/ToutesLesAnnonces");
        window.location.reload();
        // else
        //   alert("Email or password was incorrect.");
        // this.props.history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("Votre Email ou mot de passe est incorrect");
      });

    // login(user).then(

    //   // console.log('loged')
    // );
  }
  render() {
    return (
      <div className="text-center">
        <div className="contact-form spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12"></div>
            </div>
            <centre>
              <form
                action="#"
                className="text-center"
                noValidate
                onSubmit={this.onSubmit}
              >
                <center>
                  {" "}
                  <div className="row col-lg-6 col-md-6 text-center shoping__checkout">
                    <div className="col-lg-12 col-md-12">
                      <center>
                        {" "}
                        <br /> <h2 className="text-center">Se connecter</h2>
                      </center>
                      <br />
                      <br />{" "}
                      <input
                        type="text"
                        placeholder="Email "
                        name="login"
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={this.onChange}
                      />
                    </div>
                    <br></br>
                    <div className="col-lg-12 text-center">
                      <button type="submit" className="site-btn">
                        Se connecter
                      </button>
                      <br />
                      <br />
                      <i className="text-right">
                        Vous n'avez pas encore créé votre compte ? <br /> Vous
                        pouvez le créer maintenant.{" "}
                      </i>

                      <a type="submit" href="/register">
                        S'inscrire
                      </a>
                    </div>
                  </div>
                </center>
              </form>
            </centre>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
