import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { registerStudentscore, deleteStudentscore } from './../../../actions/student/studentscore'
import ReactRateComponent from'react-rate-component';
import { 
    CButton,
    CCol,
    CFormGroup,
    CInput,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CInputGroupText
} from '@coreui/react';
import CIcon from '@coreui/icons-react';



const ScoreBox = (props) => {

    const [value, setvalue] = useState('')
    const [colors, setcolors] = useState('')
    const [bgcolors, setbgcolors] = useState('')
    const [sd_val, setsd_val] = useState(props.sd_val)

    useEffect(() => {
        setvalue(parseFloat(props.sd_val) * 5)
        setsd_val(props.sd_val)
    }, [])

  const saveScore = (sc) =>{

        let fd = new FormData();
        let val = parseFloat(sc) > 0 ? parseFloat(sc) / 5 : 0;
        fd.append('caid', props.caid);
        fd.append('sessionid', props.sessionid);
        fd.append('termid', props.termid);
        fd.append('studentid', props.studentid);
        fd.append('subjectid', props.subjectid);
        fd.append('score', val.toString());
        fd.append('staffid', props.staffid);
        fd.append('grp', 8);
        fd.append('cat', 'insertscore');
        fd.append('table', 'accessstudentscore');
     
        props.registerStudentscore(fd);
     
} 

const deleteScore = (id) =>{
    
    let fd = new FormData();

    fd.append('id', id);
    fd.append('sessionid', props.sessionid);
    fd.append('cat', 'deletes');
    fd.append('table', 'accessstudentscore');
 
    props.deleteStudentscore(fd, id);
    setvalue('')
 
} 

const setvalues = (id) =>{
    if(parseFloat(id) > parseFloat(5))
    {
        setvalue('')
    }else{
        setvalue(id)
    }
    saveScore(id)
}

console.log(props.sd_val, value, sd_val * 5)


return (
    <>
    <td valign="middle" width="500px">
        <CFormGroup row>
            <CCol md="12">{sd_val * 5}{" - "}{value}
            { parseFloat(value)  === parseFloat(sd_val * 5)  ?
            <ReactRateComponent
                defaultValue={value}
                showCount={false}
                onChange={setvalues}
                size='30'
            />:
            <ReactRateComponent
                showCount={false}
                onChange={setvalues}
                defaultValue={value ? value : ''}
                size='30'
            />

}
            
            </CCol>
        </CFormGroup>
          
     </td>
    </>
  )
}
const mapStateToProps = (state) =>({

})
export default connect(mapStateToProps, {
    registerStudentscore,
    deleteStudentscore
}) (ScoreBox)