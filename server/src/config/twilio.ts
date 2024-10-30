import { Twilio } from "twilio";
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from '../utils/env';
export const twilio = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
export const twilioConfig = {
    from: '+16184089112'
}