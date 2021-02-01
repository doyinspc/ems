import React  from 'react'
import { useHistory} from 'react-router-dom'
import {
    CRow,
    CCol,
    CCardHeader,
    CNav,
    CNavLink,
    CNavItem,
    CTabContent,
    CTabPane,
    CCard,
    CCardBody,
    CTabs,
    CButton,
    CWidgetIcon,
    CCardFooter,
    CLink
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Studentclasss = (props) => {
   
   const lStudent = (id) =>{
    window.open(process.env.PUBLIC_URL+"#/students/"+id)
  }
  let data = props.data && Array.isArray(props.data) ? props.data.filter(rw =>rw != null || rw != undefined) : []
  let pht = data.map((row, ind)=>{
    return <CCard onClick={()=>lStudent(row.id)} key={ind} className='mx-2 my-2' style={{width:'100px', height:'auto'}}>
        <CCardHeader className='m-0 text-center'>
        <b style={{textTransform:'capitalize'}}>{row.admission_no}</b>  
        </CCardHeader>
        <CCardBody className='m-0 p-0 ' >
        <img 
            src={process.env.REACT_APP_SERVER_URL+ '/passport/'+ row.photo1} 
            className="m-0 p-0" 
            width='100px'
            height='100px'
            alt={row.admission_no} 
            onError={(e)=>{e.target.onerror=null; e.target.src= process.env.PUBLIC_URL + 'avatars/1.png'} }
        />
        </CCardBody>
        <div className='m-0 text-center' style={{zIndex:'1001', position:'relative', top:'0px', backgroundColor:'rgba(0,0,0,0)'}}>
          <span style={{textTransform:'capitalize',  fontSize:'10px', color:'black', fontWeight:'bolder'}}> {row.surname}{' '}{row.firstname}{' '}{row.middlename}</span>
        </div>
    </CCard>
})

  
  return (
   <>
   <CRow className='d-flex flex-wrap justify-content-center'>
        {pht}
    </CRow>
   </>
  )
}

export default Studentclasss
  
