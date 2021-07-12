import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";

import { connect } from 'react-redux'
import {getAdmissionforms, getAdmissionform, registerAdmissionform, updateAdmissionform} from './../../actions/setting/admissionform'
import {getGuardians, getGuardian, registerGuardian, updateGuardian} from './../../actions/setting/guardian'
import {getClaszs} from './../../actions/setting/clasz'
import {getSchools} from './../../actions/setting/school'

const Admission = (props) => {
  
    const [validate, setvalidate] = useState({})

    useEffect(() => {
    
    let { id } = props.guardian.guardian || ''

    let params2 = {
        data:JSON.stringify({
          'is_active': 0,
          'gid':id
        }),
        cat:'selected',
        table:'admissions',
        narration:'get admissions'
    }
     props.getAdmissionforms(params2)
    
    }, [])

   

      

    
    let {surname:gsurname, firstname:gfirstname, middlename:gmiddlename, place, placename, address, phone1, phone2, email } = props.guardian.guardian || ''
    let {abbrv, surname, firstname, middlename, id, gender, religion, dob, soo, lga, nationality, schoolname, appliedclass, currentclass, amount, account, dates, teller, photo  } = props.admissionform.admissionform || ''
    return (
       <>
      <section className="row bg-secondary">
            <div className="display-table col-sm-12">
                <div className="display-table-cell row">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={8}>
                                <Card className="account-card">
                                    <CardBody>
                                        <div className="text-center mt-1">
                                        <img
                                                height='80'
                                                src={process.env.PUBLIC_URL+'/logo.png'}
                                            />
                                            <h3 className="font-weight-bold"><a href="index.html" className="text-dark text-uppercase account-pages-logo">MESL STAFF SCHOOLS</a></h3>
                                            <p className="text-muted">Kainji & Jebba</p>
                                            <h4><b className='text-danger'>ADMISSION REQUEST FORM </b></h4>
                                           
                                        </div>
                                        <div className="p-3" xs={12} style={{fontFamily:'Bubblegum Sans'}}>
                                            <Row>
                                                <Col className="text-center mt-1">
                                                <img 
                                                    src={process.env.REACT_APP_SERVER_URL+ photo} 
                                                    className="c-avatar-img" 
                                                    style={{width:'200px', height:'200px'}}
                                                    height='150px'
                                                    width='150px'
                                                    alt={surname} 
                                                    onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/assets/images/team/img-1.jpg'} }
                                                    />
                                                    <span className=""></span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12" style={{fontSize:'17px'}}>
                                                        <Row xs={12} className="m-0 p-0">
                                                            <Col sm={4} className= "m-0 p-0">REF NO.</Col>
                                                            <Col sm={8} className= "m-0 p-0" style={{fontWeight:'bold', textTransform:'capitalize'}}>{`${abbrv}${id}`}</Col>
                                                        </Row>
                                                        <Row xs={12}  className="m-0 p-0">
                                                            <Col sm={4} className= "m-0 p-0">Fullname</Col>
                                                            <Col sm={8} className= "m-0 p-0" style={{fontWeight:'bold', textTransform:'capitalize'}}>{`${surname} ${firstname} ${middlename}`}</Col>
                                                        </Row>
                                                        <Row xs={12}  className="m-0 p-0">
                                                            <Col sm={4} className= "m-0 p-0">Payment Details</Col>
                                                            <Col sm={8} className= "m-0 p-0" style={{fontWeight:'bold'}}>{`${teller || '-'} ${account || '-'} ${amount || '-'} ${dates || '-'}`}</Col>
                                                        </Row>
                                                        <Row xs={12}  className="m-0 p-0">
                                                            <Col sm={4} className= "m-0 p-0">Gender</Col>
                                                            <Col sm={8} className= "m-0 p-0" style={{fontWeight:'bold'}}>{gender}</Col>
                                                        </Row>
                                                        <Row className="m-0 p-0">
                                                            <Col sm={4} className= "m-0 p-0">Birth Date</Col>
                                                            <Col sm={8} className= "m-0 p-0" style={{fontWeight:'bold'}}>{dob}</Col>
                                                        </Row>
                                                        <Row className="m-0 p-0">
                                                            <Col sm={4} className= "m-0 p-0">State/LGA</Col>
                                                            <Col sm={8} className= "m-0 p-0" style={{fontWeight:'bold', textTransform:'capitalize'}}>{`${soo} ${lga} ${nationality}`}</Col>
                                                        </Row>
                                                        <Row className="m-0 p-0">
                                                            <Col sm={4} className= "m-0 p-0">Religion</Col>
                                                            <Col sm={8} className= "m-0 p-0" style={{fontWeight:'bold'}}>{religion}</Col>
                                                        </Row>
                                                        <Row className="m-0 p-0">
                                                            <Col sm={4} className= "m-0 p-0">School Applied</Col>
                                                            <Col sm={8} className= "m-0 p-0" style={{fontWeight:'bold'}}>{schoolname}</Col>
                                                        </Row>
                                                        <Row className="m-0 p-0">
                                                            <Col sm={4} className= "m-0 p-0">Class Applied</Col>
                                                            <Col sm={8} className= "m-0 p-0" style={{fontWeight:'bold'}}>{appliedclass}</Col>
                                                        </Row>
                                                        <Row className="m-0 p-0">
                                                            <Col sm={4} className= "m-0 p-0">Current School</Col>
                                                            <Col sm={8} className= "m-0 p-0" style={{fontWeight:'bold'}}>{schoolname}</Col>
                                                        </Row>
                                                        <Row className="m-0 p-0">
                                                            <Col sm={4} className= "m-0 p-0">Current Class</Col>
                                                            <Col sm={8} className= "m-0 p-0" style={{fontWeight:'bold'}}>{currentclass}</Col>
                                                        </Row>
                                                        <Row className="m-0 p-0">
                                                            <Col sm={4} className= "m-0 p-0">Parent/Sponsor</Col>
                                                            <Col sm={8} className= "m-0 p-0" style={{fontWeight:'bold', textTransform:'capitalize'}}>{`${gsurname} ${gfirstname} ${gmiddlename}`}</Col>
                                                        </Row>
                                                        <Row className="m-0 p-0">
                                                            <Col sm={4} className= "m-0 p-0">Address</Col>
                                                            <Col sm={8} className= "m-0 p-0" style={{fontWeight:'bold'}}>{address}</Col>
                                                        </Row>
                                                        <Row className="m-0 p-0">
                                                            <Col sm={4} className= "m-0 p-0">Contact</Col>
                                                            <Col sm={8} className= "m-0 p-0" style={{fontWeight:'bold'}}>{`${phone1} ${phone2} ${email}`}</Col>
                                                        </Row>
                                                        
                                                </Col>
                                            </Row>
                                            <Row className="justify-content-center">
                                                <Col xs={12}>
                                            <div className="alert alert-success" xs={12}>
                                                <h3>Instructions</h3>
                                                Candidates should
                                            </div>
                                            </Col>
                                            </Row>
                                            
                                                <div className="mt-3 d-print-none">
                                                    <Link 
                                                        to="/guardian" className="btn btn-success btn-block waves-light waves-effect margin-t-3"
                                                    >Back to list</Link>                                        </div>
                                                <div className="mt-3 d-print-none">
                                                    
                                                    <Button color="none" type="submit" onClick={()=>window.print()} className="btn-custom" block>Print</Button>
                                                </div>

                                                <div className="mt-4 mb-0 text-center">
                                                   <a href='https://www.stresertintegrated.com/'><img src={process.env.PUBLIC_URL+'/logo1.png'} height='40px'/> Powered By StreSERT Integrated Limited</a>
                                                </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        
                    </Container>
                </div>
                    
            </div>
        </section>
        
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admission)