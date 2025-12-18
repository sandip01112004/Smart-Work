import React, { useState, useEffect } from 'react';
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box, Flex, Container, Link, HStack, Text, Button, Menu, MenuButton, MenuList, MenuItem, Avatar, IconButton } from '@chakra-ui/react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <Flex direction="column" minH="100vh" bg="gray.50">
            {/* Navbar */}
            <Box
                as="nav"
                position="sticky"
                top="0"
                zIndex="sticky"
                bg="whiteAlpha.80"
                backdropFilter="blur(10px)"
                borderBottom="1px"
                borderColor="gray.200"
            >
                <Container maxW="container.xl" py={4}>
                    <Flex justify="space-between" align="center">
                        <HStack spacing={8} align="center">
                            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
                                <Text fontSize="xl" fontWeight="bold" color="blue.600" letterSpacing="tight">
                                    Smart Work
                                </Text>
                            </Link>
                            <HStack as="nav" spacing={6} display={{ base: 'none', md: 'flex' }}>
                                <NavLink to="/resources" current={location.pathname}>Library</NavLink>
                                <NavLink to="/private" current={location.pathname}>My Study Space</NavLink>
                                <NavLink to="/add-resource" current={location.pathname}>Contribute</NavLink>
                            </HStack>
                        </HStack>

                        {user ? (
                            <HStack spacing={4}>
                                <Text display={{ base: 'none', md: 'block' }} fontSize="sm" fontWeight="medium" color="gray.600">
                                    {user.displayName || user.email?.split('@')[0]}
                                </Text>
                                <Button size="sm" colorScheme="gray" variant="outline" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </HStack>
                        ) : (
                            <Button as={RouterLink} to="/login" size="sm" colorScheme="blue">
                                Login
                            </Button>
                        )}
                    </Flex>
                </Container>
            </Box>

            {/* Main Content */}
            <Box flex="1" py={8}>
                <Container maxW="container.xl">
                    <Outlet />
                </Container>
            </Box>

            {/* Footer */}
            <Box as="footer" bg="white" borderTop="1px" borderColor="gray.200" py={6}>
                <Container maxW="container.xl">
                    <Text textAlign="center" fontSize="sm" color="gray.500">
                        &copy; 2025 Smart Work. Built for Students.
                    </Text>
                </Container>
            </Box>
        </Flex>
    );
};

const NavLink = ({ to, current, children }) => {
    const isActive = current === to;
    return (
        <Link
            as={RouterLink}
            to={to}
            fontSize="sm"
            fontWeight="medium"
            color={isActive ? 'blue.600' : 'gray.500'}
            borderBottom={isActive ? '2px solid' : '2px solid transparent'}
            borderColor={isActive ? 'blue.600' : 'transparent'}
            pb={1}
            _hover={{
                color: 'blue.600',
                borderColor: 'blue.300',
                textDecoration: 'none'
            }}
        >
            {children}
        </Link>
    );
};

export default Layout;

