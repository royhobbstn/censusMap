'use strict';

var request = require('request');
var Parser = require('expr-eval').Parser;
var ss = require('simple-statistics');

var datatree = require('./datatree.js').default.acs1115;


var keys = Object.keys(datatree);

keys.forEach(function (key) {
    //
})

var theme = Object.keys(datatree)[0];

// https://gis.dola.colorado.gov/capi/demog?db=acs1115&table=b01001&sumlev=140

var query_dataset = '&db=acs1115';
var query_table = '&table=' + datatree[theme].table;
var query_sumlev = '&sumlev=50';
var query_url_base = 'https://gis.dola.colorado.gov/capi/demog?';
var query_url = query_url_base + query_dataset + query_table + query_sumlev + '&limit=5';


var expression = datatree[theme].expression;
var parser = new Parser();
var exp = parser.parse(expression.join(""));


request(query_url, function (error, response, body) {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body);

    var data = JSON.parse(body).data;

    var dataset_values = [];

    data.forEach(function (row) {

        let evaluated_value;

        // don't attempt to use expression parser if array is only 1 element
        // which means single variable
        if (expression.length > 1) {

            let replacers_object = {};

            getUniqueExpressionKeys(expression).forEach(function (key) {
                replacers_object[key] = row[key];
            });

            evaluated_value = exp.evaluate(replacers_object);
        }
        else {
            evaluated_value = row[expression[0]];
        }

        dataset_values.push(evaluated_value);
    });

    calcBreaks(dataset_values);

});




function calcBreaks(thedata) { //after successfull ajax call, data is sent here

    var max = ss.max(thedata);

    // all values in array are 0. (presumably no bg data)  Add a '1' to the array so simplestatistics library doesnt fail computing jenks.
    if (max === 0) {
        thedata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    }

    var min = ss.min(thedata);
    var median = ss.median(thedata);
    var stddev = ss.standardDeviation(thedata);

    var ckmeans5 = ss.ckmeans(thedata, 5);
    var ckmeans7 = ss.ckmeans(thedata, 7);
    var ckmeans9 = ss.ckmeans(thedata, 8);

    var computed_breaks = {};
    computed_breaks.jenks5 = [ckmeans5[0][0], ckmeans5[1][0], ckmeans5[2][0], ckmeans5[3][0], ckmeans5[4][0]]
    computed_breaks.jenks7 = ss.jenks(thedata, 7); // HERE
    computed_breaks.jenks9 = ss.jenks(thedata, 9);
    computed_breaks.stddev7 = [median + (stddev * 1.5), median + stddev, median + (stddev * 0.5), median, median - (stddev * 0.5), median - stddev, median - (stddev * 1.5), min];
    computed_breaks.stddev8 = [median + (stddev * 2.5), median + (stddev * 1.5), median + (stddev * 0.5), median - (stddev * 0.5), median - (stddev * 1.5), median - (stddev * 2.5), min];
    computed_breaks.quantile5 = [ss.quantile(thedata, 0.8), ss.quantile(thedata, 0.6), ss.quantile(thedata, 0.4), ss.quantile(thedata, 0.2), min];
    computed_breaks.quantile7 = [ss.quantile(thedata, 0.857143), ss.quantile(thedata, 0.714286), ss.quantile(thedata, 0.57143), ss.quantile(thedata, 0.42857), ss.quantile(thedata, 0.28571), ss.quantile(thedata, 0.14286), min];
    computed_breaks.quantile9 = [ss.quantile(thedata, 0.88888), ss.quantile(thedata, 0.77777), ss.quantile(thedata, 0.66666), ss.quantile(thedata, 0.55555), ss.quantile(thedata, 0.44444), ss.quantile(thedata, 0.33333), ss.quantile(thedata, 0.22222), ss.quantile(thedata, 0.11111), min];
    computed_breaks.quantile11 = [ss.quantile(thedata, 0.90909), ss.quantile(thedata, 0.81818), ss.quantile(thedata, 0.72727), ss.quantile(thedata, 0.63636), ss.quantile(thedata, 0.54545), ss.quantile(thedata, 0.45454), ss.quantile(thedata, 0.36364), ss.quantile(thedata, 0.27273), ss.quantile(thedata, 0.18182), ss.quantile(thedata, 0.09091), min];
    computed_breaks.min = min;
    computed_breaks.max = max;
    computed_breaks.mean = ss.mean(thedata);
    computed_breaks.median = median;
    computed_breaks.stddev = stddev;
    computed_breaks.sample = [];

    console.log(computed_breaks);
}



function getUniqueExpressionKeys(expression) {

    // extract data fields from expression (example: ["b01001001", "b01001002"])
    let keys = expression.filter(function (d) {
        if (d !== "+" && d !== "-" & d !== "(" & d !== ")" & d !== "*" & d !== "/") {
            return true;
        }
    });

    let unique_keys = Array.from(new Set(keys));

    return unique_keys;
}
