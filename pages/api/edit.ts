import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != 'PATCH') {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req);
        const { name, username, bio, profileImage, coverImage } = req.body;

        if (!name || !username) {
            return res.status(400).json({ error: 'Missing Fields' });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error during update operation:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
