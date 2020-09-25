import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div  className="text-center"> 
        <footer className="footer spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="footer__widget">
                  <div className="footer__widget__social ">
                    <h6> SUIVEZ NOUS {"  "} </h6>
                    <a href="https://www.facebook.com/Association.nationale.ovine.et.caprine/">
                      <i id="facebook" className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i id="twitter" className="fa fa-twitter"></i>
                    </a>
                    <a href="https://www.youtube.com/channel/UCzX4064MubkoUVL1ecFDGpQ">
                      <i id="youtube" className="fa fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
         </div>
    );
  }
}

export default Footer;
