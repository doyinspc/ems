import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
    CCol,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CTabContent,
    CTabPane,
    CCard,
    CCardBody,
    CTabs,
    CCardHeader
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'

import {getInventorytransaction, getInventorytransactions} from './../../actions/setting/inventorytransaction'

import Header from './Header'
import FullData from './FullData'
import SummaryData from './SummaryData'
import ChartData from './ChartData'

const Inventory = (props) => {

    const [startdate, setstartdate] = useState(null)
    const [enddate, setenddate] = useState(null)

    useEffect(() => {
        //if datae range is not selected use the current month
        
        
    }, [startdate, enddate])


const onEdit =(row)=>{

}

const onDelete =(row)=>{
    
}

let data = []
    return (
        <div>
            <Header 

            />
    <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
            No fade animation tabs
          </CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-calculator" />
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-basket" />
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-chart-pie"/>
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent fade={false}>
                <CTabPane>
                  <FullData
                    data={data}
                    onEdit={(e)=>onEdit(e)}
                    onDelete={(e)=>onDelete(e)}
                  />
                </CTabPane>
                <CTabPane>
                  <SummaryData
                    data={data}
                  />
                </CTabPane>
                <CTabPane>
                  <ChartData
                    data={data}
                  />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>

      
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    inventorytransaction : state.inventorytransactionReducer
})

const mapDispatchToProps = {
    getInventorytransaction,
    getInventorytransactions
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)
