const sgMail=require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail= (email,name)=>{
    sgMail.send({
        to: email,
        from:'aditya.rana@truminds.co.in',
        subject:'Thanks for joining in!',
        text:`Welcome to the app, ${name}. Let me know about you :P` // back text `
        
    })
}

const sendCancelEmail= (email,name)=>{
    sgMail.send({
        to:email,
        from:'aditya.rana@truminds.co.in',
        subject:'Why so soon?',
        text:`Sorry to see you go ${name}. Hope we see you back again :)`
    })
}

module.exports={
    sendWelcomeEmail,sendCancelEmail
}

// sgMail.send({
//     to:'thisisrana09aditya@gmail.com',
//     from:'aditya.rana@truminds.co.in',
//     subject:'This is my first creation',
//     text:'hello aditya!'
// })