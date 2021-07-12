import React from 'react'
import { connect } from 'react-redux'
import { ordinal_suffix_of } from '../../../actions/common'

const Rank = (props) => {
    let ranks = props.rankstudents
    let students = props.dt_student
    return (
        <div>
            <table width="100%" border="solid #ccc 2px" style={{fontFamily: 'Source Sans Pro'}}>
                <thead className="bg-dark" style={{fontSize:props.fontz, fontWeight:'bold', color:'floralwhite'}}>
                    <tr>
                        <td className='text-center' style={{width:'20px'}}>SN</td>
                        <td className='text-center' style={{width:'300px'}}>Student Names</td>
                        <td className='text-center' style={{width:'15px'}} width="15px" title='number of subjects'>SUBJECTS</td>
                        <td className='text-center' style={{width:'15px'}} width="15px">SUM</td>
                        <td className='text-center' style={{width:'15px'}} width="15px">AVG</td>
                        <td className='text-center' style={{width:'15px'}} width="15px">RANK</td>
                    </tr>
                </thead>
                <tbody style={{fontSize:props.fontz, fontWeight:'bold'}}>
                    {
                        ranks.map((ele, ind)=>{
                            return <tr>
                                <td className="text-center">{ind + 1}</td>
                                <td style={{textTransform:'capitalize'}}>{students[ele.studentid][0]}</td>
                                <td className="text-center">{ele.count}</td>
                                <td className="text-center">{ele.sum}</td>
                                <td className="text-center">{ele.score}</td>
                                <td className="text-center">{ordinal_suffix_of(ele.rank)}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(Rank)
