import React from 'react';
import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    Stack,
    SimpleGrid,
    Icon,
    VStack,
    HStack,
    useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Icons (using generic SVG icons for now to avoid dependency issues if react-icons isn't installed, 
// but sticking to standard Chakra/React usage)
const CheckIcon = (props) => (
    <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </Icon>
);

const BookIcon = (props) => (
    <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </Icon>
);

const UsersIcon = (props) => (
    <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </Icon>
);

const SearchIcon = (props) => (
    <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </Icon>
);

const MotionBox = motion(Box);

const Home = () => {

    const sectionBgColor = useColorModeValue('gray.50', 'gray.900');
    const accentColor = 'blue.500';

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <Box>
            {/* SECTION 1: HERO SECTION */}
            <Box as="section" pt={{ base: 20, md: 32 }} pb={{ base: 20, md: 24 }} textAlign="center">
                <Container maxW="container.xl">
                    <MotionBox {...fadeInUp}>
                        <Heading
                            as="h1"
                            size="4xl"
                            fontWeight="extrabold"
                            lineHeight="1.2"
                            mb={6}
                        >
                            Academic Resources, <br />
                            <Text as="span" color={accentColor}>Simplified.</Text>
                        </Heading>
                        <Text fontSize="xl" color="gray.500" maxW="2xl" mx="auto" mb={10}>
                            Stop wasting time searching for study materials. access syllabus-based
                            notes, papers, and resources curated for your semester.
                        </Text>
                        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} justify="center">
                            <Button
                                as={RouterLink}
                                to="/resources"
                                colorScheme="blue"
                                size="lg"
                                height="3.5rem"
                                px={8}
                                fontSize="md"
                                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                                transition="all 0.2s"
                            >
                                Browse Resources
                            </Button>
                            <Button
                                as={RouterLink}
                                to="/add-resource"
                                variant="outline"
                                size="lg"
                                height="3.5rem"
                                px={8}
                                fontSize="md"
                                colorScheme="blue"
                                _hover={{ bg: 'blue.50' }}
                            >
                                Contribute Resource
                            </Button>
                        </Stack>
                    </MotionBox>
                </Container>
            </Box>

            {/* SECTION 2: PROBLEM STATEMENT */}
            <Box as="section" py={20} bg={sectionBgColor}>
                <Container maxW="container.xl">
                    <MotionBox {...fadeInUp}>
                        <VStack spacing={12} textAlign="center">
                            <Box>
                                <Heading as="h2" size="xl" mb={4}>
                                    Why Smart Work?
                                </Heading>
                                <Text fontSize="lg" color="gray.500" maxW="3xl" mx="auto">
                                    We know the struggle. The semester moves fast, and finding the right
                                    material shouldn't be the hardest part of engineering.
                                </Text>
                            </Box>

                            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
                                <ProblemItem
                                    title="Scattered Resources"
                                    desc="Notes on WhatsApp, papers on Drive, syllabus on college site. It's a mess."
                                />
                                <ProblemItem
                                    title="Last-Minute Panic"
                                    desc="Wasting hours finding 'that one important PDF' the night before the exam."
                                />
                                <ProblemItem
                                    title="Untrusted Content"
                                    desc="Material that doesn't match your actual syllabus or batch requirements."
                                />
                            </SimpleGrid>
                        </VStack>
                    </MotionBox>
                </Container>
            </Box>

            {/* SECTION 3: HOW IT WORKS */}
            <Box as="section" py={20}>
                <Container maxW="container.xl">
                    <MotionBox {...fadeInUp}>
                        <VStack spacing={16}>
                            <Box textAlign="center">
                                <Heading as="h2" size="xl" mb={4}>
                                    Your Workflow
                                </Heading>
                                <Text fontSize="lg" color="gray.500">
                                    Streamlined for the way students actually study.
                                </Text>
                            </Box>

                            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10} w="full">
                                <StepItem number="01" title="Select Class" desc="Choose your specific branch and semester batch." icon={SearchIcon} />
                                <StepItem number="02" title="Explore" desc="Find resources mapped directly to your syllabus units." icon={BookIcon} />
                                <StepItem number="03" title="Focus" desc="Bookmark crucial topics for quick revision." icon={CheckIcon} />
                                <StepItem number="04" title="Collaborate" desc="Upload missing notes to help your batchmates." icon={UsersIcon} />
                            </SimpleGrid>
                        </VStack>
                    </MotionBox>
                </Container>
            </Box>

            {/* SECTION 4: KEY FEATURES */}
            <Box as="section" py={20} bg={sectionBgColor}>
                <Container maxW="container.xl">
                    <MotionBox {...fadeInUp}>
                        <Box mb={12} textAlign="center">
                            <Heading as="h2" size="xl" mb={4}>
                                Built for Academic Success
                            </Heading>
                        </Box>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                            <FeatureCard
                                title="Class-Based Library"
                                desc="A public repository automatically organized by Subject, Chapter, and Concept. No more digging through folders."
                            />
                            <FeatureCard
                                title="Community Driven"
                                desc="Resources are contributed by students like you. Quality checked by the community."
                            />
                            <FeatureCard
                                title="Exam Focused"
                                desc="Prioritize what matters. Tag content by 'Important', 'Syllabus', or 'Previous Year Questions'."
                            />
                            <FeatureCard
                                title="Private Study Space"
                                desc="Keep your own personal notes and bookmarks in one secure place."
                            />
                        </SimpleGrid>
                    </MotionBox>
                </Container>
            </Box>

            {/* SECTION 5: WHO IS IT FOR */}
            <Box as="section" py={20}>
                <Container maxW="container.lg" textAlign="center">
                    <MotionBox {...fadeInUp}>
                        <Heading as="h2" size="xl" mb={8}>
                            Who is Smart Work for?
                        </Heading>
                        <Text fontSize="2xl" lineHeight="tall" fontWeight="medium" color="gray.700">
                            Smart Work is dedicated to <Text as="span" color={accentColor} fontWeight="bold">Engineering Students</Text> preparing for semester exams.
                            Whether you are a topper looking for extra references or just starting your prep a week before exams, this is your home.
                        </Text>
                    </MotionBox>
                </Container>
            </Box>

            {/* SECTION 6: FINAL CTA */}
            <Box as="section" py={24} bg={useColorModeValue('blue.600', 'blue.900')} color="white">
                <Container maxW="container.md" textAlign="center">
                    <MotionBox {...fadeInUp}>
                        <Heading as="h2" size="2xl" mb={6}>
                            Ready to study smarter?
                        </Heading>
                        <Text fontSize="xl" mb={10} opacity={0.9}>
                            Join your batchmates and start browsing organized resources today.
                        </Text>
                        <Button
                            as={RouterLink}
                            to="/resources"
                            size="lg"
                            height="4rem"
                            px={10}
                            fontSize="xl"
                            bg="white"
                            color="blue.600"
                            _hover={{ bg: 'gray.100', transform: 'scale(1.05)' }}
                            transition="all 0.2s"
                        >
                            Start Exploring Resources
                        </Button>
                    </MotionBox>
                </Container>
            </Box>
        </Box>
    );
};

// Sub-components for cleaner code
const ProblemItem = ({ title, desc }) => (
    <Box p={6} borderRadius="lg" bg="white" shadow="sm" border="1px" borderColor="gray.100" textAlign="center">
        <Icon as={Icon} viewBox="0 0 24 24" w={8} h={8} color="red.400" mb={4} stroke="currentColor" fill="none" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </Icon>
        <Heading size="md" mb={2}>{title}</Heading>
        <Text color="gray.600">{desc}</Text>
    </Box>
);

const StepItem = ({ number, title, desc, icon }) => (
    <VStack align="flex-start" spacing={4} p={4}>
        <Text fontSize="5xl" fontWeight="black" color="gray.200" lineHeight="1">
            {number}
        </Text>
        <HStack>
            <Icon as={icon} w={6} h={6} color="blue.500" />
            <Heading size="md">{title}</Heading>
        </HStack>
        <Text color="gray.600">{desc}</Text>
    </VStack>
);

const FeatureCard = ({ title, desc }) => (
    <HStack align="start" spacing={4} p={6} borderRadius="xl" bg="white" shadow="md" _hover={{ shadow: 'lg' }} transition="shadow 0.2s">
        <Icon as={CheckIcon} w={6} h={6} color="green.500" mt={1} />
        <Box>
            <Heading size="md" mb={2}>{title}</Heading>
            <Text color="gray.600">{desc}</Text>
        </Box>
    </HStack>
);

export default Home;
