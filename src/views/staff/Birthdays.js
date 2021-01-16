import React, {Component} from 'react'
import {connect} from 'react-redux'
import { 
    CCard, 
    CCardBody, 
    CCardHeader, 
    CCol, 
    CRow
} from '@coreui/react';
import { birthday } from './../../actions/staff/staff'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


 class Birthday extends Component {


  componentDidMount(){
    if(this.props.user.activeschool !== undefined && parseInt(this.props.user.activeschool.id) > 0){
    let params = {
      data:JSON.stringify(
      {
          'schoolid': this.props.user.activeschool.id
      }),
      cat:'selected',
      table:'birthday',
      narration:'get birthdays'
    }
    this.props.birthday(params)
   }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.user.activeschool !== prevProps.user.activeschool)
    {
      let params = {
        data:JSON.stringify(
        {
            'schoolid': this.props.user.activeschool.id
        }),
        cat:'selected',
        table:'birthday',
        narration:'get birthdays'
      }
      this.props.birthday(params)
     }
  }
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
        process.env.PUBLIC_URL +'/icons/profile_1.png',
        process.env.PUBLIC_URL +'/icons/profile_2.png',
        process.env.PUBLIC_URL +'/icons/profile_3.png',
        process.env.PUBLIC_URL +'/icons/profile_4.png',
        process.env.PUBLIC_URL +'/icons/profile_5.png'
    ];
      var randomNumber = Math.floor(Math.random()*textArray.length)
      let data = this.props.birthdayz;
return (
    <>
    
          <Slider {...settings}>
        {
            data !== undefined && Array.isArray(data) ? data.map((prp, ing)=>{
            return <div key={ing} class="col-md-12">
                    <div class="card profile-card-1">
                        <img src={process.env.PUBLIC_URL + "/bg.jpeg"} alt="profile-sample1" class="background"/>
                        <img 
                        src={process.env.REACT_APP_SERVER_URL + prp.photo} 
                        alt="profile-image" 
                        class="profile"
                        onError={(e)=>{e.target.onerror=null; e.target.src=textArray[randomNumber]} }
                        />
                        <div class="card-content">
                        <h6 style={{color: '#fff', textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff2d95, 0 0 30px #ff2d95, 0 0 40px #ff2d95, 0 0 50px #ff2d95, 0 0 75px #ff2d95', letterSpacing:"5px", fontFamily:'Boogaloo'}}>Happy Birthday</h6>
                        <h4>{prp.name}</h4>
                        <small>{prp.numb}</small>
                        <div class="icon-block">
                            <a href="#"><i class="fa fa-facebook"></i></a>
                            <a href="#"> <i class="fa fa-twitter"></i></a>
                            <a href="#"> <i class="fa fa-google-plus"></i></a>
                        </div>
                        </div>
                    </div>
            </div>
            }):''
        }
        </Slider>   
    </>
  )
}
}
const mapStateToProps = (state) =>({
  birthdayz:state.staffReducer.birthday,
  user:state.userReducer
})
export default connect(mapStateToProps, {birthday}) (Birthday)
