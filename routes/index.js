const promise = require('es6-promise').Promise;
require('isomorphic-fetch');
module.exports = {
    getHomePage: (req, res) => {
        // var p = new Promise(function(resolve, reject) {
        //     // do stuff
        //
        //     const response = fetch('http://localhost:1337/scheduler/ranked-cases')
        //
        //         if (response) {
        //         console.log("Response success")
        //             resolve(response)
        //         } else {
        //             reject(Error("Failed to fetch"))
        //         }
        //     })
        //
        // p.then(function(response) {
        //     console.log("Response then is + " +res.json())
        //     res.render('index.ejs', {
        //                     title: "NUHS Referral Cases "
        //                     , cases: response.json()
        //                 });
        // })
        let query1 = "call query_appointments()"; // query database
        let query2 =  "select * from temp_table_appointments";
        // execute query
        db.query(query1, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            db.query(query2, (err, result) => {
                //console.log(JSON.stringify(result, null, 2))
                res.render('index.ejs', {
                    title: "NUHS Referral Cases "
                    , cases: result
                });
            });
        });
    },
};