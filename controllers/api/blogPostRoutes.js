// const router = require('express').Router();
// const { BlogPost } = require('../../models');
// const withAuth = require('../../utils/auth');

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newblogPost = await BlogPost.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newblogPost);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const blogPostData = await BlogPost.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!blogPostData) {
//       res.status(404).json({ message: 'No blogPost found with this id!' });
//       return;
//     }

//     res.status(200).json(blogPostData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newblogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newblogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [rowsAffected, [updatedblogPost]] = await BlogPost.update(
      { name: req.body.name, description: req.body.description },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
        returning: true,
      }
    );

    if (!rowsAffected) {
      res.status(404).json({ message: 'No blogPost found with this id!' });
      return;
    }

    res.status(200).json(updatedblogPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No blogPost found with this id!' });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;