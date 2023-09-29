import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import face from '../../assets/face.png';
import youtube from '../../assets/youtube.png';
import twitter from '../../assets/twitter.png';
import instagram from '../../assets/instagram.png';
Footer.propTypes = {};

function Footer(props) {
  return (
    <div className="wrap-footer">
      <div className="footer">
        <a href="https://www.facebook.com/vannhan.nguyen.52438?locale=vi_VN" target="_blank">
          <img className="icon-contact" src={face} alt="" />
        </a>
        <a href="">
          <img className="icon-contact" src={youtube} alt="" />
        </a>
        <a href="">
          <img className="icon-contact" src={twitter} alt="" />
        </a>
        <a href="">
          <img className="icon-contact" src={instagram} alt="" />
        </a>
      </div>
      <span> @copyRight 2023 by nguyen van nhan nickname nhanBlack</span>
    </div>
  );
}

export default Footer;
