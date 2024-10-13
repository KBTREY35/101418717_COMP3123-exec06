const express = require('express');
const router = express.Router();
const Note = require('../models/NotesModel');

// Create a new Note
router.post('/notes', async (req, res) => {
    if (!req.body.noteTitle) {
        return res.status(400).send({
            message: "Note title cannot be empty"
        });
    }

    const note = new Note({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority
    });

    try {
        const savedNote = await note.save();
        res.status(201).send(savedNote);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Note."
        });
    }
});

// Retrieve all Notes
router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).send(notes);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving the notes."
        });
    }
});

// Retrieve a single Note with noteId
router.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await Note.findById(req.params.noteId);
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(200).send(note);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving the note."
        });
    }
});

// Update a Note with noteId
router.put('/notes/:noteId', async (req, res) => {
    if (!req.body.noteTitle) {
        return res.status(400).send({
            message: "Note title cannot be empty"
        });
    }

    try {
        const note = await Note.findByIdAndUpdate(req.params.noteId, {
            noteTitle: req.body.noteTitle,
            noteDescription: req.body.noteDescription,
            priority: req.body.priority,
            dateUpdated: Date.now()
        }, { new: true });

        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(200).send(note);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while updating the note."
        });
    }
});

// Delete a Note with noteId
router.delete('/notes/:noteId', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.noteId);
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(200).send({ message: "Note deleted successfully!" });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Could not delete note with id " + req.params.noteId
        });
    }
});

module.exports = router;
