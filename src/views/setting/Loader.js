import { CCard, CCardHeader } from '@coreui/react'
import React from 'react'

export default function Loader() {
    return (
        <CCard>
            <CCardHeader className="text-center">
                <h3>Loading... <i className="fa fa-spinner fa-pulse"></i></h3>
            </CCardHeader>
        </CCard>
    )
}
