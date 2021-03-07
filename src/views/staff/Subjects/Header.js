import React, { useEffect }  from 'react'
import SearchDashboard3 from '../SearchDashboard3'
import { 
    CCol, 
    CContainer, 
    CRow,
    CButtonGroup,
    CDropdown ,
    CDropdownItem,
    CDropdownMenu,
    CWidgetDropdown,
    CDropdownToggle,
    CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Header = (props) => {
 let {subject, len, studentdata} = props || '';
 let cas = props.cas;

 let ca_array = {};
 let ca1_array = {};
 let ca2_array = {};
 let caunit_array = {};
 cas.forEach(ele => {
   if(parseInt(ele.typeid) === 1){
     if(Object.keys(ca_array).includes(ele.sid))
     {
        //ca_array[ele.sid] = ele.cname;
     }else{
        ca_array[ele.sid] = ele.caname;
     }
   }else if(parseInt(ele.typeid) === 2){
    if(Object.keys(ca_array).includes(ele.sid))
    {
       //ca_array[ele.sid] = ele.cname;
    }else{
       ca1_array[ele.sid] = ele.caname;
    }
   }
   else if(parseInt(ele.typeid) === 3){
    if(Object.keys(ca_array).includes(ele.sid))
    {
       //ca_array[ele.sid] = ele.cname;
    }else{
       ca2_array[ele.sid] = ele.caname;
    }
   }

   if(Object.keys(caunit_array).includes(ele.sid))
     {
         let arr = {}
         arr['id'] = ele.id;
         arr['typeid'] = ele.typeid;
         arr['name'] = ele.name;
         arr['score'] = ele.maxscore;
         caunit_array[ele.sid].push(arr);
     }else
     {
        caunit_array[ele.sid] = [];
        let arr = {}
        arr['id'] = ele.id;
        arr['typeid'] = ele.typeid;
        arr['name'] = ele.name;
        arr['score'] = ele.maxscore;
        caunit_array[ele.sid].push(arr);
     }
 });

 
 
 return(
    <CContainer>
        <CRow>
        <CCol>
            <h4>{subject.itemname1}{" "}{subject.itemname} ({`${len} Students`})</h4>
            </CCol>
            <CCol xs={12} sm={4} className="d-md-block btn-group">
            <CButtonGroup className='pull-right'>
              <button  
                onClick={()=>props.goBack()}
                className="btn btn-info"><i className='fa fa-backward'></i>
              </button>
              <CButton
                color='dark'
                size="sm"
                onClick={()=>props.getAllStudents()}
                >
                    Get All
                </CButton>
            </CButtonGroup>
              <CButtonGroup className='pull-right'>
              
              <CDropdown color="secondary" >
              <CDropdownToggle caret color="secondary">
                  <i className='fa fa-list'></i> <span className='hidden-phone'> CAS</span>
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  {
                      Object.keys(ca_array).map((prp, ind)=>{
                        return <><CDropdownItem
                          header
                          tag="div"
                          color="light"
                          className="text-center"
                          >
                          <strong key={ind}>{ca_array[prp]}</strong>
                        </CDropdownItem>
                        { Object.keys(caunit_array[prp]).map((prps, inds)=>{
                        return <CDropdownItem key={inds}  onClick={(prev)=>props.setShowca(caunit_array[prp][prps].id, caunit_array[prp][prps].name, caunit_array[prp][prps].score)}>
                                <CIcon 
                                    name="cil-book" 
                                    className="mfe-2" 
                                /> 
                                {`${caunit_array[prp][prps].name} (${caunit_array[prp][prps].score})`}
                            </CDropdownItem>
                        })}
                        </>
                      })
                  }
                </CDropdownMenu>     
              </CDropdown>
              <CDropdown color="secondary" >
              <CDropdownToggle caret color="secondary">
                  <i className='fa fa-list'></i> <span className='hidden-phone'> Behavior</span>
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  {
                      Object.keys(ca1_array).map((prp, ind)=>{
                        return <><CDropdownItem
                          header
                          tag="div"
                          color="light"
                          className="text-center"
                          >
                          <strong key={ind}>{ca1_array[prp]}</strong>
                        </CDropdownItem>
                        { Object.keys(caunit_array[prp]).map((prps, inds)=>{
                        return <CDropdownItem key={inds}  onClick={(prev)=>props.setShowbh(caunit_array[prp][prps].id, caunit_array[prp][prps].name, caunit_array[prp][prps].score)}>
                                <CIcon 
                                    name="cil-book" 
                                    className="mfe-2" 
                                /> 
                                {`${caunit_array[prp][prps].name} `}
                            </CDropdownItem>
                        })}
                        </>
                      })
                  }
                </CDropdownMenu>     
              </CDropdown>
              <CDropdown color="secondary" >
              <CDropdownToggle caret color="secondary">
                  <i className='fa fa-list'></i> <span className='hidden-phone'> Skills</span>
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  {
                      Object.keys(ca2_array).map((prp, ind)=>{
                        return <><CDropdownItem
                          header
                          tag="div"
                          color="light"
                          className="text-center"
                          >
                          <strong key={ind}>{ca2_array[prp]}</strong>
                        </CDropdownItem>
                        { Object.keys(caunit_array[prp]).map((prps, inds)=>{
                        return <CDropdownItem key={inds}  onClick={(prev)=>props.setShowsk(caunit_array[prp][prps].id, caunit_array[prp][prps].name, caunit_array[prp][prps].score)}>
                                <CIcon 
                                    name="cil-book" 
                                    className="mfe-2" 
                                /> 
                                {`${caunit_array[prp][prps].name} `}
                            </CDropdownItem>
                        })}
                        </>
                      })
                  }
                </CDropdownMenu>     
              </CDropdown>
                
                </CButtonGroup>  
            </CCol>
        </CRow>
        <CRow>
        <CCol sm={6}>
            <SearchDashboard3 
                studentx={props.placeStudent}  
            />
            </CCol>
            <CCol sm={6}>
            { studentdata && Object.keys(studentdata).length > 0 ?
            <>
            <CRow>
            <img
            src={process.env.REACT_APP_SERVER_URL + studentdata.photo} 
            style={{height:'30px', width:'30px'}}
            height="30px"
            alt="profile-image" 
            class="profile"
            onError={(e)=>{e.target.onerror=null; e.target.src=process.env.PUBLIC_URL + '/icons/profile_1.png'} }
            />
            <CCol>
            <strong>{studentdata.name}</strong><br/>
            <small>{studentdata.admission_no}</small>
            </CCol>
            <CCol xs={3}>
            <button className='btn btn-sm btn-success' onClick={props.loadStudent}><i className="fa fa-plus"></i></button>
            <button className='btn btn-sm btn-danger' onClick={()=>props.setStudentdata({})}><i className="fa fa-trash"></i></button></CCol>
            </CRow>
            </>
            :""}
            </CCol>
        </CRow>
        </CContainer>
        )

}

export default Header