import React, { useEffect, useState, useMemo } from 'react'
import {  leavestd } from '../../actions/common';
let leaves = leavestd
const AttendanceBox = (props) => {
    const [color, setcolor] = useState('#ccc');
    //console.log(props.client, props.issue)
    //if pass current date
    useEffect(() => {
        //confirm if its date yet else return grey
        if(new Date(props.mydate) <= new Date() && new Date(props.mydate).getDay() !== 6 && new Date(props.mydate).getDay() !== 0)
        {
            //date has passed
            //confirm if in list
            let list = props.candidates.split(',');
            if(list.includes(props.client))
            {
                //client present that day
                //was it recorded
                if(parseInt(props.issue) > 0)
                {
                    let d = leaves.filter(rw=>parseInt(rw.id) === parseInt(props.issue))
                    setcolor(d[0].color)    
                    props.setData(props.client, parseInt(props.issue))
                }else{
                    setcolor('#cfc') 
                    props.setData(props.client, 1)
                }
                

            }else
            {
                //client not present that day
                setcolor('#ccc');
                props.setData(props.client, 0)
            }
            
        }
        return () => {
            setcolor('#ccc')
        }
    }, [props.mydate])
    
    return(
        <>
        <td className='text-center'  style={{backgroundColor:color, width:'25px'}} >

        </td>
        </>
    )
}


export default AttendanceBox