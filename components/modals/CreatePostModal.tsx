import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useCreatePostModal from "@/hooks/useCreatePostModal";

import Input from "../Input";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";
import { connect } from "react-redux";
import { createPost } from "@/actions/postActions";

interface PostItemProps {
    post: any;
    createPost: (isComment: boolean,body: any, image: any, postId: any) => void;
}

const CreatePostModal: React.FC<PostItemProps> = ({ createPost}) => {
    // const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(data.id);
    const createModal = useCreatePostModal();

    const [body, setBody] = useState('');
    const [image, setImage] = useState('');


    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback( () => {
        createPost(false, body, image, '');
        createModal.onClose();
    }, [createModal, body]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload value={image} disabled={isLoading} onChange={(image) => setImage(image)} label="Upload image" />
            <Input
                placeholder="Tweet"
                onChange={(e) => setBody(e.target.value)}
                value={body}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={createModal.isOpen}
            title="Create tweet"
            actionLabel="Post"
            onClose={createModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
}

const mapStateToProps = (state: any) => {
    return {
    };
};

const mapDispatchToProps={
    createPost
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostModal);;
