import { array } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CFormGroup,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CLabel,
    CSelect,
    CRow
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
import {updateMaintenancetransaction, registerMaintenancetransaction} from './../../actions/setting/maintenancetransaction';

  
import { API_PATH_SETTING, axiosConfig, callError, callSuccess, validateDate, maintenancestate } from '../../actions/common';



const Form = (props) => {

    const [id, setid] = useState(null);
    const [maintenanceid, setmaintenanceid] = useState(0);
    const [maintenancename, setmaintenancename] = useState('');
    const [maintenanceunitid, setmaintenanceunitid] = useState(0);
    const [maintenanceunitid_error, setmaintenanceunitid_error] = useState(true);
    const [maintenanceunitname, setmaintenanceunitname] = useState('');
    const [account, setaccount] = useState(0);
    const [states, setstates] = useState(0);
    const [states_error, setstates_error] = useState(true);
    const [amount, setamount] = useState(null);
    const [amount_error, setamount_error] = useState(true);
    const [description, setdescription] = useState('');
    const [daterecorded, setdaterecorded] = useState(new Date());
    const [daterecorded_error, setdaterecorded_error] = useState(true);
    const [available, setavailable] = useState(0);
    //const [staffid, setstaffid] = useState(null);
    const path = API_PATH_SETTING; 
   
    useEffect(() => {
        let data = props.data;
        
        if(data !== null && data !== undefined && data .hasOwnProperty('id') && +data.id > 0)
        {
            let ac = parseFloat(data.amount) < 0 ? parseFloat(data.amount) * -1 : parseFloat(data.amount) ;
            setid(data.id);
            setmaintenanceid(data.cid);
            setmaintenancename(data.cname);
            setmaintenanceunitid(data.maintenanceid);
            setmaintenanceunitname(data.maintenancename);
            setstates(data.states);
            setdescription(data.description);
            setdaterecorded(data.daterecorded);

        }else
        {
            setid(null);
            setmaintenanceid('');
            setmaintenancename('');
            setmaintenanceunitid(0);
            setmaintenanceunitname('');
            setstates(0);
            setdescription('');
            setdaterecorded('');
        }      
    }, [props.data]);


    const onsubmit = () =>{
        
        let err = [];
        if(parseInt(maintenanceunitid) > 0){setmaintenanceunitid_error(true)}
        else{ setmaintenanceunitid_error(false); err.push('Select an item');}


        if(states > 0){setstates_error(true) }
        else{ setstates_error(false); err.push('invalid states');}

        if(validateDate(daterecorded)){setdaterecorded_error(true) }
        else{ setdaterecorded_error(false); err.push('invalid date');}
        
        
        if(err.length == 0){
            let fd = new FormData();

            fd.append('maintenanceid', maintenanceunitid);
            fd.append('states', states);
            fd.append('description', description);
            fd.append('daterecorded', daterecorded);
            fd.append('staffid', props.user.id);
            fd.append('table', 'maintenancetransactions');

            if(id !== null && parseInt(id) > 0){
                fd.append('id', id);
                fd.append('cat', 'update');
                props.updateMaintenancetransaction(fd);
            }else{
                fd.append('cat', 'insert');
                fd.append('schoolid', props.school.id);
                props.registerMaintenancetransaction(fd);
            }
            reset();
            

        }else{
            callError(err[0]); 
        }
    }

    const reset = () =>{
            setid(null);
            //setmaintenanceid('');
            //setmaintenancename('');
            //setmaintenanceunitid(0);
            //setmaintenanceunitname('');
            setstates(0);
            setdescription('');
            setdaterecorded('');
    }

    let account_arr = props.account ? props.account : null;
    let accountarr = account_arr !== null ? account_arr.filter(rw=>rw !== null).map(rw=>{
        return <option value={rw.id}>{rw.name}</option>;
    }):'';
    let maintenance_arr = props.maintenance ? props.maintenance : null;
    let maintenancearr = maintenance_arr !== null ? maintenance_arr.filter(rw=>rw !== null).map(rw=>{
        return <option value={rw.id}>{rw.name}</option>;
    }):'';
 
    let maintenanceunit_arr = props.maintenanceunit ? props.maintenanceunit : null;
    let maintenanceunitarr = maintenanceunit_arr !== null ? maintenanceunit_arr.filter(rw=>rw !== null && rw.maintenanceid == maintenanceid).map(rw=>{
        return <option value={rw.id}>{rw.name}</option>;
    }):'';

    let maintenancestate_arr = maintenancestate ;
    let maintenancestatearr = maintenancestate_arr !== null ? maintenancestate_arr.filter(rw=>rw !== null).map(rw=>{
        return <option value={rw.id}>{rw.name}</option>;
    }):'';

   
    return (
        <div className='justify-content-center' style={{margin:'0px', }}>
            <CCol className='justify-content-center' style={{marginLeft:'auto', marginRight:'auto'}} xs="12" sm="6">
            <CCard xs="12" className={parseInt(id) > 1 ? "bg-info" : "bg-dark"}>
                <CCardHeader>
                <h4>Maintenances <small>{parseInt(id) > 1 ? "Edit Mode" : "Add new"}</small></h4>
                </CCardHeader>
                <CCardBody>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="maintenanceid">Category</CLabel></CCol>
                        <CCol xs="8">
                            <CSelect 
                            custom 
                            size="sm" 
                            name="maintenanceid" 
                            id="maintenanceid" 
                            onChange={(e)=>setmaintenanceid(e.target.value)}>
                            {parseInt(id) > 0 ? <option value={maintenanceid}>{maintenancename}</option>:<option >Please select</option>}
                            
                            {maintenancearr}
                            </CSelect>
                        </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="vat">Name  </CLabel></CCol>
                        <CCol xs="8">
                            <CSelect invalid = {maintenanceunitid_error ? false : true}  custom size="sm" name="selectSm1" id="SelectLm1" onChange={(e)=>setmaintenanceunitid(e.target.value)}>
                            {id && parseInt(id) > 0 ? <option value={maintenanceunitid}>{maintenanceunitname}</option>:<option >Please select</option>}
                            {maintenanceunitarr}
                            </CSelect>
                        <CInvalidFeedback>Select the maintenance</CInvalidFeedback>
                        </CCol>
                </CFormGroup>            
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="vat">Piority </CLabel></CCol>
                        <CCol xs="8">
                            <CSelect 
                            invalid ={states_error ? false : true} 
                            custom 
                            size="sm" 
                            name="selectSm1" 
                            id="SelectLm1" onChange={(e)=>setstates(e.target.value)}>
                            {parseInt(id) > 0 ? <option value={states}>{parseInt(states) == 1 ? 'Debit': 'Credit'}</option>:<option >Please select</option>}
                            {maintenancestatearr}
                            </CSelect>
                            <CInvalidFeedback>Select a piority</CInvalidFeedback>
                        </CCol>
                    </CFormGroup>             
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="daterecorded">Date Recorded</CLabel></CCol>
                        <CCol xs="8">
                            <CInput 
                            id="daterecorded" 
                            invalid ={daterecorded_error ? false : true} 
                            type="date" 
                            size="sm"  
                            value={daterecorded}
                            defaultValue={daterecorded}
                            onChange={(e)=>setdaterecorded(e.target.value)}
                            />
                            <CInvalidFeedback>input a date</CInvalidFeedback>
                        </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="daterecorded">Description</CLabel></CCol>
                        <CCol xs="8">
                            <CTextarea 
                            id="description" 
                            value={description}
                            onChange={(e)=>setdescription(e.target.value)}
                            placeholder="For the purchase of books" 
                            ></CTextarea></CCol>
                </CFormGroup>   
                </CCardBody>
                <CCardFooter >
                    <CRow className="my-0">
                        <CCol xs="6"><CButton type="reset" onClick={()=>reset()} size="sm" color="danger" block ><CIcon name="cil-ban"  /> Reset</CButton></CCol>
                        <CCol xs="6"><CButton type="submit" onClick={()=>onsubmit()} size="sm" color="primary" block><CIcon name="cil-scrubber" /> Submit</CButton></CCol>
                    </CRow>
                </CCardFooter>
            </CCard>
            </CCol>   
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.userReducer.user,
    school: state.userReducer.activeschool,
    account:state.accountReducer.accounts,
    maintenance:state.maintenanceReducer.maintenances,
    maintenanceunit:state.maintenanceunitReducer.maintenanceunits
})

const mapDispatchToProps = {
    updateMaintenancetransaction,
    registerMaintenancetransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
