import React from 'react'
import { connect } from 'react-redux'
import PageHeader  from '../staff/PageHeader'
import { CContainer, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const AdmissionPage = (props) => {

    return (
        <div className="m-20 p-30 container-fluid" id="maincont" style={{backgroundColor:'grey'}} >
        <div 
            className="m-200" 
            style={{marginLeft:'auto', marginRight:'auto', marginTop:'9px',  marginBottom:'5px', backgroundColor:'grey'}}
          >
            <CContainer 
                style={{  minHeight:'900px', maxWidth:'720px', backgroundColor:'white'}}
            >
                <PageHeader />   
                                        
                <CRow xs={12} >
                    fffffff
                </CRow>
            </CContainer>
        </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AdmissionPage)
