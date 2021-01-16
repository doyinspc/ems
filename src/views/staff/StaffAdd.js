import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getStaffs, getStaff, registerStaff, updateStaff, deleteStaff } from './../../actions/staff/staff';
import { updateUser } from './../../actions/user';
import { getSessions } from './../../actions/setting/session';
import { getSchools } from './../../actions/setting/school';
import { getLevels } from './../../actions/setting/level';
import { getDesignations } from './../../actions/setting/designation';
import { getPenmanagers } from './../../actions/setting/penmanager';
import { getDepartments } from './../../actions/setting/department';
import { Redirect, useHistory, useLocation } from 'react-router-dom'

import {
  CRow,
  CCol,
  CCardHeader,
  CCard,
  CCardBody,
  CTextarea,
  CButton,
  CFormGroup,
  CInput,
  CSelect,
  CLabel,
  CCardFooter,
  CInputFile,
  CButtonGroup,
  CAlert,
  CProgress

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { allrelationsx,  setElement, states, allpensions } from '../../actions/common';

const Staffs = (props) => {
    const history = useHistory()
    const [id, setId] = useState(null)
    const [title, setTitle] = useState(null)
    const [surname, setSurname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [religion, setReligion] = useState('')
    const [nationality, setNationality] = useState('')
    const [soo, setSoo] = useState('')
    const [lga, setLga] = useState('')
    const [phone1, setPhone1] = useState('')
    const [phone2, setPhone2] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [tin, setTin] = useState('')
    const [nin, setNin] = useState('')
    const [pen, setPen] = useState('')
    const [penmanagerid, setPenmanagerid] = useState('')
    const [employment, setEmployment] = useState('')
    const [schoolid, setSchoolid] = useState('')
    const [doe, setDoe] = useState('')
    const [officeid, setOfficeid] = useState('')
    const [levelid, setLevelid] = useState('')
    const [departmentid, setDepartmentid] = useState('')
    const [designationid, setDesignationid] = useState('')

    const [photo, setPhoto] = useState('')
    const [links, setLinks] = useState('')

    const [kin1_name, setKin1_name] = useState('')
    const [kin1_rel, setKin1_rel] = useState('')
    const [kin1_phone1, setKin1_phone1] = useState('')
    const [kin1_phone2, setKin1_phone2] = useState('')
    const [kin1_email, setKin1_email] = useState('')
    const [kin1_address, setKin1_address] = useState('')
    const [kin2_name, setKin2_name] = useState('')
    const [kin2_rel, setKin2_rel] = useState('')
    const [kin2_phone1, setKin2_phone1] = useState('')
    const [kin2_phone2, setKin2_phone2] = useState('')
    const [kin2_email, setKin2_email] = useState('')
    const [kin2_address, setKin2_address] = useState('')
    //const [kin2_photo, setKin2_photo] = useState('')
    //EXIT PLAN
    const [dol, setDol] = useState('')
    const [reason, setReason] = useState('')
    const [is_active, setIs_active] = useState(0)

    //EDUCATION
    const [npassword, setNpassword] = useState('')
    const [rpassword, setRpassword] = useState('')
    const [pension, setPension] = useState([]) 

    

    useEffect(() => {
        let data = props.data; 
        let editi = props.editid;
        if(editi === 2)
        {
          setId(data.id)
          setTitle(data.title)
          setSurname(data.surname)
          setFirstname(data.firstname)
          setMiddlename(data.middlename)
          setDob(data.dob)
          setGender(data.gender)
          setReligion(data.religion)
          
          
          setPhone1(data.phone1)
          setPhone2(data.phone2)
          setEmail(data.email)
          setAddress(data.address)
          setNationality(data.nationality)
          setTin(data.tin)
          setNin(data.nin)
          setPen(data.pen)
          setPenmanagerid(data.penmanagerid)
          lod(data.soo)
  
          setElement('religion', data.religion )
          setElement('gender', data.gender )
          setElement('soo', data.soo )
          setElement('lga', data.lga )
          setElement('penmanager', data.penmanagerid )
  
        }
        else if(editi === 1)
        {
          setId(data.id)
          setTitle(data.title)
          setSurname(data.surname)
          setFirstname(data.firstname)
          setMiddlename(data.middlename)
          setEmployment(data.employment_no)
          setSchoolid(data.schoolid)
          setDepartmentid(data.departmentid)
          setLevelid(data.designationid)
          setDoe(data.doe)
          setPhone1(data.phone1)
          setPhone2(data.phone2)
          setEmail(data.email)
  
          setElement('school', data.schoolid )
          setElement('department', data.departmentid )
          setElement('level', data.designationid )
        }
        else if(editi === 3)
        {
          setId(data.id)
  
          setKin1_name(data.kin1_name)
          setKin1_address(data.kin1_address)
          setKin1_rel(data.kin1_rel)
          setKin1_phone1(data.kin1_phone1)
          setKin1_phone2(data.kin1_phone2)
          setKin1_email(data.kin1_email)
          setKin2_name(data.kin2_name)
          setKin2_address(data.kin2_address)
          setKin2_rel(data.kin2_rel)
          setKin2_phone1(data.kin2_phone1)
          setKin2_phone2(data.kin2_phone2)
          setKin2_email(data.kin2_email)
  
        }
        else if(editi === 4)
        {
          setId(data.id)
          setLinks(data.photo)
        }
        else if(editi === 5)
        {
          setId(data.id)
          setReason(data.reason)
          setDol(data.reason)
          setIs_active(data.is_active)
        }
      }, [props.data, props.editid])

    const lod = async(data) =>{
        await setSoo(data)
        await setElement('soo', data )
    }
  
    useEffect(() => {

        let params2 = {
          data:JSON.stringify({
              'schoolid':schoolid
          }),
          cat:'select',
          table:'offices',
          narration:'get offices'
      }
        props.getLevels(params2)
        let params2a = {
          data:JSON.stringify({
              'schoolid':schoolid
          }),
          cat:'select',
          table:'levels',
          narration:'get levels'
      }
        props.getDepartments(params2a)
        
      }, [schoolid])
    
    const handlePassword = () =>{ 
        if(npassword === rpassword)
        {
            let fd = new FormData();
            fd.append('id', id);
            fd.append('passwd', npassword);
            fd.append('cat', 'update');
            
            if(props.personal)
            {
                fd.append('table', 'staffs');
                props.updateUser(fd)
            }else{
                fd.append('table', 'staffs');
                props.updateStaff(fd)
            }
        }

    }
    const handlePasswordAutomatic = () =>{  
        if(props.data.email.length > 0)
        {
            let fd = new FormData();
            fd.append('id', id);
            fd.append('email', props.data.email);
            fd.append('fname', props.data.surname+" "+props.data.firstname+" "+props.data.middlename);
            fd.append('memp', props.data.employment_no);
            fd.append('cat', 'updatepassword');
            
            if(props.personal)
            {
                fd.append('table', 'staffs');
                props.updateUser(fd)
            }else{
                fd.append('table', 'staffs');
                props.updateStaff(fd)
            }
    }

    }
    const handlePicture1 = () =>{  
        let fd = new FormData();
        fd.append('id', id);
        fd.append('files', photo);
        fd.append('cat', 'update');
        

        if(props.personal)
        {
            fd.append('table', 'staffs');
            props.updateUser(fd)
        }else{
            fd.append('table', 'staffs');
            props.updateStaff(fd)
        }

    }
    const handleCare1 = () =>{
        let fd = new FormData();
        fd.append('id', id);
        fd.append('kin1_name', kin1_name);
        fd.append('kin1_rel', kin1_rel);
        fd.append('kin1_phone1', kin1_phone1);
        fd.append('kin1_phone2', kin1_phone2);
        fd.append('kin1_email', kin1_email);
        fd.append('kin1_address', kin1_address);
        fd.append('cat', 'update');
        fd.append('table', 'staffs');
        if(props.personal)
        {
                props.updateUser(fd)
        }else{
                props.updateStaff(fd)
        }
        
    }
    const handleCare2 = () =>{
        let fd = new FormData();
        fd.append('id', id);
        fd.append('kin2_name', kin2_name);
        fd.append('kin2_rel', kin2_rel);
        fd.append('kin2_phone1', kin2_phone1);
        fd.append('kin2_phone2', kin2_phone2);
        fd.append('kin2_email', kin2_email);
        fd.append('kin2_address', kin2_address);
        fd.append('cat', 'update');
        fd.append('table', 'staffs');
        if(props.personal)
        {
            console.log(56)
            props.updateUser(fd)
        }else{
            props.updateStaff(fd)
        }
        
    }
    const handleCare1Reset = () =>{
        let fd = new FormData();
        fd.append('id', id);
        fd.append('kin1_name', '');
        fd.append('kin1_rel', '');
        fd.append('kin1_phone1', '');
        fd.append('kin1_phone2', '');
        fd.append('kin1_email', '');
        fd.append('kin1_place', '');
        fd.append('kin1_address', '');
        fd.append('cat', 'update');
        fd.append('table', 'staffs');
        props.updateStaff(fd)
        
    }
    const handleCare2Reset = () =>{
        let fd = new FormData();
        fd.append('id', id);
        fd.append('kin2_name', '');
        fd.append('kin2_rel', '');
        fd.append('kin2_phone1', '');
        fd.append('kin2_phone2', '');
        fd.append('kin2_email', '');
        fd.append('kin2_place', '');
        fd.append('kin2_address', '');
        fd.append('cat', 'update');
        fd.append('table', 'staffs');
        props.updateStaff(fd)
        
    }
    const handleExit = () =>{
        let fd = new FormData();
        fd.append('id', id);
        fd.append('reason', reason);
        fd.append('dol', dol);
        fd.append('is_delete', 1);
        fd.append('is_active', 1);
        fd.append('table', 'staffs');
        props.updateStaff(fd)
    }
    const handleExitReset = () =>{
        let fd = new FormData();
        fd.append('id', id);
        fd.append('reason', '');
        fd.append('is_delete', 0);
        fd.append('is_active', 0);
        fd.append('table', 'staffs');
        props.updateStaff(fd)
    }
    const handleSubmit = () =>{
        let fd = new FormData();
       // fd.append('title', title);
       // fd.append('surname', surname);
       // fd.append('firstname', firstname);
       // fd.append('middlename', middlename);
        fd.append('soo', soo);
        fd.append('lga', lga);
        fd.append('tin', tin);
        fd.append('nin', nin);
        fd.append('pen', pen);
        fd.append('penmanagerid', penmanagerid);
        fd.append('nationality', nationality);
        fd.append('religion', religion);
        fd.append('gender', gender);
        fd.append('phone1', phone1);
        fd.append('phone2', phone2);
        fd.append('email', email);
        fd.append('address', address);
        fd.append('table', 'staffs');
        
        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            if(props.personal)
            {
                props.updateUser(fd)
            }else{
                props.updateStaff(fd)
            }
        }
    }
    const handleSubmitem = () =>{
        let fd = new FormData();
        fd.append('title', title);
        fd.append('surname', surname);
        fd.append('firstname', firstname);
        fd.append('middlename', middlename);
        fd.append('dob', dob);
        fd.append('doe', doe);
        fd.append('phone1', phone1);
        fd.append('phone2', phone2);
        fd.append('email', email);
        fd.append('employment_no', employment);
        fd.append('schoolid', schoolid);
        fd.append('designationid', levelid);
        fd.append('departmentid', departmentid);
        fd.append('table', 'staffs');
        
        if(id && parseInt(id) > 0)
        {
            fd.append('id', id);
            fd.append('cat', 'update');
            if(props.personal)
            {
                props.updateUser(fd)
            }else{
                props.updateStaff(fd)
            }
        }else
        {
            fd.append('cat', 'insert');
            props.registerStaff(fd)
        }
    }
    const changeSoo = (e) =>{
        setSoo(e.target.value);
    }
    const changeImg = (e) =>{
        setPhoto(e.target.files[0]);
        setLinks(e.target.files[0]);
    }
if(parseInt(props.staffs.ref) > 0 && props.staffs.staff !== {})
{
   return <Redirect to={`/staffs/${props.staffs.ref}`} />

}
let schoolarray = props.user.mySchoolData && Array.isArray(props.user.mySchoolData) ? props.user.mySchoolData : [];
let scarray = schoolarray.filter(rw=>rw !== null).map((rw, ind) =>{
    return <option key={ind} value={rw.id}>{rw.name}</option>
})

let sessionsarray = props.sessions && Array.isArray(props.sessions) ? props.sessions : [];
let searray = sessionsarray.filter(rw=>rw !== null).map((rw, ind) =>{
    return <option key={ind} value={rw.id}>{rw.name}</option>
})

let departmentsarray = props.departments && Array.isArray(props.departments) ? props.departments : [];
let deparray = departmentsarray.filter(rw=>rw !== null).map((rw, ind) =>{
    return <option key={ind} value={rw.id}>{rw.name}</option>
})

let levelsarray = props.levels && Array.isArray(props.levels) ? props.levels : [];
let levarray = levelsarray.filter(rw=>rw !== null).map((rw, ind) =>{
    return <option key={ind} value={rw.id}>{rw.name}</option>
})

let designationsarray = props.designations && Array.isArray(props.designations) ? props.designations : [];
let desarray = designationsarray.filter(rw=>rw !== null).map((rw, ind) =>{
    return <option key={ind} value={rw.id}>{rw.name}</option>
})

let penarray = allpensions && allpensions !== undefined && Array.isArray(allpensions)? allpensions.filter(rw=>rw !== null && rw !== undefined).map((rw, ind) =>{
    return <option key={ind} value={rw}>{rw}</option>
}): ''

let starray = states.filter(rw=>rw !== null).map((rw, ind) =>{
    return <option key={ind} value={rw.state}>{rw.state}</option>
})

let lgar = states.filter(rw=>rw !== null && rw.state === soo)
let lgarray = lgar.length > 0 ? lgar[0].lgas.map((rw1, ind) =>{
    return <option key={ind} value={rw1}>{rw1}</option>
}): '';

let relarray = Object.keys(allrelationsx).map((rw1, ind) =>{
    return <option key={ind} value={rw1}>{rw1}</option>
});
const setAlert = () =>{
    return <CAlert
    color="warning"
    show={true}
    closeButton
  >
    I will be closed in 400 seconds!
    <CProgress
      striped
      color="warning"
      value={400 * 10}
      size="xs"
      className="mb-3"
    />
  </CAlert>
}
  return (
    <>
  {props.editid === 2 ?
    <CRow>
    <CCol xs="12" sm="12">
        <CCard>
            <CCardBody>
            <CRow>
                <CCol xs="12" sm='3'>
                <CFormGroup>
                    <CLabel htmlFor="title">Title<i className='text-danger'>*</i></CLabel>
                    <CInput 
                        custom 
                        id="title" 
                        defaultValue={title}
                        aria-required 
                        placeholder="Pro. Dr. Mr. Mrs."
                        onChange={(e)=>setTitle(e.target.value)} 
                        required
                    />
                </CFormGroup>
                </CCol>
                <CCol xs="12" sm='3'>
                <CFormGroup>
                    <CLabel htmlFor="surname">Surname<i className='text-danger'>*</i></CLabel>
                    <CInput 
                        id="surname" 
                        defaultValue={surname}
                        disabled={true}
                        aria-required 
                        placeholder="Enter Surname"
                        onChange={(e)=>setSurname(e.target.value)} 
                        required 
                        />
                </CFormGroup>
                </CCol>
                <CCol xs="12" sm='3'>
                <CFormGroup>
                    <CLabel htmlFor="firstname">Firstname<i className='text-danger'>*</i></CLabel>
                    <CInput 
                        id="firstname" 
                        defaultValue={firstname}
                        disabled={true}
                        aria-required 
                        placeholder="Enter firstname"
                        onChange={(e)=>setFirstname(e.target.value)} 
                        required
                        />
                </CFormGroup>
                </CCol>
                <CCol xs="12" sm='3'>
                <CFormGroup>
                    <CLabel htmlFor="middlename">Middlename</CLabel>
                    <CInput 
                        id="middlename" 
                        defaultValue={middlename}
                        disabled={true}
                        type='text'
                        aria-required 
                        placeholder="Enter Middlename"
                        onChange={(e)=>setMiddlename(e.target.value)} 
                        required
                    />
                </CFormGroup>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs="12" sm='4'>
                <CFormGroup>
                    <CLabel htmlFor="dob">Date of Birth<i className='text-danger'>*</i></CLabel>
                    <CInput 
                        id="dob" 
                        defaultValue={dob}
                        disabled={true}
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
                        <option value='Nigerian'>Nigerian</option>
                        <option value='Non-nigerian'>non-nigerian</option>
                    </CSelect>
                </CFormGroup>
                </CCol>
                <CCol xs="12" sm='4'>
                <CFormGroup>
                    <CLabel htmlFor="soo">State of Origin<i className='text-danger'>*</i></CLabel>
                    <CSelect 
                        custom 
                        id="soo" 
                        value={soo}
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
                        value={lga}
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
            <CRow>
                <CCol xs="12" sm='4'>
                <CFormGroup>
                    <CLabel htmlFor="phone1">Phone Number<i className='text-danger'>*</i></CLabel>
                    <CInput 
                        id="phone1" 
                        defaultValue={phone1}
                        type='text'
                        aria-required 
                        placeholder="0800000000"
                        onChange={(e)=>setPhone1(e.target.value)} 
                        required 
                        />
                </CFormGroup>
                </CCol>
                <CCol xs="12" sm='4'>
                <CFormGroup>
                    <CLabel htmlFor="phone2">Alternative Phone Number</CLabel>
                    <CInput 
                        id="phone2" 
                        defaultValue={phone2}
                        type='text'
                        aria-required 
                        placeholder="0800000000"
                        onChange={(e)=>setPhone2(e.target.value)} 
                        required 
                        />
                </CFormGroup>
                </CCol>
                <CCol xs="12" sm='4'>
                <CFormGroup>
                <CLabel htmlFor="emails">Email</CLabel>
                <CInput 
                        id="emails" 
                        defaultValue={email}
                        type='email'
                        aria-required 
                        placeholder="info@stresert.com"
                        onChange={(e)=>setEmail(e.target.value)} 
                        required 
                        />
                </CFormGroup>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs="12" sm='12'>
                <CFormGroup>
                    <CLabel htmlFor="address">Address</CLabel>
                    <CTextarea 
                        id="address" 
                        defaultValue={address}
                        type='text'
                        aria-required 
                        placeholder="..."
                        onChange={(e)=>setAddress(e.target.value)} 
                        required 
                        ></CTextarea>
                </CFormGroup>
                </CCol>
              </CRow>
            <CRow>
                <CCol xs="12" sm='3'>
                <CFormGroup>
                    <CLabel htmlFor="tin">Tax Identification Number</CLabel>
                    <CInput 
                        custom 
                        id="tin" 
                        defaultValue={tin}
                        aria-required 
                        placeholder="000000000000"
                        onChange={(e)=>setTin(e.target.value)} 
                        required
                    />
                </CFormGroup>
                </CCol>
                <CCol xs="12" sm='3'>
                <CFormGroup>
                    <CLabel htmlFor="nin">National Indentity Number</CLabel>
                    <CInput 
                        id="nin" 
                        defaultValue={nin}
                        aria-required 
                        placeholder="Enter 11 digit number"
                        onChange={(e)=>setNin(e.target.value)} 
                        required 
                        />
                </CFormGroup>
                </CCol>
                <CCol xs="12" sm='3'>
                <CFormGroup>
                    <CLabel htmlFor="pen">Pension Number<i className='text-danger'>*</i></CLabel>
                    <CInput 
                        id="pen" 
                        defaultValue={pen}
                        aria-required 
                        placeholder="Enter number"
                        onChange={(e)=>setPen(e.target.value)} 
                        required
                        />
                </CFormGroup>
                </CCol>
                <CCol xs="12" sm='3'>
                <CFormGroup>
                    <CLabel htmlFor="penmanager">Pension Manager<i className='text-danger'>*</i></CLabel>
                    <CSelect 
                        id="penmanager" 
                        defaultValue={penmanagerid}
                        aria-required 
                        placeholder="Select Pension Manager"
                        onChange={(e)=>setPenmanagerid(e.target.value)} 
                        required
                    >
                        {penarray}
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
    : ''
  }
  {props.editid === 1 || props.editid == null?
    <CRow>
    <CCol xs="12" sm="12">
        <CCard>
            <CCardBody>
            <CRow>
                <CCol xs="12" sm='3'>
                <CFormGroup>
                    <CLabel htmlFor="title">Title<i className='text-danger'>*</i></CLabel>
                    <CInput 
                        custom 
                        id="title" 
                        defaultValue={title}
                        aria-required 
                        placeholder="Pro. Dr. Mr. Mrs."
                        onChange={(e)=>setTitle(e.target.value)} 
                        required
                    />
                </CFormGroup>
                </CCol>
                <CCol xs="12" sm='3'>
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
                <CCol xs="12" sm='3'>
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
                <CCol xs="12" sm='3'>
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
            
            <CRow>
                <CCol xs="12" sm='4' >
                <CFormGroup>
                    <CLabel htmlFor="employment">Employment Number<i className='text-danger'>*</i></CLabel>
                    <CInput 
                        id="employment" 
                        defaultValue={employment}
                        aria-required 
                        placeholder="Employment Number"
                        onChange={(e)=>setEmployment(e.target.value)} 
                        required 
                        />
                </CFormGroup>
                </CCol>
                <CCol xs="12" sm='4'>
                <CFormGroup>
  <CLabel htmlFor="doe">Date of Employment<i className='text-danger'>*</i></CLabel>
                    <CInput 
                        id="doe" 
                        defaultValue={doe}
                        type='date'
                        aria-required 
                        onChange={(e)=>setDoe(e.target.value)} 
                        required 
                        />
                </CFormGroup>
                </CCol>
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
            </CRow>          
            <CRow>
            <CCol xs="12" sm='4'>
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
                        <option></option>
                        {scarray}
                    </CSelect>
                </CFormGroup>
                </CCol>
                
                <CCol xs="12" sm='4'>
                <CFormGroup>
                    <CLabel htmlFor="department">Department<i className='text-danger'>*</i></CLabel>
                    <CSelect 
                        id="department" 
                        defaultValue={departmentid}
                        aria-required 
                        placeholder="Enter department"
                        onChange={(e)=>setDepartmentid(e.target.value)} 
                        required
                    >
                        <option></option>
                        {deparray}
                    </CSelect>
                </CFormGroup>
                </CCol>
                <CCol xs="12" sm='4'>
                <CFormGroup>
                    <CLabel htmlFor="level">Level<i className='text-danger'>*</i></CLabel>
                    <CSelect 
                        id="level" 
                        defaultValue={levelid}
                        aria-required 
                        placeholder="Enter level"
                        onChange={(e)=>setLevelid(e.target.value)} 
                        required
                    >
                        <option></option>
                        {levarray}
                    </CSelect>
                </CFormGroup>
                </CCol>
              </CRow>
            
            <CRow>
                <CCol xs="12" sm='4'>
                <CFormGroup>
                    <CLabel htmlFor="phone1">Phone Number<i className='text-danger'>*</i></CLabel>
                    <CInput 
                        id="phone1" 
                        defaultValue={phone1}
                        type='text'
                        aria-required 
                        placeholder="0800000000"
                        onChange={(e)=>setPhone1(e.target.value)} 
                        required 
                        />
                </CFormGroup>
                </CCol>
                <CCol xs="12" sm='4'>
                <CFormGroup>
                    <CLabel htmlFor="phone2">Alternative Phone Number</CLabel>
                    <CInput 
                        id="phone2" 
                        defaultValue={phone2}
                        type='text'
                        aria-required 
                        placeholder="0800000000"
                        onChange={(e)=>setPhone2(e.target.value)} 
                        required 
                        />
                </CFormGroup>
                </CCol>
                <CCol xs="12" sm='4'>
                <CFormGroup>
                <CLabel htmlFor="emails">Email</CLabel>
                <CInput 
                        id="emails" 
                        defaultValue={email}
                        type='email'
                        aria-required 
                        placeholder="info@stresert.com"
                        onChange={(e)=>setEmail(e.target.value)} 
                        required 
                        />
                </CFormGroup>
                </CCol>
            </CRow>
            
            </CCardBody>
            <CCardFooter>
                <CButton type="submit" size="sm" color="primary" onClick={handleSubmitem}><CIcon name="cil-scrubber" /> Submit</CButton>
                <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
        </CCard>
        </CCol>
    </CRow>
    :''
  }
  {props.editid === 3 ?
    <CRow>
    <CCol sm="12" md="6">
                    <CCard>
                        <CCardHeader>
                        Next of Kin
                        </CCardHeader>
                        <CCardBody>
                       
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="kin1_name">Name of Next of Kin<i className='text-danger'>*</i></CLabel>
                                <CInput 
                                    id="kin1_name" 
                                    value={kin1_name}
                                    aria-required 
                                    placeholder="Next of Kin Fullname"
                                    onChange={(e)=>setKin1_name(e.target.value)} 
                                    required 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                        <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="kin1_rel">Relationship to Staff<i className='text-danger'>*</i></CLabel>
                                <CSelect 
                                    id="kin1_rel" 
                                    value={kin1_rel}
                                    aria-required 
                                    placeholder="Enter kin1_rel"
                                    onChange={(e)=>setKin1_rel(e.target.value)} 
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
                                <CLabel htmlFor="kin1_phone1">Phone Number<i className='text-danger'>*</i></CLabel>
                                <CInput 
                                    id="kin1_phone1" 
                                    value={kin1_phone1}
                                    aria-required 
                                    placeholder="080123456789"
                                    onChange={(e)=>setKin1_phone1(e.target.value)} 
                                    required 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="kin1_phone2">Alternative Phone Number</CLabel>
                                <CInput 
                                    id="kin1_phone2" 
                                    value={kin1_phone2}
                                    placeholder="080123456789"
                                    onChange={(e)=>setKin1_phone2(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="kin1_email">Email</CLabel>
                                <CInput 
                                    id="kin1_email" 
                                    value={kin1_email}
                                    type='email'
                                    placeholder="info@mail.com"
                                    onChange={(e)=>setKin1_email(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="kin1_address">Address</CLabel>
                                <CTextarea 
                                    id="kin1_address" 
                                    value={kin1_address}
                                    placeholder="....P.0. Box "
                                    onChange={(e)=>setKin1_address(e.target.value)} 
                                    />
                                
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        
                        </CCardBody>
                        <CCardFooter>
                            <CButton onClick={handleCare1} type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                            <CButton onClick={handleCare1Reset} type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                        </CCardFooter>
                    </CCard>
                    </CCol>
                    <CCol sm="12" md="6">
                    <CCard>
                        <CCardHeader>
                        Secondary Next of Kin
                        </CCardHeader>
                        <CCardBody>
                       
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="kin2_name">Name of Next of Kin<i className='text-danger'>*</i></CLabel>
                                <CInput 
                                    id="kin2_name" 
                                    value={kin2_name}
                                    aria-required 
                                    placeholder="Next of Kin Fullname"
                                    onChange={(e)=>setKin2_name(e.target.value)} 
                                    required 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                        <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="kin2_rel">Relationship to Staff<i className='text-danger'>*</i></CLabel>
                                <CSelect 
                                    id="kin2_rel" 
                                    value={kin2_rel}
                                    aria-required 
                                    placeholder="Enter kin2_rel"
                                    onChange={(e)=>setKin2_rel(e.target.value)} 
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
                                <CLabel htmlFor="kin2_phone1">Phone Number<i className='text-danger'>*</i></CLabel>
                                <CInput 
                                    id="kin2_phone1" 
                                    value={kin2_phone1}
                                    aria-required 
                                    placeholder="080123456789"
                                    onChange={(e)=>setKin2_phone1(e.target.value)} 
                                    required 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="kin2_phone2">Alternative Phone Number</CLabel>
                                <CInput 
                                    id="kin2_phone2" 
                                    value={kin2_phone2}
                                    placeholder="080123456789"
                                    onChange={(e)=>setKin2_phone2(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="kin2_email">Email</CLabel>
                                <CInput 
                                    id="kin2_email" 
                                    value={kin2_email}
                                    type='email'
                                    placeholder="info@mail.com"
                                    onChange={(e)=>setKin2_email(e.target.value)} 
                                    />
                            </CFormGroup>
                            </CCol>
                        </CRow>
                       
                        <CRow>
                            <CCol xs="12">
                            <CFormGroup>
                                <CLabel htmlFor="kin2_address">Address</CLabel>
                                <CTextarea 
                                    id="kin2_address" 
                                    value={kin2_address}
                                    placeholder="....P.0. Box "
                                    onChange={(e)=>setKin2_address(e.target.value)} 
                                    />
                                
                            </CFormGroup>
                            </CCol>
                        </CRow>
                        
                        </CCardBody>
                        <CCardFooter>
                            <CButton onClick={handleCare2}  type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                            <CButton  onClick={handleCare2Reset} type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                        </CCardFooter>
                    </CCard>
                    </CCol>
    
    </CRow>
    :''}
  {props.editid === 4 ?
    <CRow>
        <CCol xs="12" sm="12">
            <CCard>
                <CCardHeader>
                    Photos
                </CCardHeader>
                <CCardBody>
                <CRow>
                    <CCol xs="12" sm='12' >
                        <CFormGroup>
                            <CLabel htmlFor="employment">
                                <strong>Staff Passport photo</strong><br/>
                                Note : image should show both ears, no glasses, hat or mask
                                </CLabel>
                            <CCol xs="12" md="9" className='text-center'>
                            <img 
                                src={process.env.REACT_APP_SERVER_URL + links} 
                                className="m-0 p-0" 
                                width='180px'
                                height='200px'
                                alt={employment} 
                                onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL +'avatars/1.png' }}
                             />
                             </CCol>
                             <CCol xs="12" md="9" className='mt-5'>
                                <CInputFile 
                                custom 
                                id="custom-file-input"
                                name='picture1'
                                onChange={changeImg}
                                />
                                <CLabel htmlFor="custom-file-input" variant="custom-file">
                                Choose file...
                                </CLabel>
                            </CCol>
                            <CCol xs="12" md="6" className='mt-2 text-center'>
                            <CButtonGroup className="mr-2">
                                <CButton color="secondary" onClick={handlePicture1}><i className='fa fa-save'></i> Save</CButton>
                            </CButtonGroup>
                            </CCol>
                        </CFormGroup>
                    </CCol>
                   </CRow>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
    :''}
  {props.editid === 5 ?
    <CRow>
    <CCol sm="6" md="6">
                    <CCard>
                        <CCardBody>
                        <CRow>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="npassword">New Password</CLabel>
                                    <CInput 
                                        id="npassword" 
                                        type='password'
                                        defaultValue={npassword}
                                        placeholder=""
                                        onChange={(e)=>setNpassword(e.target.value)} 
                                        />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="rpassword">Repeat New Password</CLabel>
                                    <CInput 
                                        id="rpassword" 
                                        type='password'
                                        defaultValue={rpassword}
                                        placeholder=""
                                        onChange={(e)=>setRpassword(e.target.value)} 
                                        />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        
                        </CCardBody>
                        <CCardFooter>
                            <CButton type="button" size="sm" color="primary" onClick={handlePassword}><CIcon name="cil-scrubber" /> Submit</CButton>
                            <CButton type="button" size="sm" color="danger" onClick={handlePasswordAutomatic}><CIcon name="cil-ban" /> Generate and Email New Password</CButton>
                        </CCardFooter>
                    </CCard>
                    </CCol>
    </CRow>
   :''}
  {props.editid === 6 ?
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
   :''} 
    </>
  )
}

const mapStateToProps = (state) =>({
    staffs : state.staffReducer,
    sessions : state.sessionReducer.sessions,
    offices : state.officeReducer.offices,
    departments : state.departmentReducer.departments,
    designations : state.designationReducer.designations,
    levels : state.levelReducer.levels,
    penmanagers : state.penmanagerReducer.penmanagers,
    schools : state.schoolReducer.schools,
    user: state.userReducer
  })
  export default connect(mapStateToProps, {
    getStaffs,
    getStaff,
    registerStaff,
    updateStaff,
    deleteStaff,
    getSchools,
    getSessions,
    getLevels,
    getDepartments,
    getDesignations,
    getPenmanagers,
    updateUser
  })(Staffs)
  
