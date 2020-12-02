import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {getStaffs, getStaff, registerStaff, updateStaff, deleteStaff} from './../../actions/staff/staff';
import { useHistory, useLocation } from 'react-router-dom'
import {
    CChartBar,
    CChartLine,
    CChartDoughnut,
    CChartRadar,
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

const Staffs = (props) => {
    const history = useHistory()
    const [active, setActive] = useState(0)

    useEffect(() => {
        let params = {
          data:JSON.stringify(
          {
              'schoolid':1
          }),
          cat:'select',
          table:'staffs',
          narration:'get all staffs'
      }
        props.getStaffs(params)
        
      }, [])

   let data = props.staffs.staffs && Array.isArray(props.staffs.staffs) ? props.staffs.staffs.filter(rw =>rw !== null || rw !== undefined) : []
   
   let cont = data.map((row, ind)=>{
    return <tr key={ind}
    onClick={() => history.push(`/staffs/${row.id}`)}>
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

let acct = data.map((row, ind)=>{
    return <tr key={ind}
    onClick={() => history.push(`/staffs/${row.id}`)}>
    <td className="text-center">
     {ind + 1}
    </td>
    <td>
        <div>{`${row.surname} ${row.firstname} ${row.middlename}`}</div>
    </td>
    <td>
        {props.tin}
    </td>
    <td>
        {props.nin}
    </td>
        {props.pen}
    <td>
      
    </td>
  </tr>
})

   let tabl = data.map((row, ind)=>{
        return <tr key={ind}
        onClick={() => history.push(`/staffs/${row.id}`)}>
        <td className="text-center">
          <div className="c-avatar">
            <img src={'avatars/1.png'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
            <span className={`c-avatar-status ${row.gender === 'Male' ? 'bg-success' : 'bg-danger'}`}></span>
          </div>
        </td>
        <td>
            <div>{`${row.surname} ${row.firstname} ${row.middlename}`}</div>
                <div className="small text-muted">
                <span>{row.employment_no} | {row.departmentname}</span>
            </div>
        </td>
        <td>
            <div className="small text-muted">
                <span>Phone</span>: <strong><a href={`tel:${row.phone1}`}>{row.phone1}</a> <a href={`mailto:${row.phone2}`}>{row.phone2}</a></strong>
            </div>
            <div className="small text-muted">
                <span>Email</span>: <strong><a href={`mailto:${row.email}`}>{row.email}</a></strong> 
            </div>
        </td>
        <td>
            <div className="small text-muted">
                <span>Date of Birth</span>: <strong>{row.dob}</strong>
            </div>
            <div className="small text-muted">
                <span>Date of Emply.</span>: <strong>{row.doe}</strong> 
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

  let maritalTable = {};
  for(var i = 0; i < data.length; i++)
  {
    if(data[i].marital in maritalTable)
        maritalTable[data[i].marital]++;
    else
        maritalTable[data[i].marital] = 1;
  }
  return (
    <>
    <CRow>
    <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Staffs List</h4>
              <div className="small text-muted">Academic Calendar</div>
            </CCol>
            <CCol sm="7" className="d-md-block">
              <CButton 
                  data-target='#formz' 
                  data-toggle="collapse" 
                  color="primary"
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
                    { active === 2 && ' Contact'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <i className='fa fa-money'></i>
                    { active === 3 && ' Finance'}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-user"/>
                    { active === 3 && ' Next of Kin'}
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
          <CWidgetIcon text="Total Staff" header={genderMale.length + genderFemale.length} color="info" iconPadding={false}>
            
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
    <CCol xs="12" sm="12" md="6">
        <CCard >
        <CCardHeader>
          Marital
        </CCardHeader>
        <CCardBody>
          <CChartPie
            type="pie"
            datasets={[
              {
                backgroundColor: [
                    '#00D8FF',
                    '#DD1B16',
                    '#41B883',
                  '#E46651'
                  
                ],
                data: Object.values(maritalTable)
              }
            ]}
            labels={Object.keys(maritalTable)}
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
        <CCard>
        <CCardHeader>
          Department
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
                ],
                data: Object.values(departmentTable)
              }
            ]}
            labels={Object.keys(departmentTable)}
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
                    <th>Staff</th>
                    <th className="text-center">Contacts</th>
                    <th className="text-center">Dates</th>
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
                    <th className="text-center">Staff ID</th>
                    <th>Fullname</th>
                    <th className="text-center">Phone</th>
                    <th className="text-center">Email</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {cont}
                </tbody>
                </table>
                </CTabPane>
                <CTabPane>
                <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">Staff ID</th>
                    <th>Staff</th>
                    <th className="text-center">NIN</th>
                    <th className="text-center">TIN</th>
                    <th className="text-center">PENSION</th>
                    <th className="text-center">ACCOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {acct}
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
    staffs : state.staffReducer
  })
  export default connect(mapStateToProps, {
    getStaffs,
    getStaff,
    registerStaff,
    updateStaff,
    deleteStaff
  })(Staffs)
  
