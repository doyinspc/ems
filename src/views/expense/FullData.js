import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import { expensestate } from '../../actions/common';

const FullData = (props) => {
    let data = props.data;
    return (
        <div>
            <table width="100%" border="solid #ccc 2px">
                <thead className="bg-dark">
                    <tr>
                        <td className='text-center'>SN</td>
                        <td className='text-center' style={{width:'100px'}} width="10px">RECORDED</td>
                        <td className='text-center'>CATEGORY</td>
                        <td className='text-center'>ITEM</td>
                        <td className='text-center'>STATUS</td>
                        <td className='text-center'>QTY</td>
                        <td className='text-center'>SOURCE/DESTINATION</td>
                        <td className='text-center' width="10px">ACTION</td>
                    </tr>
                </thead>
                <tbody style={{fontSize:'0.9em', fontWeight:'bold'}}>
                    {
                        data.map((prop, indx)=>{
                            let st = expensestate.filter(rw=>rw.id === parseInt(prop.states));
                            let sta = Array.isArray(st) && st.length > 0 ? st[0].name : "--";
                            return <tr title={`${prop.staffname} ${moment(props.date_updated).format('Do MMM, YYYY')}`}>
                                        <td className='text-center'>{indx + 1}</td>
                                        <td>{moment(prop.daterecords).format("Do MMM YYYY")}</td>
                                        <td>{prop.cname}</td>
                                        <td>{prop.expensename}</td>
                                        <td>{sta}</td>
                                        <td className="text-center">{prop.quantity}</td>
                                        <td>{prop.source}</td>
                                        <td>
                                            <i className="fa fa-edit mr-2" onClick={()=>props.onEdit(prop)}></i>
                                            <i className="fa fa-remove" onClick={()=>props.onDelete(prop)}></i>
                                        </td>
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

export default connect(mapStateToProps, mapDispatchToProps)(FullData)
