import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerCa, updateCa, deleteCa} from './../../../actions/setting/ca';
import {
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { valdateNumber, valdateDate, valdateString } from '../../../actions/common';


const Ca = (props) => {

  const [id, setId] = useState(null)
  const [namez, setNamez] = useState('')
  const [abbrv, setAbbrv] = useState('')
  const [maxscore, setMaxscore] = useState()
  const [starts, setStarts] = useState()
  const [ends, setEnds] = useState()
  const [validate, setvalidate] = useState({})

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data.id && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      setNamez(dt.name);
      setAbbrv(dt.abbrv);
      setMaxscore(dt.maxscore);
      setStarts(dt.started);
      setEnds(dt.ended);
    }else{
      setId(null);
      setNamez('');
      setAbbrv('');
      setMaxscore(0);
      setStarts('');
      setEnds('');
    }
    
  }, [props.data])

  const handleSubmit = () =>{
    let arr = []
      let val = {...validate}
      if(valdateString(namez) === false){arr.push(1); val.namez = true}else{val.namez = false}
      if(valdateString(abbrv) === false){arr.push(1); val.abbrv = true}else{val.abbrv = false}
      if(valdateNumber(maxscore) === false){arr.push(1); val.maxscore = true}else{val.maxscore = false}
      if(valdateDate(starts) === false || (new Date(ends).getTime() < new Date(starts).getTime())){arr.push(1); val.starts = true}else{val.starts = false}
      if(valdateDate(ends) === false || (new Date(ends).getTime() < new Date(starts).getTime())){arr.push(1); val.ends = true}else{val.ends = false}
      setvalidate(val)
      if(arr.length == 0)
      {
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('abbrv', abbrv);
      fd.append('maxscore', maxscore);
      fd.append('started', starts);
      fd.append('ended', ends);
      fd.append('table', 'cas');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateCa(fd)
        
      }else
      {
        //INSERT
        fd.append('typeid', props.did);
        fd.append('termid', props.qid);
        fd.append('cat', 'insert');
        props.registerCa(fd)
      }
      setId(null);
      setNamez('');
      setAbbrv('');
    }
  }
 
   return (
    <CCol xl={12}  style={{maxWidth:'400px'}} id="#formz">
        <CCard>
            <CCardHeader id='traffic' className="card-title mb-0">
              <CRow>
                <CCol sm="6">
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> CA</small></h4>
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
                  <CLabel htmlFor="nf-namez">Name </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-namez" 
                      name="namez"
                      defaultValue={namez}
                      value={namez}
                      invalid={validate.namez || false}
                      onChange={(e)=>setNamez(e.target.value)}
                      placeholder="First Continious Assessment" 
                    />
                  <CFormText className="help-block">set assessment name</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-abbrv">Abbreviation </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-abbrv" 
                      name="abbrv"
                      value={abbrv}
                      defaultValue={abbrv}
                      invalid={validate.abbrv || false}
                      onChange={(e)=>setAbbrv(e.target.value)}
                      placeholder="CA1" 
                    />
                  <CFormText className="help-block">abbreviate name</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-maxscore">Maximum Score </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-maxscore" 
                      name="maxscore"
                      value={maxscore}
                      defaultValue={maxscore}
                      invalid={validate.maxscore || false}
                      onChange={(e)=>setMaxscore(e.target.value)}
                      placeholder="20" 
                    />
                  <CFormText className="help-block">set the maximum score students can attain on this assessment</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-starts">Commence Entry </CLabel>
                  <CInput 
                      type="date" 
                      id="nf-starts" 
                      name="starts"
                      value={starts}
                      defaultValue={starts}
                      invalid={validate.starts || false}
                      onChange={(e)=>setStarts(e.target.value)}
                    />
                  <CFormText className="help-block">Please select when to start compiling result</CFormText>
            </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-ends">Close Entry </CLabel>
                  <CInput 
                      type="date" 
                      id="nf-ends" 
                      name="ends"
                      value={ends}
                      defaultValue={ends}
                      invalid={validate.ends || false}
                      onChange={(e)=>setEnds(e.target.value)}
                      placeholder="date" 
                    />
                  <CFormText className="help-block">Please select when to stop entering result</CFormText>
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
  cas : state.caReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  registerCa,
  updateCa,
  deleteCa
})(Ca)
