const router = require("express").Router();
const dialogflow = require("dialogflow");
const uuid = require("uuid");
const projectId = process.env.GOOGLE_PROJECT_ID
const sessionId = process.env.DIALOGFLOW_SESSION_ID



//two routes for dialgoflow
// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

//text query route
router.post("/textQuery", async (req, res) => {
  try {
    //we need to send some info to dialog from client
          // The text query request.
          console.log(req.body.text);
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: req.body.text,
            // The language used by the client (en-US)
            languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE,
          },
        },
      };
      // Send request and log result
      const responses = await sessionClient.detectIntent(request);
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
    res.status(200).json(result)
  } catch (error) {
      console.log(error);
  }
});

//text query route
router.post("/eventQuery", async (req, res) => {
    try {
      //we need to send some info to dialog from client
            // The text query request.
        const request = {
          session: sessionPath,
          queryInput: {
            event: {
              // The query to send to the dialogflow agent
              name : req.body.name,
              // The language used by the client (en-US)
              languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE,
            },
          },
        };
        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
          console.log(`  Intent: ${result.intent.displayName}`);
        } else {
          console.log(`  No intent matched.`);
        }
      res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
  });

module.exports = router;
