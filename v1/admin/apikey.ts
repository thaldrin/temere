import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from "jsonwebtoken"
import { NOT_ALLOWED, BAD_REQUEST, UNAUTHORIZED, OK } from "@utils/responses";
import supabase from "@utils/database";
import { Key } from '@utils/api.types';
// @ts-ignore
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return res.status(NOT_ALLOWED).json({
        success: false,
        message: `Only Post requests are allowed.`
    });

    let passed_apikey = req.headers["authorization"]
    if (!passed_apikey) return res.status(UNAUTHORIZED).json({
        success: false,
        message: "You have not passed an API Key into the Authorization Header."
    })

    let { owner, reason } = req.body
    if (!owner || !reason) return res.status(BAD_REQUEST).json({
        success: false,
        message: "You need to define an owner and a reason for the API Key to be created."
    })


    let data = {
        owner, reason, issued: new Date()
    }

    // @ts-ignore
    let apikey = jwt.sign(data, process.env.JWT_SECRET)

    let { data: apikey_data, error: apikey_error } = await supabase.from<Key>("apikeys").insert({
        key: apikey,
        owner, reason
    })
    if (apikey_error) return res.status(BAD_REQUEST).json({
        success: false,
        message: "We encountered an Error while generating / inserting your API Key"
    })
    // @ts-ignore
    return res.status(OK).json(apikey_data[0])

}


// TODO Generate API Keys