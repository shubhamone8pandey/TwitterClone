import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";

const useFollow = (userId: string) => {
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);

    const loginModal = useLoginModal();

    const isFolllwing = useMemo(() => {
        const list = currentUser?.followingIds || [];

        return list.includes(userId);
    }, [userId, currentUser?.followingIds]);
    
    const toggleFollow = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
         
        try {
            let request;

            if (isFolllwing) {
                request = axios.delete('api/follow', { data: {userId}});
            } else{
                request = () => axios.post('api/follow', { userId});
            }

            await request();

            mutateCurrentUser();
            mutateFetchedUser();

            toast.success('Success')
        } catch (error) {
            toast.error('Failed');
        }
    }, [currentUser,
        isFolllwing,
        userId,
        loginModal,
        mutateCurrentUser,
        mutateFetchedUser
    ]);

    return {
        isFolllwing,
        toggleFollow
    }
}

export default useFollow;