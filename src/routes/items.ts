import express from 'express';
import itemsController from '../controllers/items';

const router = express.Router();
/* Executed on every request. Can be used as a logging layer or preprocessng layer*/
/*router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});*/

router.get('/', itemsController.getItems);
router.get('/:id', itemsController.getItem);
router.post('/', itemsController.addItem);
router.put('/:id', itemsController.updateItem);
router.delete('/:id', itemsController.deleteItem);

export {router};
