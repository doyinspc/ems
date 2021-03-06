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
import {updateExpensetransaction, registerExpensetransaction} from './../../actions/setting/expensetransaction';

  
import { API_PATH_SETTING, axiosConfig, callError, callSuccess, validateDate, expensestate } from '../../actions/common';



const Form = (props) => {

    const [id, setid] = useState(null);
    const [expenseid, setexpenseid] = useState(0);
    const [expensename, setexpensename] = useState('');
    const [expenseunitid, setexpenseunitid] = useState(0);
    const [expenseunitid_error, setexpenseunitid_error] = useState(true);
    const [expenseunitname, setexpenseunitname] = useState('');
    const [account, setaccount] = useState(0);
    const [accountname, setaccountname] = useState('');
    const [account_error, setaccount_error] = useState(true);
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
            setexpenseid(data.cid);
            setexpensename(data.cname);
            setexpenseunitid(data.expenseid);
            setexpenseunitname(data.expensename);
            setaccount(data.accountid);
            setaccountname(data.accountname);
            setamount(ac);
            setstates(data.states);
            setdescription(data.description);
            setdaterecorded(data.daterecorded);

        }else
        {
            setid(null);
            setexpenseid('');
            setexpensename('');
            setexpenseunitid(0);
            setexpenseunitname('');
            setaccount(0);
            setamount(0);
            setstates(0);
            setdescription('');
            setdaterecorded('');
        }      
    }, [props.data]);


    const onsubmit = () =>{
        
        let err = [];
        if(parseInt(expenseunitid) > 0){setexpenseunitid_error(true)}
        else{ setexpenseunitid_error(false); err.push('Select an item');}

        if(account > 0){setaccount_error(true)}
        else{ setaccount_error(false); err.push('invalid account');}

        if(amount){setamount_error(true)}
        else{ setamount_error(false); err.push('invalid amount');}

        if(states > 0){setstates_error(true) }
        else{ setstates_error(false); err.push('invalid states');}

        if(validateDate(daterecorded)){setdaterecorded_error(true) }
        else{ setdaterecorded_error(false); err.push('invalid date');}
        
        
        if(err.length == 0){
            let fd = new FormData();

            fd.append('expenseid', expenseunitid);
            fd.append('accountid', account);
            fd.append('amount', amount);
            fd.append('states', states);
            fd.append('description', description);
            fd.append('daterecorded', daterecorded);
            fd.append('staffid', props.user.id);
            fd.append('table', 'expensetransactions');

            if(id !== null && parseInt(id) > 0){
                fd.append('id', id);
                fd.append('cat', 'update');
                props.updateExpensetransaction(fd);
            }else{
                fd.append('cat', 'insert');
                fd.append('schoolid', props.school.id);
                props.registerExpensetransaction(fd);
            }
            reset();
            

        }else{
            callError(err[0]); 
        }
    }

    const reset = () =>{
            setid(null);
            setexpenseid('');
            setexpensename('');
            setexpenseunitid(0);
            setexpenseunitname('');
            setaccount(0);
            setamount(0);
            setstates(0);
            setdescription('');
            setdaterecorded('');
    }

    let account_arr = props.account ? props.account : null;
    let accountarr = account_arr !== null ? account_arr.filter(rw=>rw !== null).map(rw=>{
        return <option value={rw.id}>{rw.name}</option>;
    }):'';
    let expense_arr = props.expense ? props.expense : null;
    let expensearr = expense_arr !== null ? expense_arr.filter(rw=>rw !== null).map(rw=>{
        return <option value={rw.id}>{rw.name}</option>;
    }):'';
 
    let expenseunit_arr = props.expenseunit ? props.expenseunit : null;
    let expenseunitarr = expenseunit_arr !== null ? expenseunit_arr.filter(rw=>rw !== null && rw.expenseid == expenseid).map(rw=>{
        return <option value={rw.id}>{rw.name}</option>;
    }):'';

    let expensestate_arr = expensestate ;
    let expensestatearr = expensestate_arr !== null ? expensestate_arr.filter(rw=>rw !== null).map(rw=>{
        return <option value={rw.id}>{rw.name}</option>;
    }):'';

   
    return (
        <div className='justify-content-center' style={{margin:'0px', }}>
            <CCol className='justify-content-center' style={{marginLeft:'auto', marginRight:'auto'}} xs="12" sm="6">
            <CCard xs="12" className={parseInt(id) > 1 ? "bg-info" : "bg-dark"}>
                <CCardHeader>
                <h4>Expenses <small>{parseInt(id) > 1 ? "Edit Mode" : "Add new"}</small></h4>
                </CCardHeader>
                <CCardBody>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="expenseid">Category</CLabel></CCol>
                        <CCol xs="8">
                            <CSelect 
                            custom 
                            size="sm" 
                            name="expenseid" 
                            id="expenseid" 
                            onChange={(e)=>setexpenseid(e.target.value)}>
                            {parseInt(id) > 0 ? <option value={expenseid}>{expensename}</option>:<option >Please select</option>}
                            
                            {expensearr}
                            </CSelect>
                        </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="vat">Name  </CLabel></CCol>
                        <CCol xs="8">
                            <CSelect invalid = {expenseunitid_error ? false : true}  custom size="sm" name="selectSm1" id="SelectLm1" onChange={(e)=>setexpenseunitid(e.target.value)}>
                            {id && parseInt(id) > 0 ? <option value={expenseunitid}>{expenseunitname}</option>:<option >Please select</option>}
                            {expenseunitarr}
                            </CSelect>
                        <CInvalidFeedback>Select the expense</CInvalidFeedback>
                        </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="vat">Account </CLabel></CCol>
                        <CCol xs="8">
                            <CSelect invalid = {account_error ? false : true}  custom size="sm" name="selectSm1" id="SelectLm1" onChange={(e)=>setaccount(e.target.value)}>
                            {parseInt(id) > 0 ? <option value={account}>{accountname}</option>:<option >Please select</option>}
                            {accountarr}
                            </CSelect>
                        <CInvalidFeedback>Select an account</CInvalidFeedback>
                        </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="vat">Transaction </CLabel></CCol>
                        <CCol xs="8">
                            <CSelect 
                            invalid ={states_error ? false : true} 
                            custom 
                            size="sm" 
                            name="selectSm1" 
                            id="SelectLm1" onChange={(e)=>setstates(e.target.value)}>
                            {parseInt(id) > 0 ? <option value={states}>{parseInt(states) == 1 ? 'Debit': 'Credit'}</option>:<option >Please select</option>}
                            {expensestatearr}
                            </CSelect>
                            <CInvalidFeedback>Select a status</CInvalidFeedback>
                        </CCol>
                    </CFormGroup>             
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="daterecorded">Date</CLabel></CCol>
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
                        <CCol xs="4"><CLabel htmlFor="amount">Amount</CLabel></CCol>
                        <CCol xs="8">
                            <CInput 
                                id="amount" 
                                invalid ={amount_error ? false : true} 
                                defaultValue={amount}
                                value={amount}
                                type="number" 
                                size="sm" 
                                placeholder="amount" 
                                required
                                onChange={(e)=>setamount(e.target.value)} />
                            <CInvalidFeedback>Input a total amount</CInvalidFeedback>
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
    expense:state.expenseReducer.expenses,
    expenseunit:state.expenseunitReducer.expenseunits
})

const mapDispatchToProps = {
    updateExpensetransaction,
    registerExpensetransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
