import type { NextApiRequest, NextApiResponse } from 'next'
import FolderCategory from "@utils/category"
import apikey from "@utils/apikey"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { category } = req.query
    let folder: string = FolderCategory(category)
    if (folder === "none") return res.status(404).json({
        success: false,
        message: "There is no Category with that name."
    })
    let authed = await apikey(req.headers)

    if (!authed.success) return res.json(authed)

    console.log('request')
    return res.json(folder)
}