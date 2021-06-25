import { CTooltip } from '@coreui/react';
import React from 'react'
import { connect } from 'react-redux'

const terms = {
    1:'First',
    2:'Second',
    3:'Third',
}

const List = (props) => {
    const cumavg = (arr , arr1) =>{
        if(Array.isArray(arr) && arr.length > 0 && Array.isArray(arr1) && arr1.length > 0)
        {
            let le = arr1.reduce((a, b)=>a + b, 0);
            let su = arr.reduce((a, b)=>a + b, 0);
            let avg = su/le;
            
            return Number(avg).toFixed(2);
        }
    }
    const quesno = (data) =>{
        if(data !== undefined && data.length > 0 ){
            let num = JSON.parse(data)
            console.log(num)
            return Object.keys(num).length
        }
        return '-';
    }
    const moveToDir = (sub, term, clasz) =>{
        window.open('#/scheme/'+clasz+'/'+term+'/'+sub)
}
    let dt = props.dt
    return (
        <table width="100%" border="solid #ccc 2px" style={{fontFamily: 'Source Sans Pro'}}>
        <thead className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
            <tr>
                <td className='text-center' style={{width:'20px'}}>SN</td>
                <td className='text-center' style={{width:'20px'}}>Modules</td>
                <td className='text-center' style={{width:'15px'}} width="15px">Class</td>
                <td className='text-center' style={{width:'15px'}} width="15px">Term</td>
                <td className='text-center'>TOPIC</td>
                <td className='text-center' title="Number of questions" style={{width:'50px'}} width="10px">Ques. Aviala.</td>
                <td className='text-center'>STAFFNAME</td>
            </tr>
        </thead>
        <tbody style={{fontSize:props.fontz, fontWeight:'bold'}}>
            {
                
                Array.isArray(dt) ? dt.filter(rw=>rw !== undefined && rw !== null).map((prop, indx)=>{
                    let ph = prop.phonenumber;
                    let phonenumber = ph;
                    if(ph !== undefined && ph.length == 11 ){ phonenumber ="+234"+ ph.substring(1, 11)}
                    
                    return <tr>
                                <td className='text-center'>
                                 {indx + 1}
                                </td>
                                <td className='text-center'>
                                 {`M-${prop.moduleid !== undefined ? prop.moduleid.padStart(4,"0"): 'ERROR'}`}
                                </td>
                                <td className='text-left'>
                                 {terms[prop.termid]}
                                </td>
                                <td className='text-center' title={prop.claszname}>{prop.claszabbrv}</td>
                                <CTooltip content="Click to open in summary tab">
                                <td className='text-left' style={{textTransform:'capitalize', cursor:'pointer'}}>
                                <i onClick={()=>moveToDir(prop.subjectid, prop.termid, prop.claszid)}
                                          >{prop.name}</i>
                                </td>
                                </CTooltip>
                                
                                <td className='text-center'>
                                   {quesno(prop.question)}
                                </td>
                                <td className='text-right'>
                                    <a href={`tel:${phonenumber}`} className='text-success'><i className="fa fa-phone"></i></a>{" "}
                                    <a 
                                        href={`https://wa.me/${phonenumber}?sender=${props.user.user.surname}&text=[Topic : ${prop.name} , Sender : ${props.user.user.surname} ${props.user.user.firstname}]`} 
                                        target="_blank"
                                    >
                                    {prop.staffname}
                                    </a>
                                    
                                </td>
                           </tr>
                }):''
            }

        </tbody>
        

    </table>
        
    )
}

const mapStateToProps = (state) => ({
    user:state.userReducer
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
