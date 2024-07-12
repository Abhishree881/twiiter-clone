import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useEditPostModal from "@/hooks/useEditPostModal";

import Input from "../Input";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";
import { connect } from "react-redux";
import { refreshPost } from "@/actions/postActions";

interface PostItemProps {
    post: any;
    refreshPost: () => void;
}

const EditPostModal: React.FC<PostItemProps> = ({ post, refreshPost }) => {
    // const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(data.id);
    const id = post.id;
    const editModal = useEditPostModal();

    const [body, setBody] = useState('');

    useEffect(() => {
        setBody(post?.body)
    }, [post?.body]);


    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.put('/api/editpost', { body, id });
            // mutateFetchedPost();

            toast.success('Updated');
            refreshPost();
            editModal.onClose();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [editModal, body]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
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
            isOpen={editModal.isOpen}
            title="Edit your tweet"
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
}

const mapStateToProps = (state: any) => {
    return {
        post: state.post.post,
    };
};

const mapDispatchToProps={
    refreshPost
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPostModal);;
