import React, {Component} from 'react'
import moment from 'moment'
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
import { getNotices } from './../../actions/setting/notice'
import { connect } from 'react-redux';


class Notice extends Component {

  componentDidMount(){
    if(this.props.user.activeschool !== undefined && parseInt(this.props.user.activeschool.id) > 0){
    let params = {
      data:JSON.stringify(
      {
          'schoolid': this.props.user.activeschool.id
      }),
      cat:'selected',
      table:'notices',
      narration:'get notices'
    }
    this.props.getNotices(params)
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
        table:'notices',
        narration:'get notices'
      }
      this.props.getNotices(params)
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
        useTransform:true,
        vertical:true,

      };
  let data = this.props.notices.notices && Array.isArray(this.props.notices.notices) ? this.props.notices.notices.filter(rw =>rw !== null || rw !== undefined) : []
  
return (
    <>
    <CRow>
      <CCol lg={12} className='m-0 p-0'>
        <CCard style={{ height:'550px', backgroundColor:'teal', color:'white'}}>
          <CCardBody>
          <Slider {...settings}>
            { 
                data.map((prp, ini)=>{
                return <div className="media border p-3">
                <img 
                src={process.env.REACT_APP_SERVER_URL + prp.photo} 
                alt="John Doe" 
                className="mr-3 mt-3 rounded-circle" 
                onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/icons/profile_3.png'} }
                style={{width:'60px'}}
            />
            <div className="media-body">
                <h4 style={{fontFamily:'Quicksand'}}>{prp.title}</h4> 
                <small><i>Posted on { moment(prp.date_created).format('m DD, YYYY')}February 19, 2016</i></small>
                <strong>{prp.source}</strong>
              <p>{prp.message}</p>
                <small>{prp.staffname}</small>  
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

const mapStatetoProps = (state) =>({
  notices:state.noticeReducer,
  user:state.userReducer
})

export default connect(mapStatetoProps, {getNotices})(Notice)