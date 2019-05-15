# General Assembly WDI Project 2: Reactathon App
## Pairer
[Deployed project](https://financial-data-api.herokuapp.com/EUR)

![](https://media.giphy.com/media/fUHVPoY76vIOyNAtUn/giphy.gif)
___
### Overview:
A fiat currency pair app. With over one thousand currency pairs. The user can select any two combinations and see the price of the pair as well as a graph of the last 30 days.
___

### Timeframe & Team:
    48 hours, team of 2

### The Brief:

* Build a React application that consumes a public API.

* Have several components - At least one classical and one functional.

* The app should include a router - with several "pages".

* Have semantically clean HTML.

* Be deployed online and accessible to the public.

* Work in pairs.

### Technologies:

* JavaScript
* React
* Axios
* Insomnia
* Webpack
* HTML5
* CSS
* SASS
* Chart.js
* npm
* Bash
* Slack
* Teletype
* Heroku

### Approach:
As this was a pair coded hackathon with a very limited timeframe, we chose was to focus on functionality rather than style or polish. Our goal was to ensure the app was useful. We decided to work on every task together and therefore used the Teletype team coding tool. Most of our coding was done on one laptop where we both discussed each piece of code and the best approaches.

### Walkthrough: 
1. As this app deals with currency pairs there must be a base and a quote currency so for 'EURUSD', 'EUR' is the base and 'USD' is the quote. Thus the user is first met by a screen in which they choose their base currency in a scrollable menu. As seen below; highlighted by a red box:
 ![](https://i.imgur.com/JeJCQj4.png)
2. Next a screen is displayed based on the base picked with that base paired against all the quotes available along with a daily price received from an external API (OpenRates). As seen highlighted below:
 ![](https://i.imgur.com/ZXQ7WkR.png)
3. A user can then click on a single currency pair that they want to view. This is highlighted below:
 ![](https://i.imgur.com/ohEyBCE.png)
4. Once a currency pair is selected, the user is taken to a screen of a rendered graph which displays the price of the pair for the last 30 days. Additionally the user again sees the price of the pair but with a price that is different from the daily price as it uses a different API (Alpha Vantage). This price updates real-time every 10 seconds.
 ![](https://i.imgur.com/6BqqEj9.png)
 
 ### Graph:
Using the Chart.js library I was able to chart a graph of the currency pair's historical price. As the timeframe for the hackathon was so short, it made finding APIs to serve the financial data a real challenge. Financial data is valuable so any free API was very limited. The API (OpenRates) I chose to use proved to come with a big problem when it came to rendering the graph. The API required a seperate request for each day. Thus I wrote code in order to make 30 seperate requests. In hindisght this was very inefficient and much of the code for the app could have been written better. Finding a better API would have also been a huge help. For these reasons I chose to come back and retry many of these challenges in a future [project](https://github.com/stephanoparaskeva/wdi-project-4-infinite). The code for rendering the graph can be seen below:
```javascript
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
```
The code above works as follows:
1. A *for* loop occurs, where each loop creates a date object of the current moment (different at each iteration of the loop). Using the moment.js library.
2. Then an Axios request is made to the external API (openrates).
3. As the seperate axios requests are asynchronous, the historical data will come back unordered. To order the data; each date created in step 1 is attached to each rate. These dates will be seperated by mere milliseconds but they will nonetheless be different.
4. The response array with the dates attached is then sorted by comparing date objects. The data is ordered in descending order.
5. This data is then set into state after a check is done, ready to be passed via props to the graph component.

### Process:
This was a team based project where I worked with one other developer, [Ru Owyong](https://github.com/rulette). We worked together using the Teletype team coding tool. This tool allowed us to both code at the same time remotely on the same files. We discussed our tasks on the Slack messaging platform and troubleshooted together. When we were not working remotely, we'd pair code on my laptop. Each taking turns to code, where one person was the 'driver' who wrote the code and the other was the 'navigator' who helped solve problems and proof-read. This itself was a challenge as it required us to learn to communicate what we were doing, while we were doing it. Because of this, it helped me learn how to better explain my code and also how to help someone work through their own code. Reading my teammates code and hearing their thought process out loud was a great experience as it opened my mind to the many alternative approaches possible when encountering different.

## Bugs:
*Below is a list of some of the known issues*:

---

**Problem**: There is an issue with CORS as public APIs are being consumed from the front-end. This was worked around by using an online proxy where 'cors.io' was prefixed to the URL of the request. This however is a temprorary fix.

**Solution**: As a long-term solution, I could have created a small back-end for the project where the request could be made from in order to prevent the CORS issue from arising.

---

**Problem**: After clicking a currency pair, the graph and information sometimes does not show up. The console reports "Cannot read property '5. Exchange Rate' of undefined". This is because there is a limit of 5 API calls per minute to the AlphaVantage API.

**Solution**: The best way to overcome this would have been to find an alternative API to use, one that allowed more requests.

---

### Wins and Blockers:

The biggest blocker for me was finding suitible APIs to provide the financial data. This was because most financial data APIs are paid services. Finding free APIs for the platform and getting them to work together took longer than I would have wanted. Further to this, the data provided by these APIs was limited in itself or difficult to use. It wasn't until after the hackathon where I found APIs that'd be a lot more friendly to use.

A win for the app was the quantity of different currency pairs that I was able to make the app able to provide. The user has over 1000 currency pair combinations to pick from. Additionally, as this data is gathered in a similar way to how the graph data is gathered, it meant that a graph is available for every single currency pair.

### Future Features:

*Features we would like to add, include:*

* The ability to buy and sell currencies, so the user can see what their investments would look like. 

* Use of a better API so that there can be more requests per unit time.

* Candle graphs for the currencies to show the high, low, open and close prices.

* The option for the graphs to display more than 30 days of historical data

*These were the features I wanted to be able to integrate given enough time, and so I returned to make a similar app that included these features [here](https://crypto-infinite.herokuapp.com/)*

### Key Learnings:
This project was a great dive into learning how to read the documentation of public APIs, sifting through so many API docs in order to first decide what type of project we wanted, then going through financial API documentation to find the right financial data APIs once we decided on our project. Then finally familiarising myself with the documentation of the APIs we actually wanted to use; all meant that I got to really immerse myself into reading docs in order to understand how a specific API worked and how to make it work for what I needed. Going forward this has taught me how to properly read documentation and use the many public APIs that are available.
