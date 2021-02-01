import React, { useEffect }  from 'react'
import SearchDashboard3 from '../SearchDashboard3'
import { 
    CCol, 
    CContainer, 
    CRow,
    CButtonGroup,
    CDropdown ,
    CDropdownItem,
    CDropdownMenu,
    CWidgetDropdown,
    CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Header = (props) => {
 
 let {studentdata} = props || '';

 return(
    <CContainer>
        
        <CRow>
        <CCol sm={6}>
            <SearchDashboard3 
                studentx={props.placeStudent}  
            />
            </CCol>
            <CCol sm={6}>
            { studentdata && Object.keys(studentdata).length > 0 ?
            <>
            <CRow>
            <img
            src={process.env.REACT_APP_SERVER_URL + studentdata.photo} 
            style={{height:'30px', width:'30px'}}
            height="30px"
            alt="profile-image" 
            class="profile"
            onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/icons/profile_1.png'} }
            />
            <CCol>
            <strong>{studentdata.name}</strong><br/>
            <small>{studentdata.admission_no}</small>
            </CCol>
            <CCol xs={3}>
            <button className='btn btn-sm btn-success' onClick={props.loadStudent}><i className="fa fa-plus"></i></button>
            <button className='btn btn-sm btn-danger' onClick={()=>props.setStudentdata({})}><i className="fa fa-trash"></i></button></CCol>
            </CRow>
            </>
            :""}
            </CCol>
        </CRow>
        </CContainer>
        )

}

export default Header