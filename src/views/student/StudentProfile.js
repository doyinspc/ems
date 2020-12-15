import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider } from '@coreui/react'


const User = ({match}) => {
  

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol>

              </CCol>
              <CCol>
                <CDropdown className="m-1 btn-group">
              <CDropdownToggle color="primary">
                Primary
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
              </CCol>
            </CRow>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <td>

                    </td>
                    <td>
                      <tbody>
                          <tr><td>Surname</td><td></td></tr>
                          <tr><td>Firstname</td><td></td></tr>
                          <tr><td>Middlename</td><td></td></tr>
                          <tr><td>Date of birth</td><td></td></tr>

                      </tbody>
                    </td>
                  </tr>
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
