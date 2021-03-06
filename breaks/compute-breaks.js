'use strict';

var fs = require('fs');

var Parser = require('expr-eval').Parser;
var ss = require('simple-statistics');
var Promise = require('bluebird');
var rp = require('request-promise');


var datatree = require('./../src/json/datatree.js');

var geo = [
    {
        name: 'bg',
        sumlev: 150
    }, {
        name: 'tract',
        sumlev: 140
    }, {
        name: 'place',
        sumlev: 160
    }, {
        name: 'county',
        sumlev: 50
    },
    {
        name: 'state',
        sumlev: 40
    }
    /*, {
        name: 'countysub',
        sumlev: 60
    }, {
        name: 'msa',
        sumlev: 310
    }, {
        name: 'cbsa',
        sumlev: 330
    }, {
        name: 'zcta',
        sumlev: 860
    }*/
    ];

var all_promises = [];
var main_object = {};


Object.keys(datatree).forEach(function (dataset) {

    main_object[dataset] = {};


    Object.keys(datatree[dataset]).forEach(function (theme) {

        main_object[dataset][theme] = {};


        geo.forEach(function (geog) {

            var query_dataset = '&db=' + dataset;
            var query_schema = '&schema=' + (datatree[dataset][theme].schema || 'data');
            var query_table = '&table=' + datatree[dataset][theme].table;
            var query_sumlev = '&sumlev=' + geog.sumlev;
            var query_url_base = 'https://gis.dola.colorado.gov/capi/demog?';
            var query_url = query_url_base + query_dataset + query_schema + query_table + query_sumlev + '&limit=1000';

            var expression = datatree[dataset][theme].expression;
            var parser = new Parser();
            var exp = parser.parse(expression.join(""));

            // put them in promise array, but only to find when all are done
            all_promises.push({
                query_url: query_url,
                expression: expression,
                exp: exp,
                dataset: dataset,
                theme: theme,
                geogname: geog.name
            });

        });


    });

});



Promise.reduce(all_promises, function (total, obj) {
    return rp(obj.query_url).then(function (body) {

        var data = JSON.parse(body).data;

        var dataset_values = [];

        data.forEach(function (row) {

            let evaluated_value;

            // don't attempt to use expression parser if array is only 1 element
            // which means single variable
            if (obj.expression.length > 1) {

                let replacers_object = {};

                getUniqueExpressionKeys(obj.expression).forEach(function (key) {
                    replacers_object[key] = row[key];
                });

                evaluated_value = obj.exp.evaluate(replacers_object);
            }
            else {
                evaluated_value = row[obj.expression[0]];
            }

            dataset_values.push(evaluated_value);
        });

        main_object[obj.dataset][obj.theme][obj.geogname] = calcBreaks(dataset_values);
        console.log(total);
        return total + 1;
    });

}, 0).then(function (total) {
    console.log(total);

    // all promise resolution has already been taken care of.  this just checks to make sure 
    // that all promises are complete.
    console.log('all done');
    console.log();

    var output = 'export default ' + JSON.stringify(main_object);

    fs.writeFile('./src/json/computed_breaks.js', output, function (err) {
        if (err) {
            throw err;
        }
        console.log('The file has been saved!');
    });


});








function calcBreaks(data) { //after successfull ajax call, data is sent here

    // convert all data to numbers
    var thedata = data.map(function (d) {
        return Number(d);
    });


    var max = ss.max(thedata);

    // all values in array are 0. (presumably no bg data)  Add a '1' to the array so simplestatistics library doesnt fail computing ckmeans.
    if (max === 0) {
        thedata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    }

    var min = ss.min(thedata);
    var median = ss.median(thedata);
    var stddev = ss.standardDeviation(thedata);

    var ckmeans5 = ss.ckmeans(thedata, 5);
    var ckmeans7 = ss.ckmeans(thedata, 7);
    var ckmeans9 = ss.ckmeans(thedata, 9);

    var computed_breaks = {};
    computed_breaks.ckmeans5 = [ckmeans5[4][0], ckmeans5[3][0], ckmeans5[2][0], ckmeans5[1][0]];
    computed_breaks.ckmeans7 = [ckmeans7[1][0], ckmeans7[2][0], ckmeans7[3][0], ckmeans7[4][0], ckmeans7[5][0], ckmeans7[6][0]];
    computed_breaks.ckmeans9 = [ckmeans9[8][0], ckmeans9[7][0], ckmeans9[6][0], ckmeans9[5][0], ckmeans9[4][0], ckmeans9[3][0], ckmeans9[2][0], ckmeans9[1][0]];
    computed_breaks.stddev7 = [median + (stddev * 1.5), median + stddev, median + (stddev * 0.5), median, median - (stddev * 0.5), median - stddev, median - (stddev * 1.5)];
    computed_breaks.stddev8 = [median + (stddev * 2.5), median + (stddev * 1.5), median + (stddev * 0.5), median - (stddev * 0.5), median - (stddev * 1.5), median - (stddev * 2.5)];
    computed_breaks.quantile5 = [ss.quantile(thedata, 0.8), ss.quantile(thedata, 0.6), ss.quantile(thedata, 0.4), ss.quantile(thedata, 0.2)];
    computed_breaks.quantile7 = [ss.quantile(thedata, 0.857143), ss.quantile(thedata, 0.714286), ss.quantile(thedata, 0.57143), ss.quantile(thedata, 0.42857), ss.quantile(thedata, 0.28571), ss.quantile(thedata, 0.14286)];
    computed_breaks.quantile9 = [ss.quantile(thedata, 0.88888), ss.quantile(thedata, 0.77777), ss.quantile(thedata, 0.66666), ss.quantile(thedata, 0.55555), ss.quantile(thedata, 0.44444), ss.quantile(thedata, 0.33333), ss.quantile(thedata, 0.22222), ss.quantile(thedata, 0.11111)];
    computed_breaks.quantile11 = [ss.quantile(thedata, 0.90909), ss.quantile(thedata, 0.81818), ss.quantile(thedata, 0.72727), ss.quantile(thedata, 0.63636), ss.quantile(thedata, 0.54545), ss.quantile(thedata, 0.45454), ss.quantile(thedata, 0.36364), ss.quantile(thedata, 0.27273), ss.quantile(thedata, 0.18182), ss.quantile(thedata, 0.09091)];
    computed_breaks.min = min;
    computed_breaks.max = max;
    computed_breaks.mean = ss.mean(thedata);
    computed_breaks.median = median;
    computed_breaks.stddev = stddev;
    computed_breaks.sample = [];

    return computed_breaks;
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
