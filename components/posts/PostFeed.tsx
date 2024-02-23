import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
  usedId?: string;
}


const PostFeed : React.FC<PostFeedProps> = ({ usedId }) => {
    const { data: posts =[] } = usePosts(usedId);
  return (
    <> 
      {posts.map((post: Record<string, any>) => (
        <PostItem 
        usedId = {usedId}
        key={post.id} 
        post={post} 
        />
      ))}
    </>
  );
}
export default PostFeed;