import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerTerm, updateTerm, deleteTerm} from './../../../actions/setting/term';
import { useHistory, useLocation } from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Term = (props) => {
    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const [collapse, setCollapse] = useState(false)
    const [id, setId] = useState('')
    const [dts, setDts] = useState('')
    const [namez, setNamez] = useState('')
    const [starts, setStarts] = useState()
    const [ends, setEnds] = useState()
  
    const toggle = (e) => {
      setCollapse(!collapse)
      e.preventDefault()
    }
  //GET TERMS PER SCHOOL
   
  
    //CHANGE STATE AS EDIT OR ADD
    useEffect(() => {
      if(props.data.id && parseInt(props.data.id) > 0)
      {
        let dt = props.data
        setId(dt.id);
        setNamez(dt.name);
        setStarts(dt.started);
        setEnds(dt.ended);
      }else{
        setNamez('');
        setStarts('');
        setEnds('');
      }
      
    }, [props.data])
  
    
    const onReset = () =>setId(null);
    const onClose = () =>setCollapse(false);
  
    const handleSubmit = () =>{
      if(namez.length > 0){
        let fd = new FormData();
        fd.append('name', namez);
        fd.append('started', starts);
        fd.append('ended', ends);
        fd.append('table', 'terms');
        
  
        if(id && parseInt(id) > 0)
        {
          //UPDATE 
          fd.append('id', id);
          fd.append('cat', 'update');
          props.updateTerm(fd)
          
        }else
        {
          //INSERT
          fd.append('sessionid', props.pid);
          fd.append('cat', 'insert');
          props.registerTerm(fd)
        }
        onReset()
      }
    }
 
   return (
    <CCol xl={12}  id="#formz">
    <CCard>
        <CCardHeader id='traffic' className="card-title mb-0">
          <CRow>
            <CCol sm="6">
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> Term</small></h4>
            </CCol>
            <CCol sm="6" className="d-md-block">
              <CButton  
                  color="danger" 
                  onClick={onClose}
                  className="float-right">
                <i className='fa fa-remove'></i>
              </CButton>
            </CCol>
          </CRow>
          
        </CCardHeader>
        <CCardBody>
          <CForm action="" method="post">
            <CFormGroup>
              <CLabel htmlFor="nf-name">Term</CLabel>
              <CInput 
                  type="text" 
                  id="nf-name" 
                  name="name"
                  defaultValue={namez}
                  onChange={(e)=>setNamez(e.target.value)}
                  placeholder="First term" 
                />
              <CFormText className="help-block">Please enter term</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-starts">Term Starts </CLabel>
              <CInput 
                  type="date" 
                  id="nf-starts" 
                  name="starts"
                  defaultValue={starts}
                  onChange={(e)=>setStarts(e.target.value)}
                  placeholder="date" 
                />
              <CFormText className="help-block">Please enter date term starts</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-ends">Term ends </CLabel>
              <CInput 
                  type="date" 
                  id="nf-ends" 
                  name="ends"
                  defaultValue={ends}
                  onChange={(e)=>setEnds(e.target.value)}
                  placeholder="date" 
                />
              <CFormText className="help-block">Please enter date term ends</CFormText>
            </CFormGroup>
          </CForm>
        </CCardBody>
        
        <CCardFooter>
          <CButton type="submit" onClick={handleSubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>{' '}
          <CButton type="reset" onClick={onReset} size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
        </CCardFooter>
      </CCard>
  </CCol>
 )
}
const mapStateToProps = (state) =>({
  terms : state.termReducer
})
export default connect(mapStateToProps, {
  registerTerm,
  updateTerm,
  deleteTerm
})(Term)
