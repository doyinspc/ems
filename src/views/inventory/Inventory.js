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
    CCardHeader,
    CCollapse,
    CButton
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'

import {getInventorytransaction, getInventorytransactions} from './../../actions/setting/inventorytransaction';
import {getInventoryunit, getInventoryunits} from './../../actions/setting/inventoryunit'
import {getInventory, getInventorys} from './../../actions/setting/inventory'

import Header from './Header'
import FullData from './FullData'
import SummaryData from './SummaryData'
import ChartData from './ChartData'
import Form from './Form'
import { isDate } from 'date-fns'

const Inventory = (props) => {

    const [startdate, setstartdate] = useState(null);
    const [enddate, setenddate] = useState(null);
    const [dats, setdats] = useState({})
    const [collapse, setcollapse] = useState(false)

    useEffect(() => {
      let params = {
        data:JSON.stringify(
        {
            'is_active':0
        }),
        cat:'selected',
        table:'inventorys',
        narration:'inventory'
      }
      props.getInventorys(params);
      
      let params1 = {
        data:JSON.stringify(
        {
            'is_active':0
        }),
        cat:'selected',
        table:'inventoryunits',
        narration:'inventory units'
      }
      props.getInventoryunits(params1);
       
    }, [])

    useEffect(() => {
        //if date range is not selected use the current month
        let stdate = isDate(startdate) ? new Date(startdate) :  null;
        let endate = isDate(enddate) ? new Date(enddate) :  null;

        //use current month
        let dt = new Date();
	      let started  = new Date(dt.getFullYear(), dt.getMonth(), 1);
        let ended = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);

        //pick the ideal dates to use
        if(stdate !== null && endate !== null && endate > stdate)
        {
            started = stdate;
            ended = endate;
        }

        let params = {
          data:JSON.stringify(
          {
              'starts':started,
              'ends':ended
          }),
          cat:'datainventory',
          table:'inventorytransactions',
          narration:'getinvemtories'
        }
      props.getInventorytransactions(params);   
        
    }, [startdate, enddate])

    const onEdit =(row)=>{
      setcollapse(true);
      setdats(row);
    }
    const onDelete =(row)=>{
        
    }

let data = props.inventorytransaction.inventorytransactions !== undefined ? props.inventorytransaction.inventorytransactions.filter(rw=>rw !== null) : [];


let arr = {};
let nrr = {};
let groupitems = {};
let groups = {};
let prices = {};

data.forEach(el => {
    if(prices.hasOwnProperty(el.inventoryid)){
        if(
            Array.isArray(prices[el.inventoryid]) && 
            new Date(prices[el.inventoryid][0]) <= new Date(el.daterecorded) && 
            parseFloat(el.price) > 0
          ){ prices[el.inventoryid] = [el.daterecorded, el.prices]; }
    }else{
        prices[el.inventoryid] = [el.daterecorded, el.prices];
    }
    if(!groups.hasOwnProperty(el.cid)){
        groups[el.cid] = el.cname;
    }
    if(!groupitems.hasOwnProperty(el.inventoryid)){
        groupitems[el.inventoryid] = el.inventoryname;
    }
    if(arr.hasOwnProperty(el.inventoryid)){
        if(arr[el.inventoryid].hasOwnProperty(el.states)){
          arr[el.inventoryid][el.states] = arr[el.inventoryid][el.states] + parseFloat(el.quantity);
        }else{
          arr[el.inventoryid][el.states] = parseFloat(el.quantity);
        }
    }else{
       arr[el.inventoryid] = {};
       arr[el.inventoryid][el.states] = parseFloat(el.quantity);
    }
    if(nrr.hasOwnProperty(el.cid)){
      if(nrr[el.cid].hasOwnProperty(el.states)){
        nrr[el.cid][el.states] += parseFloat(el.quantity);
      }else{
        nrr[el.cid][el.states] = 0;
        nrr[el.cid][el.states] += parseFloat(el.quantity);
      }
    }else{
     nrr[el.cid] = {};
     nrr[el.cid][el.states] = 0;
     nrr[el.cid][el.states] += parseFloat(el.quantity);
    }     
});
    return (
        <div>
            <Header 

            />
            <CCollapse show={collapse}>
              <Form
                data={dats}
              />
            </CCollapse>
    <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
           <CButton color='secondary' onClick={()=>setcollapse(prev=>!prev)} outline>
             <i 
             className="fa fa-plus" 
             outline 
             color="success"></i>
          </CButton> <span className="h4">No fade animation tabs</span>
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
                    data={arr}
                    items={groupitems}
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
    getInventorytransactions,
    getInventorys,
    getInventory,
    getInventoryunits,
    getInventoryunit
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)
