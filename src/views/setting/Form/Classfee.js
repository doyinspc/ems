import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerClassfee, updateClassfee, deleteClassfee} from './../../../actions/setting/classfee';
import {getFees} from './../../../actions/setting/fee';
import {getClaszs} from './../../../actions/setting/clasz';
import { useHistory, useLocation } from 'react-router-dom'
import Select from 'react-select'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CCardFooter,
  CFormText,
  CTextarea,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {setElement} from './../../../actions/common'



const Classfee = (props) => {
  const [id, setId] = useState(null)
  const [claszid, setClaszid] = useState([])
  const [feeid, setFeeid] = useState(null)
  const [amount, setAmount] = useState(0)
  let sessionid = props.pid;
  let termid = props.qid;
  let groupid = 6;
  //GET CLASSFEES PER SCHOOL
  useEffect(() => {
    if(props.activeschool !== undefined && parseInt(props.activeschool.id) > 0){
        let params = {
        data:JSON.stringify(
        {
            'schoolid': props.activeschool.id,
            'is_active':0
        }),
        cat:'select',
        table:'fees',
        narration:'get fees'
        }
        props.getFees(params)

        let params1 = {
          data:JSON.stringify(
          {
              'schoolid': props.activeschool.id,
              'is_active':0
          }),
          cat:'select',
          table:'clasz',
          narration:'get clasz'
          }
          props.getClaszs(params1)

    }
  }, [props.activeschool])

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data !== undefined && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      let ar = {}
      ar['value'] = dt.claszid;
      ar['label'] =  dt.claszname;
      setFeeid(dt.feeid);
      setClaszid([ar]);
      setAmount(dt.amount);
    }else{
      setId(null);
      setFeeid('');
      setAmount('');
      setClaszid([]);
    }
    
  }, [props.data])
 
  const handleSubmit = () =>{
    if(Array.isArray(claszid) && claszid.length > 0){
    claszid.forEach(ele=>{
      if(parseInt(feeid) > 0)
      {
        let fd = new FormData();
        fd.append('feeid', feeid);
        fd.append('claszid', ele.value);
        fd.append('amount', amount);
        fd.append('table', 'classfees');

        if(id && parseInt(id) > 0)
        {
          //UPDATE 
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateClassfee(fd)
          
        }else if(termid && parseInt(termid) > 0)
        {
          fd.append('termid', termid);
          fd.append('cat', 'insert');
          props.registerClassfee(fd)
        }
      }
    })
  }
  }

  let claszarray = props.claszs.claszs && Array.isArray(props.claszs.claszs) ? props.claszs.claszs : [];
  let clarray = [];
  claszarray.forEach(rw =>{
    let ar = {}
      ar['label'] = rw.abbrv;
      ar['value'] = rw.id;
      clarray.push(ar)
  })
 
  let stafarray = props.fees && Array.isArray(props.fees) ? props.fees : [];
  let starray = stafarray.filter(rw=>rw !== null).map((rw, ind) =>{
      return <option key={ind} value={rw.id}>{rw.name}</option>
  })
  const handleClass = (event) =>{
    setClaszid(event)

  }
 
   return (
    <CCol xl={12} style={{width:'400px'}}  id="#formz">
        <CCard>
            <CCardHeader id='traffic' className="card-title mb-0">
              <CRow>
                <CCol sm="6">
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Classfee</small></h4>
                </CCol>
                <CCol sm="6" className="d-md-block">
                  <CButton  
                      color="danger" 
                      onClick={props.onClose}
                      className="float-right">
                    <i className='fa fa-remove'></i>
                  </CButton>
                </CCol>
              </CRow>
              
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
              <CFormGroup>
                  <CLabel htmlFor="nf-feeid">Fee </CLabel>
                  <CSelect
                      type="text" 
                      id="nf-feeid" 
                      name="feeid"
                      defaultValue={feeid}
                      onChange={(e)=>setFeeid(e.target.value)}
                       
                    >
                      {id && parseInt(id) > 0 ? <option value={props.data.feeid}>{props.data.feename}</option>:<option></option>}
                      {starray}
                  </CSelect>
                  <CFormText className="help-block">Select the feeid</CFormText>
                </CFormGroup>
             <CFormGroup>
                  <CLabel htmlFor="nf-claszid">Class </CLabel>
                  <Select
                      closeMenuOnSelect={false}
                      value={claszid}
                      isMulti
                      options={clarray}
                      onChange={handleClass}
                    />
                  
                  <CFormText className="help-block">Select the class or classes</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-amount">Amount </CLabel>
                  <CInput
                      type="text" 
                      id="nf-amount" 
                      name="amount"
                      value={amount}
                      onChange={(e)=>setAmount(e.target.value)}
                      placeholder="" 
                   />
                      
                  <CFormText className="help-block">Select amount</CFormText>
                </CFormGroup>
                </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" onClick={handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>{' '}
              <CButton type="reset" onClick={props.onReset} size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
      </CCol>
      )
}
const mapStateToProps = (state) =>({
  classfees : state.classfeeReducer,
  user:state.userReducer,
  activeschool:state.userReducer.activeschool,
  claszs : state.claszReducer,
  fees : state.feeReducer.fees,
})
export default connect(mapStateToProps, {
  registerClassfee,
  updateClassfee,
  deleteClassfee,
  getFees,
  getClaszs
})(Classfee)
