import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, SimpleGrid, Heading, Text, VStack, Container, Link, Flex, Icon } from '@chakra-ui/react';

const PublicLibrary = () => {
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <Container maxW="container.lg" py={10}>
            <VStack spacing={6} textAlign="center" mb={12}>
                <Heading as="h1" size="2xl" color="gray.900">
                    Resource Library
                </Heading>
                <Text fontSize="xl" color="gray.500" maxW="2xl">
                    Browse academic resources by semester. Open and accessible to everyone.
                </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
                {semesters.map((sem) => (
                    <Link
                        as={RouterLink}
                        key={sem}
                        to={`/class/${sem}`}
                        _hover={{ textDecoration: 'none' }}
                        role="group"
                    >
                        <Flex
                            direction="column"
                            bg="white"
                            borderWidth="1px"
                            borderColor="gray.200"
                            rounded="lg"
                            overflow="hidden"
                            transition="all 0.2s"
                            _hover={{ shadow: 'lg', transform: 'translateY(-2px)', borderColor: 'blue.300' }}
                            h="full"
                        >
                            <VStack p={6} flex="1" spacing={4} align="center" justify="center">
                                <Flex
                                    w={16}
                                    h={16}
                                    bg="blue.50"
                                    color="blue.600"
                                    rounded="full"
                                    align="center"
                                    justify="center"
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    _groupHover={{ bg: 'blue.600', color: 'white' }}
                                    transition="all 0.2s"
                                >
                                    {sem}
                                </Flex>
                                <Heading size="md" color="gray.900" _groupHover={{ color: 'blue.600' }}>
                                    Semester {sem}
                                </Heading>
                                <Text fontSize="sm" color="gray.500">
                                    View subjects & materials
                                </Text>
                            </VStack>
                            <Box bg="gray.50" p={3} borderTopWidth="1px" borderColor="gray.100" textAlign="center">
                                <Text fontSize="sm" fontWeight="medium" color="blue.600">
                                    Browse &rarr;
                                </Text>
                            </Box>
                        </Flex>
                    </Link>
                ))}
            </SimpleGrid>

            <Box mt={16} bg="blue.50" rounded="2xl" p={{ base: 8, md: 12 }} textAlign="center">
                <Heading size="lg" color="gray.900" mb={4}>
                    Want to contribute?
                </Heading>
                <Text fontSize="lg" color="gray.600" mb={6}>
                    Help your juniors by sharing your notes, improved assignments, or helpful videos.
                </Text>
                <Link
                    as={RouterLink}
                    to="/add-resource"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    px={8}
                    py={3}
                    bg="blue.600"
                    color="white"
                    fontWeight="medium"
                    rounded="md"
                    _hover={{ bg: 'blue.700', textDecoration: 'none' }}
                >
                    Contribute Resource
                </Link>
            </Box>
        </Container>
    );
};

export default PublicLibrary;

