import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button, FormFeedback, Form } from "reactstrap";
import {getAdmissionforms, getAdmissionform, registerAdmissionform, updateAdmissionform} from './../../actions/setting/admissionform'
import {getGuardians, getGuardian, registerGuardian, updateGuardian} from './../../actions/setting/guardian'
import {getClaszs} from './../../actions/setting/clasz'
import {getAccounts} from './../../actions/setting/account'
import {getSchools} from './../../actions/setting/school'
import {allplaces, states} from './../../actions/common'
import PageHeader  from '../staff/PageHeader'
import { CContainer, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const GuardianForm = (props) => {
    const [id, setid] = useState(null)
    const [surname, setsurname] = useState("")
    const [firstname, setfirstname] = useState("")
    const [middlename, setmiddlename] = useState("")
    const [dob, setdob] = useState('')
    const [religion, setreligion] = useState('')
    const [soo, setsoo] = useState('')
    const [lga, setlga] = useState('')
    const [nationality, setnationality] = useState('')
    const [gender, setgender] = useState('')
    const [appliedclass, setappliedclass] = useState([])
    const [appliedschool, setappliedschool] = useState([])
    const [currentclass, setcurrentclass] = useState([])
    const [currentschool, setcurrentschool] = useState('')
    const [validate, setvalidate] = useState({})
    const [teller, setteller] = useState("")
    const [amount, setamount] = useState("")
    const [dates, setdates] = useState("")
    const [bank, setbank] = useState(0)
    const [ret, setret] = useState(false)

    
    
    useEffect(() => {

        let {
            id,
            surname, 
            firstname, 
            middlename, 
            teller, 
            account:bank, 
            dates, 
            amount, 
            dob, 
            gender, 
            religion,
            soo,
            lga,
            nationality,
            cclass:currentclass,
            lastschool:currentschool,
            aclass:appliedclass,
            schoolid:appliedschool 
        } = props.admissionform.admissionform || ""

        setid(id)
        setsurname(surname)
        setfirstname(firstname)
        setmiddlename(middlename)
        setteller(teller)
        setbank(bank)
        setdates(dates)
        setamount(amount)
        setdob(dob)
        setgender(gender)
        setreligion(religion)
        setsoo(soo)
        setlga(lga)
        setnationality(nationality)
        setcurrentclass(currentclass)
        setcurrentschool(currentschool)
        setappliedclass(appliedclass)
        setappliedschool(appliedschool)

       
    }, [props.admissionform.admissionform ])
    
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

    let params = {
        data:JSON.stringify({
          'is_active': 0
        }),
        cat:'selected',
        table:'accounts',
        narration:'get accounts'
        }
    props.getAccounts(params)

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
    const chkint=(a)=>{
        if(a !== undefined && a !== null && parseInt(a) > 0)
        {
            return true
        }else{
            return false
        }
    }
    const loadStudent = () =>{

        let val = {...validate}
        let arr = []

        if(!chkstr(currentschool)){arr.push(2); val.currentschool=true}
        if(!chkstr(surname)){arr.push(3); val.surname=true}
        if(!chkstr(firstname)){arr.push(4); val.firstname=true}
        if(!chkstr(religion)){arr.push(5); val.religion=true}
        if(!chkstr(soo)){arr.push(6); val.soo=true}
        if(!chkstr(lga)){arr.push(7); val.lga=true}
        if(!chkstr(gender)){arr.push(8); val.gender=true}
        if(!chkstr(amount)){arr.push(8); val.amount=true}
        if(!chkstr(teller)){arr.push(8); val.teller=true}

        if(!chkint(currentclass)){arr.push(8); val.currentclass=true}
        if(!chkint(bank)){arr.push(8); val.bank=true}
        if(!chkint(appliedclass)){arr.push(8); val.appliedclass=true}
        if(!chkint(appliedschool)){arr.push(8); val.appliedschool=true}

        setvalidate(val)
       
        if( props.guardian.guardian !== undefined 
            && Object.keys(props.guardian.guardian).includes('id')
            && parseInt(props.guardian.guardian.id) > 0
            && arr.length == 0
            )
        {
        let fd = new FormData();
        fd.append('surname', surname.toLowerCase())
        fd.append('firstname', firstname.toLowerCase())
        fd.append('middlename', middlename.toLowerCase() ?? '')
        fd.append('religion', religion)
        fd.append('account', bank)
        fd.append('teller', teller)
        fd.append('amount', amount)
        fd.append('dob', dob)
        fd.append('lga', lga)
        fd.append('soo', soo)
        fd.append('gender', gender)
        fd.append('aclass', appliedclass)
        fd.append('schoolid', appliedschool)
        fd.append('cclass', currentclass)
        fd.append('lastschool', currentschool)
        fd.append('table', 'admissions')

        if(id && parseInt(id) > 0){
            fd.append('cat', 'update')
            fd.append('id', id)
            props.updateAdmissionform(fd)
        }else{  
            fd.append('cat', 'insert')
            fd.append('gid', props.guardian.guardian.id)
            props.registerAdmissionform(fd)
        }
        setret(true)

        }
        
    }

    let clasz = Array.isArray(props.clasz.claszs) ? props.clasz.claszs.map(pr=>{
        return <option key={pr.id} value={pr.id}>{pr.name.toUpperCase()}</option>
    }):'';
    let school = Array.isArray(props.school.schools) ? props.school.schools.map(pr=>{
        return <option key={pr.id} value={pr.id}>{pr.name.toUpperCase()}</option>
    }):'';
    let bankarr = Array.isArray(props.account.accounts) ? props.account.accounts.map(pr=>{
        return <option key={pr.id} value={pr.id}>{pr.name.toUpperCase()}</option>
    }):'';
    let stateall = states.filter(rw=>rw !== null).map((rw, ind) =>{
        return <option key={ind} value={rw.state}>{rw.state}</option>
    })
    let lgar = states.filter(rw=>rw !== null && rw.state === soo)
    let lgas = lgar.length > 0 ? lgar[0].lgas.map((rw1, ind) =>{
        return <option key={ind} value={rw1}>{rw1}</option>
    }): '';

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
                                                    <Col sm={12} md={3}>
                                                    <FormGroup>
                                                        <Label htmlFor="teller">TELLER NUMBER<span className="text-danger">*</span></Label>
                                                        <Input
                                                            type="text"
                                                            name="teller"
                                                            placeholder="0000000"
                                                            className="form-control"
                                                            value={teller}
                                                            onChange={(e)=>setteller(e.target.value)}
                                                            required
                                                            invalid={
                                                                validate.hasOwnProperty('teller') && 
                                                                validate.teller == true ? true : false
                                                            }
                                                        />
                                                        <FormFeedback invalid>One teller per candidate </FormFeedback>
                                        
                                                    </FormGroup>
                                                    </Col>
                                                    <Col sm={12} md={3}>
                                                    <FormGroup>
                                                        <Label htmlFor="bank">Account <span className="text-danger">*</span></Label>
                                                        <select
                                                            name="bank"
                                                            placeholder="bank"
                                                            className="form-control"
                                                            onChange={(e)=>setbank(e.target.value)}
                                                            value={bank}
                                                            defaultValue={bank}
                                                            required
                                                        >
                                                            <option></option>
                                                            {bankarr}
                                                        </select>
                                                    </FormGroup>
                                                    </Col>
                                                    <Col sm={12} md={3}>
                                                        <FormGroup>
                                                            <Label htmlFor="amount">Amount Paid<span className="text-danger">*</span></Label>
                                                            <select
                                                                name="amount"
                                                                placeholder="amount"
                                                                className="form-control"
                                                                onChange={(e)=>setamount(e.target.value)}
                                                                value={amount}
                                                                defaultValue={amount}
                                                                required
                                                            >
                                                                <option></option>
                                                                <option value="1500">1500</option>
                                                                <option value="1000">1000</option>
                                                            </select>
                                                        </FormGroup>
                                                </Col>
                                                    <Col sm={12} md={3}>
                                                        <FormGroup>
                                                            <Label htmlFor="dates">Date Paid<span className="text-danger">*</span></Label>
                                                            <Input
                                                                name="dates"
                                                                type="date"
                                                                className="form-control"
                                                                onChange={(e)=>setdates(e.target.value)}
                                                                value={dates}
                                                                required
                                                            />
                                                          <FormFeedback invalid>Please select the date you made the payment </FormFeedback>      
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="username">Candidate's Surname<span className="text-danger">*</span></Label>
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
                                                    <Label htmlFor="firstname">Candidate's Firstname<span className="text-danger">*</span></Label>
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
                                                     <FormFeedback invalid>Candidates first name is required </FormFeedback>
                                                </FormGroup>
                                                </Col>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="middlename">Candidate's Middlename</Label>
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
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="dob">Date of Birth<span className="text-danger">*</span></Label>
                                                    <Input
                                                        type="date"
                                                        name="dob"
                                                        placeholder="dob"
                                                        className="form-control"
                                                        value={dob}
                                                        onChange={(e)=>setdob(e.target.value)}
                                                        required
                                                        invalid={
                                                            validate.hasOwnProperty('dob') && 
                                                            validate.dob == true ? true : false
                                                        }
                                                    />
                                                 </FormGroup>
                                                </Col>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="gender">Gender <span className="text-danger">*</span></Label>
                                                    <select
                                                         name="gender"
                                                         placeholder="gender"
                                                         className="form-control"
                                                         onChange={(e)=>setgender(e.target.value)}
                                                         required
                                                         value={gender}
                                                         defaultValue={gender}
                                                    >
                                                        <option></option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </select>
                                                 </FormGroup>
                                                </Col>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="religion">Religion</Label>
                                                    <select
                                                         name="religion"
                                                         placeholder="religion"
                                                         className="form-control"
                                                         onChange={(e)=>setreligion(e.target.value)}
                                                         required
                                                         value={religion}
                                                         defaultValue={religion}
                                                    >
                                                        <option></option>
                                                        <option value="christianity">Christianity</option>
                                                        <option value="islam">Islam</option>
                                                        <option value="traditional">traditional</option>
                                                    </select>
                                                 </FormGroup>
                                                </Col>
                                                </Row>
                                                <Row>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="nationality">Nationality<span className="text-danger">*</span></Label>
                                                    <select
                                                         name="nationality"
                                                         placeholder="nationality"
                                                         className="form-control"
                                                         onChange={(e)=>setnationality(e.target.value)}
                                                         required
                                                         value={nationality}
                                                         defaultValue={nationality}
                                                    >
                                                        <option></option>
                                                        <option value="0">Nigerian</option>
                                                        <option value="1">None-Nigerian</option>
                                                    </select>
                                                 </FormGroup>
                                                </Col>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="soo">{nationality == 0 ? 'State' : 'Country'} <span className="text-danger">*</span></Label>
                                                    {nationality == 0 ?
                                                    <select
                                                         name="soo"
                                                         placeholder="soo"
                                                         className="form-control"
                                                         onChange={(e)=>setsoo(e.target.value)}
                                                         required
                                                         value={soo}
                                                         defaultValue={soo}
                                                    >
                                                        <option></option>
                                                        {stateall}
                                                    </select>:
                                                    <Input
                                                        type="text"
                                                        name="soo"
                                                        placeholder="soo"
                                                        className="form-control"
                                                        value={soo}
                                                        onChange={(e)=>setsoo(e.target.value)}
                                                        required
                                                        invalid={
                                                            validate.hasOwnProperty('soo') && 
                                                            validate.soo == true ? true : false
                                                        }
                                                    />
                                                    }
                                                 </FormGroup>
                                                </Col>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="lga">{nationality == 0 ? 'LGA' : 'Region/State'}</Label>
                                                    {nationality == 0 ?
                                                    <select
                                                         name="lga"
                                                         placeholder="lga"
                                                         className="form-control"
                                                         value={lga}
                                                         onChange={(e)=>setlga(e.target.value)}
                                                         required
                                                         defaultValue={lga}
                                                    >
                                                        <option></option>
                                                        {lgas}
                                                    </select>:
                                                    <Input
                                                        type="text"
                                                        name="lga"
                                                        placeholder="lga"
                                                        className="form-control"
                                                        value={lga}
                                                        onChange={(e)=>setlga(e.target.value)}
                                                        required
                                                        invalid={
                                                            validate.hasOwnProperty('lga') && 
                                                            validate.lga == true ? true : false
                                                        }
                                                    />
                                                    }
                                                 </FormGroup>
                                                </Col>
                                                </Row>
                                                <Row>
                                                <Col sm={12} md={8}>
                                                <FormGroup>
                                                    <Label htmlFor="currentschool">Current School</Label>
                                                    <Input
                                                        type="text"
                                                        name="currentschool"
                                                        placeholder="currentschool"
                                                        className="form-control"
                                                        value={currentschool}
                                                        onChange={(e)=>setcurrentschool(e.target.value)}
                                                        required
                                                        invalid={
                                                            validate.hasOwnProperty('currentschool') && 
                                                            validate.currentschool == true ? true : false
                                                        }
                                                    />
                                                 </FormGroup>
                                                </Col>
                                                <Col sm={12} md={4}>
                                                <FormGroup>
                                                    <Label htmlFor="currentclass">Current Class <span className="text-danger">*</span></Label>
                                                    <select 
                                                         name="currentclass"
                                                         placeholder="currentclass"
                                                         className="form-control"
                                                         value={currentclass}
                                                         onChange={(e)=>setcurrentclass(e.target.value)}
                                                         required
                                                         value={currentclass}
                                                         defaultValue={currentclass}
                                                    >
                                                        <option></option>
                                                        {clasz}
                                                    </select>
                                                 </FormGroup>
                                                </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm={12} md={8}>
                                                    <FormGroup>
                                                        <Label htmlFor="appliedschool">School applying to:</Label>
                                                        <select 
                                                            name="appliedschool"
                                                            placeholder="First International School"
                                                            className="form-control"
                                                            value={appliedschool}
                                                            defaultValue={appliedschool}
                                                            onChange={(e)=>setappliedschool(e.target.value)}
                                                            required
                                                        >
                                                            <option></option>
                                                            {school}
                                                        </select>
                                                </FormGroup>
                                                    </Col>
                                                    <Col sm={12} md={4}>
                                                    <FormGroup>
                                                        <Label htmlFor="appliedclass">Class Applying for:</Label>
                                                            <select 
                                                                name="appliedclass"
                                                                placeholder="appliedclass"
                                                                className="form-control"
                                                                value={appliedclass}
                                                                defaultValue={appliedclass}
                                                                onChange={(e)=>setappliedclass(e.target.value)}
                                                                required
                                                            >
                                                            <option></option>
                                                            {clasz}
                                                        </select>
                                                    </FormGroup>
                                                    </Col>
                                                </Row>                                             
                                                <div className="mt-3">
                                                    <Button color="none" type="submit" onClick={loadStudent} className="btn-custom btn-block">Save</Button>
                                                </div>
                                                <div className="mt-1">
                                                <Link 
                                                    to="/guardian_page" 
                                                    className="btn btn-success btn-block waves-light waves-effect margin-t-3"
                                                >Back to My Candidates List</Link>
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
    guardian: state.guardianReducer,
    account:state.accountReducer
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
    getAccounts,
    getSchools
    
}

export default connect(mapStateToProps, mapDispatchToProps)(GuardianForm)
