import React from 'react'
import { connect } from 'react-redux'

const FeeStudent = (props) => {
    let tabl = props.tabl
    return (
        <table className="table table-hover table-dark table-outline mb-0  d-sm-table">
                <thead className="thead-light" >
                  <tr>
                    <th className="text-center" title="Transaction ID">TID</th>
                    <th><i className='fa fa-list'></i> Students</th>
                    <th><i className='fa fa-list'></i> Class</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Fee</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Payment</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Credit</th>
                    <th className="text-center"> <i className='fa fa-text'></i>Debt</th>
                      </tr>
                </thead>
                <tbody>
                  {tabl}
                 </tbody>
                 <tfoot className="tfoot-light" >
                    <tr>
                      <th className="text-center" title="Transaction ID">TID</th>
                      <th><i className='fa fa-list'></i> Students</th>
                      <th><i className='fa fa-list'></i> Class</th>
                      <th className="text-center"> <i className='fa fa-text'></i>{props.summer(props.duc1)}</th>
                      <th className="text-center"> <i className='fa fa-text'></i>{props.summer(props.duc2)}</th>
                      <th className="text-center"> <i className='fa fa-text'></i>{props.summer(props.duc3)}</th>
                      <th className="text-center"> <i className='fa fa-text'></i>{props.summer(props.duc4)}</th>
                    </tr>
                </tfoot>
              </table>

    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(FeeStudent)
