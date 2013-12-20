var cryptotools = function () {
	//<div class="ctprice_btc">
	var btcclass='ctprice';
	//be sure to include callback
	var btcapiurl={'btc':['https://coinbase.com/api/v1/prices/spot_rate?currency=_CTCURR_&callback=?','amount'],
				   'ltc':['http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent('https://btc-e.com/api/2/ltc__CTCURR_/ticker?callback=?') + '%22&format=json','query.results.ticker.last'],
				   'ltc2':['http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent('https://vircurex.com/api/get_last_trade.json?base=ltc&alt=_CTCURR_&callback=?') + '%22&format=json','query.results.json.value'],
				   'ppc':['http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent('https://vircurex.com/api/get_last_trade.json?base=ppc&alt=_CTCURR_&callback=?') + '%22&format=json','query.results.json.value'],
				   'xpm':['http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent('https://vircurex.com/api/get_last_trade.json?base=xpm&alt=_CTCURR_&callback=?') + '%22&format=json','query.results.json.value'],
				   'doge':['http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent('https://vircurex.com/api/get_last_trade.json?base=dgc&alt=_CTCURR_&callback=?') + '%22&format=json','query.results.json.value'],
				   'dgc':['http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent('https://vircurex.com/api/get_last_trade.json?base=dgc&alt=_CTCURR_&callback=?') + '%22&format=json','query.results.json.value']
				   };
	var btclogo={'btc':'data:image/png;base64,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',
				'ltc':'data:image/png;base64,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',
				'ltc2':'data:image/png;base64,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',
				'ppc':'data:image/png;base64,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',
				'xpm':'data:image/png;base64,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',
				'doge':'data:image/png;base64,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',
				'dgc':'data:image/png;base64,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'
				};
	//<div class="ctprice_btc" data-currency="eur">
	var btcdatacurr='currency';
	//<div class="ctprice_btc" data-style="mini">
	//mini,default,fancy
	var btcdatastyle='style';
	var btcdatafor='for';
	var currencies = [
						  ["Bitcoin","Bitcoin","BTC","฿"  ],
						  ["Litecoin","Litecoin","LTC","Ł"  ],
						  ["Primecoin","Primecoin","XPM","Ψ"  ],
						  ["Peercoin","Peercoin","PPC","Ᵽ"  ],
						  ["Dogecoin wow","Dogecoin","DOGE","Ɖ"],
						  ["Afghanistan","Afghani","AFN","؋"  ],
						  ["Argentina","Peso","ARS","$"  ],
						  ["Aruba","Guilder","AWG","ƒ"  ],
						  ["Australia","Dollar","AUD","$"  ],
						  ["Azerbaijan","Manat","AZN","ман"  ],
						  ["Bahamas","Dollar","BSD","$"  ],
						  ["Barbados","Dollar","BBD","$"  ],
						  ["Belarus","Ruble","BYR","p."  ],
						  ["Belize","Dollar","BZD","BZ$"  ],
						  ["Bermuda","Dollar","BMD","$"  ],
						  ["Bolivia","Boliviano","BOB","$b"  ],
						  ["Bosnia and Herzegovina","Convertible Marka","BAM","KM"  ],
						  ["Botswana","Pula","BWP","P"  ],
						  ["Bulgaria","Lev","BGN","лв"  ],
						  ["Brazil","Real","BRL","R$"  ],
						  ["Brunei","Darussalam Dollar","BND","$"  ],
						  ["Cambodia","Riel","KHR","៛"  ],
						  ["Canada","Dollar","CAD","$"  ],
						  ["Cayman","Dollar","KYD","$"  ],
						  ["Chile","Peso","CLP","$"  ],
						  ["China","Yuan Renminbi","CNY","¥"  ],
						  ["Colombia","Peso","COP","$"  ],
						  ["Costa Rica","Colon","CRC","₡"  ],
						  ["Croatia","Kuna","HRK","kn"  ],
						  ["Cuba","Peso","CUP","₱"  ],
						  ["Czech Republic","Koruna","CZK","Kč"  ],
						  ["Denmark","Krone","DKK","kr"  ],
						  ["Dominican Republic","Peso","DOP","RD$"  ],
						  ["East Caribbean","Dollar","XCD","$"  ],
						  ["Egypt","Pound","EGP","£"  ],
						  ["El Salvador","Colon","SVC","$"  ],
						  ["Estonia","Kroon","EEK","kr"  ],
						  ["Euro Member","Euro","EUR","€"  ],
						  ["Falkland Islands ","Pound","FKP","£"  ],
						  ["Fiji","Dollar","FJD","$"  ],
						  ["Ghana","Cedis","GHC","¢"  ],
						  ["Gibraltar","Pound","GIP","£"  ],
						  ["Guatemala","Quetzal","GTQ","Q"  ],
						  ["Guernsey","Pound","GGP","£"  ],
						  ["Guyana","Dollar","GYD","$"  ],
						  ["Honduras","Lempira","HNL","L"  ],
						  ["Hong Kong","Dollar","HKD","$"  ],
						  ["Hungary","Forint","HUF","Ft"  ],
						  ["Iceland","Krona","ISK","kr"  ],
						  ["India","Rupee","INR","₹"  ],
						  ["Indonesia","Rupiah","IDR","Rp"  ],
						  ["Iran","Rial","IRR","﷼"  ],
						  ["Isle of Man","Pound","IMP","£"  ],
						  ["Israel","Shekel","ILS","₪"  ],
						  ["Jamaica","Dollar","JMD","J$"  ],
						  ["Japan","Yen","JPY","¥"  ],
						  ["Jersey","Pound","JEP","£"  ],
						  ["Kazakhstan","Tenge","KZT","лв"  ],
						  ["Korea (North)","Won","KPW","₩"  ],
						  ["Korea (South)","Won","KRW","₩"  ],
						  ["Kyrgyzstan","Som","KGS","лв"  ],
						  ["Laos","Kip","LAK","₭"  ],
						  ["Latvia","Lat","LVL","Ls"  ],
						  ["Lebanon","Pound","LBP","£"  ],
						  ["Liberia","Dollar","LRD","$"  ],
						  ["Lithuania","Litas","LTL","Lt"  ],
						  ["Macedonia","Denar","MKD","ден"  ],
						  ["Malaysia","Ringgit","MYR","RM"  ],
						  ["Mauritius","Rupee","MUR","₨"  ],
						  ["Mexico","Peso","MXN","$"  ],
						  ["Mongolia","Tughrik","MNT","₮"  ],
						  ["Mozambique","Metical","MZN","MT"  ],
						  ["Namibia","Dollar","NAD","$"  ],
						  ["Nepal","Rupee","NPR","₨"  ],
						  ["Netherlands","Antilles Guilder","ANG","ƒ"  ],
						  ["New Zealand","Dollar","NZD","$"  ],
						  ["Nicaragua","Cordoba","NIO","C$"  ],
						  ["Nigeria","Naira","NGN","₦"  ],
						  ["Norway","Krone","NOK","kr"  ],
						  ["Oman","Rial","OMR","﷼"  ],
						  ["Pakistan","Rupee","PKR","₨"  ],
						  ["Panama","Balboa","PAB","B/."  ],
						  ["Paraguay","Guarani","PYG","Gs"  ],
						  ["Peru","Nuevo Sol","PEN","S/."  ],
						  ["Philippines","Peso","PHP","₱"  ],
						  ["Poland","Zloty","PLN","zł"  ],
						  ["Qatar","Riyal","QAR","﷼"  ],
						  ["Romania","New Leu","RON","lei"  ],
						  ["Russia","Ruble","RUB","руб"  ],
						  ["Russia","Ruble","RUR","руб"  ],
						  ["Saint Helena","Pound","SHP","£"  ],
						  ["Saudi Arabia","Riyal","SAR","﷼"  ],
						  ["Serbia","Dinar","RSD","Дин."  ],
						  ["Seychelles","Rupee","SCR","₨"  ],
						  ["Singapore","Dollar","SGD","$"  ],
						  ["Solomon Islands","Dollar","SBD","$"  ],
						  ["Somalia","Shilling","SOS","S"  ],
						  ["South Africa","Rand","ZAR","S"  ],
						  ["Sri Lanka","Rupee","LKR","₨"  ],
						  ["Sweden","Krona","SEK","kr"  ],
						  ["Switzerland","Franc","CHF","CHF"  ],
						  ["Suriname","Dollar","SRD","$"  ],
						  ["Syria","Pound","SYP","£"  ],
						  ["Taiwan","New Dollar","TWD","NT$"  ],
						  ["Thailand","Baht","THB","฿"  ],
						  ["Trinidad and Tobago","Dollar","TTD","TT$"  ],
						  ["Turkey","Lira","TRL","₤"  ],
						  ["Tuvalu","Dollar","TVD","$"  ],
						  ["Ukraine","Hryvna","UAH","₴"  ],
						  ["United Kingdom","Pound","GBP","£"  ],
						  ["United States","Dollar","USD","$"  ],
						  ["Uruguay","Peso","UYU","$U"  ],
						  ["Uzbekistan","Som","UZS","лв"  ],
						  ["Venezuela","Bolivar Fuerte","VEF","Bs"  ],
						  ["Viet Nam","Dong","VND","₫"  ],
						  ["Yemen","Rial","YER","﷼"  ],
						  ["Zimbabwe","Dollar","ZWD","Z$"  ]
						];
	var symbols=[];
	var currshort=[];
	var apidata=[];
	$.each(currencies, function(key, value) {
			symbols[key]=value[3];
			currshort[value[2]]=key;
	});
	var stylesheet = '<style>';
	stylesheet += 'div.'+btcclass+' {text-align:center;margin:0;padding:0;font-size: 1rem;line-height: 1.6;color:#222222;font-family: arial;font-style: normal;font-weight: normal;}';
	stylesheet += 'div.'+btcclass+'.mini {}';
	stylesheet += 'div.'+btcclass+'.default { margin:0;background-color: #DFE0E2;background-image:url(data:image/png;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wgARCAAyAAEDAREAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYEBQn/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAHfcqhRFUigB//EABcQAAMBAAAAAAAAAAAAAAAAAAABEyD/2gAIAQEAAQUCKosUeP/EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQIBAT8Bf//EABYQAAMAAAAAAAAAAAAAAAAAAAAgMf/aAAgBAQAGPwIrf//EAB0QAAEDBQEAAAAAAAAAAAAAAAABEWEgkaHR8PH/2gAIAQEAAT8hdDh4PnOydbJR/9oADAMBAAIAAwAAABAQAAf/xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAEDAQE/EH//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAECAQE/EH//xAAcEAABAwUAAAAAAAAAAAAAAAAAAWGhIJHB0fD/2gAIAQEAAT8QehdDqQ/cfQZo/9k=);background-repeat: repeat-x;border: 2px solid #D6D4D7;border-radius: 4px;height: 40px;text-align:right;padding-right:8px;line-height:36px;overflow: hidden;position: relative;}';
	stylesheet += 'div.'+btcclass+'.fancy { background-color: #DFE0E2;background-image:url(data:image/png;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wgARCAAyAAEDAREAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYEBQn/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAHfcqhRFUigB//EABcQAAMBAAAAAAAAAAAAAAAAAAABEyD/2gAIAQEAAQUCKosUeP/EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQIBAT8Bf//EABYQAAMAAAAAAAAAAAAAAAAAAAAgMf/aAAgBAQAGPwIrf//EAB0QAAEDBQEAAAAAAAAAAAAAAAABEWEgkaHR8PH/2gAIAQEAAT8hdDh4PnOydbJR/9oADAMBAAIAAwAAABAQAAf/xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAEDAQE/EH//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAECAQE/EH//xAAcEAABAwUAAAAAAAAAAAAAAAAAAWGhIJHB0fD/2gAIAQEAAT8QehdDqQ/cfQZo/9k=);background-repeat: repeat-x;border: 2px solid #D6D4D7;border-radius: 4px;height: 40px;text-align:right;padding-right:8px;line-height:36px;overflow: hidden;position: relative;}';
	stylesheet += 'div.'+btcclass+'logo {height: 30px;left: 5px;position: absolute;top:5px;width: 30px;}';
	stylesheet += 'div.'+btcclass+' span.curr {line-height:35px;vertical-align:bottom;}';
	stylesheet += 'div.'+btcclass+' span.price {font-weight:bold;}';
	stylesheet += 'div.'+btcclass+' span.powered {position: absolute; right: 0px; top: 14px; color: #666; text-align: right; width: 160px; font-size: 10px;}';
	stylesheet += '</style>';
	$(stylesheet).appendTo($('head'));
	
	function putQuote(obj,text,symb,style){
		obj.addClass(style);		
				
		switch(style) {
		case 'default':
				obj.prepend('<span class="price">'+text+'</span>');
				obj.prepend('<span class="curr">'+symb+'</span>');
				obj.prepend('<div class="'+btcclass+'logo"></div>');
				obj.css('max-width',((symb+text).length*10+40).toString()+'px');
				break;
		case 'fancy':
				obj.prepend('<span class="powered">cryptotools</span>');
				obj.prepend('<span class="price">'+text+'</span>');
				obj.prepend('<span class="curr">'+symb+'</span>');
				obj.prepend('<div class="'+btcclass+'logo"></div>');
				break;
		default: 
				obj.text(symb+text);
				obj.css('max-width',((symb+text).length*10).toString()+'px');
		}
		$(obj).find('div.'+btcclass+'logo').css('background-image', 'url("' + btclogo[obj.data(btcdatafor)] + '")');
		//css('background-image',btclogo[obj.data(btcdatafor)]);
		//console.log(btclogo[obj.data(btcdatafor)]);
	}
	//gets the price and writes it into the div.text	
	function putPrice(){	
		$('div .'+btcclass).each(function(i){
			var obj = $(this);
			if(typeof obj.data(btcdatafor) == 'undefined') { obj.data(btcdatafor,'btc');}
			if(obj.data(btcdatacurr))var curr= obj.data(btcdatacurr).toUpperCase();
			else var curr;
			if(!curr) { curr='USD'; }
			var symbol=symbols[currshort[curr]];
			if(obj.data(btcdatastyle))var style=obj.data(btcdatastyle).toLowerCase();
			else var style;
			if(!style) { style='default'; }
			if(!symbol) { obj.text('unknown currency '+curr); }
			else {
				
				if(!apidata[obj.data(btcdatafor)+curr]){
					
					var url=btcapiurl[obj.data(btcdatafor)][0].replace('_CTCURR_',curr.toLowerCase());
					var callback=btcapiurl[obj.data(btcdatafor)][1];
					
					   $.ajax({
					    	url: url,
					    	async: false,
					    	dataType: 'json',
					    	success: function(data2) {								
									eval('if(typeof data2.'+callback+' == "undefined") data2.'+callback+'.val("");');
									eval('apidata[obj.data(btcdatafor)+curr]=data2.'+callback+';');							
									putQuote(obj,apidata[obj.data(btcdatafor)+curr],symbol,style);
					    	}
					    });						
						
	
				} else {
						putQuote(obj,apidata[obj.data(btcdatafor)+curr],symbol,style);						
				}		
			}
		});	
	}
	putPrice();	
	
}
_ct=new cryptotools;



