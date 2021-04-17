// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next'
import type { Image } from "@utils/api.types";
import supabase from "@utils/database";
import count from "@utils/count";
import routes from "@utils/routes";
export default async (req: NextApiRequest, res: NextApiResponse) => {



    return res.json({
        success: true,
        message: "The valid routes are:",
        routes
    })
}