import { Request, Response, NextFunction } from 'express';

// getting all Items from DB
const getItems = async (req: Request, res: Response) => {
    console.log('Respond to request: items');
    return res.status(200).json({ messgage: 'Got it working' })
};

// Get an item by the ID
// TODO: confirm the data passed to the request for the ID (integer is expected)
const getItem = async (req: Request, res: Response) => { 
    console.log('Respond to request: items/{id}');
    return res.status(200).json({ messgage: 'Single item ID - Got it working' });
}

const addItem = async (req: Request, res: Response) => { 
    console.log('Adding a new item: items/{id}');
    return res.status(200).json({ messgage: 'add a new one - Got it working' });
}

const updateItem = async (req: Request, res: Response) => { 
    console.log('Editing a new item: items/{id}');
    return res.status(200).json({ messgage: 'Edit an old one - Got it working' });
}

const deleteItem = async (req: Request, res: Response) => { 
    console.log('Removing a new item: items/{id}');
    return res.status(200).json({ messgage: 'Remove a new one - Got it working' })
}

export default { getItems, getItem, addItem, updateItem, deleteItem}