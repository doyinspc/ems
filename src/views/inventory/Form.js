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
import {updateInventorytransaction, registerInventorytransaction} from './../../actions/setting/inventorytransaction'
import { isDate } from 'date-fns';
import { API_PATH_SETTING, axiosConfig, callError, callSuccess, validateDate } from '../../actions/common';
import axios from 'axios';

let inventorystate = [
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
    const [inventoryid, setinventoryid] = useState(0);
    const [inventoryname, setinventoryname] = useState('');
    const [inventoryunitid, setinventoryunitid] = useState(0);
    const [inventoryunitid_error, setinventoryunitid_error] = useState(true);
    const [inventoryunitname, setinventoryunitname] = useState('');
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
            setinventoryid(data.cid);
            setinventoryname(data.cname);
            setinventoryunitid(data.inventoryid);
            setinventoryunitname(data.inventoryname);
            setquantity(data.quantity);
            setprice(data.price);
            setstates(data.states);
            setsource(data.source);
            setdescription(data.description);
            setdaterecorded(data.daterecorded);

        }else
        {
            setid(null);
            setinventoryid('');
            setinventoryname('');
            setinventoryunitid(0);
            setinventoryunitname('');
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
                'inventoryid': inventoryunitid,
                'schoolid': props.school.id
            }),
            cat:'forminventory',
            table:'inventoryunits',
            narration:'inventoryunit'
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

        
    }, [inventoryunitid, props.school.id, states])
    const onsubmit = () =>{
        
        let err = [];
        if(parseInt(inventoryunitid) > 0){setinventoryunitid_error(true)}
        else{ setinventoryunitid_error(false); err.push('Select an item');}

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

            fd.append('inventoryid', inventoryunitid);
            fd.append('quantity', quantity);
            fd.append('price', priced);
            fd.append('states', states);
            fd.append('source', source);
            fd.append('description', description);
            fd.append('daterecorded', daterecorded);
            fd.append('staffid', props.user.id);
            fd.append('table', 'inventorytransactions');

            if(id !== null && parseInt(id) > 0){
                fd.append('id', id);
                fd.append('cat', 'update');
                props.updateInventorytransaction(fd);
            }else{
                fd.append('cat', 'insert');
                fd.append('schoolid', props.school.id);
                props.registerInventorytransaction(fd);
            }
            reset();
            

        }else{
            callError(err[0]); 
        }
    }

    const reset = () =>{
        setid(null);
            setinventoryid('');
            setinventoryname('');
            setinventoryunitid(0);
            setinventoryunitname('');
            setquantity(0);
            setprice(0);
            setstates(0);
            setsource('');
            setdescription('');
            setdaterecorded('');
    }

    let inventory_arr = props.inventory ? props.inventory : null;
    let inventoryarr = inventory_arr !== null ? inventory_arr.filter(rw=>rw !== null).map(rw=>{
        return <option value={rw.id}>{rw.name}</option>;
    }):'';
 
    let inventoryunit_arr = props.inventoryunit ? props.inventoryunit : null;
    let inventoryunitarr = inventoryunit_arr !== null ? inventoryunit_arr.filter(rw=>rw !== null && rw.inventoryid == inventoryid).map(rw=>{
        return <option value={rw.id}>{rw.name}</option>;
    }):'';

    let inventorystate_arr = inventorystate ;
    let inventorystatearr = inventorystate_arr !== null ? inventorystate_arr.filter(rw=>rw !== null).map(rw=>{
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
                <h4>Inventory</h4>
                </CCardHeader>
                <CCardBody>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="inventoryid">Category</CLabel></CCol>
                        <CCol xs="8">
                            <CSelect 
                            custom 
                            size="sm" 
                            name="inventoryid" 
                            id="inventoryid" 
                            onChange={(e)=>setinventoryid(e.target.value)}>
                            {parseInt(id) > 0 ? <option value={inventoryid}>{inventoryname}</option>:''}
                            <option >Please select</option>
                            {inventoryarr}
                            </CSelect>
                        </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="vat">Name  </CLabel></CCol>
                        <CCol xs="8">
                            <CSelect invalid = {inventoryunitid_error ? false : true}  custom size="sm" name="selectSm1" id="SelectLm1" onChange={(e)=>setinventoryunitid(e.target.value)}>
                            {id && parseInt(id) > 0 ? <option value={inventoryunitid}>{inventoryunitname}</option>:''}
                            <option >Please select</option>
                            {inventoryunitarr}
                            </CSelect>
                        <CInvalidFeedback>Select the inventory</CInvalidFeedback>
                        </CCol>
                </CFormGroup>
                <CFormGroup row className="my-0 mb-1">
                        <CCol xs="4"><CLabel htmlFor="vat">Transfer </CLabel></CCol>
                        <CCol xs="8">
                            <CSelect invalid ={states_error ? false : true} custom size="sm" name="selectSm1" id="SelectLm1" onChange={(e)=>setstates(e.target.value)}>
                            {parseInt(id) > 0 ? <option value={states}>{inventoryunitname}</option>:''}
                            <option >Please select</option>
                            {inventorystatearr}
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
    inventory:state.inventoryReducer.inventorys,
    inventoryunit:state.inventoryunitReducer.inventoryunits
})

const mapDispatchToProps = {
    updateInventorytransaction,
    registerInventorytransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
