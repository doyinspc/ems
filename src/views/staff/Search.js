import React, {Component} from 'react'
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
import SearchDashboard from './SearchDashboard';
import SearchDashboard1 from './SearchDashboard1';


export default class Search extends Component {
render() {
     
return (
    <>
    <SearchDashboard />
    <SearchDashboard1 />
   </>
  )
}
}
