import express from 'express';
import itemsController from '../controllers/items';

const router = express.Router();
/* Executed on every request. Can be used as a logging layer or preprocessng layer*/
/*router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});*/

router.get('/', itemsController.getItems);
router.get('/:id(\\d+)', itemsController.getItem);
router.post('/', itemsController.addItem);
router.put('/:id(\\d+)', itemsController.updateItem);
router.delete('/:id(\\d+)', itemsController.deleteItem);

export {router};
