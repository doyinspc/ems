import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Swal from'sweetalert'
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
    CModalBody,
    CModalHeader,
    CModal,
    CModalFooter,
    CModalTitle,
    CFormGroup,
    CInput,
    CLabel,
    CTooltip,
    CButtonGroup
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import Select from 'react-select'
import {getExpensetransaction, getExpensetransactions, deleteExpensetransaction} from './../../actions/setting/expensetransaction';
import {getExpenseunit, getExpenseunits} from './../../actions/setting/expenseunit'
import {getExpense, getExpenses} from './../../actions/setting/expense'
import {getAccounts} from './../../actions/setting/account'

import Header from './Header'
import FullData from './FullData'
import SummaryData from './SummaryData'
import GroupData from './GroupData'
import AccountData from './AccountData'
import ChartData from './ChartData'
import Form from './Form'
import { isDate } from 'date-fns'

const Expense = (props) => {

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
        table:'expenses',
        narration:'expense'
      }
      props.getExpenses(params);
      
      let params1 = {
        data:JSON.stringify(
        {
            'is_active':0
        }),
        cat:'selected',
        table:'expenseunits',
        narration:'expense units'
      }
      props.getExpenseunits(params1);

      let params2 = {
        data:JSON.stringify(
        {
            'is_active':0
        }),
        cat:'selected',
        table:'accounts',
        narration:'account'
      }
      props.getAccounts(params2);
       
    }, [])

    useEffect(() => {
        //if date range is not selected use the current month
        // let stdate = isDate(startdate) ? new Date(startdate) :  null;
        // let endate = isDate(enddate) ? new Date(enddate) :  null;

        //use current month
        let dt = new Date();
	      let started  = new Date(dt.getFullYear(), dt.getMonth(), 1);
        let ended = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);

       
        
        //setstartdate(started)
        //setenddate(ended)
        let params = {
          data:JSON.stringify(
          {
              'starts':moment(started).format("YYYY-MM-DD"),
              'ends':moment(ended).format("YYYY-MM-DD")
          }),
          cat:'dataexpense',
          table:'expensetransactions',
          narration:'getinvemtories'
        }
      props.getExpensetransactions(params);   
        
    }, [startdate, enddate])

    const lunchData = () => {
      let params = {
        data:JSON.stringify(
        {
            'starts':moment(startdate).format("YYYY-MM-DD"),
            'ends':moment(enddate).format("YYYY-MM-DD")
        }),
        cat:'dataexpense',
        table:'expensetransactions',
        narration:'getinvemtories'
      }
    props.getExpensetransactions(params);   
      
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
      let data = props.expensetransaction.expensetransactions !== undefined && Array.isArray(props.expensetransaction.expensetransactions) ? props.expensetransaction.expensetransactions.filter(rw=>rw !== null) : [];
      setdata(data);
      setfdata(data)
    }, [props.expensetransaction.expensetransactions])
  
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
           fd.append('table', 'expensetransactions')
           fd.append('cat', 'delete')
           props.deleteExpensetransaction(fd, id);
       }else{
         Swal(`Not deleted`);
       }
     });
    }




let arr = {};
let nrr = {};
let qrr = {};
let groupitems = {};
let groups = {};
let groupa = {};
let prices = {};

data.filter(rw=>rw !== undefined && rw !== null).forEach(el => {
    if(prices.hasOwnProperty(el.expenseid)){
        if(
            Array.isArray(prices[el.expenseid]) && 
            new Date(prices[el.expenseid][0]) <= new Date(el.daterecorded) && 
            parseFloat(el.price) > 0
          ){ prices[el.expenseid] = [el.daterecorded, el.prices]; }
    }else{
        prices[el.expenseid] = [el.daterecorded, el.prices];
    }
    if(!groups.hasOwnProperty(el.cid)){
        groups[el.cid] = el.cname;
    }
    if(!groupitems.hasOwnProperty(el.expenseid)){
        groupitems[el.expenseid] = el.expensename;
    }
    if(!groupa.hasOwnProperty(el.accountid)){
      groupa[el.accountid] = el.accountname;
    }
    if(arr.hasOwnProperty(el.expenseid)){
        if(arr[el.expenseid].hasOwnProperty(el.states)){
          arr[el.expenseid][el.states].push(parseFloat(el.amount));
        }else{
          arr[el.expenseid][el.states] = []
          arr[el.expenseid][el.states].push(parseFloat(el.amount));
        }
    }else{
       arr[el.expenseid] = {};
       arr[el.expenseid][el.states] = []
       arr[el.expenseid][el.states].push(parseFloat(el.amount));
    }
    if(nrr.hasOwnProperty(el.cid)){
      if(nrr[el.cid].hasOwnProperty(el.states)){
        nrr[el.cid][el.states].push(parseFloat(el.amount));
      }else{
        nrr[el.cid][el.states] = []
        nrr[el.cid][el.states].push(parseFloat(el.amount));
      }
    }else{
     nrr[el.cid] = {};
     nrr[el.cid][el.states] = []
     nrr[el.cid][el.states].push(parseFloat(el.amount));
    } 
    if(qrr.hasOwnProperty(el.accountid)){
      if(qrr[el.accountid].hasOwnProperty(el.states)){
        qrr[el.accountid][el.states].push(parseFloat(el.amount));
      }else{
        qrr[el.accountid][el.states] = []
        qrr[el.accountid][el.states].push(parseFloat(el.amount));
      }
    }else{
     qrr[el.accountid] = {};
     qrr[el.accountid][el.states] = []
     qrr[el.accountid][el.states].push(parseFloat(el.amount));
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
          <CModal 
              show={small} 
              onClose={() => setsmall(!small)}
              size="sm"
            >
              <CModalHeader closeButton>
                <CModalTitle>Select Date Range</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="startdate"> Start Date</CLabel></CCol>
                        <CCol xs="8">
                            <CInput 
                            id="startdate" 
                            type="date" 
                            size="sm"  
                            value={startdate}
                            defaultValue={startdate}
                            onChange={(e)=>setstartdate(e.target.value)}
                            />
                        </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="enddate">End Date</CLabel></CCol>
                        <CCol xs="8">
                            <CInput 
                            id="enddate"  
                            type="date" 
                            size="sm"  
                            value={enddate}
                            defaultValue={enddate}
                            onChange={(e)=>setenddate(e.target.value)}
                            />
                        </CCol>
                </CFormGroup>
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={lunchData}>Submit</CButton>{' '}
                <CButton color="secondary" onClick={() => setsmall(!small)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
            
            <CModal 
              show={small1} 
              onClose={() => setsmall1(!small1)}
              size="lg"
            >
              <CModalHeader closeButton>
                <CModalTitle>Filter</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CFormGroup row className="my-0 mb-1">
                      <CCol xs="2"><CLabel htmlFor="category"> Category</CLabel></CCol>
                      <CCol xs="10">
                      <Select
                        closeMenuOnSelect={false}
                        value={categoryid}
                        isMulti
                        options={p1}
                        onChange={handleCategoryid}
                      />
                      </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                      <CCol xs="2"><CLabel htmlFor="category"> Subcategory</CLabel></CCol>
                      <CCol xs="10">
                      <Select
                        closeMenuOnSelect={false}
                        value={subcategoryid}
                        isMulti
                        options={c1}
                        onChange={handleSubcategoryid}
                      />
                      </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                      <CCol xs="2"><CLabel htmlFor="category"> Account </CLabel></CCol>
                      <CCol xs="10">
                      <Select
                        closeMenuOnSelect={false}
                        value={accid}
                        isMulti
                        options={a1}
                        onChange={handleAccid}
                      />
                      </CCol>
                </CFormGroup>
                  </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={lunchFilter}>Filter</CButton>{' '}
                <CButton color="dark" onClick={lunchReset}>Reset</CButton>{' '}
                <CButton color="secondary" onClick={() => setsmall1(!small1)}>Close</CButton>
              </CModalFooter>
            </CModal>
          
            
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
          <span className="h4">Expenses Log</span>{" "}<small>{`${moment(startdate).format("Do MMM YYYY") != 'Invalid date' ? moment(startdate).format("Do MMM YYYY"):''} ${moment(enddate).format("Do MMM YYYY") != 'Invalid date' ? moment(enddate).format("Do MMM YYYY") :''}`}</small>
         
         <span className="pull-right">
           <CButtonGroup>
           <CTooltip content="Add an expense">
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
              <CNav className="d-print-none" variant="tabs">
                <CNavItem>
                  <CNavLink>
                    Records
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Summary
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Categories
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Accounts
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    Charts
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent fade={false}>
                <CTabPane>
                  <FullData
                    data={data}
                    onEdit={(e)=>onEdit(e)}
                    onDelete={(e)=>onDelete(e)}
                    fontz={fontz}
                  />
                </CTabPane>
                <CTabPane>
                  <SummaryData
                    data={arr}
                    items={groupitems}
                    startdate={startdate}
                    endate={enddate}
                  />
                </CTabPane>
                <CTabPane>
                  <GroupData 
                    data={nrr}
                    items={groups}
                  />
                </CTabPane>
                <CTabPane>
                  <AccountData 
                    data={qrr}
                    items={groupa}
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
    expensetransaction : state.expensetransactionReducer,
    user: state.userReducer
})

const mapDispatchToProps = {
    getExpensetransaction,
    getExpensetransactions,
    deleteExpensetransaction,
    getExpenses,
    getExpense,
    getExpenseunits,
    getExpenseunit,
    getAccounts
}

export default connect(mapStateToProps, mapDispatchToProps)(Expense)
