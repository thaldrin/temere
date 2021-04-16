import type { NextApiRequest, NextApiResponse } from 'next'
import FolderCategory from "@utils/category"
import apikey from "@utils/apikey"


import { Image } from "@utils/api.types"
import cache from '@utils/cache'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { category } = req.query
    let folder: string = FolderCategory(category)
    if (folder === "none") return res.status(404).json({
        success: false,
        message: "There is no Category with that name."
    })
    let authed = await apikey(req.headers)

    if (!authed.success) return res.json(authed)
    // @ts-ignore
    let data: Image[] = cache.get(category)
    if (!data) {
        // @ts-ignore
        data = [{
            id: 16918,
            folder: "wolves",
            file: "9b7938f053faef5e318e6168fffc9954",
            ext: "jpg",
            // @ts-ignore
            notes: [
                { id: 1, note: "Your are not supposed to see this Note, it will only show up when the cache of the API hasn't been called yet" },
                { id: 2, note: "If you know how to have Next.js call something on startup, please send a PR in the thaldrin/temere repo" },
            ]
        }]
    }

    let image = data[Math.floor(Math.random() * data.length)];
    // @ts-ignore
    if (!image.sources) image.sources = undefined

    return res.json({
        data: image,
        url: `https://thaldrin.media/${image.folder}/${image.file}.${image.ext}`
    })
}