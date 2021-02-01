import React, { useEffect }  from 'react'
import { useHistory} from 'react-router-dom'
import { getThemesummary} from './../../../actions/setting/theme'
import CIcon from '@coreui/icons-react'
import SearchDashboard3 from '../SearchDashboard3'
import { connect } from 'react-redux'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import Swal from'sweetalert'



const Studentclasss = (props) => {
  let dt = props.themes && Array.isArray(props.themes) ? props.themes.filter(rw =>rw !== null || rw !== undefined) : []
 
  let subjectid = props.subject;
 

 
  useEffect(() => {
    let params = {
        data:JSON.stringify(
        {
            'id':0
        }),
        cat:'selectess',
        table:'themesummary',
        narration:'get all scheme of work'
      }
      props.getThemesummary(params)
    
  }, [])

 let data = {};
 dt.forEach(element => {
    if(element.subjectid in data)
    {
        if(element.termid in data[element.subjectid])
        {
            if(element.claszid in data[element.subjectid][element.termid])
            {

            }else
            {
                data[element.subjectid][element.termid][element.claszid] = element.num
            }

        }else
        {
            data[element.subjectid][element.termid] = {} 
            data[element.subjectid][element.termid][element.claszid] = element.num
        }

    }else
    {
        data[element.subjectid] = {}
        data[element.subjectid][element.termid] = {} 
        data[element.subjectid][element.termid][element.claszid] = element.num
    }
}); 
 let subjectz = {};
 let claszs = {};
 dt.forEach(ele=>{
    subjectz[ele.subjectid] = ele.subjectname;
    claszs[ele.claszid] = ele.claszabbrv;
 })

 const subjects = Object.entries(subjectz)
    .sort(([,a],[,b]) => a-b)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
    
let terms = { 1:'Ist', 2:'2nd', 3:'3rd'};


let th1 = Object.keys(claszs).filter(rw=>claszs[rw] !== null).map((p, i)=>{
    return <td colSpan={3} style={{padding:'2px'}}>{claszs[p]}</td>
    })

let th2 = Object.keys(claszs).filter(rw=>claszs[rw] !== null).map((p, i)=>{
            return Object.keys(terms).map((p1, i1)=>{
                return <td key={`${i}-${i1}`} style={{padding:'2px'}}>{terms[p1]}</td>
            })
          })

let tbs = Object.keys(subjects).map((p, i)=>{    
    return  <tr style={{padding:'2px'}}>
                <td key={i}  className='text-left'  style={{padding:'2px'}}>{subjects[p]}</td>
                { Object.keys(claszs).filter(rw=>claszs[rw] !== null).map((p1, i1)=>{
                  return   Object.keys(terms).map((p2, i2)=>{
                        return   p in data && p2 in data[p] && p1 in data[p][p2] ?
                        <td key={i2} style={{padding:'2px'}}>{data[p][p2][p1]}</td>:<td style={{padding:'2px'}}>{'-.-'}</td>
                    })
                  })
                }
            </tr>
})
 
  return (
   <>
   <CCard>
     <CCardHeader>
       <CContainer>
         <CRow>
           <CCol>
              <h4>SCHEME OF WORK: SUMMARY</h4>
            </CCol>
         </CRow>
      </CContainer>
   </CCardHeader>
   <CCardBody className='table-responsive'>
   <table className="table  table-bordered table-dark mb-0 d-sm-table" >
        <thead className="thead-light text-center">
            <tr style={{padding:'2px'}}>
                <td style={{padding:'2px'}}></td>
                {th1}
            </tr>
            <tr style={{padding:'2px'}}>
            <td style={{padding:'2px'}}></td>
                {th2}
            </tr>
        </thead>
        <tbody className='text-center'>
            {tbs}
        </tbody>
  </table>
  </CCardBody>
  </CCard>
   </>
  )
}
const mapStatetoProps = (state)=>({
 themes:state.themeReducer.themesummary
})
export default connect(mapStatetoProps, {
    getThemesummary
}) (Studentclasss)
  
