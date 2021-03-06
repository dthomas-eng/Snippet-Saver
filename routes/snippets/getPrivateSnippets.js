const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Snippet = require("../../models/Snippet");
const colors = require("colors");
const thrownErrorFormatter = require("../../utils/thrownErrorFormatter");
const errorMessageAssembler = require("../../utils/errorMessageAssembler");

//@Desc       Gets all private snippets with authorId matching the current user.
//@Route      GET /snippets/:id
//@Access     Private
router.get("/:id", async (req, res) => {
  try {
    if (req.body.currentUser._id != req.params.id) {
      throw thrownErrorFormatter(
        `Error - attempt to access another users snippets.`
      );
    }

    const snippets = await Snippet.find({ authorId: req.params.id });

    if (snippets.length > 0) {
      res.status(200).json({
        success: true,
        data: snippets,
      });
    } else {
      throw thrownErrorFormatter(`Databse is empty!`);
    }
  } catch (err) {
    const errorMessage = errorMessageAssembler(err);
    res.status(404).json({
      success: false,
      error: errorMessage,
    });
  }
});

module.exports = router;
