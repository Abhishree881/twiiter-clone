import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

const Notifications: React.FC<{ mode: number }> = ({ mode }) => {
  return (
    <>
      <Header mode={mode} showBackArrow label="Notifications" />
      <NotificationsFeed mode={mode} />
    </>
  );
}

export default Notifications;