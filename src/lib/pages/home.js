import React from 'react'
import { Link } from 'react-router-dom'




class Home extends React.Component {
  constructor() {
    super()

    this.state = {

    }

    this.baseArr = ['MXN', 'AUD', 'HKD', 'RON', 'HRK', 'CHF', 'IDR', 'CAD', 'USD', 'ZAR', 'JPY', 'BRL', 'HUF', 'CZK',
      'NOK', 'INR', 'PLN', 'ISK', 'PHP', 'SEK', 'ILS', 'GBP', 'SGD', 'CNY', 'TRY', 'MYR', 'RUB', 'NZD',
      'KRW', 'THB', 'BGN', 'DKK', 'EUR']
  }

  render() {
    return (
      <main className="section base-bar">
        <div className="container base-bar-container">
          <div className="columns is-mobile is-multiline">
            {this.baseArr.map(base =>
              <div key={base} className="is-one-quarter-desktop is-one-third-tablet is-half-mobile">
                <Link to={`/${base}`}>
                  <div className="card">
                    <div className="base-bar-card card-header">
                      <h4 className="card-header-title">{base}</h4>
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
export default Home
