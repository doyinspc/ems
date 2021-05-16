import { CCol, CInput, CRow } from '@coreui/react'
import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Card, CardBody } from 'reactstrap'
import {getStaffsubjects, getStaffsubject, deleteStaffsubject, updateStaffsubject, registerStaffsubject} from './../../../actions/staff/staffsubject';




 function Periods(props) {
    const [search, setsearch] = useState('');
    let termid = props.termid;
    let sessionid = props.sessionid;
    
    useEffect(() => {
        let params = {
            data:JSON.stringify(
            {
                'termid':termid,
                'sessionid':sessionid,
                'grp':2
            }),
            cat:'staffclass',
            table:'accessstaffsubject',
            narration:'get staffsubjects'
      
        }
        props.getStaffsubjects(params)
        
      }, [sessionid, termid])

    let pers = [];
    if(search !== undefined && search.length > 2)
    {
        pers = Array.isArray(props.periods) ? props.periods.filter(rw=>rw.itemname == search || rw.itemname1 == search ): [];
    }else{
        pers = Array.isArray(props.periods) ? props.periods: [];
    }
   
    return (
        <>
         <CInput 
            name='search'
            size="sm"
            type="text"
            placeholder='Search'
            onChange={(e)=>setsearch(e.target.value)}
        />
        {
           Array.isArray(pers) ? pers.map(prop =>{
               return  <Card className="m-0 mb-1 p-0" style={{fontSize:'10px'}}>
                   <CardBody className="m-0 mb-1 p-0">
                        <strong style={{display:'block'}}>{prop.clientname}</strong>
                        <small> 
                            {parseInt(prop.staffid) === 1 ?
                            <i>{prop.itemnameops}</i>:<i>{prop.itemname}</i>}
                            {" "}
                            
                            <i>{prop.itemname1}</i>{" "}
                            <span className="pull-right" style={{fontSize:'12px'}}>
                            <span className="badge badge-success m-1">{prop.contact}</span>
                            <a><i className="fa fa-edit m-1"></i></a>
                            <a><i className="fa fa-remove m-1"></i></a>
                            </span>
                    </small>
                    </CardBody>
                </Card>
            }):''

        }
        </>
    )
}

const mapStateToProps = (state) => ({
    staffsubjects : state.staffsubjectReducer.staffsubjects,
    user:state.userReducer,
    activeschool:state.userReducer.activeschool,
    claszs : state.claszReducer.claszs,
    subjects : state.subjectReducer.subjects,
    staffs : state.staffReducer.staffs ,
    timetables : state.timetableReducer
})

const mapDispatchToProps = {
    getStaffsubjects,
    updateStaffsubject,
    deleteStaffsubject,
    registerStaffsubject
}

export default connect(mapStateToProps, mapDispatchToProps)(Periods)
