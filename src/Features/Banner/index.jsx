import React from 'react';
import Slider from 'react-slick';
import bannerOne from '../../assets/banner-one.jpg';
import bannertwo from '../../assets/banner-two.png';
import bannerthree from '../../assets/banner-three.png';
import bannerfour from '../../assets/banner-four.jpg';
import './style.css';

Banner.propTypes = {};

function Banner(props) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {/* <div className="item-banner"></div>
      <div className="item-banner"></div>
      <div className="item-banner"></div>
      <div className="item-banner"></div>
      <div className="item-banner"></div> */}
      <div>
        <img src={bannerOne} alt="" className="image-banner" />
      </div>
      <div>
        <img src={bannertwo} alt="" className="image-banner" />
      </div>
      <div>
        <img src={bannerthree} alt="" className="image-banner" />
      </div>
      <div>
        <img src={bannerfour} alt="" className="image-banner" />
      </div>
      <div>
        <img src={bannertwo} alt="" className="image-banner" />
      </div>
    </Slider>
  );
}

export default Banner;
