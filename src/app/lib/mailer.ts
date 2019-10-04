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
}