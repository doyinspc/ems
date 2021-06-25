import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import {getTheme, getThemes } from './../../../actions/setting/theme'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CHeader, CInput, CLink, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs, CTooltip } from '@coreui/react'
import { getSubjects } from './../../../actions/setting/subject'
import CIcon from '@coreui/icons-react'
import List from './List'
const Theme = (props) => {

    const [data, setdata] = useState({})
    const [fdata, setfdata] = useState({})
    const [categoryid, setcategoryid] = useState([])
    const [search, setsearch] = useState('')
    const [converts, setconverts] = useState(0)
    const [defaultconverts, setdefaultconverts] = useState(0)
    const [titles, settitles] = useState('')
    console.log(data)
    useEffect(() => {
        let data = props.theme !== undefined && props.theme.themes !== undefined && Array.isArray(props.theme.themes) ? props.theme.themes.filter(rw=>rw !== null) : [];
        setdata(data);
        setfdata(data)
      }, [props.theme.themes ])

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
    
    const handleCategoryid = (event) =>{
        setcategoryid(event)
    }
   
    const avgs = (arr) =>{
        if(Array.isArray(arr) && arr.length > 0 )
        {
            let le = arr.length;
            let su = arr.reduce((a, b)=>a + b, 0);
            let avg = su/le;
           
            return Number(avg).toFixed(2);
        }
    }
    let p1 = [];
    if(Array.isArray(props.cas)){ props.cas.forEach(element => {
        let arr = {}
        arr['value'] = element.id+"::::"+element.name
        arr['label'] = element.name
        p1.push(arr)
    });}

    const loadData = () =>{
        let casz = [];
        let title = [];
        let cazscore = {};
        let cascore = {};
        categoryid.forEach(element => {
            let item = element.value.split("::::");
            let title_str = item[1]  !== undefined ? item[1].toUpperCase():'No Name';
            title.push(title_str);
            casz.push(item[0]);
            cazscore[item[0]] = parseFloat(item[3]);
            cascore[item[1]] = parseFloat(item[2]);
        });
        settitles(title.join(", "))
        let loadconverts = Object.values(cazscore).reduce((a,b)=>a + b, 0);
        setconverts(loadconverts);
        setdefaultconverts(loadconverts);
        if(casz.length > 0){
            let params = {
                data:JSON.stringify(
                {
                    'sessionid':props.user.activeterm.sessionid,
                    'termid':props.user.activeterm.termid,
                    'itemid':casz.join(',')
                }),
                cat:'theme',
                table:'theme',
                narration:'theme'
            }
            props.getThemes(params);
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
                cat:'themedetails',
                table:'themedetails',
                narration:'theme'
            }
            props.getThemeDetails(params);
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
                        Scheme Of Work
                        </h4>
                        <div className="small text-muted"><strong style={{fontSize:'15px', color:'teal'}}>
                        {titles}
                        </strong></div>
                        </CCol>
                    </CRow>
                    <CRow className="d-print-none">
                        <CCol xs={10} sm={8}>
                            <Select
                                closeMenuOnSelect={false}
                                value={categoryid}
                                isMulti
                                options={p1}
                                onChange={handleCategoryid}
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
              {props.theme.isLoading ?
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
    theme :state.themeReducer,
    cas:state.subjectReducer.subjects,
    user:state.userReducer
})

const mapDispatchToProps = {
    getThemes,
    getTheme,
    getSubjects
}

export default connect(mapStateToProps, mapDispatchToProps)(Theme)
