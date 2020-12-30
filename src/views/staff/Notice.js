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
import { array } from 'prop-types';


export default class SimpleSlider extends Component {
render() {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed: 6000,
        useTransform:true,
        vertical:true,

      };
let arrayd = [1, 2, 3, 4, 5, 6, 7, 8, 9]
return (
    <>
    <CRow>
      <CCol lg={12} className='m-0 p-0'>
        <CCard style={{ height:'550px', backgroundColor:'teal', color:'white'}}>
          <CCardBody>
          <Slider {...settings}>
            { 
                arrayd.map((prp, ini)=>{
                return <div className="media border p-3">
                <img 
                src="img_avatar3.png" 
                alt="John Doe" 
                className="mr-3 mt-3 rounded-circle" 
                onError={(e)=>{e.target.onerror=null; e.target.src='/icons/profile_3.png'} }
                style={{width:'60px'}}
            />
            <div className="media-body">
              <h4 style={{fontFamily:'Quicksand'}}>John Doe</h4> 
              <small><i>Posted on February 19, 2016</i></small>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>      
            </div>
          </div>
            })
            }
          
        </Slider>

          </CCardBody>
         </CCard>
      </CCol>
    </CRow>
    </>
  )
}
}
