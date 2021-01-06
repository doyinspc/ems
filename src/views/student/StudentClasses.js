import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getStudentclasss, getStudentclass, registerStudentclass, updateStudentclass, deleteStudentclass} from './../../actions/student/studentclass';
import { useHistory, useParams } from 'react-router-dom'

import {
  CRow,
  CCol,
  CCardHeader,
  CNav,
  CNavLink,
  CNavItem,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CButton,
  CWidgetIcon,
  CCardFooter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import ClassBioAnalysis from './ClassBioAnalysis'
import StudentContactList from './StudentContactList'
import StudentGallery from './StudentGallery'
import StudentList from './StudentList'
import StudentFeeList from './StudentFeeList'

const Studentclasss = (props) => {
    const par = useParams()
    const history = useHistory()
    const [active, setActive] = useState(0)
    const [title, setTitle] = useState('Title')
    useEffect(() => {
        let params = {
          data:JSON.stringify(
          {
            'termid':par.term,
            'itemid':par.clasz,
            'sessionid':2,
            'grp':3
          }),
          cat:'studentclass',
          table:'accessstudentclassfull',
          narration:'get all studentclasss'
      }
        props.getStudentclasss(params)

        let dt = props.dropdowns && Array.isArray(props.dropdowns) ? props.dropdowns : [[], []];
        let dt0 ='';
        let dt1 ='';
        let title ='None | No Data'
        if(dt.length > 0)
        {
            dt0 = dt[0].filter(rw=>parseInt(rw.id) === parseInt(par.term));
            dt1 = dt[1].filter(rw=>parseInt(rw.id) === parseInt(par.clasz));
            let dtn0 = Array.isArray(dt0) && dt0.length > 0 ? dt0[0].name : 'No term';
            let dtn1 = Array.isArray(dt1) && dt1.length > 0 ? dt1[0].name : 'No class';
            title = dtn0+" "+dtn1
        }
        
        setTitle(title);
        
      }, [par.term, par.clasz])

let data = props.studentclasss.studentclasss && Array.isArray(props.studentclasss.studentclasss) ? props.studentclasss.studentclasss.filter(rw =>rw !== null || rw !== undefined) : []
 
  return (
    <>
    <CRow>
    <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">{title}</h4>
              <div className="small text-muted">Academic Calendar</div>
            </CCol>
            <CCol sm="7" className="d-md-block">
              <CButton 
                  data-target='#formz' 
                  data-toggle="collapse" 
                  color="primary"
                  className="float-right">
                <CIcon name="cil-cloud-download"/>
              </CButton>
            </CCol>
          </CRow>
          </CCardHeader>
          <CCardBody>
            <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
              <CNav variant="tabs">
              <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-chart-pie"/>
                    { active === 0 && ' Dashboard'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-calculator" />
                    { active === 1 && ' Biodata'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-map" />
                    { active === 2 && ' Contact'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <i className='fa fa-image'></i>
                    { active === 3 && ' Gallery'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                  <i className='fa fa-money'></i>
                    { active === 4 && ' Fees'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-user"/>
                    { active === 5 && ' Next of Kin'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <i className='fa fa-check'></i>
                    { active === 6 && ' Attendance'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <i className='fa fa-check'></i>
                    { active === 7 && ' Attendance'}
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <ClassBioAnalysis  data={data}/>
                </CTabPane>
                <CTabPane>
                   <StudentList  data={data}/>
                </CTabPane>
                <CTabPane>
                   <StudentContactList  data={data}/>
                </CTabPane>
                <CTabPane>
                    <StudentGallery data={data} />
                </CTabPane>
                <CTabPane>
                    <StudentFeeList data={data} />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  )
}

const mapStateToProps = (state) =>({
    studentclasss : state.studentclassReducer,
    dropdowns : state.schoolReducer.dropdowns
  })
  export default connect(mapStateToProps, {
    getStudentclasss,
    getStudentclass,
    registerStudentclass,
    updateStudentclass,
    deleteStudentclass
  })(Studentclasss)
  
