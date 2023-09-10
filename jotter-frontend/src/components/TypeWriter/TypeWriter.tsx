import React from 'react';
import styles from '@/styles/typewriter.module.css';

function TypeWriter() {
  return (
    // <div className={styles.wrapper}>
    //   <div className={styles.typing}>
    //     Hey, Welcome to Jotter. Your one place to jot down.
    //   </div>
    // </div>
    <div className={styles.wrapper}>
      <div className={styles.static_text}>
        Hey, Welcome to Jotter.
      </div>
      <div className={styles.dynamic_text}>
        <li><span>Here you can jot down your notes.</span></li>
        <li><span>Write down your ideas.</span></li>
        <li><span>Do something out of the blue.</span></li>
      </div>
    </div>
  );
}

export default TypeWriter;
