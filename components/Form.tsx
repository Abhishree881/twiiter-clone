import axios from 'axios';
import { use, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';

import Avatar from './Avatar';
import Button from './Button';
import ImageUpload from './ImageUpload';
import { createPost } from '@/actions/postActions';
import { connect } from 'react-redux';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
  mode: number;
  createPost: (isComment: any, body: any, image: any, postId: any) => void;
  posting: any;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId, mode, createPost, posting}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(true);
  const [label, setLabel] = useState('Tweet');

  useEffect(() => {
    if (posting) {
      setLabel('Tweet');
      setPost(false);
      setImage('');
      setBody('');
      setIsLoading(false);
    }
  }, [posting]);

  const onSubmit = () => {
    setIsLoading(true);
    setLabel('Posting...');
    createPost(isComment, body, image, postId);
  };

  return (
    <div className="px-5 py-2" style={{ borderBottom: mode ? "1px solid rgb(206,206,206)" : "1px solid rgb(28,28,28)" }}>
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} noApi={true} imgUrl={currentUser?.profileImage} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className={`
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-transparent
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                ${mode ? 'text-black' : 'text-white'}
      `}
              placeholder={placeholder}>
            </textarea>
            <hr
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
            />
            
            {!isComment && image  && (
              // <div onClick={() => setPost(true)}>
              <ImageUpload value={image} post={true} disabled={isLoading} onChange={(image) => setImage(image)} label="Upload image" />
              // </div>
            )}
            <div className="mt-4 flex flex-row justify-end gap-4 relative" style={{alignItems: 'center'}}>
            {!isComment && !image  && (
              // <div onClick={() => setPost(true)}>
              <ImageUpload value={image} post={true} disabled={isLoading} onChange={(image) => setImage(image)} label="Upload image" />
              // </div>
            )}
              <Button disabled={isLoading || !body} onClick={onSubmit} label={label} />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-2xl text-center mb-4 font-bold">Welcome to Twitter</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  posting: state.post.posting,
});

const mapDispatchToProps = {
  createPost
}


export default connect(mapStateToProps, mapDispatchToProps)(Form);
