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
import {updateExpensetransaction, registerExpensetransaction} from './../../actions/setting/expensetransaction'
import { isDate } from 'date-fns';
import { API_PATH_SETTING, axiosConfig, callError, callSuccess, validateDate } from '../../actions/common';
import axios from 'axios';

let expensestate = [
    {
        id:1,
        name:'Store',
        description:'Send the items to the store',
        color:'green',
        source:'Supplier',
        cost:'Total Price'
    },
    {
        id:2,
        name:'Dispatch',
        description:'Consumables',
        color:'grey',
        source:'Location/Destination',
        cost:'Extimated Price'
    },
    {
        id:3,
        name:'Deploy',
        description:'move from store to a unit, department. ',
        color:'blue',
        source:'Location/Destination',
        cost:'Extimated Price'
    },
    {
        id:4,
        name:'Damaged',
        description:'Item can nolonger be used ',
        color:'red',
        source:'Damaged by/Reason',
        cost:'Estimated Price'
    }
]

const Form = (props) => {

    const [id, setid] = useState(null);
    const [expenseid, setexpenseid] = useState(0);
    const [expensename, setexpensename] = useState('');
    const [expenseunitid, setexpenseunitid] = useState(0);
    const [expenseunitid_error, setexpenseunitid_error] = useState(true);
    const [expenseunitname, setexpenseunitname] = useState('');
    const [quantity, setquantity] = useState(0);
    const [quantity_error, setquantity_error] = useState(true);
    const [states, setstates] = useState(0);
    const [states_error, setstates_error] = useState(true);
    const [source, setsource] = useState(null);
    const [source_error, setsource_error] = useState(true);
    const [price, setprice] = useState(null);
    const [price_error, setprice_error] = useState(true);
    const [price_fix, setprice_fix] = useState(0);
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
            console.log(data);
            setid(data.id);
            setexpenseid(data.cid);
            setexpensename(data.cname);
            setexpenseunitid(data.expenseid);
            setexpenseunitname(data.expensename);
            setquantity(data.quantity);
            setprice(data.price);
            setstates(data.states);
            setsource(data.source);
            setdescription(data.description);
            setdaterecorded(data.daterecorded);

        }else
        {
            setid(null);
            setexpenseid('');
            setexpensename('');
            setexpenseunitid(0);
            setexpenseunitname('');
            setquantity(0);
            setprice(0);
            setstates(0);
            setsource('');
            setdescription('');
            setdaterecorded('');
        }
        
    }, [props.data]);
    
    useEffect(() => {
        //get lass price
        //get amount left
        let params = {
            data:JSON.stringify(
            {
                'expenseid': expenseunitid,
                'schoolid': props.school.id
            }),
            cat:'formexpense',
            table:'expenseunits',
            narration:'expenseunit'
          }
       
        axios.get(path, {params}, axiosConfig)
        .then(res => {                                                                                                                                                                                                                                        
                console.log(res.data);
                let dt = res.data;
                let aval = Array.isArray(dt[0]) && dt[0].length > 0 ? dt[0] : [];

                
                let sup = Array.isArray(aval.filter(rw=>rw.states === "1")) && aval.filter(rw=>rw.states === "1").length > 0 ? parseFloat(aval.filter(rw=>rw.states === "1")[0].quantity) : 0;
                let con = Array.isArray(aval.filter(rw=>rw.states === "2")) && aval.filter(rw=>rw.states === "2").length > 0 ? parseFloat(aval.filter(rw=>rw.states === "2")[0].quantity) : 0
                let dep = Array.isArray(aval.filter(rw=>rw.states === "3")) && aval.filter(rw=>rw.states === "3").length > 0 ? parseFloat(aval.filter(rw=>rw.states === "3")[0].quantity) : 0
                let dam = Array.isArray(aval.filter(rw=>rw.states === "4")) && aval.filter(rw=>rw.states === "4").length > 0 ? parseFloat(aval.filter(rw=>rw.states === "4")[0].quantity) : 0

                let availables = sup - con - dep - dam;
                setavailable(availables)
                setquantity(0);
                let pricex = Array.isArray(dt[1]) && dt[1].length == 1 ? dt[1][0].price : 0;
                setprice_fix(pricex);
                if(states !== 1){
                    setprice(pricex);
                }else{
                    setprice(0);
                }
            })
            .catch(err => {
                callError(JSON.stringify(err));
            })

        
    }, [expenseunitid, props.school.id, states])
    const onsubmit = () =>{
        
        let err = [];
        if(parseInt(expenseunitid) > 0){setexpenseunitid_error(true)}
        else{ setexpenseunitid_error(false); err.push('Select an item');}

        if(quantity > 0){setquantity_error(true)}
        else{ setquantity_error(false); err.push('invalid quantity');}

        if(states > 0){setstates_error(true) }
        else{ setstates_error(false); err.push('invalid states');}

        if(source !== null && source.length > 0){setsource_error(true) }
        else{ setsource_error(false); err.push('invalid source');}

        if(validateDate(daterecorded)){setdaterecorded_error(true) }
        else{ setdaterecorded_error(false); err.push('invalid date');}
        
        let priced = 0;
        if(states == 1){priced = price/quantity;}
        else{priced = price_fix;}
        
        if(err.length == 0){
            let fd = new FormData();

            fd.append('expenseid', expenseunitid);
            fd.append('quantity', quantity);
            fd.append('price', priced);
            fd.append('states', states);
            fd.append('source', source);
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
            setquantity(0);
            setprice(0);
            setstates(0);
            setsource('');
            setdescription('');
            setdaterecorded('');
    }

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

   const setquantitys = (a) =>{
       if(states != 1 && available >= a ){
            setquantity(a);
       }else if(states == 1 ){
        setquantity(a);
      }else{
           setquantity(0);
       }
   }
    return (
        <div className='justify-content-center' style={{margin:'0px', }}>
            <CCol className='justify-content-center' style={{marginLeft:'auto', marginRight:'auto'}} xs="12" sm="6">
            <CCard className="bg-dark">
                <CCardHeader>
                <h4>Expense</h4>
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
                            {parseInt(id) > 0 ? <option value={expenseid}>{expensename}</option>:''}
                            <option >Please select</option>
                            {expensearr}
                            </CSelect>
                        </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="vat">Name  </CLabel></CCol>
                        <CCol xs="8">
                            <CSelect invalid = {expenseunitid_error ? false : true}  custom size="sm" name="selectSm1" id="SelectLm1" onChange={(e)=>setexpenseunitid(e.target.value)}>
                            {id && parseInt(id) > 0 ? <option value={expenseunitid}>{expenseunitname}</option>:''}
                            <option >Please select</option>
                            {expenseunitarr}
                            </CSelect>
                        <CInvalidFeedback>Select the expense</CInvalidFeedback>
                        </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="vat">Transfer </CLabel></CCol>
                        <CCol xs="8">
                            <CSelect invalid ={states_error ? false : true} custom size="sm" name="selectSm1" id="SelectLm1" onChange={(e)=>setstates(e.target.value)}>
                            {parseInt(id) > 0 ? <option value={states}>{expenseunitname}</option>:''}
                            <option >Please select</option>
                            {expensestatearr}
                            </CSelect>
                            <CInvalidFeedback>Select a status</CInvalidFeedback>
                        </CCol>
                    </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                <CCol xs="4"><CLabel htmlFor="quantity">Quantity {available}</CLabel></CCol>
                        <CCol xs="8">
                            <CInput 
                                id="quantity" 
                                invalid ={quantity_error ? false : true} 
                                defaultValue={quantity}
                                value={quantity}
                                type="number" 
                                size="sm" 
                                placeholder="Quantity" 
                                required
                                disabled={available <= 0 && states != 1 ? true : false }
                                onChange={(e)=>setquantitys(e.target.value)} />
                            <CInvalidFeedback>Input a quantity</CInvalidFeedback>
                        </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="price">Total Price</CLabel></CCol>
                        <CCol xs="8">
                            <CInput 
                                id="price" 
                                invalid ={price_error ? false : true} 
                                defaultValue={price}
                                value={price}
                                type="number" 
                                size="sm" 
                                placeholder="price" 
                                required={parseInt(states) == 1 ? true : false}
                                disabled={parseInt(states) == 1 ? false : true}
                                onChange={(e)=>setprice(e.target.value)} />
                            <CInvalidFeedback>Input a total price</CInvalidFeedback>
                        </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="source">Source</CLabel></CCol>
                        <CCol xs="8">
                            <CInput 
                                    id="source" 
                                    name="source"
                                    defaultValue={source} 
                                    invalid ={source_error ? false : true} 
                                    type="text" 
                                    size="sm" 
                                    placeholder="....text"
                                    onChange={(e)=>setsource(e.target.value)} />
                            <CInvalidFeedback>provide an input</CInvalidFeedback>
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
                        <CCol xs="4"><CLabel htmlFor="daterecorded">Any Description / Extra informaion</CLabel></CCol>
                        <CCol xs="8">
                            <CTextarea 
                            id="description" 
                            value={description}
                            onChange={(e)=>setdescription(e.target.value)}
                            placeholder="describe" 
                            ></CTextarea></CCol>
                </CFormGroup>   
                </CCardBody>
                <CCardFooter >
                    <CRow className="my-0">
                        <CCol xs="6"><CButton type="reset" size="sm" color="danger" block ><CIcon name="cil-ban"  /> Reset</CButton></CCol>
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
    expense:state.expenseReducer.expenses,
    expenseunit:state.expenseunitReducer.expenseunits
})

const mapDispatchToProps = {
    updateExpensetransaction,
    registerExpensetransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
