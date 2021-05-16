import React from 'react'
import { connect } from 'react-redux'
import { inventorystate } from '../../actions/common';

const SummaryData = (props) => {
    let data = props.data;
    let items = props.items;
    return (
        <div>
        <table width="100%" border="solid #ccc 2px">
            <thead className="bg-dark">
                <tr>
                    <td className='text-center' width="10px">SN</td>
                    <td className='text-center'>ITEM</td>
                    {
                        inventorystate.map((rw)=>{
                            return <td className='text-center' width="10px">{rw.name}</td>;
                        })
                    }
                    <td className='text-center' width="10px">INSTORE</td>
                    <td className='text-center'>UNIT-PRICE</td>
                    <td className='text-center'>TOTAL-PRICE</td>
                </tr>
            </thead>
            <tbody style={{fontSize:'0.9em', fontWeight:'bold'}}>
                {
                    Object.keys(data).map((prop, indx)=>{
                        let dt = data[prop];
                        return <tr key={prop}>
                                    <td className='text-center'>{indx + 1}</td>
                                    <td>{items[prop]}</td>
                                    {
                                        Object.keys(inventorystate).map((rw)=>{
                                            let tot = dt[prop][rw];
                                            return <td className='text-center'width="10px">{tot}</td>;
                                        })
                                    }
                                    <td></td>
                                    <td></td>
                                    <td></td>
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

export default connect(mapStateToProps, mapDispatchToProps)(SummaryData)
