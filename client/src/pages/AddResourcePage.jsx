import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Box, Container, Heading, Text, VStack, FormControl, FormLabel, Input, Select, Textarea, Button, Grid, Alert, AlertIcon } from '@chakra-ui/react';

const AddResourcePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        semester: '1',
        subject: '',
        chapter: '',
        concept: '',
        type: 'pdf',
        link: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const user = auth.currentUser;
        if (!user) {
            setError('You must be logged in to contribute.');
            setLoading(false);
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/api/resources`, {
                ...formData,
                contributorName: user.displayName || user.email.split('@')[0],
                contributorId: user.uid
            });

            alert('Resource added successfully!');
            navigate(`/class/${formData.semester}?subject=${formData.subject}`);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to add resource');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxW="container.md" py={12}>
            <VStack spacing={8} align="stretch">
                <Box textAlign="center">
                    <Heading as="h1" size="xl" color="gray.900" letterSpacing="tight">Contribute a Resource</Heading>
                    <Text mt={2} color="gray.600">Share your knowledge with the community.</Text>
                </Box>

                {error && (
                    <Alert status="error" borderRadius="md">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                <Box bg="white" p={8} borderRadius="xl" borderWidth="1px" borderColor="gray.200" shadow="sm">
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={6}>
                            <FormControl isRequired>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Calculus I Final Review"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Brief summary of the content..."
                                    rows={3}
                                />
                            </FormControl>

                            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6} w="full">
                                <FormControl>
                                    <FormLabel>Semester</FormLabel>
                                    <Select
                                        name="semester"
                                        value={formData.semester}
                                        onChange={handleChange}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                            <option key={num} value={num}>Semester {num}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Subject</FormLabel>
                                    <Input
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="e.g. Mathematics"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6} w="full">
                                <FormControl>
                                    <FormLabel>Chapter</FormLabel>
                                    <Input
                                        name="chapter"
                                        value={formData.chapter}
                                        onChange={handleChange}
                                        placeholder="e.g. Integration"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Concept</FormLabel>
                                    <Input
                                        name="concept"
                                        value={formData.concept}
                                        onChange={handleChange}
                                        placeholder="e.g. By Parts"
                                    />
                                </FormControl>
                            </Grid>

                            <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={6} w="full">
                                <FormControl>
                                    <FormLabel>Type</FormLabel>
                                    <Select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                    >
                                        <option value="pdf">PDF</option>
                                        <option value="video">Video</option>
                                        <option value="website">Website</option>
                                        <option value="text">Text</option>
                                        <option value="image">Image</option>
                                        <option value="other">Other</option>
                                    </Select>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Link URL</FormLabel>
                                    <Input
                                        type="url"
                                        name="link"
                                        value={formData.link}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                    />
                                </FormControl>
                            </Grid>

                            <Button
                                type="submit"
                                colorScheme="blue"
                                size="lg"
                                width="full"
                                isLoading={loading}
                                loadingText="Submitting..."
                            >
                                Submit Resource
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </VStack>
        </Container>
    );
};

export default AddResourcePage;

