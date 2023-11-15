import express from 'express';
import { getItems, getItem, addItem, updateItem, deleteItem } from '../controllers/items';

const router = express.Router();
/* Executed on every request. Can be used as a logging layer or preprocessng layer*/
/*router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});*/

router.get('/', getItems);
router.get('/:id(\\d+)', getItem);
router.post('/', addItem);
router.put('/:id(\\d+)', updateItem);
router.delete('/:id(\\d+)', deleteItem);

export {router};
