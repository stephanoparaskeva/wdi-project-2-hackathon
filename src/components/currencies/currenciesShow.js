const alphaVantageToken = process.env.ALPHAVANTAGE_ACCESS_TOKEN
import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

import CurrenciesGraph from './currenciesGraph'

class CurrenciesShow extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      individualCurrency: null,
      graphDataArr: null
    }
    this.getCurrency = this.getCurrency.bind(this)
    this.getGraphData = this.getGraphData.bind(this)
  }


  getCurrency() {
    axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${this.props.match.params.id.substring(0,3)}&to_currency=${this.props.match.params.id.substring(3,7)}&apikey=${alphaVantageToken}`)
      .then(res => {
        let individualCurrency
        individualCurrency = {
          rate: res.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"],
          date: res.data["Realtime Currency Exchange Rate"]["6. Last Refreshed"]}
        this.setState({individualCurrency: individualCurrency })
      }).catch(err => console.log(err))
  }

  componentDidMount() {
    this.getCurrency()
    setInterval(() => {
      this.getCurrency()
    }, 5000)

    {for (let i = 0; i < 30; i++) {
      const date = moment().subtract(i, 'days').format('YYYY-MM-DD')

      axios.get(`https://cors.io/?http://api.openrates.io/${date}?base=${this.props.match.params.id.substring(0,3)}`)
        .then(res => {
          const array = [...this.state.data, {

            rate: res.data.rates[this.props.match.params.id.substring(3,7)],
            date: new Date(date)
          }]
          const data = array.sort((a, b) => {
            if (a.date > b.date) return -1
            return 1
          })
          this.setState({ data })
          if (this.state.data.length === 30) {
            this.setState({ graphDataArr: this.getGraphData() })
          }
        })
    }}
  }

  getGraphData() {
    const graphDataArr = []
    for (let m = 0; m < 30; m++) {
      graphDataArr.push(this.state.data[m].rate)
    }
    return graphDataArr
  }


  render() {
    if (!this.state.individualCurrency) return null

    const { individualCurrency } = this.state
    return(
      <main className="section show-section">
        <div className="container">
          <h2 className="title">{this.props.match.params.id}</h2>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <p>{individualCurrency.rate}</p>
              <hr />
            </div>
          </div>
        </div>
        {this.state.graphDataArr &&
        <CurrenciesGraph graphDataArr={this.state.graphDataArr}/>
        }
      </main>
    )
  }
}

export default CurrenciesShow
