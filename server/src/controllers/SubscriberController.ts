import { FastifyReply, FastifyRequest } from "fastify";
import { generate6DigitsNumber } from "../utils/utils";
import { db } from "../database";
import { z } from 'zod';
import { redis } from "../database/redis";
import { twilio, twilioConfig } from "../config/twilio";

export class SubscriberController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const subscriberSchema = z.object({
            phone: z.string().regex(/^8[2-7]\d{7}/),
            provinceId: z.string(),
            districtId: z.string()
        });

        const { phone, provinceId, districtId } = subscriberSchema.parse(request.body);
        console.log(phone);
        // Verificar se existe
        const subscriberExists = await db.subscriber.findUnique({where: { phone: phone, verified: true }});
        if(subscriberExists) {
            return reply.status(401).send({ error: 'Usuario ja existente' })
        }

        // Verificar se o distrito esta relacionado com a provincia
        const districtExists = await db.district.findUnique({ 
            where: {
                id: districtId,
                provinceId
            }
        });
        if(!districtExists) {
            return reply.status(400).send({ error: 'Distrito nao pertencente a provincia' })
        }


        // Gerar um OTP
        const optCode = generate6DigitsNumber();
        console.log(optCode);
        await redis.set(`otp_${optCode}`, phone, 60 * 3);
        // Enviar o OTP por SMS

        const message = await twilio.messages.create({
            body: `Use esse codigo para confirmar o seu numero: ${optCode}`,
            from: twilioConfig.from,
            to: `+258${phone}`
        });

        // Guardar na BD
        const savedSubscriber = await db.subscriber.upsert({
            where: {
                phone: phone
            },
            update: {
                districtId: districtId,
                provinceId: provinceId
            },
            create: {
                phone: phone,
                districtId: districtId,
                provinceId: provinceId
            }
        })
        return reply.status(201).send(savedSubscriber);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        console.log(request.headers.authorization);
        const deviceId = z.string().parse(request.headers.authorization);
        const subscriberSchema = z.object({
            provinceId: z.string().optional(),
            districtId: z.string()
        });

        const { provinceId, districtId } = subscriberSchema.parse(request.body);

        const subscriber = await db.subscriber.findUnique({
            where: {
                deviceId: deviceId,
                verified: true
            }
        });

        // verificar se o subscriber existe
        if(!subscriber) {
            return reply.status(401).send({ error: 'Erro de autenticacao' });
        }

        // Verificar se o distrito esta relacionado com a provincia
        const districtExists = await db.district.findUnique({ 
            where: {
                id: districtId,
                provinceId: provinceId
            }
        });
        
        if(!districtExists) {
            return reply.status(400).send({ error: 'Distrito nao pertencente a provincia' })
        }


        // actualizar user
        const updatedSubscriber = await db.subscriber.update({
            where: {
                deviceId: deviceId
            },
            data: {
                provinceId: provinceId,
                districtId: districtId
            }
        });

        return reply.send(updatedSubscriber);
    }
}