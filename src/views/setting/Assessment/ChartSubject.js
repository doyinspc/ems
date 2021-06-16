import React , { useState, useEffect } from 'react'
import {
    CChartBar
  } from '@coreui/react-chartjs'
import {
  CRow,
  CCol,
  CCardHeader,
  CCard,
  CCardBody,
  CWidgetIcon
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Chart = (props) => {
    let keys = Object.keys(props.data)
    let vals = Object.values(props.data)
    
  return (
    <>
      <CRow xs="12">
          <CCol xs="12" sm="12" md="12">
          <CCard>
          <CCardHeader>
            Subject Average Performance
          </CCardHeader>
          <CCardBody>
            <CChartBar
              type="barchart"
              datasets={[
                {
                    backgroundColor: 'rgba(35,49,102,0.2)',
                    borderColor: 'rgba(35,99,52,1)',
                    borderWidth: 4,
                    hoverBackgroundColor: 'rgba(35,49,102,0.4)',
                    hoverBorderColor: 'rgba(35,99,52,1)',
                    data: vals
                }
              ]}
              labels={keys}
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
    </>
  )
}

export default Chart
  
