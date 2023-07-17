import { PrismaClient } from "@prisma/client";
import express, { Request, Response, Router } from "express";

export class UsersController {
    private router: Router;
    private dataBase: PrismaClient;

    constructor (database: PrismaClient) {
        this.dataBase = database;
        this.router = express.Router();
        this.router.get("/", this.getUsers);
        this.router.post("/", this.addUser);
        this.router.delete("/:id", this.deleteUser);
        this.router.put("/:id", this.updateUser);
    }

    public getRouter = () => {
        return this.router;
    }

    private getUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.dataBase.user.findMany();
            return res.status(200).json(users);
        } catch (error) {
            const err = {
                message: "Пользователи не найдены"
            }
            return res.status(400).send(err);
        }
    }

    private addUser = async (req: Request, res: Response) => {
        try {
            const newUser = await this.dataBase.user.create({
                data: req.body
            })
            return res.status(200).json(newUser);
        } catch (error) {
            const err = {
                message: "ошибка создания пользователя"
            }
            return res.status(400).send(err);
        }
    }

    private deleteUser = async (req: Request, res: Response) => {
        try {
            const deletedUser = await this.dataBase.user.delete({
                where: {
                    id: req.params.id
                }
            })
            return res.status(200).json(deletedUser);
        } catch (error) {
            const err = {
                message: "Пользователь не найден"
            }
            return res.status(400).send(err);
        }
    }

    private updateUser = async (req: Request, res: Response) => {
        try {
            const newUser = await this.dataBase.user.update({
                where: {
                    id: req.params.id
                },
                data: req.body
            })
            return res.status(200).json(newUser);
        } catch (error) {
            const err = {
                message: "Ошибка данных"
            }
            return res.status(400).send(err);
        }
    }
}