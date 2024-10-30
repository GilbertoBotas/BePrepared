import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../database";
import dayjs from "dayjs";

export class NotificationController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const deviceId = z.string().parse(request.headers.authorization);
        console.log(deviceId)
        const notificationSchema = z.object({
            message: z.string()
        });

        const { message } = notificationSchema.parse(request.body);

        const subscriber = await db.subscriber.findUnique({
            where: {
                deviceId: deviceId,
                verified: true
            }
        });
        console.log(subscriber);

        // verificar se o subscriber existe
        if(!subscriber) {
            return reply.status(401).send({ error: 'Erro de autenticacao' });
        }

        const notification = await db.notification.create({
            data: {
                message: message,
                subscriberId: subscriber.id
            }
        });

        return reply.status(201).send(notification);
    }

    async show(request: FastifyRequest, reply: FastifyReply) {
        const paramsSchema = z.object({
            phone: z.string()
        });
        const deviceId = z.string().parse(request.headers.authorization);
        console.log(deviceId)

        const { phone } = paramsSchema.parse(request.params);
        console.log(phone);

        const subscriber = await db.subscriber.findUnique({
            where: {
                deviceId: deviceId,
                verified: true,
                phone: phone
            }
        });

        // verificar se o subscriber existe
        if(!subscriber) {
            return reply.status(401).send({ error: 'Erro de autenticacao' });
        }

        const notifications = await db.notification.findMany({
            where: {
                subscriberId: subscriber.id
            }
        })

        return reply.status(200).send(notifications);
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const querySchema = z.object({
            page: z.coerce.number().optional()
        });
        const { page = 0 } = querySchema.parse(request.query);
        const notifications = await db.notification.findMany({
            where: {
                createdAt: {
                    gte: dayjs().subtract(28, 'day').format()
                },
            },
            include: {
                subscriber: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip: page * 10,
            take: 10
        })

        return reply.status(200).send(notifications);
    }
}