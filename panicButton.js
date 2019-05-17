/**
 * This is a sample Lambda function that sends an SMS on click of a
 * button. It needs one permission sns:Publish. The following policy
 * allows SNS publish to SMS but not topics or endpoints.
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "sns:Publish"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Deny",
            "Action": [
                "sns:Publish"
            ],
            "Resource": [
                "arn:aws:sns:*:*:*"
            ]
        }
    ]
}
 *
 * The following JSON template shows what is sent as the payload:
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
 *
 * A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 * "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 *
 * For more documentation, follow the link below.
 * http://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html
 */

'use strict';

const AWS = require('aws-sdk');

const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });
const PHONENUMBER = '6581136652'; // Replace with your number

exports.handler = (event, context, callback) => {
    console.log('Received event:', event);


if (event.clickType == "LONG")
{
    const payload = JSON.stringify(event);
    const params = {
        PhoneNumber: PHONENUMBER,
        Message: "HELP! I've fallen and I can't up! -Grandma",
    };
    SNS.publish(params, callback);
  }

  if (event.clickType == "SINGLE")
  {
    const payload = JSON.stringify(event);
    const params = {
      PhoneNumber: PHONENUMBER,
      Message: "I am going downstairs for a walk! -Grandma",
  };
    SNS.publish(params, callback);
  }

  if (event.clickType == "DOUBLE")
  {
    const payload = JSON.stringify(event);
    const params = {
      PhoneNumber: PHONENUMBER,
      Message: "I am okay! -Grandma",
  };
    SNS.publish(params, callback);
  }

    // result will go to function callback

};
