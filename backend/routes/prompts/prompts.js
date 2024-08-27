const express = require('express');
const router = express.Router();
const { generatePrompt } = require('../../helpers/groqClient');

router.get('/generate', async (req, res) => {
    const prompt = 'Generate a neutral prompt that can be answered -- something about their day, life, emotions, etc, this has to be completely uncorrelated with music please make sure of that'
    const completion = await generatePrompt();
    return res.json(completion);
}
);

module.exports = router;