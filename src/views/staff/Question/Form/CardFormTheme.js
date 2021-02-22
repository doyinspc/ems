import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCoursematerial, registerCoursematerial, updateCoursematerial } from './../../../../actions/setting/coursematerial';
import { getTheme, registerTheme, updateTheme } from './../../../../actions/setting/theme';
import Theme from './../../../setting/Form/ThemeForm'
import { CContainer, CModal, CModalBody, CRow } from '@coreui/react';


const Modals = (props) => {
  
  const [modal, setModal] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState(null);

  /**
   * ON LOAD
   * OPEN MODAL IF AND ID IS INCLUDES
   * @param {*} props.data
   * UPDATE THE STATE
   */
  useEffect(() => {
    if(parseInt(props.mid) > 0 )
    {
     setModal(true);     
    } 
},[props.mid]);

 
  return (
      <CModal 
        isOpen={modal} 
        toggle={toggle} 
        show={modal} 
        onClose={() =>props.handleClose()}
        size="md"
        keyboard='false' 
        backdrop='static'  
        style={{margin:'0px', padding:'0px'}}
      >
            <CModalBody style={{margin:'0px', padding:'0px'}}>
                <CRow >
                    <Theme
                        pid={3}
                        mid={props.data.id}
                        school={props.school}
                        data={props.data}
                        onReset={props.onReset}
                        onClose={props.handleClose}
                    />
                </CRow>
            </CModalBody>
      </CModal>
    );
}
const mapStateToProps = (state, ownProps) => ({ 
    coursematerials: state.themeReducer,
  })
  
export default connect(mapStateToProps, { 
  getCoursematerial, registerCoursematerial, updateCoursematerial, 
  getTheme, registerTheme, updateTheme,
})(Modals)
