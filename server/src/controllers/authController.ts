import { FastifyReply, FastifyRequest } from "fastify";
import { redis } from "../database/redis";
import { z } from "zod";
import { db } from "../database";
import { generate6DigitsNumber } from "../utils/utils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authConfig } from "../config/auth";
import { twilio, twilioConfig } from "../config/twilio";

export class AuthController {
    async authOtp(request: FastifyRequest, reply: FastifyReply) {
        const authSchema = z.object({
            otp: z.number(),
            deviceId: z.string(),
            phone: z.string()
        });
        const { otp, deviceId, phone } = authSchema.parse(request.body);

        // buscar nr
        const verified_phone = await redis.get(`otp_${otp}`);
        // verificar se existe
        if(!verified_phone || verified_phone != phone ) {
            return reply.status(401).send({ error: 'OPT invalido!' });
        }
        // actualizar o user
        const subscriber = await db.subscriber.update({
            data: {
                deviceId: deviceId,
                verified: true
            },
            where: {
                phone: verified_phone
            },
            include: {
                province: true,
                district: true
            }
        })
        // eliminar o opt
        await redis.delete(`otp_${otp}`);

        return reply.send(subscriber);
    }

    async loginSubscriber(request: FastifyRequest, reply: FastifyReply) {
        const loginSchema = z.object({
            phone: z.string().regex(/^8[2-7]\d{7}/)
        });
        const { phone } = loginSchema.parse(request.body);

        const subscriber = await db.subscriber.findUnique({
            where: {
                phone: phone
            }
        });

        // verificar se o subscriber existe
        if(!subscriber) {
            return reply.status(400).send({ error: 'Usuario nao encontrado' });
        }

        // Gerar um OTP
        const optCode = generate6DigitsNumber();
        console.log(optCode);
        await redis.set(`otp_${optCode}`, phone, 60 * 3);

        // const message = await twilio.messages.create({
        //     body: `Use esse codigo para confirmar o seu numero: ${optCode}`,
        //     from: twilioConfig.from,
        //     to: `+258${phone}`
        // });

        // console.log(message);


        return reply.status(204).send();
    }

    async loginAdmin(request: FastifyRequest, reply: FastifyReply) {
        // receber credenciais
        const adminSchema = z.object({
            email: z.string().email(),
            password: z.string()
        });
        const { email, password } = adminSchema.parse(request.body);
        const admin = await db.admin.findUnique({
            where: {
                email: email
            }
        });

        // se nao encontrar um admin com o email
        if(!admin) {
            return reply.status(401).send({ error: 'Email ou Password inválido' });
        }

        // se nao o password nao estiver correcto
        if(! (await bcrypt.compare(password, admin.password))) {
            return reply.status(401).send({ error: 'Email ou Password inválido' });
        }

        const token = jwt.sign({id: admin.id}, authConfig.secret, { expiresIn: authConfig.expiresIn });

        return reply.send({
            token,
            admin: {
                ...admin,
                password: undefined
            }
        });
    }

    async generateOtp(request: FastifyRequest, reply: FastifyReply) {
        const loginSchema = z.object({
            phone: z.string().regex(/^8[2-7]\d{7}/)
        });

        const { phone } = loginSchema.parse(request.body);

        const subscriber = await db.subscriber.findUnique({
            where: {
                phone: phone
            }
        });

        // verificar se o subscriber existe
        if(!subscriber) {
            return reply.status(400).send({ error: 'Usuario nao encontrado' });
        }

        // Gerar um OTP
        const optCode = generate6DigitsNumber();
        console.log(optCode);
        await redis.set(`otp_${optCode}`, phone, 60 * 3);

        const message = await twilio.messages.create({
            body: `Use esse codigo para confirmar o seu numero: ${optCode}`,
            from: twilioConfig.from,
            to: `+258${phone}`
        });

        return reply.status(201).send();
    }
}