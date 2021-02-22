import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { registerStudentscore } from './../../../actions/student/studentscore'

import { 
    CInput
} from '@coreui/react';



const ScoreBox = (props) => {

    const [value, setvalue] = useState('')
    const [colors, setcolors] = useState('')
    const [bgcolors, setbgcolors] = useState('')

    useEffect(() => {
        console.log(props.sd_val.lenght )
           if(parseFloat(value) === parseFloat(props.sd_val))
            {
                setcolors('blue')
                setbgcolors('white')

            }else
            {
                setvalue(props.sd_val)
                setcolors('red')
                setbgcolors('#0c0')
                
            }
        
    }, [props.sd_val])

  const saveScore = () =>{

        let fd = new FormData();
        let val = value > 0 ? value / props.score : 0
        fd.append('caid', props.caid);
        fd.append('sessionid', props.sessionid);
        fd.append('termid', props.termid);
        fd.append('studentid', props.studentid);
        fd.append('subjectid', props.subjectid);
        fd.append('score', val);
        fd.append('staffid', props.staffid);
        fd.append('grp', 8);
        fd.append('cat', 'insertscore');
        fd.append('table', 'accessstudentscore');
     
        props.registerStudentscore(fd);
     
}  

return (
    <>
    <td valign="middle">
          <CInput
            size="lg"
            style={{
                width:'100px', 
                textAlign:'center', 
                fontWeight:'bolder', 
                backgroundColor:bgcolors, 
                color:colors
            }}
            defaultValue={value ? value * props.score: ''}
            onChange={(e)=>setvalue(e.target.value)}
            onClick={saveScore}
          />
     </td>
    </>
  )
}
const mapStateToProps = (state) =>({

})
export default connect(mapStateToProps, {
    registerStudentscore
}) (ScoreBox)