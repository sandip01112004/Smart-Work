import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { auth } from '../firebase';
import ResourceCard from '../components/ResourceCard';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Heading, Text, SimpleGrid, Flex, Spinner, Alert, Button, Icon, VStack, Badge } from '@chakra-ui/react';

const PrivatePage = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookmarks = async () => {
            const user = auth.currentUser;
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                // In a real app, we'd use an auth token header. 
                // For MVP, we are passing userId in params as per Step 3 implementation.
                const response = await axios.get(`${API_BASE_URL}/api/bookmarks/${user.uid}`);
                setBookmarks(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load bookmarks.');
            } finally {
                setLoading(false);
            }
        };

        // Listen for auth state changes to ensure we have the user
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchBookmarks();
            } else {
                setLoading(false);
                setBookmarks([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleRemoveBookmark = async (resourceId) => {
        const user = auth.currentUser;
        if (!user) return;

        try {
            await axios.delete(`${API_BASE_URL}/api/bookmarks/${resourceId}`, {
                data: { userId: user.uid } // Need to pass userId to know whose bookmark to remove
            });

            // Remove from local state
            setBookmarks(prev => prev.filter(r => r._id !== resourceId));
        } catch (err) {
            console.error(err);
            alert('Failed to remove bookmark');
        }
    };

    if (loading) return (
        <Flex justify="center" align="center" minH="50vh">
            <Spinner size="xl" color="blue.600" thickness="4px" />
        </Flex>
    );

    if (!auth.currentUser) {
        return (
            <Container maxW="container.sm" py={12}>
                <VStack
                    spacing={6}
                    p={8}
                    bg="white"
                    borderRadius="2xl"
                    borderWidth="2px"
                    borderColor="gray.200"
                    borderStyle="dashed"
                    textAlign="center"
                >
                    <Flex w={16} h={16} bg="gray.100" rounded="full" align="center" justify="center">
                        <Icon viewBox="0 0 24 24" w={8} h={8} color="gray.400">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </Icon>
                    </Flex>
                    <Heading size="lg" color="gray.900">Please Log In</Heading>
                    <Text color="gray.500" maxW="sm">Access your personal study space to view your bookmarks and saved resources.</Text>
                    <Button as={RouterLink} to="/login" colorScheme="blue" variant="outline" size="lg">
                        Go to Login
                    </Button>
                </VStack>
            </Container>
        );
    }

    return (
        <Container maxW="container.xl">
            <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'start', md: 'center' }} gap={4} mb={8}>
                <Box>
                    <Heading as="h1" size="xl" color="gray.900" letterSpacing="tight">My Study Space</Heading>
                    <Text mt={1} color="gray.600">Your personal collection of learning resources.</Text>
                </Box>
                <Badge
                    colorScheme="blue"
                    fontSize="sm"
                    px={4}
                    py={2}
                    borderRadius="full"
                    variant="subtle"
                    display="flex"
                    alignItems="center"
                    gap={2}
                >
                    <Text as="span" fontWeight="bold" fontSize="lg">{bookmarks.length}</Text>
                    Saved Items
                </Badge>
            </Flex>

            {error && <Alert status="error" mb={6} borderRadius="md">{error}</Alert>}

            {bookmarks.length === 0 ? (
                <Box textAlign="center" py={20} bg="gray.50" borderRadius="2xl" borderWidth="2px" borderStyle="dashed" borderColor="gray.200">
                    <Flex w={16} h={16} bg="white" rounded="full" align="center" justify="center" mx="auto" mb={4} shadow="sm" borderWidth="1px" borderColor="gray.100">
                        <Icon viewBox="0 0 24 24" w={8} h={8} color="gray.400">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </Icon>
                    </Flex>
                    <Heading size="md" color="gray.900">No bookmarks yet</Heading>
                    <Text mt={1} color="gray.500">Start exploring resources and save them here.</Text>
                    <Box mt={6}>
                        <Button as={RouterLink} to="/resources" colorScheme="blue">
                            Browse Library
                        </Button>
                    </Box>
                </Box>
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {bookmarks.map((resource) => (
                        <Box key={resource._id} position="relative" role="group">
                            <ResourceCard resource={resource} />
                            <Box
                                position="absolute"
                                top={2}
                                right={2}
                                opacity={0}
                                _groupHover={{ opacity: 1 }}
                                transition="opacity 0.2s"
                            >
                                <Button
                                    size="xs"
                                    colorScheme="red"
                                    variant="solid"
                                    onClick={() => handleRemoveBookmark(resource._id)}
                                    rounded="full"
                                    w={8}
                                    h={8}
                                    p={0}
                                    shadow="md"
                                >
                                    <Icon viewBox="0 0 20 20" fill="currentColor" w={4} h={4}>
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </Icon>
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </SimpleGrid>
            )}
        </Container>
    );
};

export default PrivatePage;
