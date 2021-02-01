import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getStudents, getStudent, registerStudent, updateStudent, deleteStudent } from './../../actions/student/student';
import { getSessions } from './../../actions/setting/session';
import { getSchools } from './../../actions/setting/school';
import { useHistory, useLocation } from 'react-router-dom'

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
  CTextarea,
  CTabs,
  CButton,
  CFormGroup,
  CInput,
  CSelect,
  CLabel,
  CCardFooter,
  CInputFile,
  CButtonGroup,
  CFormText

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { allrelations, allplaces, states } from '../../actions/common';

const Students = (props) => {
    const history = useHistory()

    const [active, setActive] = useState(0)
    const [id, setId] = useState(null)
    const [admission, setAdmission] = useState('')
    const [admit, setAdmit] = useState('')
    const [doa, setDoa] = useState('')
    const [schoolid, setSchoolid] = useState('')
    const [surname, setSurname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')

    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [religion, setReligion] = useState('')
    const [nationality, setNationality] = useState('')
    const [soo, setSoo] = useState('')
    const [lga, setLga] = useState('')

    const [photo, setPhoto] = useState('')
    const [photo1, setPhoto1] = useState('')
    const [photo2, setPhoto2] = useState('')
    const [photo3, setPhoto3] = useState('')

    const [g1_name, setG1_name] = useState('')
    const [g1_rel, setG1_rel] = useState('')
    const [g1_phone1, setG1_phone1] = useState('')
    const [g1_phone2, setG1_phone2] = useState('')
    const [g1_email, setG1_email] = useState('')
    const [g1_place, setG1_place] = useState('')
    const [g1_address, setG1_address] = useState('')
    //const [g1_photo, setG1_photo] = useState('')

    const [g2_name, setG2_name] = useState('')
    const [g2_rel, setG2_rel] = useState('')
    const [g2_phone1, setG2_phone1] = useState('')
    const [g2_phone2, setG2_phone2] = useState('')
    const [g2_email, setG2_email] = useState('')
    const [g2_place, setG2_place] = useState('')
    const [g2_address, setG2_address] = useState('')
    //const [g2_photo, setG2_photo] = useState('')

    const [reason, setReason] = useState('')
    const [dol, setDol] = useState('')
    const [is_active, setIs_active] = useState(0)
    const [is_delete, setIs_delete] = useState(0)


    useEffect(() => {
        let data = props.data; 
        let editi = props.editid;
        if(props.data && props.data.hasOwnProperty('id'))
        {
          setId(data.id)
          setSurname(data.surname)
          setFirstname(data.firstname)
          setMiddlename(data.middlename)
          setDob(data.dob)
          setPhoto(data.photo)
          setPhoto1(data.photo1)
          setPhoto2(data.photo2)
          setPhoto3(data.photo3)
          setGender(data.gender)
          setReligion(data.religion)
          setNationality(data.nationality)
          setSoo(data.soo)
          setLga(data.lga)
          setAdmit(data.admit)
          setAdmission(data.admission_no)
          setSchoolid(data.schoolid)
          setDoa(data.doa)
          setG1_name(data.g1_name)
          setG1_address(data.g1_address)
          setG1_rel(data.g1_rel)
          setG1_phone1(data.g1_phone1)
          setG1_phone2(data.g1_phone2)
          setG1_email(data.g1_email)
          setG2_name(data.g2_name)
          setG2_address(data.g2_address)
          setG2_rel(data.g2_rel)
          setG2_phone1(data.g2_phone1)
          setG2_phone2(data.g2_phone2)
          setG2_email(data.g2_email)

          setReason(data.reason)
          setDol(data.dol)
          setIs_active(data.is_active)
          setIs_delete(data.is_active)
          
        }
      }, [props.data, props.editid])


    
    const handlePictureActivate = num =>{
        let fd = new FormData();
        fd.append('id', id);
        fd.append('photo', num);
        fd.append('cat', 'update');
        fd.append('table', 'students');
        props.updateStudent(fd)

    }
    const handlePicture1 = () =>{
        let fd = new FormData();
        fd.append('files', photo1);
        fd.append('links', 'photo1');

        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('table', 'students');
            props.updateStudent(fd)
        }
        
    }
    const handlePicture2 = () =>{
        let fd = new FormData();
        fd.append('files', photo2);
        fd.append('links', 'photo2');

        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('table', 'students');
            props.updateStudent(fd)
        }
    }
    const handlePicture3 = () =>{
        let fd = new FormData();
        fd.append('files', photo3);
        fd.append('links', 'photo3');

        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('table', 'students');
            props.updateStudent(fd)
        }  
    }
    const handleCare1 = () =>{
        let fd = new FormData();
        fd.append('id', id);
        fd.append('g1_name', g1_name);
        fd.append('g1_rel', g1_rel);
        fd.append('g1_phone1', g1_phone1);
        fd.append('g1_phone2', g1_phone2);
        fd.append('g1_email', g1_email);
        fd.append('g1_place', g1_place);
        fd.append('g1_address', g1_address);
        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('table', 'students');
            props.updateStudent(fd)
        }
        
    }
    const handleCare2 = () =>{
        let fd = new FormData();
        fd.append('id', id);
        fd.append('g2_name', g2_name);
        fd.append('g2_rel', g2_rel);
        fd.append('g2_phone1', g2_phone1);
        fd.append('g2_phone2', g2_phone2);
        fd.append('g2_email', g2_email);
        fd.append('g2_place', g2_place);
        fd.append('g2_address', g2_address);
        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('table', 'students');
            props.updateStudent(fd)
        }
        
    }   
    const handleExit = () =>{
        let fd = new FormData();
        fd.append('id', id);
        fd.append('reason', reason);
        fd.append('dol', dol);
        fd.append('is_delete', 1);
        fd.append('is_active', 1);

        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('table', 'students');
            props.updateStudent(fd)
        }
    }
    const handleExitReset = () =>{
        let fd = new FormData();
        fd.append('id', id);
        fd.append('reason', reason);
        fd.append('is_delete', 1);
        fd.append('is_active', 1);
        
        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('table', 'students');
            props.updateStudent(fd)
        }
    }
    const handleSubmit = () =>{
        let fd = new FormData();
        fd.append('surname', surname);
        fd.append('firstname', firstname);
        fd.append('middlename', middlename);
        fd.append('dob', dob);
        fd.append('soo', soo);
        fd.append('lga', lga);
        fd.append('nationality', nationality);
        fd.append('religion', religion);
        fd.append('gender', gender);

        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('table', 'students');
            props.updateStudent(fd)
        }
       
        
    }
    const handleSubmitAdm = () =>{
        let fd = new FormData();
        fd.append('surname', surname);
        fd.append('firstname', firstname);
        fd.append('middlename', middlename);
        fd.append('admission_no', admission);
        fd.append('schoolid', schoolid);
        fd.append('doa', doa);
        fd.append('admit', admit);

        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            fd.append('table', 'students');
            props.updateStudent(fd)
        }else{
            fd.append('cat', 'insert');
            fd.append('table', 'students');
            props.registerStudent(fd)
        }
       
        
    }


const changeSoo = (e) =>{
    setSoo(e.target.value);
}

const changePhoto1 = (e) =>{
    setPhoto1(e.target.files[0]);
}
const changePhoto2 = (e) =>{
    setPhoto2(e.target.files[0]);
}
const changePhoto3 = (e) =>{
    setPhoto3(e.target.files[0]);
}

let schoolarray = props.schools && Array.isArray(props.schools) ? props.schools : [];
let scarray = schoolarray.filter(rw=>rw !== null).map((rw, ind) =>{
    return <option key={ind} value={rw.id}>{rw.name}</option>
})

let sessionsarray = props.sessions && Array.isArray(props.sessions) ? props.sessions : [];
let searray = sessionsarray.filter(rw=>rw !== null).map((rw, ind) =>{
    return <option key={ind} value={rw.id}>{rw.name}</option>
})


let starray = states.filter(rw=>rw !== null).map((rw, ind) =>{
    return <option key={ind} value={rw.state}>{rw.state}</option>
})

let lgar = states.filter(rw=>rw !== null && rw.state === soo)
let lgarray = lgar.length > 0 ? lgar[0].lgas.map((rw1, ind) =>{
    return <option key={ind} value={rw1}>{rw1}</option>
}): '';


let relarray = Object.keys(allrelations).map((rw1, ind) =>{
    return <option key={ind} value={rw1}>{rw1}</option>
});

let placearray = Object.keys(allplaces).map((rw1, ind) =>{
    return <option key={ind} value={rw1}>{rw1}</option>
});

  return (
    <>
    <CRow>
    <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
          { id && parseInt(id)  > 0 ? <h4>{` Edit ${surname} ${firstname} ${middlename} Data`}</h4>:''}
          </CCardHeader>
            <CCardBody>
            <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
              <CNav variant="tabs">
              <CNavItem>
                  <CNavLink>
                    <i className='fa fa-user'></i>
                    { active === 0 && ' Admission'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <i className='fa fa-user'></i>
                    { active === 1 && ' Basic Data'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                  <i className='fa fa-users'></i>
                    { active === 2 && ' Care Giver/Guardian'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                  <i className='fa fa-image'></i>
                    { active === 3 && ' Photos '}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                  <i className='fa fa-close'></i>
                    { active === 4 && ' Exit'}
                  </CNavLink>
                </CNavItem>
              </CNav>
    <CTabContent>
    <CTabPane>
    <CRow>
    <CCol xs="12" sm="12">
                    <CCard>
                        <CCardBody>
                        <CRow>
                            <CCol xs="12" sm='12' >
                            <CFormGroup>
                                <CLabel htmlFor="admission">Admission Number<i className='text-danger'>*</i></CLabel>
                                <CInput 
                                    id="admission" 
                                    defaultValue={admission}
                                    size='lg'
                                    aria-required 
                                    placeholder="Admission Number"
                                    onChange={(e)=>setAdmission(e.target.value)} 
                                    required 
                                    />
                            </CFormGroup>
                            <CFormText></CFormText>
                            </CCol>
                            <CCol xs="12" sm='12'>
                            <CFormGroup>
                                <CLabel htmlFor="School">School<i className='text-danger'>*</i></CLabel>
                                <CSelect 
                                    id="school" 
                                    defaultValue={schoolid}
                                    aria-required 
                                    placeholder="Enter School"
                                    onChange={(e)=>setSchoolid(e.target.value)} 
                                    required
                                >
                                    {scarray}
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm='6'>
                            <CFormGroup>
                                <CLabel htmlFor="admit">Admission Year<i className='text-danger'>*</i></CLabel>
                                <CSelect 
                                    custom 
                                    id="admit" 
                                    defaultValue={admit}
                                    aria-required 
                                    placeholder="Select admission year"
                                    onChange={(e)=>setAdmit(e.target.value)} 
                                    required
                                >
                                    {searray}
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm='6'>
                            <CFormGroup>
                                <CLabel htmlFor="doa">Date Admitted<i className='text-danger'>*</i></CLabel>
                                <CInput 
                                    custom 
                                    type='date'
                                    id="doa" 
                                    defaultValue={doa}
                                    aria-required 
                                    placeholder=""
                                    onChange={(e)=>setDoa(e.target.value)} 
                                    required
                                />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" sm='4'>
                            <CFormGroup>
                                <CLabel htmlFor="surname">Surname<i className='text-danger'>*</i></CLabel>
                                <CInput 
                                    id="surname" 
                                    defaultValue={surname}
                                    aria-required 
                                    placeholder="Enter Surname"
                                    onChange={(e)=>setSurname(e.target.value)} 
                                    required 
                                    />
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm='4'>
                            <CFormGroup>
                                <CLabel htmlFor="firstname">Firstname<i className='text-danger'>*</i></CLabel>
                                <CInput 
                                    id="firstname" 
                                    defaultValue={firstname}
                                    aria-required 
                                    placeholder="Enter firstname"
                                    onChange={(e)=>setFirstname(e.target.value)} 
                                    required
                                    />
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm='4'>
                            <CFormGroup>
                                <CLabel htmlFor="middlename">Middlename</CLabel>
                                <CInput 
                                    id="middlename" 
                                    defaultValue={middlename}
                                    type='text'
                                    aria-required 
                                    placeholder="Enter Middlename"
                                    onChange={(e)=>setMiddlename(e.target.value)} 
                                    required
                                />
                            </CFormGroup>
                            </CCol>
                        </CRow>   
                        </CCardBody>
                        <CCardFooter>
                            <CButton type="submit" size="sm" color="primary" onClick={handleSubmitAdm}><CIcon name="cil-scrubber" /> Submit</CButton>
                        </CCardFooter>
                    </CCard>
                    </CCol>
    </CRow>                    
    </CTabPane>
    <CTabPane>
    <CRow>
     <CCol xs="12" sm="12">
                    <CCard>
                        <CCardBody>
                        <CRow>
                            <CCol xs="12" sm='4'>
                            <CFormGroup>
                                <CLabel htmlFor="dob">Date of Birth<i className='text-danger'>*</i></CLabel>
                                <CInput 
                                    id="dob" 
                                    defaultValue={dob}
                                    type='date'
                                    aria-required 
                                    placeholder="Enter dob"
                                    onChange={(e)=>setDob(e.target.value)} 
                                    required 
                                    />
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm='4'>
                            <CFormGroup>
                                <CLabel htmlFor="gender">Gender<i className='text-danger'>*</i></CLabel>
                                <CSelect 
                                    custom 
                                    id="gender" 
                                    defaultValue={gender}
                                    aria-required 
                                    placeholder="Select gender"
                                    onChange={(e)=>setGender(e.target.value)} 
                                    required
                                >
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm='4'>
                            <CFormGroup>
                            <CLabel htmlFor="religion">Religion<i className='text-danger'>*</i></CLabel>
                                <CSelect 
                                    custom 
                                    id="religion" 
                                    defaultValue={religion}
                                    aria-required 
                                    placeholder="Select Religion"
                                    onChange={(e)=>setReligion(e.target.value)} 
                                    required
                                >
                                    <option value='Christianity'>Christianity</option>
                                    <option value='Islam'>Islam</option>
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        
                        <CRow>
                            <CCol xs="12" sm='4'>
                            <CFormGroup>
                                <CLabel htmlFor="dob">Nationality<i className='text-danger'>*</i></CLabel>
                                <CSelect 
                                    custom 
                                    id="nationality" 
                                    defaultValue={nationality}
                                    aria-required 
                                    placeholder="Select Nationality"
                                    onChange={(e)=>setNationality(e.target.value)} 
                                    required
                                >
                                    <option value='Male'>Nigerian</option>
                                    <option value='Female'>non-nigerian</option>
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm='4'>
                            <CFormGroup>
                                <CLabel htmlFor="soo">State of Origin<i className='text-danger'>*</i></CLabel>
                                <CSelect 
                                    custom 
                                    id="soo" 
                                    onChange={changeSoo} 
                                >
                                    {starray}
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                            <CCol xs="12" sm='4'>
                            <CFormGroup>
                            <CLabel htmlFor="lga">LGA<i className='text-danger'>*</i></CLabel>
                                <CSelect 
                                    custom 
                                    id="lga" 
                                    defaultValue={lga}
                                    aria-required 
                                    placeholder="Select Lga"
                                    onChange={(e)=>setLga(e.target.value)} 
                                    required
                                >
                                    {lgarray}
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        
                        </CCardBody>
                        <CCardFooter>
                            <CButton type="submit" size="sm" color="primary" onClick={handleSubmit}><CIcon name="cil-scrubber" /> Submit</CButton>
                            <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                        </CCardFooter>
                    </CCard>
                    </CCol>
    </CRow>
    </CTabPane>
    <CTabPane>
    <CRow>
    <CCol sm="12" md="6">
                    <CCard>
                        <CCardHeader>
                        Primary Care Giver
                        </CCardHeader>
                        <CCardBody>
                       
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="g1_name">Name of Care Giver<i className='text-danger'>*</i></CLabel>
                                <CInput 
                                    id="g1_name" 
                                    defaultValue={g1_name}
                                    aria-required 
                                    placeholder="Care Giver Fullname"
                                    onChange={(e)=>setG1_name(e.target.value)} 
                                    required 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                        <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="g1_rel">Relationship to Student<i className='text-danger'>*</i></CLabel>
                                <CSelect 
                                    id="g1_rel" 
                                    defaultValue={g1_rel}
                                    aria-required 
                                    placeholder="Enter g1_rel"
                                    onChange={(e)=>setG1_rel(e.target.value)} 
                                    required
                                >
                                  {relarray}  
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="g1_phone1">Phone Number<i className='text-danger'>*</i></CLabel>
                                <CInput 
                                    id="g1_phone1" 
                                    defaultValue={g1_phone1}
                                    aria-required 
                                    placeholder="080123456789"
                                    onChange={(e)=>setG1_phone1(e.target.value)} 
                                    required 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="g1_phone2">Alternative Phone Number</CLabel>
                                <CInput 
                                    id="g1_phone2" 
                                    defaultValue={g1_phone2}
                                    placeholder="080123456789"
                                    onChange={(e)=>setG1_phone2(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="g1_email">Email</CLabel>
                                <CInput 
                                    id="g1_email" 
                                    defaultValue={g1_email}
                                    type='email'
                                    placeholder="080123456789"
                                    onChange={(e)=>setG1_email(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="g1_place">Place of Work/Name of Business</CLabel>
                                <CSelect 
                                    id="g1_rel" 
                                    defaultValue={g1_place}
                                    aria-required 
                                    placeholder="Enter g1_place"
                                    onChange={(e)=>setG1_place(e.target.value)} 
                                    required
                                >
                                  {placearray}  
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="g1_address">Address</CLabel>
                                <CTextarea 
                                    id="g1_address" 
                                    defaultValue={g1_address}
                                    placeholder="....P.0. Box "
                                    onChange={(e)=>setG1_address(e.target.value)} 
                                    />
                                
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        
                        </CCardBody>
                        <CCardFooter>
                            <CButton onClick={handleCare1} type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                           </CCardFooter>
                    </CCard>
                    </CCol>
                    <CCol sm="12" md="6">
                    <CCard>
                        <CCardHeader>
                        Secondary Care Giver
                        </CCardHeader>
                        <CCardBody>
                       
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="g2_name">Name of Care Giver<i className='text-danger'>*</i></CLabel>
                                <CInput 
                                    id="g2_name" 
                                    defaultValue={g2_name}
                                    aria-required 
                                    placeholder="Care Giver Fullname"
                                    onChange={(e)=>setG2_name(e.target.value)} 
                                    required 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                        <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="g2_rel">Relationship to Student<i className='text-danger'>*</i></CLabel>
                                <CSelect 
                                    id="g2_rel" 
                                    defaultValue={g2_rel}
                                    aria-required 
                                    placeholder="Enter g2_rel"
                                    onChange={(e)=>setG2_rel(e.target.value)} 
                                    required
                                >
                                    {relarray}
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="g2_phone1">Phone Number<i className='text-danger'>*</i></CLabel>
                                <CInput 
                                    id="g2_phone1" 
                                    defaultValue={g2_phone1}
                                    aria-required 
                                    placeholder="080123456789"
                                    onChange={(e)=>setG2_phone1(e.target.value)} 
                                    required 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="g2_phone2">Alternative Phone Number</CLabel>
                                <CInput 
                                    id="g2_phone2" 
                                    defaultValue={g2_phone2}
                                    placeholder="080123456789"
                                    onChange={(e)=>setG2_phone2(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="g2_email">Email</CLabel>
                                <CInput 
                                    id="g2_email" 
                                    defaultValue={g2_email}
                                    type='email'
                                    placeholder="080123456789"
                                    onChange={(e)=>setG2_email(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="g2_place">Place of Work/Name of Business</CLabel>
                                <CSelect 
                                    id="g2_rel" 
                                    defaultValue={g2_place}
                                    aria-required 
                                    placeholder="Enter g2_place"
                                    onChange={(e)=>setG2_place(e.target.value)} 
                                    required
                                >
                                  {placearray}  
                                </CSelect>
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="g2_address">Address</CLabel>
                                <CTextarea 
                                    id="g2_address" 
                                    defaultValue={g2_address}
                                    placeholder="....P.0. Box "
                                    onChange={(e)=>setG2_address(e.target.value)} 
                                    />
                                
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        
                        </CCardBody>
                        <CCardFooter>
                            <CButton onClick={handleCare2}  type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                                 </CCardFooter>
                    </CCard>
                    </CCol>
    
    </CRow>
    </CTabPane>
    <CTabPane>
    <CRow>
        <CCol xs="12" sm="12">
            <CCard>
                <CCardHeader>
                Photos
                </CCardHeader>
                <CCardBody>
                <CRow>
                    <CCol xs="12" sm='4' >
                        <CFormGroup>
                            <CLabel htmlFor="admission">
                               Passport 1<br/>
                                <small>Year 1 & 2</small>
                                </CLabel>
                            <CCol xs="12" md="9" className='text-center'>
                            <img 
                                src={process.env.REACT_APP_SERVER_URL+ photo1} 
                                className="m-0 p-0" 
                                width='100px'
                                height='100px'
                                alt={admission} 
                                onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + 'avatars/1.png'} }
                             />
                             </CCol>
                             <CCol xs="12" md="9" className='mt-5'>
                                <CInputFile 
                                custom 
                                id="custom-file-input"
                                name='picture1'
                                accept="image/*:capture=camera"
                                onChange={changePhoto1}
                                />
                                <CLabel htmlFor="custom-file-input" variant="custom-file">
                                Choose file...
                                </CLabel>
                            </CCol>
                            <CCol xs="12" md="9" className='mt-2 text-center'>
                            <CButtonGroup className="mr-2">
                                <CButton color="secondary" onClick={handlePicture1}><i className='fa fa-save'></i> Save</CButton>
                                <CButton color="secondary" onClick={()=>handlePictureActivate(photo1)}>Activate</CButton>
                            </CButtonGroup>
                            </CCol>
                        </CFormGroup>
                    </CCol>
                    <CCol xs="12" sm='4' >
                    <CFormGroup>
                            <CLabel htmlFor="admission">
                                Passport 2<br/>
                                <small>Year 3 & 4</small>
                                </CLabel>
                            <CCol xs="12" md="9" className='text-center'>
                            <img 
                                src={process.env.REACT_APP_SERVER_URL+ photo2} 
                                className="m-0 p-0" 
                                width='100px'
                                height='100px'
                                alt={admission} 
                                onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/avatars/1.png'} }
                             />
                             </CCol>
                             <CCol xs="12" md="9" className='mt-5'>
                                <CInputFile 
                                custom 
                                id="custom-file-input2"
                                name='picture2'
                                accept="image/*:capture=camera"
                                onChange={changePhoto2}
                                />
                                <CLabel htmlFor="custom-file-input" variant="custom-file">
                                Choose file...
                                </CLabel>
                            </CCol>
                            <CCol xs="12" md="9" className='mt-2 text-center'>
                            <CButtonGroup className="mr-2">
                                <CButton color="secondary" onClick={handlePicture2}><i className='fa fa-save'></i> Save</CButton>
                                <CButton color="secondary" onClick={()=>handlePictureActivate(photo2)}>Activate</CButton>
                            </CButtonGroup>
                            </CCol>
                        </CFormGroup>
                    
                    </CCol>
                    <CCol xs="12" sm='4' >
                    <CFormGroup>
                            <CLabel htmlFor="admission">
                                Passport 3<br/>
                                <small>Year 5 & 6</small>
                                </CLabel>
                            <CCol xs="12" md="9" className='text-center'>
                            <img 
                                src={process.env.REACT_APP_SERVER_URL+ photo3} 
                                className="m-0 p-0" 
                                width='100px'
                                height='100px'
                                alt={admission} 
                                onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/avatars/1.png'} }
                             />
                             </CCol>
                             <CCol xs="12" md="9" className='mt-5'>
                                <CInputFile 
                                custom 
                                id="custom-file-input"
                                name='picture3'
                                accept="image/*:capture=camera"
                                onChange={changePhoto3}
                                />
                                
                                <CLabel htmlFor="custom-file-input" variant="custom-file">
                                Choose file...
                                </CLabel>
                            </CCol>
                            <CCol xs="12" md="9" className='mt-2 text-center'>
                            <CButtonGroup className="mr-2">
                                
                                <CButton color="secondary" onClick={handlePicture3}><i className='fa fa-save'></i> Save</CButton>
                                <CButton color="secondary" onClick={()=>handlePictureActivate(photo3)}>Activate</CButton>
                            </CButtonGroup>
                            </CCol>
                        </CFormGroup>
                    
                    </CCol>
                </CRow>
                <CRow className='m-auto  p-auto d-flex text-center align-items-center justify-content-center' xs='12'>
                    <CCol xs="12" sm='6' md='4'  className='align-middle'>
                    <CFormGroup>
                            <CLabel htmlFor="mm">
                               Active Passport
                                </CLabel>
                            <CCol xs="12" md="9" className='text-center'>
                            <img 
                                src={process.env.REACT_APP_SERVER_URL+ photo} 
                                className="m-0 p-0" 
                                style={{width:"200px", height:"200px"}}
                                width='200px'
                                height='200px'
                                alt={admission} 
                                onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/avatars/1.png'} }
                             />
                             </CCol>
                        </CFormGroup>
                    </CCol>
                </CRow>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
    </CTabPane>
    <CTabPane>
    <CRow>
    <CCol sm="12" md="12">
                    <CCard>
                        <CCardBody>
                       <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="dol">Date of Leaving</CLabel>
                                <CInput 
                                    id="dol" 
                                    name='date'
                                    defaultValue={dol}
                                    onChange={(e)=>setDol(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="reason">Reason for Leaving</CLabel>
                                <CTextarea 
                                    id="reason" 
                                    defaultValue={reason}
                                    placeholder="Absent for....., Graduated with,,,, "
                                    onChange={(e)=>setReason(e.target.value)} 
                                    />
                                
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        
                        </CCardBody>
                        <CCardFooter>
                            <CButton type="submit" size="sm" color="primary" onClick={handleExit}><CIcon name="cil-scrubber" /> Submit</CButton>
                            <CButton type="reset" size="sm" color="danger" onClick={handleExitReset}><CIcon name="cil-ban" /> Reset</CButton>
                        </CCardFooter>
                    </CCard>
                    </CCol>
    </CRow>
    </CTabPane>
    </CTabContent>
    </CTabs>
    </CCardBody>
    </CCard>
    </CCol>
    </CRow>
    </>
  )
}

const mapStateToProps = (state) =>({
    students : state.studentReducer,
    sessions : state.sessionReducer.sessions,
    schools : state.schoolReducer.schools,
    dropdowns:state.userReducer.dropdowns
  })
  export default connect(mapStateToProps, {
    getStudents,
    getStudent,
    registerStudent,
    updateStudent,
    deleteStudent,
    getSchools,
    getSessions
  })(Students)
  
