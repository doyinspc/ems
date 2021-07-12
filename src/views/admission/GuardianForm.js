import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button, FormFeedback, Form } from "reactstrap";
import {getAdmissionforms, getAdmissionform, registerAdmissionform, updateAdmissionform} from './../../actions/setting/admissionform'
import {getGuardians, getGuardian, registerGuardian, updateGuardian} from './../../actions/setting/guardian'
import {getClaszs} from './../../actions/setting/clasz'
import {getSchools} from './../../actions/setting/school'
import {allplaces} from './../../actions/common'
import PageHeader  from '../staff/PageHeader'
import { CContainer, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const GuardianForm = (props) => {
    const [id, setid] = useState(null)
    const [password, setpassword] = useState('')
    const [altpassword, setaltpassword] = useState('')
    const [pasw, setpasw] = useState(0)
    const [surname, setsurname] = useState("")
    const [firstname, setfirstname] = useState("")
    const [middlename, setmiddlename] = useState("")
    const [phone1, setphone1] = useState('')
    const [phone2, setphone2] = useState('')
    const [email, setemail] = useState('')
    const [address, setaddress] = useState('')
    const [place, setplace] = useState('')
    const [placename, setplacename] = useState('')
    const [validate, setvalidate] = useState({})

    useEffect(() => {

    let params1 = {
          data:JSON.stringify({
            'is_active': 0
          }),
          cat:'selected',
          table:'claszs',
          narration:'get claszs'
      }
    props.getClaszs(params1)

    let params2 = {
        data:JSON.stringify({
          'is_active': 0
        }),
        cat:'select',
        table:'schools',
        narration:'get schools'
    }
     props.getSchools(params2)
    
    }, [])

    const chkstr=(a)=>{
        if(a !== undefined && a !== null && a.length > 0)
        {
            return true
        }else{
            return false
        }
    }
    const chkphn=(d)=>{
        return true;
    }
    const chkpass=(a, b)=>{
        //console.log(a, b)
        if(a !== undefined && a !== null && a.length > 6 && a === b)
        {
            return true
        }else{
            return false
        }
        
    }

    const loadGuardian = () =>{

        let val = {...validate}
        let arr = []

        if(!chkpass(password, altpassword)){arr.push(1); val.password=true}
        if(!chkstr(email)){arr.push(2); val.email=true}
        if(!chkstr(surname)){arr.push(3); val.surname=true}
        if(!chkstr(firstname)){arr.push(4); val.firstname=true}
        if(!chkstr(placename)){arr.push(5); val.placename=true}
        if(!chkstr(address)){arr.push(6); val.address=true}
        if(!chkstr(place)){arr.push(7); val.place=true}
        if(!chkphn(phone1)){arr.push(8); val.phone1=true}

        setvalidate(val)
        if(arr.length == 0){
        let fd = new FormData();
        fd.append('surname', surname)
        fd.append('firstname', firstname)
        fd.append('middlename', middlename)
        fd.append('passwd', password)
        fd.append('phone1', phone1)
        fd.append('phone2', phone2)
        fd.append('email', email)
        fd.append('place', place)
        fd.append('address', address)
        fd.append('placename', placename)
        fd.append('table', 'guardians')

        if(id && parseInt(id) > 0){
            fd.append('cat', 'update')
            fd.append('id', id)
            props.updateGuardian(fd)
        }else{  
            fd.append('cat', 'insert')
            props.registerGuardian(fd)
        }
        }
    }

    let placearray = Object.keys(allplaces).map((rw1, ind) =>{
        return <option key={ind} value={rw1}>{rw1}</option>
    });

    if( props.guardian.guardian !== undefined 
        && Object.keys(props.guardian.guardian).includes('id')
        && parseInt(props.guardian.guardian.id) > 0
        )
    {
       // return <Redirect to="/guardian" />
    }

    return (
        <div className="m-20 p-30 container-fluid" id="maincont" style={{backgroundColor:'grey'}} >
        <div 
            className="m-200" 
            style={{marginLeft:'auto', marginRight:'auto', marginTop:'9px',  marginBottom:'5px', backgroundColor:'grey'}}
          >
            <CContainer 
                style={{  minHeight:'900px', maxWidth:'720px', backgroundColor:'white'}}
            >
                <PageHeader />   
                                        
                <CRow xs={12} >
                <Container>
                        <Row className="justify-content-center">
                            <Col lg={12}>
                                <Card className="account-card">
                                    <CardBody>
                                        <div className="text-center mt-1">
                                            <h4><b className='text-danger'>ADMISSION REQUEST FORM (PARENT/SPONSOR) </b></h4>
                                            <div className="alert alert-success alert-dismissible">
                                                Complete all Sponsor, Parent or Guardian details. Your contact details would 
                                                be used to communicate with the studentsand you will need the email and password 
                                                to login in future. After this, you would be able to add the candidates details. 
                                                You can add more than one student.
                                            </div>    
                                        </div>
                                        <div className="p-3">
                                            <Form>
                                            <Row>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="email">Email<span className="text-danger">*</span></Label>
                                                    <Input
                                                        type="email"
                                                        name="email"
                                                        placeholder="email"
                                                        className="form-control"
                                                        value={email}
                                                        onChange={(e)=>setemail(e.target.value)}
                                                        required
                                                        invalid={
                                                            validate.hasOwnProperty('email') && 
                                                            validate.email == true ? true : false
                                                        }
                                                    />
                                                    <FormFeedback invalid>Surame (father's name) is required </FormFeedback>
                                                 </FormGroup>
                                                </Col>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="password">Password<span className="text-danger">*</span></Label>
                                                    <Input
                                                        type={pasw == 0 ? 'password':'text'}
                                                        name="password"
                                                        className="form-control"
                                                        value={password}
                                                        onChange={(e)=>setpassword(e.target.value)}
                                                        required
                                                        invalid={
                                                            validate.hasOwnProperty('password') && 
                                                            validate.password == true ? true : false
                                                        }
                                                    />
                                                     <FormFeedback invalid>Password must be more than nine (9) characters </FormFeedback>
                                                </FormGroup>
                                                </Col>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="altpassword">Repeat Password<span className="text-danger">*</span>
                                                    <span className="glyph glyph-edit"></span></Label>
                                                    <Input
                                                        type={pasw == 0 ? 'password':'text'}
                                                        name="altpassword"
                                                        className="form-control"
                                                        value={altpassword}
                                                        onChange={(e)=>setaltpassword(e.target.value)}
                                                    />
                                                </FormGroup>
                                                </Col>
                                            </Row>
                                               
                                            <Row>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="username">Surname<span className="text-danger">*</span></Label>
                                                    <Input
                                                        type="text"
                                                        name="surname"
                                                        placeholder="Surname"
                                                        className="form-control"
                                                        value={surname}
                                                        onChange={(e)=>setsurname(e.target.value)}
                                                        required
                                                        invalid={
                                                            validate.hasOwnProperty('surname') && 
                                                            validate.surname == true ? true : false
                                                        }
                                                    />
                                                    <FormFeedback invalid>Surame (father's name) is required </FormFeedback>
                                                 </FormGroup>
                                                </Col>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="firstname">Firstname<span className="text-danger">*</span></Label>
                                                    <Input
                                                        type="text"
                                                        name="firstname"
                                                        placeholder="firstname"
                                                        className="form-control"
                                                        value={firstname}
                                                        onChange={(e)=>setfirstname(e.target.value)}
                                                        required
                                                        invalid={
                                                            validate.hasOwnProperty('firstname') && 
                                                            validate.firstname == true ? true : false
                                                        }
                                                    />
                                                     <FormFeedback invalid>first name is required </FormFeedback>
                                                </FormGroup>
                                                </Col>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="middlename">Middlename</Label>
                                                    <Input
                                                        type="text"
                                                        name="middlename"
                                                        placeholder="middlename"
                                                        className="form-control"
                                                        value={middlename}
                                                        onChange={(e)=>setmiddlename(e.target.value)}
                                                    />
                                                </FormGroup>
                                                </Col>
                                            </Row>
                                                
                                            <Row>
                                                <Col sm={12} md={12}>
                                                <FormGroup>
                                                    <Label htmlFor="address">Address<span className="text-danger">*</span></Label>
                                                    <Input
                                                        type="text"
                                                        name="address"
                                                        placeholder="20, Senior Camp, Kainji, New Bussa, Niger State, Nigeria "
                                                        className="form-control"
                                                        value={address}
                                                        onChange={(e)=>setaddress(e.target.value)}
                                                        required
                                                        invalid={
                                                            validate.hasOwnProperty('address') && 
                                                            validate.address == true ? true : false
                                                        }
                                                    />
                                                    <FormFeedback invalid></FormFeedback>
                                                 </FormGroup>
                                                </Col>
                                                </Row>
                                                
                                            <Row>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="phone1">Phone Number<span className="text-danger">*</span></Label>
                                                    <Input
                                                        type="text"
                                                        name="phone1"
                                                        placeholder="0XXXXXXXXXX"
                                                        className="form-control"
                                                        value={phone1}
                                                        onChange={(e)=>setphone1(e.target.value)}
                                                        required
                                                        invalid={
                                                            validate.hasOwnProperty('phone1') && 
                                                            validate.phone1 == true ? true : false
                                                        }
                                                    />
                                                 </FormGroup>
                                                </Col>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="phone2">Alternative Phone Number  </Label>
                                                    <Input
                                                        type="text"
                                                        name="phone2"
                                                        placeholder="0XXXXXXXXXX"
                                                        className="form-control"
                                                        value={phone2}
                                                        onChange={(e)=>setphone2(e.target.value)}
                                                        required
                                                        invalid={
                                                            validate.hasOwnProperty('phone2') && 
                                                            validate.phone2 == true ? true : false
                                                        }
                                                    />
                                                 </FormGroup>
                                                </Col>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="place">Sponsor (Place of Work)<span className="text-danger">*</span></Label>
                                                    <select
                                                         name="place"
                                                         placeholder="place"
                                                         className="form-control"
                                                         onChange={(e)=>setplace(e.target.value)}
                                                         required
                                                    >
                                                        <option></option>
                                                        {placearray}
                                                    </select>
                                                 </FormGroup>
                                                </Col>
                                            </Row>
                                            
                                            <Row>
                                                <Col sm={12} md={12}>
                                                <FormGroup>
                                                    <Label htmlFor="placename">Fullname of Place of Work<span className="text-danger">*</span></Label>
                                                    <Input
                                                        type="text"
                                                        name="placename"
                                                        placeholder="Mainstream Energy Solutions, Kainji "
                                                        className="form-control"
                                                        value={placename}
                                                        onChange={(e)=>setplacename(e.target.value)}
                                                        required
                                                        invalid={
                                                            validate.hasOwnProperty('placename') && 
                                                            validate.placename == true ? true : false
                                                        }
                                                    />
                                                    <FormFeedback invalid></FormFeedback>
                                                 </FormGroup>
                                                </Col>
                                                </Row>
                                                

                                                <div className="mt-3">
                                                    <Button color="none" type="submit" onClick={loadGuardian} className="btn-custom btn-block">Save</Button>
                                                </div>

                                                <div className="mt-4 mb-0 text-center">
                                                    <small><Link to="password_forget" className="text-dark"><i className="mdi mdi-lock"></i> Forgot your password Please cantact admin?</Link></small><br/>
                                                    <a href='https://www.stresertintegrated.com/'><img src={process.env.PUBLIC_URL+'/logo1.png'} height='40px'/> Powered By StreSERT Integrated Limited</a>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
           
                </CRow>
            </CContainer>
        </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    clasz: state.claszReducer,
    school: state.schoolReducer,
    admissionform: state.admissionformReducer,
    guardian: state.guardianReducer
})

const mapDispatchToProps = {
    getAdmissionform,
    getAdmissionforms,
    registerAdmissionform,
    updateAdmissionform,
    getGuardian,
    getGuardians,
    registerGuardian,
    updateGuardian,
    getClaszs,
    getSchools
    
}

export default connect(mapStateToProps, mapDispatchToProps)(GuardianForm)
