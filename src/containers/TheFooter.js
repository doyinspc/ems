import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        {/* <a href="" target="_blank" rel="noopener noreferrer">StreSERT Int Ltd.</a> */}
        <a href="" target="_blank" rel="noopener noreferrer">{process.env.REACT_APP_COPYWRITE}</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
