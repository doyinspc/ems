import React , { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom'
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
  CCard,
  CCardBody,
  CWidgetIcon
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Chart1 = (props) => {
    const par = useParams()
    const history = useHistory()
  
  return (
    <>
      <CRow >
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
                  data: [1,2,3,4,5]
                }
              ]}
              labels={['Att', 'Home', 'MediaDeviceInfo', 'Pref', 'Lomw']}
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

export default Chart1
  
