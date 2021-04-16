// @ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next'
import type { Image } from "@utils/api.types";
import supabase from "@utils/database";
import count from "@utils/count";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    return res.json({
        success: true,
        message: "The valid routes are:",
        routes: [
            {
                route: "/yeens",
                amount: await count('yeens')
            },
            {
                route: "/wolves",
                amount: await count('wolves')
            },
            {
                route: "/foxes",
                amount: await count('foxes')
            },

        ].sort((a, b) => a.amount + b.amount)
    })
}