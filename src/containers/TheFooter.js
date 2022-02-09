import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">2022
        <span className="ml-1">&copy; MYS</span>
        </a>
      </div>
      <div className="mfs-auto">
        <a href="https://svsdd.blogspot.com/" target="_blank" rel="noopener noreferrer">2022
          <span className="ml-1">&copy; SAVAŞ KODLARI</span>
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
