import type { NextApiRequest, NextApiResponse } from 'next'

// @ts-ignore
export default (req: NextApiRequest, res: NextApiResponse) => {
    return res.json({
        success: true
    })
}