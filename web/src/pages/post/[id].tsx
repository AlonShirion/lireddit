import React from 'react';
import {createUrqlClient} from '../../utils/createUrqlClient';
import {withUrqlClient} from 'next-urql';
import {Layout} from '../../components/Layout';
import {Box, Heading} from '@chakra-ui/layout';
import {useGetPostFromUrl} from '../../utils/useGetPostFromUrl';
import {EditDeletePostButtons} from '../../components/EditDeletePostButtons';

export const Post = ({}) => {
  const [{data, error, fetching}] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>error</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      <EditDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
      />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Post);
