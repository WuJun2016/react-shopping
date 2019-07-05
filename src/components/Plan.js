import React from 'react'
import { connect } from 'react-redux'
import { getLocalTime } from '../utils/helper'

import Panel from './Panel'

const Plan = ({ count, history }) => {

  const list = () => {

    var lis = []
    for(let i in history){
      var mlis = []
      for(let j in history[i]){
        var product = count.byId[j]
        mlis.push(
          <Panel product={ product } buyNum={ history[i][j] } key={i}/>
        )
      }
      lis.push(
        <div key={ i }>
          <p>{getLocalTime(i)}</p>
          {mlis}
        </div>
      )
    }
    return lis
  }
  return (
    <div className="plan fl">
      { list() }
    </div>
  )
}

const mapStateToProps = state => ({
  count: state.count,
  cart: state.cart,
  history: state.history
})

export default connect(
  mapStateToProps
)(Plan)

