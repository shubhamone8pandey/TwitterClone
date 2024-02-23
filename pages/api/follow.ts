import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth  from "@/libs/serverAuth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != "POST" && req.method != "DELETE") {
        return res.status(405).end();
}
try{
    const { userId } = req.body;
    const { currentUser } = await serverAuth(req);
    
    if(!userId || typeof userId != "string"){
        throw new Error("Invalid Id");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if(!user){
        throw new Error("Invalid Id");
    }

    let updatedFollowIds = [...(user.followingIds || [])];

    if(req.method == "POST"){
        updatedFollowIds.push(userId);
    }

    if(req.method == "DELETE"){
        updatedFollowIds = updatedFollowIds.filter(followingId => followingId != userId);
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            followingIds: updatedFollowIds
        }
    });
    return res.status(200).json(updatedUser);
}catch(error){
    console.log(error);
    return res.status(500).end()
}
}