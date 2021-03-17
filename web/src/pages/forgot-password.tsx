import React, {useState} from 'react';
import {Wrapper} from '../components/Wrapper';
import {Form, Formik} from 'formik';
import {InputField} from '../components/InputField';
import {Box} from '@chakra-ui/layout';
import {Button} from '@chakra-ui/button';
import {withUrqlClient} from 'next-urql';
import {createUrqlClient} from '../utils/createUrqlClient';
import {useForgotPasswordMutation} from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{email: ''}}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}>
        {({isSubmitting}) =>
          complete ? (
            <Box>
              if an account with that email exists, we sent you an email
            </Box>
          ) : (
            <Form>
              <Box mt={4}>
                <InputField
                  name="email"
                  placeholder="email"
                  label="Email"
                  type="email"
                />
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal">
                forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
