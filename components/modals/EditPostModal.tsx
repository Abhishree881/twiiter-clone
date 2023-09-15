import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditPostModal from "@/hooks/useEditPostModal";
import usePost from "@/hooks/usePost";

import Input from "../Input";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";

interface PostItemProps {
    data: Record<string, any>;
}

const EditPostModal: React.FC<PostItemProps> = ({ data = {} }) => {
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(data.id);
    const { postId } = data.id;
    const editModal = useEditPostModal();

    const [body, setBody] = useState('');

    useEffect(() => {
        setBody(fetchedPost?.body)
    }, [fetchedPost?.body]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.patch('/api/editpost', { body, postId });
            mutateFetchedPost();

            toast.success('Updated');

            editModal.onClose();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [editModal, body, mutateFetchedPost]);

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
            title="Edit your profile"
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
}

export default EditPostModal;
