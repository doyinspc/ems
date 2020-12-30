import React, {Component} from 'react'
import {connect} from 'react-redux'
import { 
    CCard, 
    CCardBody, 
    CCardHeader, 
    CCol, 
    CRow
} from '@coreui/react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default class SimpleSlider extends Component {
render() {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed: 6000,
        useTransform:true
      };
      var textArray = [
        '/icons/profile_1.png',
        '/icons/profile_2.png',
        '/icons/profile_3.png',
        '/icons/profile_4.png',
        '/icons/profile_5.png'
    ];
      var randomNumber = Math.floor(Math.random()*textArray.length)
return (
    <>
    
          <Slider {...settings}>
        {
            [1,2,3,4,5,6,7,8,9,0].map((prp, ing)=>{
            return <div class="col-md-12">
                    <div class="card profile-card-1">
                        <img src="/bg.jpeg" alt="profile-sample1" class="background"/>
                        <img 
                        src="https://randomuser.me/api/portraits/women/20.pg" 
                        alt="profile-image" 
                        class="profile"
                        onError={(e)=>{e.target.onerror=null; e.target.src=textArray[randomNumber]} }
                        />
                        <div class="card-content">
                        <h6 style={{color: '#fff', textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff2d95, 0 0 30px #ff2d95, 0 0 40px #ff2d95, 0 0 50px #ff2d95, 0 0 75px #ff2d95', letterSpacing:"5px", fontFamily:'Boogaloo'}}>Happy Birthday</h6>
                        <h4>Emeka Segun David</h4>
                        <small>Engineer</small>
                        <div class="icon-block">
                            <a href="#"><i class="fa fa-facebook"></i></a>
                            <a href="#"> <i class="fa fa-twitter"></i></a>
                            <a href="#"> <i class="fa fa-google-plus"></i></a>
                        </div>
                        </div>
                    </div>
            </div>
            })
        }
        </Slider>

          
    </>
  )
}
}
