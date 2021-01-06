import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerNotice, updateNotice, deleteNotice} from './../../../actions/setting/notice';
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
  CTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Notice = (props) => {
  const [id, setId] = useState(null)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [source, setSource] = useState('')
  const [links, setLinks] = useState('')

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data.id && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      setTitle(dt.title);
      setMessage(dt.message);
      setSource(dt.source);
      setLinks(dt.links);
    }else{
      setId(null);
      setTitle('');
      setMessage('');
      setSource('');
      setLinks('');
    }
    
  }, [props.data])

  const handleSubmit = () =>{
    if(title.length > 0){
      let fd = new FormData();

      fd.append('title', title);
      fd.append('message', message);
      fd.append('source', source);
      fd.append('links', links);
      fd.append('table', 'notices');
      fd.append('staffid', props.user.mid);
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateNotice(fd)
        
      }else
      {
        //INSERT
        fd.append('schoolid', props.user.activeschool.id);
        fd.append('cat', 'insert');
        props.registerNotice(fd)
      }
      setId(null);
      setTitle('');
      setMessage('');
    }
  }
 
   return (
    <CCol xl={12}  id="#formz">
    <CCard>
        <CCardHeader id='traffic' className="card-title mb-0">
          <CRow>
            <CCol sm="6">
            <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small><br/> Notifications</small></h4>
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
              <CLabel htmlFor="nf-title">Title</CLabel>
              <CInput 
                  type="text" 
                  id="nf-title" 
                  name="title"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  placeholder="Resumption Date Third Term 2020" 
                />
              <CFormText className="help-block">State title, Be specific</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-message">Message </CLabel>
              <CTextarea  
                  id="nf-message" 
                  name="message"
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                  placeholder="All staff should do note that ..." 
                ></CTextarea>
              <CFormText className="help-block">Please type in or paste message</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-source">Source</CLabel>
              <CInput 
                  type="text" 
                  id="nf-source" 
                  name="source"
                  value={source}
                  onChange={(e)=>setSource(e.target.value)}
                  placeholder="College Principal's Office" 
                />
              <CFormText className="help-block">State title, Be specific</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-links">Downloads </CLabel>
              <CInput  
                  id="nf-links" 
                  type='file'
                  name="links"
                  value={links}
                  onChange={(e)=>setLinks(e.target.value)}
                  placeholder="Select Document" 
                />
              <CFormText className="help-block">Attache a downloadable file, if available</CFormText>
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
  notices : state.noticeReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  registerNotice,
  updateNotice,
  deleteNotice
})(Notice)
