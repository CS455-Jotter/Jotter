import React from 'react';
import styles from '@/styles/typewriter.module.css';

function TypeWriter() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.static_text}>
        Hey, Welcome to JOtter.
      </div>
      <div className={styles.dynamic_text}>
        <li><span>In a hurry? Just jot a note</span></li>
        <li><span>Your thoughts, our canvas , let&apos;s create</span></li>
        <li><span>Your words, your way, our text editor</span></li>
        <li><span>Where ideas meet the blank canvas</span></li>
        <li><span>Take a moment to jot your thoughts</span></li>
      </div>
    </div>
  );
}

export default TypeWriter;
