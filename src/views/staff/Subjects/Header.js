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
 let secarry =[]
 let {subject, len, studentdata} = props || '';
 let setShowedx = true
 let setEditedx = true
 return(
    <CContainer>
        <CRow>
        <CCol>
            <h4>{subject.itemname1}{" "}{subject.itemname} ({`${len} Students`})</h4>
            </CCol>
            <CCol xs={12} sm={4} className="d-md-block btn-group">
              <button  
                onClick={()=>props.goBack()}
                className="btn btn-info"><i className='fa fa-backward'></i>
              </button>
              <CButtonGroup className='pull-right'>
              <CDropdown color="secondary" >
                <CDropdownToggle caret color="secondary">
                  <i className='fa fa-list'></i> <span className='hidden-phone'> Menu</span>
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem
                        header
                        tag="div"
                        color="light"
                        className="text-center"
                        >
                        <strong>Personal</strong>
                        </CDropdownItem>
                       
                        <CDropdownItem  onClick={(prev)=>setShowedx(0)}>
                            <CIcon 
                                name="cil-user" 
                                className="mfe-2" 
                            
                            /> 
                            Basic Information
                        </CDropdownItem>
                        <CDropdownItem onClick={(prev)=>setShowedx(1)}>
                            <CIcon 
                                name="cil-book" 
                                className="mfe-2" 
                                
                            /> 
                            Education History
                        </CDropdownItem>
                        <CDropdownItem onClick={(prev)=>setShowedx(2)}>
                            <CIcon 
                                name="cil-badge" 
                                className="mfe-2" 
                                
                            /> 
                            Professional Certifications
                        </CDropdownItem>
                        
                        
                    
                    <CDropdownItem
                        header
                        tag="div"
                        color="light"
                        className="text-center"
                        >
                        <strong>Official</strong>
                        </CDropdownItem>
                     
                </CDropdownMenu>     
                </CDropdown>
                <CDropdown color="secondary">
                    <CDropdownToggle caret color="secondary">
                    <i className='fa fa-edit'></i> <span className='d-n0ne'> Edit</span>
                    </CDropdownToggle>
                    <CDropdownMenu>
        <CDropdownItem onClick={()=>setEditedx(1)}><i className='text-secondary fa fa-edit'></i>{"  ."} Employment</CDropdownItem>
        <CDropdownItem onClick={()=>setEditedx(2)}><i className='text-secondary fa fa-edit'></i>{"  ."} Biodata</CDropdownItem>
        <CDropdownItem onClick={()=>setEditedx(3)}><i className='text-secondary fa fa-edit'></i>{"  ."} Next of Kin</CDropdownItem>
        <CDropdownItem onClick={()=>setEditedx(4)}><i className='text-secondary fa fa-edit'></i>{"  ."} Photo</CDropdownItem>
        <CDropdownItem onClick={()=>setEditedx(5)}><i className='text-secondary fa fa-edit'></i>{"  ."} Password</CDropdownItem>
        <CDropdownItem onClick={()=>setEditedx(6)}><i className='text-secondary fa fa-edit'></i>{"  ."} Exit</CDropdownItem>
                </CDropdownMenu>
                </CDropdown>
                </CButtonGroup>  
            </CCol>
        </CRow>
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