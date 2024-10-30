import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import jwt from 'jsonwebtoken';
import { authConfig } from "../config/auth";

export function authHook(request: FastifyRequest, reply: FastifyReply, done: (error?: FastifyError) => void) {
    const [, token] = z.string().parse(request.headers.authorization).split(' ');
    console.log(token);
    done();

    // try{
    //     const payLoad = jwt.verify(token, authConfig.secret)
    //     // console.log(payLoad);
    //     done();
    // } catch (error) {
    //     return reply.status(401).send({ error: jwt.verify(token, authConfig.secret) })
    // }

}