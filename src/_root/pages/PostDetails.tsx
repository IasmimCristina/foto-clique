import Loader from '@/components/shared/Loader';
import PostStats from '@/components/shared/PostStats';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useUserContext } from '@/context/AuthContext';
import { useDeletePost, useDeleteSavedPost, useGetPostById } from '@/lib/react-query/queriesAndMutations'
import { formatDateString } from '@/lib/utils';
import React from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

const PostDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { mutate: deletePost } = useDeletePost();

  const { data: post, isPending } = useGetPostById(id || '');
  const { user } = useUserContext();

  const handleDeletePost = () => {
    if (post !== undefined) {

      deletePost({ postId: id, imageId: post?.imageId });
      toast({
        title: "Apagando postagem...",
      })
      navigate(-1);

    }
    else {
      toast({
        title: "Erro",
        description: "Por favor, tente novamente.",
      })
    }

  };


  return (
    <div className="post_details-container">
      {isPending ? <Loader /> : (

        <div className="post_details-card ">
          <img src={post?.imageUrl} alt="Imagem da postagem" className='post_details-img' />

          <div className="post_details-info">
            <div className="flex-between w-full">

              <Link to={`/profile/${post?.creator.$id}`} className='flex items-center gap-3'>
                <img src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="Autor" className='rounded-full w-8 h-8 lg:h-12 lg:w-12' />


                <div className="flex flex-col">
                  <p className='base-meidum lg:body-bold text-light-1'>{post?.creator.name}</p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className='subtle-semibold lg:small-regular'>{formatDateString(post?.$createdAt)}</p>
                    -
                    <p className='subtle-semibold lg:small-regular'>{post?.location}</p>

                  </div>
                </div>
              </Link>


              <div className="flex-center gap-2">
                <Link to={`/update-post/${post?.$id}`} className={` ${user.id !== post?.creator.$id && 'hidden'}`}>
                  <img src="/assets/icons/edit.svg" alt="Editar" width={24} height={24} className='ease-in-out duration-300  hover:w-8' />
                </Link>


                <Button onClick={handleDeletePost}
                  variant={"ghost "}
                  className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && 'hidden'}`}
                >

                  <img src="/assets/icons/delete.svg" alt="Deletar" width={24} height={24} className='ease-in-out duration-300  hover:w-8' />
                </Button>


              </div>
            </div>

            <hr className='border w-full border-dark-4/80' />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p className="flex-gap-1 mt-2">
                {post?.caption}
              </p>
              <ul className='flex gap-1 mt-2'>
                {post?.tags.map((tag: string) => (
                  <li key={tag} className='text-light-3'>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />

            </div>

          </div>
        </div>


      )}
    </div>
  )
}

export default PostDetails