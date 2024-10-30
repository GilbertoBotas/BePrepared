import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../database";
import bcrypt from 'bcrypt';

export class AdminController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const adminSchema = z.object({
            name: z.string(),
            email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
            password: z.string()
        });

        const { name, email, password } = adminSchema.parse(request.body);

        const admin = await db.admin.findUnique({
            where: {
                email: email
            }
        });

        console.log(admin);

        if(admin) {
            return reply.status(401).send({ error: "Admin ja existe com este email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdAdmin = await db.admin.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            } 
        });


        return reply.status(201).send(createdAdmin);
    }
}