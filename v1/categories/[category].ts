import type { NextApiRequest, NextApiResponse } from 'next'
import FolderCategory from "@utils/category"
import apikey from "@utils/apikey"
import supabase from "@utils/database"
import { Image } from "@utils/api.types"

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
    let { data, error } = await supabase.from<Image>('images').select('*').eq("folder", folder)
    if (!data) return res.json(false)

    let image = data[Math.floor(Math.random() * data.length)];
    // @ts-ignore
    if (!image.sources) image.sources = undefined

    return res.json({
        data: image,
        url: `https://thaldrin.media/${image.folder}/${image.file}.${image.ext}`
    })
}