import React, { useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading, Text, VStack, FormControl, FormLabel, Input, Button, Flex, Divider, Alert, AlertIcon, Icon } from '@chakra-ui/react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        setError('');
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("Logged in user:", user.email);
            navigate('/');
        } catch (error) {
            console.error("Google login error:", error);
            setError(formatErrorMessage(error.code));
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isSignup) {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("Signed up with email");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("Logged in with email");
            }
            navigate('/');
        } catch (error) {
            console.error("Email auth error:", error);
            setError(formatErrorMessage(error.code));
        }
    };

    const formatErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/invalid-credential':
                return 'Invalid email or password.';
            case 'auth/user-not-found':
                return 'No user found with this email. Please sign up.';
            case 'auth/wrong-password':
                return 'Incorrect password.';
            case 'auth/email-already-in-use':
                return 'Email is already in use. Please log in.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters.';
            case 'auth/configuration-not-found':
                return 'Authentication configuration not found. Please enable Email/Password provider in Firebase Console.';
            default:
                return 'An error occurred. Please try again. ' + errorCode;
        }
    };

    return (
        <Container maxW="container.sm" py={12} minH="80vh" display="flex" flexDirection="column" justifyContent="center">
            <VStack spacing={8} align="stretch">
                <Box textAlign="center">
                    <Heading as="h2" size="xl" color="gray.900">
                        {isSignup ? 'Create your account' : 'Sign in to your account'}
                    </Heading>
                    <Text mt={2} color="gray.600">
                        {isSignup ? 'Join the community today' : 'Welcome back'}
                    </Text>
                </Box>

                <Box bg="white" py={8} px={{ base: 4, sm: 10 }} shadow="sm" borderRadius="xl" borderWidth="1px" borderColor="gray.200">
                    <VStack spacing={6}>
                        {error && (
                            <Alert status="error" borderRadius="md">
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleEmailAuth} style={{ width: '100%' }}>
                            <VStack spacing={6}>
                                <FormControl isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                    />
                                </FormControl>

                                <Button
                                    type="submit"
                                    colorScheme="blue"
                                    width="full"
                                    size="lg"
                                >
                                    {isSignup ? 'Sign up' : 'Sign in'}
                                </Button>
                            </VStack>
                        </form>

                        <Flex align="center" width="full">
                            <Divider flex="1" />
                            <Text px={3} fontSize="sm" color="gray.500">Or continue with</Text>
                            <Divider flex="1" />
                        </Flex>

                        <Button
                            variant="outline"
                            width="full"
                            onClick={handleGoogleLogin}
                            leftIcon={
                                <Icon viewBox="0 0 24 24" w={5} h={5}>
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </Icon>
                            }
                        >
                            Google
                        </Button>
                    </VStack>

                    <Box mt={6} textAlign="center">
                        <Button
                            variant="link"
                            colorScheme="blue"
                            onClick={() => setIsSignup(!isSignup)}
                            size="sm"
                        >
                            {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                        </Button>
                    </Box>
                </Box>
            </VStack>
        </Container>
    );
};

export default Login;
