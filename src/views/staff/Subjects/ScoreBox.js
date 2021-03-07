import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { registerStudentscore, deleteStudentscore } from './../../../actions/student/studentscore'

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
        setvalue(props.sd_val)
        setsd_val(props.sd_val)
    }, [props.sd_val])

  const saveScore = () =>{

        let fd = new FormData();
        let val = parseFloat(value) > 0 ? parseFloat(value) / props.score : 0;
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
    if(parseFloat(id) > parseFloat(props.score))
    {
        setvalue('')
    }else{
        setvalue(id)
    }
    
}

return (
    <>
    <td valign="middle" width="500px">
        <CFormGroup row>
            <CCol md="12">
            <CInputGroup>
            <CInputGroupPrepend>
            { parseFloat(value)  === parseFloat(sd_val) ?
            <CButton 
            size='lg' 
            type="button" 
            color="success"><CIcon name="cil-check" />
            </CButton>:
            <CButton 
            onClick={saveScore}
            size='lg' 
            type="button" 
            color="info"><CIcon name="cil-save" />
            </CButton>}
            </CInputGroupPrepend>
            { parseFloat(value)  === parseFloat(sd_val)  ?
            <CInput
                size='lg'
                style={{ textAlign:'center', fontWeight:'bolder', padding:'0px'}}
                defaultValue={sd_val * props.score}
                onChange={(e)=>setvalues(e.target.value)}  
            />
               :
            <CInput
               size='lg'
               style={{ textAlign:'center', fontWeight:'bolder', padding:'0px'}}
               value={value ? value : ''}
               onChange={(e)=>setvalues(e.target.value)}  
            />
                }
            <CInputGroupAppend>
                {parseInt(props.sd_id) > 0 ?
                <CButton  onClick={()=>deleteScore(props.sd_id)} size='lg' type="button" color={ parseInt(props.sd_id) > 0 ? "danger":"secondary"}><CIcon name="cil-x" /></CButton>:
                <CButton  disabled size='lg' type="button" color={ parseInt(props.sd_id) > 0 ? "danger":"secondary"}><CIcon name="cil-x" /></CButton>}
            </CInputGroupAppend>
            </CInputGroup>
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