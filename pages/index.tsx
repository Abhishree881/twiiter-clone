import PostFeed from "@/components/posts/PostFeed"
import Header from "@/components/Header"
import Form from "@/components/Form"

const Home: React.FC<{ mode: number }> = ({ mode }) => {
  return (
    <>
      <Header label="Home" mode={mode} />
      <Form placeholder="What's happening?" mode={mode} />
      <PostFeed mode={mode} />
    </>
  )
}

export default Home;
