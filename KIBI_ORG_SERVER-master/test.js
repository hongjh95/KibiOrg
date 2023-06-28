var request = require('request');

var url = 'http://apis.data.go.kr/B552015/NpsBplcInfoInqireService/getBassInfoSearch';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=shZyxdLqvbTGdrsWRPXUn7DsSF0rD2P/UVWObllGK7mHgWBaoM62Zy74pp157CrstzFgkiU2IhQFQSl7/CGa6Q=='; /* Service Key*/
queryParams += '&' + encodeURIComponent('wkpl_nm') + '=' + encodeURIComponent('한국정보공작소'); /* */
// queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1'); /* */

request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received \n', body);
});