import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Heading, Text, SimpleGrid, Flex, Spinner, Alert, AlertIcon, VStack, HStack, Button, Icon, Link } from '@chakra-ui/react';
import ResourceCard from '../components/ResourceCard';
import { auth } from '../firebase';

const ClassPage = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const subjectParam = searchParams.get('subject');

    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const semester = id;

    useEffect(() => {
        const fetchResources = async () => {
            try {
                setLoading(true);
                let url = `${import.meta.env.VITE_API_URL}/resources?semester=${semester}`;
                if (subjectParam) {
                    url += `&subject=${subjectParam}`;
                }

                const response = await axios.get(url);
                setResources(response.data);
            } catch (err) {
                setError('Failed to load resources.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (semester) {
            fetchResources();
        }
    }, [semester, subjectParam]);

    const handleBookmark = async (resourceId) => {
        const user = auth.currentUser;
        if (!user) {
            alert("Please login to bookmark resources.");
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/bookmarks`, {
                userId: user.uid,
                resourceId: resourceId
            });
            alert("Bookmark added!");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to bookmark");
        }
    };

    // Nested Grouping: Subject -> Chapter -> Concept
    const groupedResources = resources.reduce((acc, resource) => {
        const subject = resource.subject || 'General';
        const chapter = resource.chapter || 'Miscellaneous';
        const concept = resource.concept || 'General Resources';

        if (!acc[subject]) acc[subject] = {};
        if (!acc[subject][chapter]) acc[subject][chapter] = {};
        if (!acc[subject][chapter][concept]) acc[subject][chapter][concept] = [];

        acc[subject][chapter][concept].push(resource);
        return acc;
    }, {});

    if (loading) return (
        <Flex justify="center" align="center" minH="50vh">
            <Spinner size="xl" color="blue.600" thickness="4px" />
        </Flex>
    );

    if (error) return (
        <Container maxW="container.md" py={12}>
            <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px" rounded="md">
                <AlertIcon boxSize="40px" mr={0} />
                <Text mt={4} mb={1} fontSize="lg" fontWeight="bold">
                    Error Loading Resources
                </Text>
                <Text maxWidth="sm">{error}</Text>
            </Alert>
        </Container>
    );

    return (
        <Container maxW="container.xl">
            {/* Header */}
            <Box bg="white" borderRadius="2xl" p={8} mb={8} borderWidth="1px" borderColor="gray.200" position="relative" overflow="hidden">
                <Box position="absolute" top={0} right={0} mt={-4} mr={-4} w={32} h={32} bg="blue.50" rounded="full" filter="blur(40px)" opacity={0.5} />
                <Flex align="center" gap={4} position="relative" zIndex={1}>
                    <Flex w={16} h={16} align="center" justify="center" bg="blue.50" rounded="xl">
                        <Text fontSize="3xl">📚</Text>
                    </Flex>
                    <Box>
                        <Heading as="h1" size="xl" color="gray.900" letterSpacing="tight">
                            Semester {semester}
                        </Heading>
                        {subjectParam && <Text fontSize="lg" color="blue.600" fontWeight="medium">Subject: {subjectParam}</Text>}
                    </Box>
                </Flex>
            </Box>

            {Object.keys(groupedResources).length === 0 ? (
                <Box textAlign="center" py={20} bg="gray.50" borderRadius="2xl" borderWidth="2px" borderStyle="dashed" borderColor="gray.200">
                    <Icon viewBox="0 0 24 24" w={12} h={12} color="gray.300" mb={4}>
                        <path fill="currentColor" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </Icon>
                    <Heading size="md" color="gray.900" mb={2}>No resources found</Heading>
                    <Text color="gray.500" mb={6}>Be the first to contribute to this section.</Text>
                    <Button as={RouterLink} to="/add-resource" colorScheme="blue" size="lg">
                        Contribute Resource
                    </Button>
                </Box>
            ) : (
                <VStack spacing={12} align="stretch">
                    {Object.entries(groupedResources).map(([subject, chapters]) => (
                        <Box key={subject} bg="white" borderRadius="2xl" borderWidth="1px" borderColor="gray.200" overflow="hidden">
                            {!subjectParam && (
                                <Box bg="gray.50" px={6} py={4} borderBottomWidth="1px" borderColor="gray.200">
                                    <Heading as="h2" size="md" color="gray.900">
                                        {subject}
                                    </Heading>
                                </Box>
                            )}

                            <Box p={6}>
                                <VStack spacing={8} align="stretch">
                                    {Object.entries(chapters).map(([chapter, concepts]) => (
                                        <Box key={chapter} position="relative" pl={4} borderLeftWidth="2px" borderColor="blue.100">
                                            <Heading as="h3" size="md" color="gray.900" mb={4} display="flex" alignItems="center">
                                                <Box w={2} h={2} bg="blue.400" rounded="full" ml="-21px" mr={3} ring={4} ringColor="white" />
                                                {chapter}
                                            </Heading>

                                            <VStack spacing={6} align="stretch">
                                                {Object.entries(concepts).map(([concept, items]) => (
                                                    <Box key={concept}>
                                                        <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" letterSpacing="wider" mb={3} ml={1}>
                                                            {concept}
                                                        </Text>
                                                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                                                            {items.map((resource) => (
                                                                <ResourceCard
                                                                    key={resource._id}
                                                                    resource={resource}
                                                                    onBookmark={handleBookmark}
                                                                />
                                                            ))}
                                                        </SimpleGrid>
                                                    </Box>
                                                ))}
                                            </VStack>
                                        </Box>
                                    ))}
                                </VStack>
                            </Box>
                        </Box>
                    ))}
                </VStack>
            )}
        </Container>
    );
};

export default ClassPage;
