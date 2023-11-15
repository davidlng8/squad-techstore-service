import { Request, Response } from 'express';
import dbPool  from '../db/dbPool';
import joi from 'joi';

// TODO: consider moving to separate schema folder/file.ts
const itemSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    img_url: joi.string().uri(),
});

// getting all Items from DB
const getItems = async (req: Request, res: Response) => {
    let status = 500;
    let message = 'Internal Server Error';
    let json = {};
    try {
        const result = await dbPool.query('SELECT * FROM items;');
        status = 200;
        message = result.rows.length == 0 ? 'No records available.' : '';
        json = result.rows;
    } catch (error) {
        console.error('Error retrieving item:', error);
    }
    console.log('Respond to request: items');
    return res.status(status).json({ message: message, data : json});
};

// Get an item by the ID
const getItem = async (req: Request, res: Response) => { 
    const itemId = parseInt(req.params.id, 10);
    let status = 500;
    let message = 'Internal Server Error';
    let json = {};
    try {
        const result = await dbPool.query('SELECT * FROM items WHERE id = $1;', [itemId]);
        status = 404;
        message = 'Item not found';
        if (result.rows.length > 0) {
            status = 200;
            json = result.rows[0];
            message = null;
        }
    } catch (error) {
        console.error('Error retrieving item:', error);
    }
    console.log(`Respond to request: items/${itemId}`);
    return res.status(status).json({ message: message, data : json});
}

const addItem = async (req: Request, res: Response) => { 
    const { error, value } = itemSchema.validate(req.body, { stripUnknown: true });
    let status = 400;
    let message = 'Unable to add item. Missing required fields';
    let json = {};
    if (error) {
        message = error.details[0].message;
    } else {
        const { name, description, price, img_url } = value;
        if (name && description && price) {
            try {
                const result = await dbPool.query(
                    'INSERT INTO items (name, description, price, img_url) \
                    VALUES ($1, $2, $3, $4) \
                    RETURNING *',
                    [name, description, price, img_url]
                );
                message = 'Unable to add item in DB.';
                status = 500;
                if (result.rows.length > 0) {
                    status = 200;
                    message = 'Successfully added the product.';
                    // Return the object so the application can update the view
                    json = result.rows[0];
                }
            } catch (exception) {
                console.error('Error adding item:', exception);
                status = 500;
                message = exception.message;
            }   
        }
    }
    console.log('Adding a new item: items/{id}');
    return res.status(status).json({ message: message, data: json });
}

const updateItem = async (req: Request, res: Response) => {
    const { error, value } = itemSchema.validate(req.body, { stripUnknown: true });
    const itemId = parseInt(req.params.id, 10);
    let status = 400;
    let message = 'At least one valid field is required for update';
    let json = {};
    if (error) {
        message = error.details[0].message;
    } else {
        const { name, description, price, img_url } = value;
        if (name || description || price || img_url) {
            message = 'Item not found in DB for update.';
            status = 404;
            try {
                const result = await dbPool.query(
                    'UPDATE items \
                    SET name = $1, description = $2, price = $3, img_url = $4 \
                    WHERE id = $5 RETURNING *',
                    [name, description, price, img_url, itemId]
                );
                if (result.rows.length > 0) {
                    status = 200;
                    message = 'Successful product update';
                    // Return the updated object so the application can update the view
                    json = result.rows[0];
                }
            } catch (exception) {
                console.error('Error updating item:', exception);
                status = 500;
                message = exception.message;
            }   
        }
    }
    console.log(`Editing a new item: items/${itemId}`);
    return res.status(status).json({ message: message, data: json });
}

const deleteItem = async (req: Request, res: Response) => {
    const itemId = parseInt(req.params.id, 10);
    let status = 500;
    let message = 'Internal Server Error';
    try {
        const result = await dbPool.query('DELETE FROM items WHERE id = $1;', [itemId]);
        status = 404;
        message = 'item does not exist for deletion';
        if (result.rowCount > 0) {
            status = 200;
            message = 'Deletion success.';
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        message = error.message || message;
    }
    console.log('Removing an item: items/{id}');
    return res.status(status).json({ message: message});
}

export { getItems, getItem, addItem, updateItem, deleteItem }