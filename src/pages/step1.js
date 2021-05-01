import React, { Component } from "react";
import axios from "axios";
import Switch from "react-switch";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";

class Commander1 extends Component {
  constructor(props) {
    super(props);


  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="product-details spad">
               <div id="centrer" className="col-lg-12 col-md-6">
                <br></br>

                <h3>Livraison :</h3>
                <div className="shoping__checkout mt-2 pb-0">
               
                <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  <h6  > Recuperer a la cooperative {" "}
                    <Switch onChange={this.props.handleChange1} checked={this.props.data.check1} height={20} width={48} /></h6><br></br>
                  <h6> Me faire livrer en point relais {" "}
                    <Switch onChange={this.props.handleChange2} checked={this.props.data.check2} height={20} width={48} /></h6><br></br>
                  <h6> Me faire livrer a domicille {" "}
                    <Switch onChange={this.props.handleChange3} checked={this.props.data.check3} height={20} width={48} /></h6><br></br>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="checkout__form">
                <form action="#" onSubmit="" name="commander">
                  {this.props.data.check2 || this.props.data.check3 || this.props.data.check1 ?
                    <div className="col-lg-12  col-md-12 ">
                      <i className="fa fa-calendar-o" aria-hidden="true">{" "}Date de Livraison {" "}</i>
                      <br></br>
                      {this.props.data.occasion == "aid" ? 
                      <select id="date" name="date" onChange={this.props.onPaiementChanged}>

                        {(() => {
                          const options = [];

                          for (let i = 1; i <= this.props.data.avant_aid; i++) {
                            options.push(<option value={i+" jours avant"}>{i} jours avant </option>);
                          }

                          return options;
                        })()}

                      </select> :
                        <input type="date" min={this.props.data.date_min} onChange={this.props.onPaiementChanged} id="date" name="date" />
                      }</div> : null}


                  <div className="  row col-lg-12 col-md-12">
                    {this.props.data.check2 || this.props.data.check3 ?
                      <div className="col-lg-6 col-md-6 mt-2">
                        <i className="fa fa-map-o " aria-hidden="true">{" "}Ville de Livraison {" "}</i>
                        <Select
                          value={this.props.data.selectedOptionVille}
                          onChange={this.props.handleChangeVille}
                          options={this.props.data.optionsVille}
                          placeholder="Ville"
                          name="selectedOptionVille" />
                      </div> : null}
                    {this.props.data.check2 ?( this.props.data.entrée_ville?<div className="col-lg-6 col-md-6 mt-2">
                      <i className="fa fa-map-marker" aria-hidden="true">{" "}Point relais de Livraison {" "}</i>
                      <Select
                        value={this.props.data.selectedOptionPoint}
                        onChange={this.props.handleChangePoint}
                        options={this.props.data.optionsPoint}
                        placeholder="point de relais" />
                    </div>:null ): null}
                    {this.props.data.check2 && this.props.data.entrée_ville===false &&this.props.data.selectedOptionVille!=""?
                    <h6 style={{color :"#bb2124",marginTop:"4px"}}>Un technicien ANOC va vous contacter le jour de livraison que vous avez choisi pour vous informer de l'adresse exacte de la livraison.</h6>
                    :null}
                    {this.props.data.check3 ? <div className="col-lg-6  col-md-6 mt-2">
                      <i className="fa fa-map-marker " aria-hidden="true">{" "} Adresse {" "}</i>
                      <br></br>
                      <textarea onChange={this.props.onPaiementChanged} className="w-100 h-75" name="adresse" placeholder="adresse" /></div>
                      : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
       
                



                </div>
              </div>  
          </div>
        </div>
      </div>
    );
  }
}

export default Commander1;
