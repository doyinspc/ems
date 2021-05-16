import { CButton, CCard, CCardBody, CCardHeader, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CardFooter, Collapse } from 'reactstrap'
import { callError, callReg, callSuccess } from '../../actions/common'
import {getTimetable, updateTimetable} from './../../actions/setting/timetable';
import {getStaffsubjects, getStaffsubject, deleteStaffsubject, updateStaffsubject, registerStaffsubject} from './../../actions/staff/staffsubject';


export const Tablez = (props) => {

    let ids = 1;//useParams().id;

    const [clasz, setclasz] = useState([]);
    const [claszunit, setclaszunit] = useState([])
    const [shows, setshows] = useState(0)
    const [fontz, setfontz] = useState(9)
    const [nms, setnms] = useState('Monday')

    useEffect(() => {
       props.getTimetable(1)
    }, [ids, props.timetables])

    let dt = props.timetables.filter(rw=>parseInt(rw.id) === parseInt(ids));
    let dt1 = Array.isArray(dt)  && dt.length > 0 ? dt[0] : {};
    let dt2 = {}
    if(Array.isArray(Object.keys(dt1)) && dt1.hasOwnProperty('timetable') && dt1.timetable !== undefined && dt1.timetable.length > 0 )
    {
        dt2 = JSON.parse(dt1.timetable)
    }
    let store = dt2;
    useEffect(() => {
        let claszarray = props.user.dropdowns && Array.isArray(props.user.dropdowns) ? props.user.dropdowns[1] : [];
        setclaszunit(claszarray);
        let clasu = []
        claszarray.forEach(ele => {
            let chk = clasu.filter(rw=>rw.id === ele.sid);
            if (chk !== undefined && Array.isArray(chk) && chk.length === 1)
            {
                chk[0].clid.push(ele.id)
            } else {
                let arr = {}
                arr['id'] = ele.sid;
                arr['name'] = ele.caname;
                arr['sid'] = ele.sid;
                arr['clid'] = [];
                arr['clid'].push(ele.id) 
                clasu.push(arr);
            }
        })
        setclasz(clasu)
    }, [props.user.dropdowns]);

    let days = {
        1:'Monday',
        2:'Tuesday',
        3:'Wednesday',
        4:'Thursday',
        5:'Friday',
    }

    let periods = {
        1:'First',
        2:'Second',
        3:'Third',
        4:'Fourth',
        5:'Fifth',
        6:'Sixth',
        7:'Seventh',
        8:'Eight',
        9:'Ninth',
        10:'Tenth'
    }
    console.log(store);

    const changeDisplay = () =>{
        let sh = shows;
        if(sh >= 5)
        {
            setshows(0)
        }else
        {
            sh = sh + 1
            setshows(sh)
        }
    }
    const addFont = () =>{
        let sh = fontz;
            sh = sh + 1
            setfontz(sh)   
    }
    const redFont = () =>{
        let sh = fontz;
            sh = sh - 1;
            setfontz(sh)   
    }
    return (
        <div>
            <CTabs>
            <CNav variant="tabs"  className="d-print-none">
                {
                    Object.keys(days).map((prop, ind)=>{
                        
                        return <CNavItem onClick={()=>setnms(days[prop])}><CNavLink>
                                <h6>{days[prop]}</h6>
                                </CNavLink></CNavItem>
                        })
                }
            </CNav>
            <CTabContent fade={false}>
            {
                Object.keys(days).map((prop, ind)=>{
                    return <CTabPane><CCard>
                        <CCardHeader>
                <h3 className='d-none d-print-block '>{props.user.activeschool.name}</h3>
                            <h4>TIME TABLE: {nms}</h4>
                        </CCardHeader>
                        <CCardBody>
                            <table width="100%" border="solid 1px">
                                <thead>
                                {
                                   <tr>
                                    <th>CLASS</th>
                                   {Object.keys(periods).map((prop2, ind1)=>{ 
                                       return <th>{periods[prop2]}</th>
                                   })
                                   } 
                                   </tr>
                                }
                                </thead>
                            {
                                claszunit.map((prop1, ind0)=>{
                                   return  <tr key={`a${ind0}`}>
                                       <th>{prop1.name}</th>
                                        {Object.keys(periods).map((prop2, ind1)=>{ 
                                            let clp  = 1+":::"+prop1.sid;
                                            let cl  = 0+":::"+prop1.id;
                                            let data =  store.hasOwnProperty(prop) && 
                                                        store[prop].hasOwnProperty(cl) && 
                                                        store[prop][cl].hasOwnProperty(prop2) ? store[prop][cl][prop2] : null;
                                            let data1 = store.hasOwnProperty(prop) && 
                                                        store[prop].hasOwnProperty(clp) && 
                                                        store[prop][clp].hasOwnProperty(prop2) ? store[prop][clp][prop2] : null;
                                            let parent = data1 !== null && Array.isArray(data1) ? true : false;
                                            if(parent)
                                            {

                                                let rwz = clasz.filter(rw=>rw.id == prop1.sid)[0].clid.length;
                                                let displ = clasz.filter(rw=>rw.id == prop1.sid)[0].clid[0] == prop1.id ? true : false;
                                                if(displ){
                                                return <td rowSpan={rwz} style={{fontSize: fontz+'px', fontWeight:'bold'}} key={`b${ind1}`}> 
                                                        { data1.map(data=>{
                                                            return <div key={data.id}>
                                                                {shows === 0 ? data.itemname1:''}
                                                                {shows === 1 ? data.clientname:''}
                                                                {shows === 2 ? data.clientabbrv:''}
                                                                {shows === 3 ? data.itemabbrv1:''}
                                                                {shows === 4 ? <>{data.itemabbrv1} <i>{data.clientabbrv}</i></>:''}
                                                                {shows === 5 ? <>{data.itemname1}<br/><i>{data.clientname}</i></>:''}
                                                            </div>
                                                        })     
                                                        }
                                                      </td>
                                                }
                                            }else
                                            {
                                                if(data !== null){
                                                return <td rowSpan={1} style={{fontSize:fontz+'px', fontWeight:'bold'}} key={`b${ind1}`}> 
                                                        <div  id={`_1`}>
                                                        {shows === 0 ? data.itemname1:''}
                                                                {shows === 1 ? data.clientname:''}
                                                                {shows === 2 ? data.clientabbrv:''}
                                                                {shows === 3 ? data.itemabbrv1:''}
                                                                {shows === 4 ? <>{data.itemabbrv1} <i>{data.clientabbrv}</i></>:''}
                                                                {shows === 5 ? <>{data.itemname1}<br/><i>{data.clientname}</i></>:''}
                                                        </div>
                                                      </td>
                                                }
                                                else{
                                                    return <td></td>
                                                }
                                                
                                            }
                                      })
                                      }
                                    </tr>
                                    
                                })
                            }
                            
                            </table>
                        </CCardBody>
                        <CardFooter>
                            <CButton size='sm' color='success' onClick={changeDisplay}>Toggle Display</CButton>
                            <CButton size='sm' color='info' onClick={addFont}>Add font Size</CButton>
                            <CButton size='sm' color='info' onClick={redFont}>Reduce Font Size</CButton>
                        </CardFooter>
                    </CCard>
                    </CTabPane>
                })
            }
            </CTabContent>
            </CTabs> 
        </div>
    )
}

const mapStateToProps = (state) => ({
    timetables : state.timetableReducer.timetables,
    user:state.userReducer,
    clasz : state.claszReducer.claszs,
})

const mapDispatchToProps = {
    getStaffsubjects,
    updateStaffsubject,
    deleteStaffsubject,
    registerStaffsubject,
    getTimetable,
    updateTimetable
}

export default connect(mapStateToProps, mapDispatchToProps)(Tablez)
