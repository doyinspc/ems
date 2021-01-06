import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {registerGradeunit, updateGradeunit, deleteGradeunit} from './../../../actions/setting/gradeunit';
import { useHistory, useLogradeunittion } from 'react-router-dom'
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


const Gradeunit = (props) => {
  const [id, setId] = useState(null)
  const [namez, setNamez] = useState('')
  const [abbrv, setAbbrv] = useState('')
  const [maxscore, setMaxscore] = useState(0)
  const [minscore, setMinscore] = useState(0)
  const [color, setColor] = useState()
  const [comment, setComment] = useState()

  //CHANGE STATE AS EDIT OR ADD
  useEffect(() => {
    if(props.data.id && parseInt(props.data.id) > 0)
    {
      let dt = props.data;
      setId(dt.id);
      setNamez(dt.name);
      setAbbrv(dt.abbrv);
      setMaxscore(dt.maxscore);
      setMinscore(dt.minscore);
      setColor(dt.color);
      setComment(dt.comment);
    }else{
      setId(null);
      setNamez('');
      setAbbrv('');
      setMaxscore(0);
      setMinscore(0);
      setColor('');
      setComment('');
    }
    
  }, [props.data])

  const handleSubmit = () =>{
    if(namez.length > 0){
      let fd = new FormData();
      fd.append('name', namez);
      fd.append('abbrv', abbrv);
      fd.append('maxscore', maxscore);
      fd.append('minscore', minscore);
      fd.append('comment', comment);
      fd.append('color', color);
      fd.append('table', 'gradeunits');
      
      if(id && parseInt(id) > 0)
      {
        //UPDATE 
        fd.append('id', id);
        fd.append('cat', 'update');
        props.updateGradeunit(fd)
        
      }else
      {
        //INSERT
        fd.append('gradeid', props.pid);
        fd.append('cat', 'insert');
        props.registerGradeunit(fd)
      }
      setId(null);
      setNamez('');
      setAbbrv('');
    }
  }
 
   return (
    <CCol xl={12}  id="#formz">
        <CCard>
            <CCardHeader id='traffic' className="gradeunitrd-title mb-0">
              <CRow>
                <CCol sm="6">
                <h4>{ id && parseInt(id) > 0 ? 'Edit' : 'Add'} <small> GRADE UNIT</small></h4>
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
                      onChange={(e)=>setNamez(e.target.value)}
                      placeholder="Excellent" 
                    />
                  <CFormText className="help-block">set assessment name</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-abbrv">Abbreviation </CLabel>
                  <CInput 
                      type="text" 
                      id="nf-abbrv" 
                      name="abbrv"
                      defaultValue={abbrv}
                      onChange={(e)=>setAbbrv(e.target.value)}
                      placeholder="A1" 
                    />
                  <CFormText className="help-block">ALIAS</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-maxscore">Maximum Score </CLabel>
                  <CInput 
                      type="number" 
                      id="nf-maxscore" 
                      name="maxscore"
                      defaultValue={maxscore}
                      onChange={(e)=>setMaxscore(e.target.value)}
                      placeholder="100" 
                    />
                  <CFormText className="help-block">set the maximum score students gradeunitn attain on this assessment</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-minscore">Minimum Score </CLabel>
                  <CInput 
                      type="number" 
                      id="nf-minscore" 
                      name="minscore"
                      defaultValue={minscore}
                      onChange={(e)=>setMinscore(e.target.value)}
                      placeholder="75" 
                    />
                  <CFormText className="help-block">set the maximum score students gradeunitn attain on this assessment</CFormText>
                </CFormGroup>
                <CFormGroup>
              <CLabel htmlFor="nf-color">Grade Color </CLabel>
              <CInput 
                  type="color" 
                  id="nf-color" 
                  name="color"
                  defaultValue={color}
                  onChange={(e)=>setColor(e.target.value)}
                  placeholder="date" 
                />
              <CFormText className="help-block">Select a color to display the grades</CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="nf-comment">Comment</CLabel>
              <CTextarea 
                  id="nf-comment" 
                  name="comment"
                  defaultValue={comment}
                  onChange={(e)=>setComment(e.target.value)}
                  placeholder="Keep it up, you doing well.." 
                ></CTextarea>
              <CFormText className="help-block">Add a comment to be displayed for students with cumulative avaerage that meet the above range of scores</CFormText>
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
  gradeunits : state.gradeunitReducer,
  user:state.userReducer
})
export default connect(mapStateToProps, {
  registerGradeunit,
  updateGradeunit,
  deleteGradeunit
})(Gradeunit)
