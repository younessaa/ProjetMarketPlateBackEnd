import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer class="footer-distributed">
        <div class="footer-left">
          <h3>
            My<span>Anoc</span>
          </h3>
          <p class="footer-company-name">anoc &copy; 2021</p>
        </div>

        <div class="footer-center">
          <div>
            <i class="fa fa-map-marker"></i>
            <p>
              <span>Résidence Meriem, Avenue Hassan II</span> Rabat, Maroc
            </p>
          </div>

          <div>
            <i class="fa fa-phone"></i>
            <p>05376-90802</p>
          </div>

          <div>
            <i class="fa fa-envelope"></i>
            <p>
              <a href="mailto:support@company.com">test@test.com</a>
            </p>
          </div>
        </div>

        <div class="footer-right">
          <p class="footer-company-about">
            <span>About</span>
            ASSOCIATION NATIONALE DES ÉLEVEURS OVINS ET CAPRINS
          </p>

          <div class="footer-icons">
            <a href="https://www.facebook.com/Association.nationale.ovine.et.caprine/">
              <i class="fa fa-facebook"></i>
            </a>
            <a href="http://www.anoc.ma/">
              <i class="fa fa-globe"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCzX4064MubkoUVL1ecFDGpQ">
              <i class="fa fa-youtube"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
