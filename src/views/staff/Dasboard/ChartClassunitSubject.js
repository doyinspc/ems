import React from 'react'
import { connect } from 'react-redux'
import {CChartBar} from '@coreui/react-chartjs';

const ChartSchool = (props) => {
    let grapher = props.grapher
    let graph = props.graph
    
    let g = Object.keys(graph).map(rw=>(props.subjects[rw]))
    
    return (
        <CChartBar
            type="barchart"
            style={{height:"300px", width:"100%"}}
            datasets={grapher}
            labels={g}
            options={{
            tooltips: {
                enabled: true
            }
            }}
        />
    )
}

const mapStateToProps = (state) => ({
    
})
const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartSchool)
