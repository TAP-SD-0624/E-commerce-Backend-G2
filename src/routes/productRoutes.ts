import { Router } from 'express';
import { createPost, getAllPosts, getAllPostsByUserId, getPostByPostId, updatePost, deletePost } from '../controllers/productController';
//import {validatePostRequest, validateUserRequest} from "../middleware/middleware";

const postRouter: Router = Router();

// post routes
postRouter.post('/posts',createPost);
postRouter.get('/posts', getAllPosts);
postRouter.get('/posts/:userId/posts', getAllPostsByUserId);
postRouter.get('/posts/:postId',getPostByPostId);
postRouter.put('/posts/:postId', updatePost);
postRouter.delete('/posts/:id', deletePost);


export default postRouter;