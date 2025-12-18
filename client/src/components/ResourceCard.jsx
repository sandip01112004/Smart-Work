
import React from 'react';
import { Box, Heading, Text, Badge, Link, Flex, VStack, IconButton, Icon } from '@chakra-ui/react';

const ResourceCard = ({ resource, onBookmark }) => {
    const { _id, title, description, link, type, contributorName, createdAt } = resource;

    // Determine badge color based on type
    const typeColors = {
        pdf: 'red',
        video: 'blue',
        website: 'green',
        other: 'gray',
    };
    const colorScheme = typeColors[type] || 'gray';

    return (
        <Box
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            p={6}
            position="relative"
            transition="all 0.2s"
            _hover={{ shadow: 'md', borderColor: 'blue.300' }}
            role="group"
            h="100%"
            display="flex"
            flexDirection="column"
        >
            <Flex justify="space-between" align="start" mb={4}>
                <Badge colorScheme={colorScheme} borderRadius="full" px={2} fontSize="0.7rem">
                    {type.toUpperCase()}
                </Badge>
                {onBookmark && (
                    <IconButton
                        aria-label="Bookmark resource"
                        icon={
                            <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </Icon>
                        }
                        size="sm"
                        variant="ghost"
                        color="gray.400"
                        _hover={{ color: 'blue.600', bg: 'blue.50' }}
                        position="relative"
                        zIndex={2}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onBookmark(_id);
                        }}
                    />
                )}
            </Flex>

            <Heading as="h3" size="md" mb={2} lineHeight="short">
                <Link href={link} isExternal _hover={{ textDecoration: 'none', color: 'blue.600' }}>
                    {title}
                    <Box as="span" position="absolute" inset="0" />
                </Link>
            </Heading>

            <Text fontSize="sm" color="gray.500" noOfLines={2} mb={4} flex="1">
                {description}
            </Text>

            <Flex align="center" justify="space-between" pt={4} borderTopWidth="1px" borderColor="gray.100" mt="auto">
                <VStack align="start" spacing={0}>
                    <Text fontSize="xs" fontWeight="medium" color="gray.600">
                        {contributorName}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                        {new Date(createdAt).toLocaleDateString()}
                    </Text>
                </VStack>

                {link && (
                    <Link
                        href={link}
                        isExternal
                        fontSize="sm"
                        fontWeight="medium"
                        color="blue.600"
                        _groupHover={{ transform: 'translateX(4px)' }}
                        transition="transform 0.2s"
                        position="relative"
                        zIndex={2}
                        _hover={{ textDecoration: 'none', color: 'blue.700' }}
                    >
                        Open &rarr;
                    </Link>
                )}
            </Flex>
        </Box>
    );
};

export default ResourceCard;

