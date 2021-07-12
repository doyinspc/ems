import React from 'react'
import { connect } from 'react-redux'
import { numberformat } from '../../../actions/common'

const Fee = (props) => {

    let students = props.dt_student
    let fee = props.fee
    let paid = props.paid

    return (
        <div>
        <table width="100%" border="solid #ccc 2px" style={{fontFamily: 'Source Sans Pro'}}>
            <thead className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
                <tr>
                    <td className='text-center' style={{width:'20px'}}>SN</td>
                    <td className='text-center' style={{width:'300px'}}>Student Names</td>
                    <td className='text-center' style={{width:'15px'}} width="15px">FEE</td>
                    <td className='text-center' style={{width:'15px'}} width="15px">PAID</td>
                    <td className='text-center' style={{width:'15px'}} width="15px">BALANCE</td>
                </tr>
            </thead>
            <tbody style={{fontSize:props.fontz, fontWeight:'bold'}}>
                {
                    Object.keys(students).map((ele, ind)=>{
                        return <tr>
                            <td className="text-center">{ind + 1}</td>
                            <td style={{textTransform:'capitalize'}}>{students[ele][0]}</td>
                            <td className="text-center">{numberformat(fee[ele])}</td>
                            <td className="text-center">{numberformat(paid[ele])}</td>
                            <td className="text-center">{parseFloat(fee[ele]) - parseFloat(paid[ele])}</td>
                        </tr>
                    })
                }

            </tbody>
        </table> 
    </div>

    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Fee)
