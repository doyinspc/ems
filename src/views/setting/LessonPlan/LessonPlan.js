import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import {getLessonplan, getLessonplans } from './../../../actions/setting/lessonplan'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CHeader, CInput, CLink, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs, CTooltip } from '@coreui/react'
import { getSubjects } from './../../../actions/setting/subject'
import CIcon from '@coreui/icons-react'
import List from './List'
const Lessonplan = (props) => {

    const [data, setdata] = useState({})
    const [fdata, setfdata] = useState({})
    const [categoryid, setcategoryid] = useState('')
    const [search, setsearch] = useState('')
    const [converts, setconverts] = useState(0)
    const [defaultconverts, setdefaultconverts] = useState(0)
    const [titles, settitles] = useState('')
    
    useEffect(() => {
        let data = props.lessonplan !== undefined && props.lessonplan.lessonplans !== undefined && Array.isArray(props.lessonplan.lessonplans) ? props.lessonplan.lessonplans.filter(rw=>rw !== null) : [];
        setdata(data);
        setfdata(data)
      }, [props.lessonplan.lessonplans ])

    useEffect(() => {
        
        let params1 = {
          data:JSON.stringify(
          {
            'typeid':props.user.activeschool.typeid
          }),
          cat:'selected',
          table:'subjects',
          narration:'get subject'
    
        }
        props.getSubjects(params1)
      
    }, [])
    
    
    let p1 = [];
    if(Array.isArray(props.cas)){ props.cas.forEach(element => {
        let arr = {}
        arr['value'] = element.id+"::::"+element.name
        arr['label'] = element.name !== undefined ? element.name.toUpperCase() :'Error;'
        p1.push(arr)
    });}

    const loadData = () =>{
        
        settitles(categoryid)
        
        if(categoryid !== undefined && categoryid.length > 0){
            let params = {
                data:JSON.stringify(
                {
                    'sessionid':props.user.activeterm.sessionid,
                    'termid':props.user.activeterm.termid,
                    'weekid':categoryid
                }),
                cat:'lessonplanreport',
                table:'lessonplan',
                narration:'lessonplan'
            }
            props.getLessonplans(params);
        }

    }

    var dt = search.length === 0 ? data : data.filter(rw=>rw !== undefined && rw !== null && ((rw.claszname !== null && rw.claszname.toLowerCase().includes(search.toLowerCase())) || (rw.staffname !== null && rw.staffname.toLowerCase().includes(search.toLowerCase()))) ) ;
    
  
    const lunchModal = (subjectid, clientid) =>{

        let casz = [];
        let title = [];
        let cazscore = {};
        let cascore = {};
        categoryid.forEach(element => {
            let item = element.value.split("::::");
            let title_str = item[4]+"-"+item[5]+"("+item[3]+")";
            title.push(title_str);
            casz.push(item[0]);
            cazscore[item[0]] = parseFloat(item[3]);
            cascore[item[1]] = parseFloat(item[2]);
        });
        settitles(title.join(", "))
        if(casz.length > 0){
            let params = {
                data:JSON.stringify(
                {
                    'sessionid':props.user.activeterm.sessionid,
                    'termid':props.user.activeterm.termid,
                    'itemid1':casz.join(','),
                    'itemid':subjectid,
                    'clientid':clientid
                }),
                cat:'lessonplandetails',
                table:'lessonplandetails',
                narration:'lessonplan'
            }
            props.getLessonplanDetails(params);
        }
    }

    return (
        < >
        <CCard className="d-none d-print-block">
            <CCardHeader>
                <CRow><CCol>
                <h5>
                    {props.user.activeschool != undefined &&  props.user.activeschool.hasOwnProperty('name') && props.user.activeschool.name ? props.user.activeschool.name : <span> Welcome<small><i> (No active term)</i></small></span> }  
                </h5>
                </CCol></CRow>
            </CCardHeader>
        </CCard>
        <CCard>
            <CCardHeader>
                <CContainer fluid>
                    <CRow>
                        <CCol>
                        <h4 id="traffic" className="card-title m-9">
                        {/* {props.user.activeterm != undefined &&  props.user.activeterm.hasOwnProperty('name') && props.user.activeterm.name ? props.user.activeterm.name : <span> Welcome<small><i> (No active term)</i></small></span> } */}
                        Lesson Plan
                        </h4>
                        <div className="small text-muted"><strong style={{fontSize:'15px', color:'teal'}}>
                        {titles}
                        </strong></div>
                        </CCol>
                    </CRow>
                    <CRow className="d-print-none">
                        <CCol xs={10} sm={8}>
                        <CInput 
                                type='week' 
                                value={categoryid}
                                onChange={(e)=>setcategoryid(e.target.value)}
                            />
                        </CCol>
                        <CCol xs={2} sm={1}>
                            <CButton
                                color="success"
                                onClick={loadData}
                            >
                                <CIcon name="cil-thumb-up"/>
                            </CButton>
                        </CCol>
                        <CCol xs={12} sm={3}>
                            <CInput 
                                type='search' 
                                value={search}
                                onChange={(e)=>setsearch(e.target.value)}
                                placeholder="Search subject or staff..."
                            />
                        </CCol>
                       
                    </CRow>
                </CContainer>
            </CCardHeader>
           <CTabs>
              <CNav className="d-print-none" variant="tabs">
                <CNavItem>
                  <CNavLink>
                    Records
                  </CNavLink>
                </CNavItem>
               
                
              </CNav>
              {props.lessonplan.isLoading ?
              <CTabContent fade={false}>
                  <CTabPane>
                      <List
                         dt={dt}
                         lunchModal={(e, f)=>lunchModal(e, f)}
                         converts={converts}
                         defaultconverts={defaultconverts}
                      />
                  </CTabPane>
                <CTabPane>
                </CTabPane>
                </CTabContent>:
                    <>
                        <CCard>
                            <CCardBody>
                                <h4>Loading....</h4>
                            </CCardBody>
                        </CCard>
                    </>}
                </CTabs>
             </CCard>
            </>
    )
}

const mapStateToProps = (state) => ({
    lessonplan :state.lessonplanReducer,
    cas:state.subjectReducer.subjects,
    user:state.userReducer
})

const mapDispatchToProps = {
    getLessonplans,
    getLessonplan,
    getSubjects
}

export default connect(mapStateToProps, mapDispatchToProps)(Lessonplan)
