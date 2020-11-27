const db = require('../db')();
const COLLECTION = 'users';
const nodemailer = require("nodemailer");
const senderEmail = process.env.EMAIL;
const senderPassword = process.env.PASSWORD;

module.exports = () => {

    const get = async (email = null) => {
        try {
            if (!email) {
                const user = await db.get(COLLECTION);
                return { user };
            }
            const user = await db.get(COLLECTION, { email });
            return { user };
        } catch (err) {
            console.log(err)
            return { error: err };
        }
    }

    const add = async (name, email, usertype, key) => {
        if(!name || !email || !usertype || !key){
            return {
                error: 'Provide all the fields ',
            }
        }

        let transporter = nodemailer.createTransport({
            service:'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: senderEmail, // generated ethereal user
              pass: senderPassword, // generated ethereal password
            },
            tls:{
                rejectUnauthorized: false,
            }
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: 'antoniojosea1221@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Welcome to BugTracker!", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
        
          console.log("Message sent: %s", info.messageId);
        try {

            
            const user = await db.get(COLLECTION, { email });
            if (user.length > 0) {
                return {
                    results: 'User already registered!',
                }
            }
            const results = await db.add(COLLECTION, {
                name: name,
                email: email,
                usertype: usertype,
                key: key,
            })

            return { results };
        } catch (err) {
            console.log(err)
            return { error: err };
        }
    }



    const getByKey = async (email, supliedKey) => {
        if (!supliedKey || !email) {
            return {
                error: "Missing Key or email! "
            }
        }
        try {
            const user = await db.get(COLLECTION, {
                email: email,
            })

            const verify = bcrypt.compareSync(supliedKey, user[0].key);
            if (!verify) {
                return {
                    error: "Wrong Password"
                };
            }
            return user[0];
        } catch (e) {
            return {
                error: e.message,
            }
        }
    }
    return {
        get,
        add,
        getByKey
    }
}
