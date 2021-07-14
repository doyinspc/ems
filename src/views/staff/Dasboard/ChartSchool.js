import React from 'react'
import { connect } from 'react-redux'
import {CChartLine} from '@coreui/react-chartjs';

const ChartSchool = (props) => {
    let grapher = props.grapher
    let graph = props.graph
    return (
        <CChartLine
            type="barchart"
            style={{height:"300px", width:"100%"}}
            datasets={grapher}
            labels={Object.keys(graph)}
            options={{
                responsive: true,
                maintainAspectRatio: true,
                tooltips: {
                    enabled: true
                },
            }}
        />
    )
}

const mapStateToProps = (state) => ({
    
})
const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartSchool)
