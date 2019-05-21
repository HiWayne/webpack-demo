import React from 'react'
import config from './config.json'
import style from '../css/greeter.css'

class Greeter extends React.Component {
  render() {
    return (
      <div className={style.root}>
        {config.greetText}
      </div>
    )
  }
}

export default Greeter