import React from 'react'
import { connect } from 'react-redux'

const FeeDetails = (props) => {
    let tabl = props.tabl
    return (
        <table className="table table-hover table-dark table-outline mb-0  d-sm-table">
        <thead className="thead-light" >
          <tr>
            <th className="text-center" title="Transaction ID">TID</th>
            <th><i className='fa fa-list'></i>TERM</th>
            <th><i className='fa fa-list'></i> CLASS</th>
            <th><i className='fa fa-list'></i> Date Paid</th>
            <th><i className='fa fa-list'></i> Teller</th>
            <th><i className='fa fa-list'></i> Students</th>
            <th className="text-center"> <i className='fa fa-text'></i>Account</th>
            <th className="text-center"> <i className='fa fa-text'></i>Payment</th>
            <th className="text-center"> <i className='fa fa-text'></i>Recorded By</th>
            { props.editer === true  || (props.submenu !== undefined && props.submenu.length > 0) ? <th className="text-center"><i className='fa fa-gear'></i> Action</th>:''}
          </tr>
        </thead>
        <tbody>
          {tabl}
         </tbody>
      </table>

    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(FeeDetails)
