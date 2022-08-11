import React from 'react'

import styles from '../css/Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.animated_background}>
        <div className={styles.background_masker}></div>
      </div>
    </div>
  )
}

export default Loading
