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
 ![](https://i.imgur.com/jJau1Xq.png)
2. Next a screen is displayed based on the base picked, with that base against all the quotes available along with a daily price. As seen highlighted below:
 ![](https://i.imgur.com/BUFbOXT.png)
3. A user can then click on a single currency pair that they want to view. This is highlighted below:
 ![](https://i.imgur.com/Kpdby1Y.png)
4. Once a currency pair is selected, the user is taken to a screen of a rendered graph, which displays the price of the pair for the last 30 days. Additionally, the user sees the price of the pair which is different from the daily price as it uses a more accurate API (Alpha Vantage). This price updates real-time every 10 seconds.
 ![](https://i.imgur.com/6BqqEj9.png)
