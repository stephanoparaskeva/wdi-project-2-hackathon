import React from 'react'
import axios from 'axios'


import { Link } from 'react-router-dom'

class CurrenciesIndex extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      currencies: null,
      filteredCurrencyKeys: []
    }

    this.baseArr = ['MXN', 'AUD', 'HKD', 'RON', 'HRK', 'CHF', 'IDR', 'CAD', 'USD', 'ZAR', 'JPY', 'BRL', 'HUF', 'CZK',
      'NOK', 'INR', 'PLN', 'ISK', 'PHP', 'SEK', 'ILS', 'GBP', 'SGD', 'CNY', 'TRY', 'MYR', 'RUB', 'NZD',
      'KRW', 'THB', 'BGN', 'DKK', 'EUR']


    this.pairArr = ['MXN', 'AUD', 'HKD', 'RON', 'HRK', 'CHF', 'IDR', 'CAD', 'USD', 'ZAR', 'JPY', 'BRL', 'HUF', 'CZK',
      'NOK', 'INR', 'PLN', 'ISK', 'PHP', 'SEK', 'ILS', 'GBP', 'SGD', 'CNY', 'TRY', 'MYR', 'RUB', 'NZD',
      'KRW', 'THB', 'BGN', 'DKK', 'EUR']

    this.getCurrencies = this.getCurrencies.bind(this)
    this.generateCurrencyPairs = this.generateCurrencyPairs.bind(this)
  }

  generateCurrencyPairs(baseArr, pairArr) {
    const newArr = []
    baseArr.map(base => {
      pairArr.forEach(pair => {
        if (base !== pair) {
          newArr.push(`${base+pair}`)
        }
      })
    })
    return newArr
  }

  getCurrencies() {
    axios.get(`https://cors.io/?http://api.openrates.io/latest?base=${this.props.match.params.id}`)
      .then(res => {
        const currencies = []
        for (const key in res.data.rates) {
          currencies.push({...res.data.rates[key], name: key, rate: res.data.rates[key]})
        }
        this.setState({currencies: currencies })
      })
  }


  componentDidMount() {
    this.getCurrencies()
  }

  render() {
    if(!this.state.currencies) return null
    return (
      <main className="section index-section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {this.state.currencies.map(currency =>
              <div key={currency.name} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
                <Link to={`${this.props.match.params.id}/${this.props.match.params.id+currency.name}`}>
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-header-title">{this.props.match.params.id}{currency.name}</h4>
                    </div>
                    <div className="card-image">
                      <figure className="image">
                      </figure>
                    </div>
                    <div className="card-content">
                      <h5 className="title is-6">{currency.rate}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    )
  }
}

export default CurrenciesIndex
