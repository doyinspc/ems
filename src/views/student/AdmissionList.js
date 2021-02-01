import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getAdmissions, getAdmission, registerAdmission, updateAdmission, deleteAdmission} from './../../actions/setting/admission';
import { useHistory, useLocation } from 'react-router-dom'
import {
    CChartBar, 
    CChartPie,
    CChartPolarArea
  } from '@coreui/react-chartjs'

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

import jsPDF from 'jspdf';
import $ from 'jquery'
let movieDetails =[
  {
    "title":"Result",
    "vote_count":3,
    "original_language":'Yoruba',
  }
]
const Admissions = (props) => {
    const history = useHistory()
    const [active, setActive] = useState(0)

    useEffect(() => {
        let params = {
          data:JSON.stringify(
          {
              'is_active':0
          }),
          cat:'selected',
          table:'admissions',
          narration:'get all admissions'
      }
        props.getAdmissions(params)
        
      }, [])

   let data = props.admissions.admissions && Array.isArray(props.admissions.admissions) ? props.admissions.admissions.filter(rw =>rw !== null || rw !== undefined) : []
   
   let cont = data.map((row, ind)=>{
    return <tr key={ind}
    onClick={() => history.push(`/admission/${row.id}`)}>
    <td className="text-center">
     {ind + 1}
    </td>
    <td>
        <div>{`${row.surname} ${row.firstname} ${row.middlename}`}</div>
    </td>
    <td>
        <strong><a href={`mailto:${row.phone1}`}>{row.phone1}</a> <a href={`mailto:${row.phone2}`}>{row.phone2}</a></strong>
    </td>
    <td>
        <strong><a href={`mailto:${row.email}`}>{row.email}</a></strong> 
    </td>
    <td>
      <div className="text-muted " style={{textTransform:'capitalize'}}>{row.address}</div>
    </td>
  </tr>
})


let pht = data.map((row, ind)=>{
    return <CCard key={ind} className='mx-3 ' style={{width:'140px', height:'200px'}}>
        <CCardHeader className='m-0 text-center'>
        <b style={{textTransform:'capitalize'}}>{row.admission_no}</b>  
        </CCardHeader>
        <CCardBody className='m-0 p-0 ' style={{height:'160px'}}>
        <img 
            src={process.env.REACT_APP_SERVER_URL+ '/passport/'+ row.photo1} 
            className="m-0 p-0" 
            width='100%'
            height='160px'
            alt={row.admission_no} 
            onError={(e)=>{e.target.onerror=null; e.target.src='avatars/1.jpg'} }
        />
        </CCardBody>
        <div className='m-2' style={{backgroundColor:'rgba(0,0,0,0)'}}>
          <span style={{textTransform:'capitalize',  fontSize:'18px', color:'white', fontWeight:'bolder'}}> {row.surname}{' '}{row.firstname}{' '}{row.middlename}</span>
        </div>
    </CCard>
})

   let tabl = data.map((row, ind)=>{
        return <tr key={ind}
        onClick={() => window.open(`#/admission/${row.id}`, "_blank")}>
        <td className="text-center">
          <div className="c-avatar">
            <img 
            src={process.env.REACT_APP_SERVER_URL+ '/passport/'+ row.photo1} 
            className="c-avatar-img" 
            alt={row.admission_no} 
            onError={(e)=>{e.target.onerror=null; e.target.src='avatars/1.jpg'} }
            />
            <span className={`c-avatar-status ${row.gender === 'Male' ? 'bg-success' : 'bg-danger'}`}></span>
          </div>
        </td>
        <td>
   <div>{`${row.surname} ${row.firstname} ${row.middlename} ${row.id}`}</div>
                <div className="small text-muted">
                <span>{row.admission_no}</span>
            </div>
        </td>
        <td>
          {row.schoolname}
        </td>
        <td>
            <div className="small text-muted">
                <span>Date of Birth</span>: <strong>{row.dob}</strong>
            </div>
            <div className="small text-muted">
                <span>Date of Adm.</span>: <strong>{row.doe}</strong> 
            </div>
        </td>
        <td>
          <div className="small text-muted " style={{textTransform:'capitalize'}}>{row.soo}</div>
          <strong style={{textTransform:'capitalize'}}>{row.lga}</strong>
        </td>
        <td>
          <div className="text-muted " style={{textTransform:'capitalize'}}>{row.gender}</div>
        </td>
      </tr>
    });
 

  let genderFemale = data.filter(rw =>rw.gender === 'Female');
  let genderMale = data.filter(rw =>rw.gender === 'Male');

  let departmentTable = {};
  for(var i = 0; i < data.length; i++)
  {
    if(data[i].departmentid in departmentTable)
        departmentTable[data[i].departmentid]++;
    else
        departmentTable[data[i].departmentid] = 1;
  }
 
 let religionTable = {};
  for(var i = 0; i < data.length; i++)
  {
    if(data[i].religion in religionTable)
        religionTable[data[i].religion]++;
    else
        religionTable[data[i].religion] = 1;
  }

  let genderTable = {};
  for(var i = 0; i < data.length; i++)
  {
    if(data[i].gender in genderTable)
        genderTable[data[i].gender]++;
    else
        genderTable[data[i].gender] = 1;
  }

  let sooTable = {};
  for(var i = 0; i < data.length; i++)
  {
    if(data[i].soo in sooTable)
        sooTable[data[i].soo]++;
    else
        sooTable[data[i].soo] = 1;
  }

  let dobTable = {};
  for(var i = 0; i < data.length; i++)
  {
    let yrs = new Date(data[i].dob).getFullYear();
    let yr = Math.round(new Date().getFullYear() - yrs)
    if(yr in dobTable)
        dobTable[yr]++;
    else
        dobTable[yr] = 1;
  }
const  printPDF =()=> {
    var printDoc = new jsPDF();
    printDoc.fromHTML($(process.env.PUBLIC_URL + 'admission/170').get(0), 10, 10, {'width': 180});
    printDoc.autoPrint();
    printDoc.output("dataurlnewwindow"); // this opens a new popup,  after this the PDF opens the print window view but there are browser inconsistencies with how this is handled
}
  return (
    <>
    <CRow>
      <div>
      
     
      
      </div>
    <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Admissions List</h4>
              <div className="small text-muted">Academic Calendar</div>
            </CCol>
            <CCol sm="7" className="d-md-block">
              <CButton 
                  data-target='#formz' 
                  data-toggle="collapse" 
                  color="primary"
                  onClick={printPDF}
                  className="float-right">
                <CIcon name="cil-cloud-download"/>
              </CButton>
            </CCol>
          </CRow>
          </CCardHeader>
          <CCardBody>
            <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
              <CNav variant="tabs">
              <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-chart-pie"/>
                    { active === 0 && ' Dashboard'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-calculator" />
                    { active === 1 && ' Biodata'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-map" />
                    { active === 2 && ' Stage'}
                  </CNavLink>
                </CNavItem>
               
              </CNav>
              <CTabContent>
              <CTabPane>
                <br/>
                    <CRow className='mt-20 py-90'>
                    <CCol xs="12" sm="6" lg="4">
          <CWidgetIcon text="Male" header={genderMale.length} color="success" iconPadding={false}>
            <CIcon width={24} name="cil-user" className="mx-5"/>
          </CWidgetIcon>
        </CCol>
        <CCol xs="12" sm="6" lg="4">
          <CWidgetIcon text="Female" header={genderFemale.length} color="danger" iconPadding={false}>
            <CIcon width={24} name="cil-user-female" className="mx-5"/>
          </CWidgetIcon>
        </CCol>
          
        <CCol xs="12" sm="6" lg="4">
          <CWidgetIcon text="Total Admission" header={genderMale.length + genderFemale.length} color="info" iconPadding={false}>
          <i className='fa fa-users fa-2x mx-5'></i>
          </CWidgetIcon>
        </CCol>
          </CRow>
                <CRow>
        <CCol xs="12" sm="12" md="6">
        <CCard >
        <CCardHeader>
          Gender 
        </CCardHeader>
        <CCardBody>
          <CChartPie
            type="pie"
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: Object.values(genderTable)
              }
            ]}
            labels={Object.keys(genderTable)}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol xs="12" sm="12" md="6">
        <CCard >
        <CCardHeader>
          Religion
        </CCardHeader>
        <CCardBody>
          <CChartPie
            type="pie"
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: Object.values(religionTable)
              }
            ]}
            labels={Object.keys(religionTable)}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
    </CCol>
    
    </CRow>
    <CRow>
   
    <CCol xs="12" sm="12" md="12">
        <CCard>
        <CCardHeader>
          Age Distrubution
        </CCardHeader>
        <CCardBody>
          <CChartBar
            type="barchart"
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#045800',
                  '#4AB883',
                  '#E96651',
                  '#09E0FF',
                  '#DD1116',
                  '#096651',
                  '#19E0FF',
                  '#296651',
                  '#39E0FF',
                  '#41B23',
                  '#E22651',
                  '#045800',
                  '#22B883',
                  '#226651',
                  '#55E0FF',
                  '#551116',
                  '#09aa51',
                  '#19bbFF',
                  '#29CC51',
                  '#39DDFF',
                ],
                data: Object.values(dobTable)
              }
            ]}
            labels={Object.keys(dobTable)}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
      </CCol>
    
    </CRow>
    <CRow>
   
   <CCol xs="12" sm="12" md="12">
       <CCard>
       <CCardHeader>
         State of Origin
       </CCardHeader>
       <CCardBody>
         <CChartBar
           type="barchart"
           datasets={[
             {
               backgroundColor: [
                 '#41B883',
                 '#E46651',
                 '#045800',
                 '#4AB883',
                 '#E96651',
                 '#09E0FF',
                 '#DD1116',
                 '#096651',
                 '#19E0FF',
                 '#296651',
                 '#39E0FF',
                 '#41B23',
                 '#E22651',
                 '#045800',
                 '#22B883',
                 '#226651',
                 '#55E0FF',
                 '#551116',
                 '#09aa51',
                 '#19bbFF',
                 '#29CC51',
                 '#39DDFF',
               ],
               data: Object.values(sooTable)
             }
           ]}
           labels={Object.keys(sooTable)}
           options={{
             tooltips: {
               enabled: true
             }
           }}
         />
       </CCardBody>
     </CCard>
     </CCol>
   
   </CRow>
    
            
            </CTabPane>
                <CTabPane>
                <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><CIcon name="cil-people" /></th>
                    <th>Admission</th>
                    <th className="text-center">Contacts</th>
                    <th className="text-center">Dates</th>
                    <th className="text-center">School</th>
                    <th>Origin</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {tabl}
                </tbody>
                </table>
                </CTabPane>
                <CTabPane>
                <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">Admission ID</th>
                    <th>Fullname</th>
                    <th className="text-center">School Mgt</th>
                    <th className="text-center">Bursar</th>
                    <th className="text-center">Admission Officer</th>
                    <th className="text-center">Educational Officer</th>
                    <th className="text-center">Class teaher</th>
                  </tr>
                </thead>
                <tbody>
                  {cont}
                </tbody>
                </table>
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
    admissions : state.admissionReducer
  })
  export default connect(mapStateToProps, {
    getAdmissions,
    getAdmission,
    registerAdmission,
    updateAdmission,
    deleteAdmission
  })(Admissions)
  
