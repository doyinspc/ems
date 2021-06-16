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
    
    useEffect(() => {
        let data = props.theme !== undefined && props.theme.themes !== undefined && Array.isArray(props.theme.themes) ? props.theme.themes.filter(rw=>rw !== null) : [];
        setdata(data);
        setfdata(data)
      }, [props.theme.themes ])

    useEffect(() => {
        
        let params1 = {
          data:JSON.stringify(
          {
            'typeid':1//props.user.user.typeid
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
        arr['value'] = element.id
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
            let title_str = item[4]+"-"+item[5]+"("+item[3]+")";
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
                    'itemid1':casz.join(',')
                }),
                cat:'theme',
                table:'theme',
                narration:'theme'
            }
            props.getThemes(params);
        }

    }

    var dt = search.length === 0 ? data : data.filter(rw=>rw !== undefined && rw !== null && ((rw.itemname !== null && rw.itemname.toLowerCase().includes(search.toLowerCase())) || (rw.itemname1 !== null && rw.itemname1.toLowerCase().includes(search.toLowerCase())))) ;
    
    let dt_arr = {};
    let dt_subject = {};
    let dt_class = {};
    let dt_cla = {};
    let dt_head = '';
    let dt_body = '';
    let dt_foot = '';
    let dt_col = {};
    let dt_total = [];
    let ct_arr = {};
    let ct_head = '';
    let ct_body = '';
    let ct_foot = '';
    let ct_col = {};
    let ct_total = [];

    if(Array.isArray(dt)){

        dt.forEach(ele => {
            if(Object.keys(dt_arr).includes(ele.itemid))
            {
                if(Object.keys(dt_arr[ele.itemid]).includes(ele.classid)){
                    dt_arr[ele.itemid][ele.classid].push(ele.score);
                }else{
                    dt_arr[ele.itemid][ele.classid] = [] ;
                    dt_arr[ele.itemid][ele.classid].push(ele.score);
                }

            }else{
                dt_arr[ele.itemid] = {};
                dt_arr[ele.itemid][ele.classid] = [] ;
                dt_arr[ele.itemid][ele.classid].push(ele.score); 
            }

            if(Object.keys(ct_arr).includes(ele.itemid))
            {
                if(Object.keys(ct_arr[ele.itemid]).includes(ele.caid)){
                    ct_arr[ele.itemid][ele.caid].push(parseFloat(ele.score));
                }else{
                    ct_arr[ele.itemid][ele.caid] = [] ;
                    ct_arr[ele.itemid][ele.caid].push(parseFloat(ele.score));
                }

            }else{
                    ct_arr[ele.itemid] = {};
                    ct_arr[ele.itemid][ele.caid] = [] ;
                    ct_arr[ele.itemid][ele.caid].push(parseFloat(ele.score)); 
            }

            dt_subject[ele.itemid] = ele.itemname;
            dt_class[ele.classid] = ele.itemname1;
            dt_cla[ele.caid] = ele.caname;

        });
    
    dt_head = Object.keys(dt_class).map((prp, ind)=>{
            return<th key={ind}>{dt_class[prp]}</th>
    });
    ct_head = Object.keys(dt_cla).map((prp, ind)=>{
        return<th key={ind}>{dt_cla[prp]}</th>
    });

    dt_body = Array.isArray(Object.keys(dt_subject)) && Object.keys(dt_subject).length > 0 ? Object.keys(dt_subject).map((prp1, ind1)=>{
        let dt_row = [];
        return <tr key={ind1}>
            <td>{ind1 + 1}</td>
            <td>{Object.keys(dt_subject).includes(prp1) ? dt_subject[prp1] : ''}</td>
              {
                Array.isArray(Object.keys(dt_class)) && Object.keys(dt_class).length > 0 ? Object.keys(dt_class).map((prp, ind)=>{
                    if(Object.keys(dt_arr).includes(prp1) && Object.keys(dt_arr[prp1]).includes(prp) ){
                        let dt_sum = avgs(dt_arr[prp1][prp]);
                        let dt_sum_in = Number((dt_sum/defaultconverts) * converts).toFixed(2);
                        dt_row.push(parseFloat(dt_sum_in));
                        //store column values to add later
                        if(Object.keys(dt_col).includes(prp))
                        {dt_col[prp].push(parseFloat(dt_sum_in));}
                        else{dt_col[prp] =[]; dt_col[prp].push(parseFloat(dt_sum_in));}
                        return <th key={ind} className="text-center">
                            {dt_sum_in}
                        </th>
                    }else{
                        return <td className="text-center">-</td>
                    }
                }):''
              }
            <td className="text-center">{avgs(dt_row)}</td>
        </tr>   
    }):"";

    ct_body = Array.isArray(Object.keys(dt_subject)) && Object.keys(dt_subject).length > 0 ? Object.keys(dt_subject).map((prp1, ind1)=>{
        let ct_row = [];
        return <tr key={ind1}>
            <td>{ind1 + 1}</td>
            <td>{Object.keys(dt_subject).includes(prp1) ? dt_subject[prp1] : ''}</td>
              {
                Array.isArray(Object.keys(dt_cla)) && Object.keys(dt_cla).length > 0 ?Object.keys(dt_cla).map((prp, ind)=>{
                    if(Object.keys(ct_arr).includes(prp1) && Object.keys(ct_arr[prp1]).includes(prp) ){
                        let ct_sum = avgs(ct_arr[prp1][prp]);
                        let ct_sum_in = Number((ct_sum/defaultconverts) * converts).toFixed(2);
                        ct_row.push(parseFloat(ct_sum_in));
                        //store column values to add later
                        if(Object.keys(ct_col).includes(prp))
                        {ct_col[prp].push(parseFloat(ct_sum_in));}
                        else{ct_col[prp] =[]; ct_col[prp].push(parseFloat(ct_sum_in));}
                        return <th key={ind} className="text-center">
                            {ct_sum_in}
                        </th>
                    }else{
                        return <td className="text-center">-</td>
                    }
                }):''
              }
            <td className="text-center">{avgs(ct_row)}</td>
        </tr>   
    }):"";

    dt_foot = Object.keys(dt_class).map((prp, ind)=>{
        let d_sum = avgs(dt_col[prp]);
        dt_total.push(parseFloat(d_sum));
        return <th key={ind}>{d_sum}</th>
    });

    ct_foot = Object.keys(dt_cla).map((prp, ind)=>{
        let c_sum = avgs(ct_col[prp]);
        ct_total.push(parseFloat(c_sum));
        return <th key={ind}>{c_sum}</th>
    });

    }

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
                        <h5 id="traffic" className="card-title mb-0">
                        {props.user.activeterm != undefined &&  props.user.activeterm.hasOwnProperty('name') && props.user.activeterm.name ? props.user.activeterm.name : <span> Welcome<small><i> (No active term)</i></small></span> }
                        </h5>
                        <div className="small text-muted"><strong style={{fontSize:'15px', color:'teal'}}>
                        {titles}
                        </strong></div>
                        </CCol>
                    </CRow>
                    <CRow className="d-print-none">
                        <CCol xs={10} sm={5}>
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
                        <CCol xs={6} sm={4}>
                            <CInput 
                                type='search' 
                                value={search}
                                onChange={(e)=>setsearch(e.target.value)}
                                placeholder="Search subject or class..."
                            />
                        </CCol>
                        <CCol xs={6} sm={2}>
                            <CInput 
                                type='number' 
                                value={converts}
                                onChange={(e)=>setconverts(e.target.value)}
                                placeholder="convert to."
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
                <CNavItem>
                  <CNavLink>
                    Class Units
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Class
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Charts
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Summary
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
