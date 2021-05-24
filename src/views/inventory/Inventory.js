import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from "moment"
import Swal from "sweetalert"
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
    CButton,
    CTooltip,
    CButtonGroup
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
    const [small, setsmall] = useState(false);
    const [small1, setsmall1] = useState(false)
    const [data, setdata] = useState([])
    const [fdata, setfdata] = useState([])
    const [categoryid, setcategoryid] = useState([])
    const [subcategoryid, setsubcategoryid] = useState([])
    const [accid, setaccid] = useState([])
    const [fontz, setfontz] = useState(11)

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
  
    const lunchData = () => {
      let params = {
        data:JSON.stringify(
        {
            'starts':moment(startdate).format("YYYY-MM-DD"),
            'ends':moment(enddate).format("YYYY-MM-DD")
        }),
        cat:'datainventory',
        table:'inventorytransactions',
        narration:'getinvemtories'
      }
    props.getInventorytransactions(params);   
      
    }
    const lunchFilter = () =>{

    //change to array
    let pid = []
    let cid = []
    let aid = []

    categoryid.forEach(ele=>pid.push(ele.value))
    subcategoryid.forEach(ele=>cid.push(ele.value))
    accid.forEach(ele=>aid.push(ele.value))

    let d = [...fdata]
     
    if(pid.length > 0){
      d = d.filter(rw=>pid.includes(rw.cid));
    }

    if(cid.length > 0){
      d = d.filter(rw=>cid.includes(rw.inventoryid));
    }

    if(aid.length > 0){
      d = d.filter(rw=>aid.includes(rw.accountid));
    }

    setdata(d);

    }
    const lunchReset = () =>{

  
          let d = [...fdata]
          setcategoryid([])
          setsubcategoryid([])
          setaccid([]);
          setdata(d);
  
    }
    useEffect(() => {
      let data = props.inventorytransaction.inventorytransactions !== undefined && Array.isArray(props.inventorytransaction.inventorytransactions) ? props.inventorytransaction.inventorytransactions.filter(rw=>rw !== null) : [];
      setdata(data);
      setfdata(data)
    }, [props.inventorytransaction.inventorytransactions])
    const onEdit =(row)=>{
      setcollapse(true);
      setdats(row);
    }
    
    const onDelete =(id)=>{
      Swal("Are you sure you want to delete you will not be able to restore the data.")
     .then((value) => {
       if(value == true && parseInt(id) > 0){
           let fd = new FormData();
           fd.append('id', id);
           fd.append('table', 'inventorytransactions')
           fd.append('cat', 'delete')
           props.deleteInventorytransaction(fd, id);
       }else{
         Swal(`Not deleted`);
       }
     });
 }

let arr = {};
let nrr = {};
let groupitems = {};
let groups = {};
let groupa = {}
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
          arr[el.inventoryid][el.states].push(parseFloat(el.quantity));
        }else{
          arr[el.inventoryid][el.states] = []
          arr[el.inventoryid][el.states].push(parseFloat(el.quantity));
        }
    }else{
       arr[el.inventoryid] = {};
       arr[el.inventoryid][el.states] = []
       arr[el.inventoryid][el.states].push(parseFloat(el.quantity));
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
    
let parent = groups ? groups : {};
  let p1 = [];
  Object.keys(parent).forEach(rw =>{
    let ar = {}
      ar['label'] = parent[rw];
      ar['value'] = rw;
      p1.push(ar)
  })

  let child = groupitems  ? groupitems : {};
  let c1 = [];
  Object.keys(child).forEach(rw =>{
    let ar = {}
      ar['label'] = child[rw];
      ar['value'] = rw;
      c1.push(ar)
  })

  let acc = groupa  ? groupa : {};
  let a1 = [];
  Object.keys(acc).forEach(rw =>{
    let ar = {}
      ar['label'] = acc[rw];
      ar['value'] = rw;
      a1.push(ar)
  })

  const handleCategoryid = (event) =>{
    setcategoryid(event)
  }
  const handleSubcategoryid = (event) =>{
    setsubcategoryid(event)
  }
  const handleAccid = (event) =>{
    setaccid(event)
  }







return (
        <div>
            <Header 
              activeterm={props.user.activeterm}
              activeschool={props.user.activeschool}
            />
            <CCollapse show={collapse}>
              <Form
                data={dats}
              />
            </CCollapse>
    <CCol xs="12" md="12" className="mb-4">
        <CCard>
        <CCardHeader>
          <span className="h4">Inventory Log</span>{" "}<small>{`${moment(startdate).format("Do MMM YYYY") != 'invalid date' ? moment(startdate).format("Do MMM YYYY"):''} ${moment(enddate).format("Do MMM YYYY") != 'Invalid date' ? moment(enddate).format("Do MMM YYYY") :''}`}</small>
         
         <span className="pull-right">
           <CButtonGroup>
           <CTooltip content="Add an inventory">
           <CButton color='success' className="d-print-none" onClick={()=>setcollapse(prev=>!prev)} outline>

             <CIcon name={collapse == false ? "cil-plus" :"cil-chevron-double-up"} />
          </CButton> 
          </CTooltip>
         <CTooltip content="Filter by Category, subcategory or account">
          <CButton 
              onClick={() => setsmall1(!small1)} 
              className="d-print-none" 
              color="secondary"
            >
              <CIcon name="cil-filter" />
            </CButton>
            </CTooltip>
          <CTooltip content="Filter by date">
              <CButton 
                  onClick={() => setsmall(!small)} 
                  className="d-print-none" 
                  color="secondary"
                >
                  <CIcon name="cil-calendar" />
                </CButton>
            </CTooltip>
         
          <CTooltip content="Add Font">
           <CButton color='secondary' className="d-print-none" onClick={()=>setfontz(prev=>prev+0.1)} outline>
             
             <CIcon name="cil-text-size" />
             
          </CButton> 
          </CTooltip>
          <CTooltip content="reduce Font">
           <CButton color='dark' className="d-print-none" onClick={()=>setfontz(prev=>prev-0.1)} outline>
            
             <CIcon name="cil-text-size" />
          </CButton> 
          </CTooltip>
          </CButtonGroup>
         </span>
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
    inventorytransaction : state.inventorytransactionReducer,
    user: state.userReducer
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
