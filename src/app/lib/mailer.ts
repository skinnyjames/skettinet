import dotenv from 'dotenv'
// @ts-ignore
import MailGun from 'mailgun-es6'

dotenv.config()
const apiKey = process.env.MAILGUN_API_KEY
const domain = process.env.MAILGUN_DOMAIN 


const mailGun: any = new MailGun({
  privateApi: apiKey,
  domainName: domain
})

export = {
  resetPassword(details: any) {
    const html = `
      Please go to ${details.host}/password/${details.uuid} to reset your password
    `
    return mailGun.sendEmail({
      html: html,
      to: details.email,
      from: 'ziggy@sketti.net',
      subject: 'Password reset instructions'
    })
  }
}