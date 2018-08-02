const fs = require('fs');

module.exports = {
    editAppointmentPage: (req, res) => {
        let caseId = req.params.case_id;
        let query1 = "call query_appointments()"; // query database
        let query2 =  "select * from temp_table_appointments WHERE case_id = '" + caseId + "' ";
        db.query(query1, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(query2, (err,result) => {
                res.render('edit-appointment.ejs', {
                    title: "Edit  Case"
                    , casei: result[0]
                    , message: ''
                });
            });
        });
    },
    editAppointment: (req, res) => {
        let caseId = req.params.case_id;
        let appointment_time = req.body.appointment_time;
        let licence_id_consultant = req.body.licence_id_consultant;
        let nric = req.body.nric;

        let query1 = "UPDATE cases SET appointment_time = '" + appointment_time + "' WHERE cases.case_id = '" + caseId + "'";
        let query2 = "INSERT INTO case_consultants VALUES('" + caseId + "','" + licence_id_consultant + "')";
        console.log(query2);
        db.query(query1, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(query2, (err, result) => {
                const title = "this is the notif title";
                const body = "this is the body";
                const urlString = 'http://localhost:1337/api/v1/notifications/push-notification?' +
                    'nric=' +nric + "+title=" + title + "+body=" + body;

                fetch(urlString,{
                    method:'POST',
                });

                res.redirect('/');
            });
        });
    },

    editAdvicePage: (req, res) => {
        let caseId = req.params.case_id;
        let query1 = "call query_appointments()"; // query database
        let query2 =  "select * from temp_table_appointments WHERE case_id = '" + caseId + "' ";
        db.query(query1, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(query2, (err,result) => {
                res.render('edit-advice.ejs', {
                    title: "Edit  Advice"
                    , casei: result[0]
                    , message: ''
                });
            });
        });
    },
    editAdvice: (req, res) => {
        let caseId = req.params.case_id;
        let notification_id = Math.floor(Math.random()*10000000) + 1;
        let selection_sent = req.body.selection_sent;
        let selection = req.body.selection;
        let consultant_input = req.body.consultant_input;
        let query4 = "INSERT INTO case_notifications VALUES('" + caseId + "','" + notification_id + "')";
        let query3 = "INSERT INTO notifications VALUES ('" + notification_id + "','" + consultant_input +  "','" + selection +  "','" + selection_sent + "')";

        // let query5 = "UPDATE notifications SET licence_id_consultant = '" + consultant_input + "', selection = '" + selection + "', selection_sent = '" + selection_sent +"' WHERE notifications.notification_id = '" + notification_id + "'";
        console.log (query3);
        console.log(query4);
        db.query(query3, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(query4, (err, result) => {

                res.redirect('/');
            });
        });
    },

};
