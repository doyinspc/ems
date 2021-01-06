import React  from 'react'
import moment from 'moment';
import { useHistory} from 'react-router-dom'
import {
    CRow
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Studentclasss = (props) => {
   let history = useHistory()
   
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw !== null || rw !== undefined) : []
  
let dt = new Date();
let yr = dt.getFullYear();
let mt = dt.getMonth();
let numOfDays = new Date(yr, mt + 1, 0).getDate() ;
let daysArray = new Array();
let firstday = new Date(dt.getFullYear(), dt.getMonth(), 1);
let lastday = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);

for(var i = 0; i < numOfDays; ++i)
        {
            daysArray[i] = new Date(yr, mt, i + 1);
        }
        let tda = <td
                    className='bg-light'
                    style={{position:'absolute', minWidth:'10px', height:'2000px', paddingBlock:'2px',textAlign:'left', fontWeight:'bolder'}}>
                        DAY
                    </td> 
        let tdb = <><td
                    className='bg-light'
                    style={{position:'absolute', minWidth:'10px', height:'200px', paddingBlock:'2px',textAlign:'left', fontWeight:'bolder'}}>
                        OR(%)
                    </td> 
                    </>
        let td = daysArray.map((prop, ind)=>{
            return <>
                    <td 
                    key={ind} 
                    className=''
                    style={{maxWidth:'10px', height:'200px',  paddingBlock:'2px', textAlign:'left', fontWeight:'bolder'}}>
                       <p style={{writingMode:'vertical-lr', textOrientation:'sideways-lr',}}>{moment(new Date(prop)).format('ddd MMM Do, YYYY')}</p> 
                    </td>
                    </>
        })
        let tdp = daysArray.map((prop, ind)=>{
            return <>
                    <td 
                        key={ind} 
                        style={{maxWidth:'10px', height:'40px', paddingBlock:'1px',textAlign:'center', fontSize:'1.3em'}}>
                        {'0%'}
                    </td>
                    
                    </>
        })       
        let row = data.map((prop, ind)=>{
               return <tr key={ind}>
                        <td 
                            key={ind} 
                            className='bg-dark col-xs-6 text-light'
                            style={{position:'absolute', width:'200px', paddingBlock:'1px', textAlign:'left', fontSize:'0.9em'}}>
                            {prop.surname}{" "}{prop.firstname} {parseInt(prop.is_active) === 1 ? <i className='fa fa-setting mt-1'></i>:''}
                        </td>   
                        {
                            daysArray.map((prop1, ind1)=>{
                            <td key={ind1}><i className='fa fa-check text-success'></i></td>
                            })}
                      </tr>
        })

      
  return (
   <>
    <CRow className='d-flex flex-wrap justify-content-left table-responsive' style={{minHeight:'600px'}}>
        <table className="table table-hover table-outline mb-0 d-none d-sm-table">
        <thead className="thead-light">
            <tr>
            {tda}{td}
            </tr>
            <tr>
            {tdb}{tdp}
            </tr>
        </thead>
        <tbody>
            {row}
        </tbody>
        </table>
    </CRow>
                
   </>
  )
}

export default Studentclasss
  
