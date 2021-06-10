import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Select from 'react-select'
import {getAssessment, getAssessments} from './../../../actions/setting/assessment'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CInput, CLink, CNav, CNavItem, CNavLink, CRow, CTabContent, CTabPane, CTabs, CTooltip } from '@coreui/react'
import { getCas } from './../../../actions/setting/ca'
import CIcon from '@coreui/icons-react'
import { de } from 'date-fns/esm/locale'

const Assessment = (props) => {

    const [sessionid, setsessionid] = useState(2)
    const [termid, settermid] = useState(3)
    const [data, setdata] = useState({})
    const [fdata, setfdata] = useState({})
    const [categoryid, setcategoryid] = useState([])
    const [search, setsearch] = useState('')
    const [converts, setconverts] = useState(0)
    const [defaultconverts, setdefaultconverts] = useState(0)
    const [titles, settitles] = useState('')

    useEffect(() => {
       
    }, [sessionid, termid])
    
    useEffect(() => {
        let data = props.assessment !== undefined && props.assessment.assessments !== undefined && Array.isArray(props.assessment.assessments) ? props.assessment.assessments.filter(rw=>rw !== null) : [];
        setdata(data);
        setfdata(data)
      }, [props.assessment.assessments ])

    useEffect(() => {
        
        let params1 = {
          data:JSON.stringify(
          {
            'termid':props.user.activeterm.termid,
            'schoolid':props.user.activeterm.sessionid
          }),
          cat:'dropdownca',
          table:'dropdownca',
          narration:'get ca'
    
        }
        props.getCas(params1)
      
    }, [])
    
    const handleCategoryid = (event) =>{
        setcategoryid(event)
    }
    const cumavg = (arr , arr1) =>{
        if(Array.isArray(arr) && arr.length > 0 && Array.isArray(arr1) && arr1.length > 0)
        {
            let le = arr1.reduce((a, b)=>a + b, 0);
            let su = arr.reduce((a, b)=>a + b, 0);
            let avg = su/le;
            
            return Number(avg).toFixed(2);
        }
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
        arr['value'] = element.id+"::::"+element.sid+"::::"+element.score+"::::"+element.maxscore+"::::"+element.caabbrv+"::::"+element.name
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
                    'sessionid':sessionid,
                    'termid':termid,
                    'itemid1':casz.join(',')
                }),
                cat:'assessment',
                table:'assessment',
                narration:'assessment'
            }
            props.getAssessments(params);
        }

    }

    var dt = search.length === 0 ? data : data.filter(rw=>rw !== undefined && rw !== null && ((rw.itemname !== null && rw.itemname.toLowerCase().includes(search.toLowerCase())) || (rw.itemname1 !== null && rw.itemname1.toLowerCase().includes(search.toLowerCase())))) ;
    
    let dt_arr = {};
    let dt_subject = {};
    let dt_class = {};
    let dt_head = '';
    let dt_body = '';
    let dt_foot = '';
    let dt_col = {};
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

            dt_subject[ele.itemid] = ele.itemname;
            dt_class[ele.classid] = ele.itemname1;
        });
    
    dt_head = Object.keys(dt_class).map((prp, ind)=>{
            return<th key={ind}>{dt_class[prp]}</th>
    });
    dt_body = Array.isArray(Object.keys(dt_subject)) && Object.keys(dt_subject).length > 0 ? Object.keys(dt_subject).map((prp1, ind1)=>{
        let dt_row = [];
        return <tr key={ind1}>
            <td>{ind1 + 1}</td>
            <td>{Object.keys(dt_subject).includes(prp1) ? dt_subject[prp1] : ''}</td>
              {
                Array.isArray(Object.keys(dt_class)) && Object.keys(dt_class).length > 0 ?Object.keys(dt_class).map((prp, ind)=>{
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

    dt_foot = Object.keys(dt_class).map((prp, ind)=>{
        let d_sum = avgs(dt_col[prp])
        return <th key={ind}>{d_sum}</th>
    });
}
    let fx_array = [];
    let x_array = [];
    
    return (

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
                    Summary
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Categories
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Accounts
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Charts
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent fade={false}>
                <CTabPane>
                     <table width="100%" border="solid #ccc 2px">
                <thead className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
                    <tr>
                        <td className='text-center' style={{width:'20px'}}>SN</td>
                        <td className='text-center' style={{width:'200px'}} width="10px">SUBJECT</td>
                        <td className='text-center' style={{width:'100px'}} width="10px">CLASS</td>
                        
                        <td className='text-center' width="50px">POP</td>
                        <td className='text-center' width="50px">AVG<br/>({converts})</td>
                        <td className='text-center' width="50px">MAX<br/>({converts})</td>
                        <td className='text-center' width="50px">MIN<br/>({converts})</td>
                        <td className='text-center'>STAFFNAME</td>
                    </tr>
                </thead>
                <tbody style={{fontSize:props.fontz, fontWeight:'bold'}}>
                    {
                        
                        Array.isArray(dt) ? dt.filter(rw=>rw !== undefined && rw !== null).map((prop, indx)=>{
                            let fx = parseFloat(prop.num) * ((parseFloat(prop.score) * converts)/defaultconverts);
                            fx_array.push(fx);
                            x_array.push(parseFloat(prop.num));
                            return <tr>
                                        <td className='text-center'>
                                         {indx + 1}
                                        </td>
                                        <td className='text-left' style={{textTransform:'capitalize'}}>
                                        {prop.itemname}
                                        </td>
                                        <td className='text-center'>
                                        {prop.itemname1}
                                        </td>
                                        
                                        <td className='text-center'>{prop.num}</td>
                                        <td className='text-center'>{Number((parseFloat(prop.score)/defaultconverts) * converts).toFixed(2)}</td>
                                        <td className='text-center'>{Number((parseFloat(prop.maxscore)/defaultconverts) * converts).toFixed(2)}</td>
                                        <td className='text-center'>{Number((parseFloat(prop.minscore)/defaultconverts) * converts).toFixed(2)}</td>
                                        <td className='text-center'>
                                        {prop.clientname}
                                        </td>
                                   </tr>
                        }):''
                    }

                </tbody>
                <tfoot className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
                    <tr>
                         <td className='text-center' style={{width:'20px'}}>SN</td>
                        <td className='text-center' style={{width:'100px'}} width="10px">SUBJECT</td>
                        <td className='text-center' style={{width:'100px'}} width="10px">CLASS</td>
                        
                        <td className='text-center'>POP</td>
                        <td className='text-center'>{cumavg(fx_array, x_array)}</td>
                        <td className='text-center d-print-none' width="10px">MAX</td>
                        <td className='text-center d-print-none' width="10px">MIN</td>
                        <td className='text-center'>STAFFNAME</td>
                    </tr>
                </tfoot>

            </table>
                </CTabPane>
                <CTabPane>
             <      table width="100%" border="solid #ccc 2px">
                <thead className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
                    <tr>
                        <td className='text-center' style={{width:'20px'}}>SN</td>
                        <td className='text-center' style={{width:'200px'}} width="10px">SUBJECT</td>
                        {dt_head}
                        <td className='text-center' width="50px">TOTAL<br/>({converts})</td>
                    </tr>
                </thead>
                <tbody style={{fontSize:props.fontz, fontWeight:'bold'}}>
                    {dt_body}
                </tbody>
                <tfoot className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
                    <tr>
                    <td className='text-center' style={{width:'20px'}}>SN</td>
                        <td className='text-center' style={{width:'200px'}} width="10px">SUBJECT</td>
                        {dt_foot}
                        <td className='text-center' width="50px">TOTAL<br/>({converts})</td>
                    </tr>
                </tfoot>

            </table>
                </CTabPane>
                </CTabContent>
                </CTabs>
             </CCard>
    )
}

const mapStateToProps = (state) => ({
    assessment :state.assessmentReducer,
    cas:state.caReducer.cas,
    user:state.userReducer
})

const mapDispatchToProps = {
    getAssessments,
    getAssessment,
    getCas
}

export default connect(mapStateToProps, mapDispatchToProps)(Assessment)
