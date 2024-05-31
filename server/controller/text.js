// const express = require('express');
// const TextData = require('../model/text');
// const send= async (req, res) => {
//     const { userId, content } = req.body;
//     console.log(userId, content)
//     try {
//       const textData = new TextData({ userId, content });
//       await textData.save();
//       res.status(201).send('Content saved successfully');
//     } catch (error) {
//       res.status(400).send('Error saving content');
//     }
//   };
//   const recieve= async (req, res) => {
//     const { userId } = req.params;
//     console.log(userId)
//     try {
//       const user = await TextData.findOne({userId:userId});
//       if (user) {
//         res.json({ content: user.content });
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
//   };
  
//   module.exports = { send, recieve};
const express = require('express');
const TextData = require('../model/text');

const send = async (req, res) => {
    const { userId, content } = req.body;
    console.log(userId, content);

    try {
        const user = await TextData.findOneAndUpdate(
            { userId },
            { content },
            { new: true, upsert: true } // `upsert: true` creates a new document if no match is found
        );

        if (user) {
            res.status(200).send('Content updated successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(400).send('Error updating content');
    }
};

const receive = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);

    try {
        const user = await TextData.findOne({ userId });
        if (user) {
            res.json({ content: user.content });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { send, receive };
