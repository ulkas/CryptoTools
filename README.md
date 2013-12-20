## Crypto Tools - cryptocoin website widgets
* price widget  for bitcoin, litecoin, primecoin, peercoin, dogecoin
* bitcoin price in many fiat currencies
* ability to add your crypto currency
* <a href="cryptotools.ulkas.eu">Demo</a>

###install
* requires jquery

```html
//add this at the end of your html before </body>
<script src="js/cryptotools.js"></script>
```

###usage
```html
basic bitcoin price:
<div class="ctprice"></div>
litecoin price:
<div class="ctprice" data-for="ltc"></div>
litecoin price in EUR:
<div class="ctprice" data-for="ltc" data-currency="eur"></div>
primecoin price in PPC:
<div class="ctprice" data-for="xpm" data-currency="ppc"></div>
bitcoin price in Costa Rica Colon:
<div class="ctprice" data-for="btc" data-currency="crc"></div>
```

###TODO
* asynchronous ajax call to the exchange api
* refactor the code 
* refactor the code to erase the jquery parts and leave pure javascript