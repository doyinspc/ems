import React from 'react'
import { connect } from 'react-redux';
import {getStaffsubjects, getStaffsubject, registerStaffsubject, updateStaffsubject, deleteStaffsubject} from './../../../actions/staff/staffsubject';
import { useHistory} from 'react-router-dom'
import Staffsubject0 from './Staffsubject0';
import Staffsubject1 from './Staffsubject1';
import Staffsubject2 from './Staffsubject2';
import Staffsubject3 from './Staffsubject3';
import { 
    CTabs,
    CTabContent,
    CTabPane,
    CNav,
    CNavItem,
    CNavLink,
    CNavbar
 } from '@coreui/react';

const Staffsubject = (props) => {
  
  return (
        <>
        <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    Home
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Staff/Class
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Staff/Subject
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Subject/Class
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                 <Staffsubject0 
                    pid={props.pid}
                    qid={props.qid}
                    did={props.did}
                    editer={props.editer}
                    submenu={props.submenu}
                    onActivate={(rw, ini)=>props.onActivate(rw, ini)}
                    onEdit={(rw)=>props.onEdit(rw)}
                    onDelete={(rw)=>props.onDelete(rw)}
                    data={props.data}
                 />
                </CTabPane>
                <CTabPane>
              <Staffsubject1  data={props.data}/>
              </CTabPane>
                <CTabPane>
              <Staffsubject2  data={props.data}/>
              </CTabPane>
                <CTabPane>
              <Staffsubject3  data={props.data}/>
              </CTabPane>
              </CTabContent>
            </CTabs>
              </>
         
  )
}
const mapStateToProps = (state) =>({
  staffsubjects : state.staffsubjectReducer
})
export default connect(mapStateToProps, {
  getStaffsubjects,
  getStaffsubject,
  registerStaffsubject,
  updateStaffsubject,
  deleteStaffsubject
})(Staffsubject)
