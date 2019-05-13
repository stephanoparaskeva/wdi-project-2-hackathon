# General Assembly WDI Project 2: Reactathon App
## Pairer
[Deployed project](https://financial-data-api.herokuapp.com/EUR)

![](https://media.giphy.com/media/fUHVPoY76vIOyNAtUn/giphy.gif)
___
### Overview:
A fiat currency pair app. With over one thousand currency pairs. The user can select any two combinations and see the price of the pair as well as a graph of the last 30 days.
___

### Timeframe:
    48 hours

### The Brief:

* Build a React application that consumes a public API.

* Have several components - At least one classical and one functional.

* The app should include a router - with several "pages".

* Have semantically clean HTML

* Be deployed online and accessible to the public.

* Work in pairs.

### Technologies:

* JavaScript
* React
* Axios
* Insomnia
* Webpack
* npm
* HTML5
* CSS
* SCSS
* Teletype


### Approach:
As this was a pair coded hackathon with a very limited timeframe, the apprach we chose was to focus on functionality rather than style or polish and ensure the app was useful. We decided to work on every task together and therefore used the Teletype team coding tool. Most of our coding was done on one laptop where we both discussed each piece of code and the best approaches.

### Walkthrough: 
1. As this is a currency pairer, there must be a base and a quote currency so in 'EURUSD', 'EUR' is the base and 'USD' is the quote. Thus the user is first met by a screen in which they choose their base currency in a scrollable menu. As seen below highlighted by a red box:
 ![](https://i.imgur.com/JeJCQj4.png)
2. Next a screen is displayed based on the base picked, with that base against all the quotes available along with a daily price. As seen highlighted below:
 ![](https://i.imgur.com/ZXQ7WkR.png)
3. A user can then click on a single currency pair that they want to view. This is highlighted below:
 ![](https://i.imgur.com/ohEyBCE.png)
4. Once a currency pair is selected, the user is taken to a screen of a rendered graph, which displays the price of the pair for the last 30 days. Additionally, the user sees the price of the pair which is different from the daily price as it uses a more accurate API (Alpha Vantage). This price updates real-time every 10 seconds.
 ![](https://i.imgur.com/6BqqEj9.png)
 
 ### Graph:
Using the Chart.js charting library I was able to render a graph of the currency pairs historical price. As the timeframe for the hackathon was so short, it made finding API's to serve the financial data a real challenge. Financial data is valuable so any free API was very limited. The API (OpenRates) I chose to use proved to come with a big problem when it came to rendering the graph. The API required a seperate request for each day. Thus I wrote code in order to make 30 seperate requests. In hindisght this was very inefficient and much of the code for the app could have been written better. Finding a better API would have also been a huge help. For these reasons I chose to come back and retry many of these challenges in a future [project](https://github.com/stephanoparaskeva/wdi-project-4-infinite). The code for rendering the graph can be seen below:
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
1. A for loop occurs where each loop creates a date object of the current moment. Using the moment.js library.
2. Then an Axios request is made to the external API (openrates).
3. As the seperate axios requests are asynchronous, the historical data will come back unordered. To order the data; each date created in step 1 is attached to each rate. These dates will be seperated by mere milliseconds but they will nonetheless be different.
4. The response array with the dates attached is then sorted by comparing date objects. The data is ordered in descending order.
5. This data is then set into state after a check is done, ready to be passed via props to the graph component.

### Process:
This was a team based project where I worked with one other developer,[Ru Owyong](https://github.com/rulette). We worked together using the Teletype team coding tool. This tool allowed us to both code at the same time remotely on the same files. We discussed our tasks on the Slack messaging platform and troubleshooted together. When we were not working remotely, we'd pair code on my laptop. Each taking turns to code, where one person was the 'driver' who wrote the code and the other was the 'navigator' who helped solve problems and proof-read. This itself was a challenge as it required us to learn to communicate what we were doing, while we were doing it. Because of this, it helped me learn how to better explain my code and also how to help someone work through their own. Reading my teammates code and hearing their thought process was a great experience as it opened my mind to alternative approaches to problems.

## Bugs:
*Below is a list of some of the known issues*:

---

**Problem**:

**Solution**:

---

**Problem**:

**Solution**:

---

### Wins and Blockers:

The biggest blocker for me was the

A win for the app was the

### Future Features:

*Features we would like to add, include:*

*

### Key Learnings:
