// Imports //
import { Request, Response, Router } from 'express';

// Import models //
import taskModel from '../models/task.model';

// Class //
class TasksRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    };

    public writeTask(req: Request, res: Response) {
        res.render('tasks/create');
    };

    public async createTask(req: Request, res: Response): Promise <void> {
        let newTask = new taskModel(req.body);
        await newTask.save();
        console.log(newTask);
        res.render('tasks/create');
        res.redirect('/tasks/list');
    };

    public async listTasks(req: Request, res: Response): Promise <void> {
        let listTask = await taskModel.find();
        console.log(listTask);
        res.render('tasks/list', { listTask });
    };

    public async editTask(req: Request, res: Response): Promise <void> {};

    public async deleteTask(req: Request, res: Response): Promise <void> {
        let { id } = req.params;
        await taskModel.findByIdAndDelete(id);
        res.redirect('/tasks/list');
    };

    routes() {
        this.router.get('/write', this.writeTask);
        this.router.post('/create', this.createTask);
        this.router.get('/list', this.listTasks);
        this.router.get('/delete/:id', this.deleteTask);
    };
};

// Activate IndexRoutes //
let tasksRoutes = new TasksRoutes();

// Exports //
export default tasksRoutes.router;