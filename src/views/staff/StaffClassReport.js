import React, {useEffect, useState} from 'react'
import moment from 'moment';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdownDivider, CContainer, CCardFooter } from '@coreui/react';
import { getStaff } from './../../actions/staff/staff';




const StaffLeave = (props, {match}) => {
  const data = props.data

  return (
    <>
    <CRow>
        <table width='100%'>
            {
                data.map((prop, index)=>{
                    return (
                        <tr>

                        </tr>
                    )
                })
            }
        </table>
    </CRow>
</>
  )
}

export default StaffLeave
