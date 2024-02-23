import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import { formatDistance, formatDistanceToNowStrict } from 'date-fns';



interface PostItemProps {
    data: Record<string, any>;
    usedId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, usedId }) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const { data: currentUser } = useCurrentUser();

    const goToUser = useCallback((event:any) => {
        event.stopPropagation();
        
        router.push(`/user/${usedId}`);
    }, [router, data.user.id]);

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, [router, data.id]);

    const onLike = useCallback((event: any) => {
        event.stopPropagation();

        loginModal.onOpen();
    },[loginModal])

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data?.createdAt]);


    return (
        <div onClick={goToPost}
        className="border-b-[1px]
        border-neutral-800
        p-5
        cursor-pointer
        hover:bg-neutral-900
        transition-all
        duration-300-
        "></div>
    );
}

export default PostItem;