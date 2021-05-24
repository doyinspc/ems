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
    CButtonGroup,
    CSelect
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import Select from 'react-select'
import {getMaintenancetransaction, getMaintenancetransactions, deleteMaintenancetransaction, updateMaintenancetransaction} from './../../actions/setting/maintenancetransaction';
import {getMaintenanceunit, getMaintenanceunits} from './../../actions/setting/maintenanceunit'
import {getMaintenance, getMaintenances} from './../../actions/setting/maintenance'
import {getAccounts} from './../../actions/setting/account'

import Header from './Header'
import FullData from './FullData'
import SummaryData from './SummaryData'
import GroupData from './GroupData'
import ChartData from './ChartData'
import Form from './Form'

const Maintenance = (props) => {

    const [startdate, setstartdate] = useState(null);
    const [enddate, setenddate] = useState(null);
    const [dats, setdats] = useState({})
    const [daterecorded, setdaterecorded] = useState(null);
    const [date_completed, setdate_completed] = useState(new Date())
    const [is_completed, setis_completed] = useState(0)
    const [collapse, setcollapse] = useState(false)    
    const [small, setsmall] = useState(false);
    const [small1, setsmall1] = useState(false);
    const [small2, setsmall2] = useState(false)
    const [data, setdata] = useState([])
    const [fdata, setfdata] = useState([])
    const [categoryid, setcategoryid] = useState([])
    const [subcategoryid, setsubcategoryid] = useState([])
    const [accid, setaccid] = useState([])
    const [fontz, setfontz] = useState(11)
    const [uid, setuid] = useState(null)

    useEffect(() => {
      let params = {
        data:JSON.stringify(
        {
            'is_active':0
        }),
        cat:'selected',
        table:'maintenances',
        narration:'maintenance'
      }
      props.getMaintenances(params);
      
      let params1 = {
        data:JSON.stringify(
        {
            'is_active':0
        }),
        cat:'selected',
        table:'maintenanceunits',
        narration:'maintenance units'
      }
      props.getMaintenanceunits(params1);

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
        
        //use current month
        let dt = new Date();
	      let started  = new Date(dt.getFullYear(), dt.getMonth(), 1);
        let ended = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);

        
        let params = {
          data:JSON.stringify(
          {
              'starts':moment(started).format("YYYY-MM-DD"),
              'ends':moment(ended).format("YYYY-MM-DD")
          }),
          cat:'datamaintenance',
          table:'maintenancetransactions',
          narration:'getinvemtories'
        }
      props.getMaintenancetransactions(params);   
        
    }, [startdate, enddate])

    const lunchData = () => {
      let params = {
        data:JSON.stringify(
        {
            'starts':moment(startdate).format("YYYY-MM-DD"),
            'ends':moment(enddate).format("YYYY-MM-DD")
        }),
        cat:'datamaintenance',
        table:'maintenancetransactions',
        narration:'getinvemtories'
      }
    props.getMaintenancetransactions(params);   
      
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
      let data = props.maintenancetransaction.maintenancetransactions !== undefined && Array.isArray(props.maintenancetransaction.maintenancetransactions) ? props.maintenancetransaction.maintenancetransactions.filter(rw=>rw !== null) : [];
      setdata(data);
      setfdata(data)
    }, [props.maintenancetransaction.maintenancetransactions])
  
    const onEdit =(row)=>{
      setcollapse(true);
      setdats(row);
    }
    
    const onState =(row)=>{
      setsmall2(true);
      setuid(row.id);
      setdaterecorded(row.daterecorded);
    }

    const saveData = () =>{
  
          let fd = new FormData();
          let rs = 0;
          if(is_completed == 1){
              rs = Math.abs(new Date(date_completed).getTime() - new Date(daterecorded).getTime());
          }
          fd.append('is_completed', is_completed);
          fd.append('date_completed', date_completed);
          fd.append('resolutiontime', rs);
          fd.append('userid', props.user.id);
          fd.append('table', 'maintenancetransactions');

          if(uid !== null && parseInt(uid) > 0){
              fd.append('id', uid);
              fd.append('cat', 'update');
              props.updateMaintenancetransaction(fd);
          }
          
  }
    
    const onDelete =(id)=>{
      Swal("Are you sure you want to delete you will not be able to restore the data.")
     .then((value) => {
       if(value == true && parseInt(id) > 0){
           let fd = new FormData();
           fd.append('id', id);
           fd.append('table', 'maintenancetransactions')
           fd.append('cat', 'delete')
           props.deleteMaintenancetransaction(fd, id);
       }else{
         Swal(`Not deleted`);
       }
     });
 }




let arr = {};
let arr1 = {};
let nrr = {};
let qrr = {};
let groupitems = {};
let groups = {};
let groupa = {};
let groupb = {};
let prices = {};

data.filter(rw=>rw !== undefined && rw !== null).forEach(el => {
   //parent
    if(!groups.hasOwnProperty(el.cid)){
        groups[el.cid] = el.cname;
    }
    //children
    if(!groupitems.hasOwnProperty(el.maintenanceid)){
        groupitems[el.maintenanceid] = el.maintenancename;
    }

    if(arr.hasOwnProperty(el.maintenanceid)){
        if(arr[el.maintenanceid].hasOwnProperty(el.states)){
          arr[el.maintenanceid][el.states].push(parseInt(el.date_completed));
        }else{
          arr[el.maintenanceid][el.states] = []
          arr[el.maintenanceid][el.states].push(parseInt(el.date_completed));
        }
    }else{
       arr[el.maintenanceid] = {};
       arr[el.maintenanceid][el.states] = []
       arr[el.maintenanceid][el.states].push(parseFloat(el.amount));
    }

    if(arr1.hasOwnProperty(el.maintenanceid)){
      if(arr1[el.maintenanceid].hasOwnProperty(el.date_completed)){
        arr1[el.maintenanceid][el.date_completed].push(parseInt(el.states));
      }else{
        arr1[el.maintenanceid][el.date_completed] = []
        arr1[el.maintenanceid][el.date_completed].push(parseInt(el.states));
      }
    }else{
      arr1[el.maintenanceid] = {};
      arr1[el.maintenanceid][el.date_completed] = []
      arr1[el.maintenanceid][el.date_completed].push(parseInt(el.states));
    }

    if(nrr.hasOwnProperty(el.cid)){
      if(nrr[el.cid].hasOwnProperty(el.states)){
        nrr[el.cid][el.states].push(parseInt(el.date_completed));
      }else{
        nrr[el.cid][el.states] = []
        nrr[el.cid][el.states].push(parseInt(el.date_completed));
      }
    }else{
        nrr[el.cid] = {};
        nrr[el.cid][el.states] = []
        nrr[el.cid][el.states].push(parseInt(el.date_completed));
    } 

    if(qrr.hasOwnProperty(el.is_completed)){
      if(qrr[el.is_completed].hasOwnProperty(el.states)){
        qrr[el.is_completed][el.states].push(parseInt(el.maintenanceid));
      }else{
        qrr[el.is_completed][el.states] = []
        qrr[el.is_completed][el.states].push(parseInt(el.maintenanceid));
      }
    }else{
        qrr[el.is_completed] = {};
        qrr[el.is_completed][el.states] = []
        qrr[el.is_completed][el.states].push(parseInt(el.maintenanceid));
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
              show={small2} 
              onClose={() => setsmall2(!small2)}
              size="sm"
            >
              <CModalHeader closeButton>
                <CModalTitle>Maintenance Status</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="date_completed"> Date Completed</CLabel></CCol>
                        <CCol xs="8">
                            <CInput 
                            id="date_completed" 
                            type="date" 
                            size="sm"  
                            value={date_completed}
                            defaultValue={date_completed}
                            onChange={(e)=>setdate_completed(e.target.value)}
                            />
                        </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="vat">State </CLabel></CCol>
                        <CCol xs="8">
                            <CSelect 
                              custom 
                              size="sm" 
                              name="selectSm1" 
                              id="SelectLm1" 
                              onChange={(e)=>setis_completed(e.target.value)}>
                            <option value="0" >Pending</option>
                            <option value="1">Completed</option>
                            <option value="2">Canceled</option>
                            </CSelect>
                        </CCol>
                </CFormGroup>
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={saveData}>Submit</CButton>{' '}
                <CButton color="secondary" onClick={() => setsmall2(!small2)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
          
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
          <span className="h4">Maintenance Log</span>{" "}<small>{`${moment(startdate).format("Do MMM YYYY") != 'Invalid date' ? moment(startdate).format("Do MMM YYYY"):''} ${moment(enddate).format("Do MMM YYYY") != 'Invalid date' ? moment(enddate).format("Do MMM YYYY") :''}`}</small>
         
         <span className="pull-right">
           <CButtonGroup>
           <CTooltip content="Add an maintenance">
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
                    loadState={(e)=>onState(e)}
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
    maintenancetransaction : state.maintenancetransactionReducer,
    user: state.userReducer
})

const mapDispatchToProps = {
    getMaintenancetransaction,
    getMaintenancetransactions,
    deleteMaintenancetransaction,
    updateMaintenancetransaction,
    getMaintenances,
    getMaintenance,
    getMaintenanceunits,
    getMaintenanceunit,
    getAccounts
}

export default connect(mapStateToProps, mapDispatchToProps)(Maintenance)
