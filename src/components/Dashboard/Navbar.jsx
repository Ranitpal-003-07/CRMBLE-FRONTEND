/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  IconButton,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  useColorMode,
  Tooltip,
  Button,
  Breadcrumb,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Container
} from '@chakra-ui/react';
import {
  Search,
  Bell,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Shield,
  HelpCircle,
  Menu as MenuIcon
} from 'lucide-react';

const Navbar = ({ activeTab = "Dashboard" }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollY, setScrollY] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const currentUser = { displayName: "Ankit Patel" };
  const handleLogout = () => console.log("Logout clicked");

  const navBg = useColorModeValue(
    'rgba(255, 255, 255, 0.7)', // Corrected alpha value
    'rgba(26, 32, 44, 0.7)'    // Corrected alpha value
  );
  
  const borderColor = useColorModeValue(
    'rgba(226, 232, 240, 0.3)', 
    'rgba(74, 85, 104, 0.3)'
  );

  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  
  const searchBg = useColorModeValue(
    'rgba(247, 250, 252, 0.4)', 
    'rgba(45, 55, 72, 0.4)'
  );

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const notifications = [
    { id: 1, title: 'New project assigned', time: '2m ago', unread: true },
    { id: 2, title: 'Revenue milestone reached', time: '1h ago', unread: true },
    { id: 3, title: 'System maintenance scheduled', time: '3h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left="280px"
        right={0}
        zIndex={1000}
        bg={navBg} 
        backdropFilter="blur(12px) saturate(180%)" 
        borderBottom="1px solid"
        borderColor={borderColor}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        transform={scrollY > 50 ? 'translateY(-2px)' : 'translateY(0)'}
        boxShadow={scrollY > 50 ? 
          useColorModeValue(
            '0 10px 40px rgba(0, 0, 0, 0.02)',
            '0 10px 40px rgba(0, 0, 0, 0.08)'
          ) : 
          'none'
        }
        width="calc(100% - 280px)" 
      >
        <Container 
          maxW="100%" 
          px={8}
          bg="transparent" 
        >
          <Flex 
            align="center" 
            justify="space-between" 
            h="80px"
            transition="height 0.3s ease"
            bg="transparent"
          >
            {/* Left Section - Title */}
            <VStack align="start" spacing={1} flex={1}>
              <Breadcrumb
                spacing="8px"
                separator={<ChevronRight size={14} color={mutedTextColor} />}
                fontSize="sm"
                color={mutedTextColor}
                fontWeight="500"
              >
                <Text fontSize="xs" color={mutedTextColor} textTransform="uppercase" letterSpacing="wider">
                  Pages / {activeTab}
                </Text>
              </Breadcrumb>
              
              <Text
                fontSize="2xl"
                fontWeight="700"
                color={textColor}
                letterSpacing="-0.025em"
                lineHeight="1.2"
              >
                {activeTab}
              </Text>
            </VStack>

            {/* Center Section - Search */}
            <Box flex={1} display={{ base: 'none', md: 'block' }} mx={8}>
              <InputGroup size="lg" maxW="400px" mx="auto">
                <InputLeftElement pointerEvents="none" h="full">
                  <Search 
                    size={18} 
                    color={isSearchFocused ? 
                      useColorModeValue('#805AD5', '#B794F6') : 
                      mutedTextColor
                    } 
                  />
                </InputLeftElement>
                <Input
                  placeholder="Search projects, tasks, or team members..."
                  bg={searchBg}
                  backdropFilter="blur(8px)"
                  border="2px solid transparent"
                  borderRadius="xl"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  _placeholder={{ color: mutedTextColor }}
                  _hover={{
                    bg: useColorModeValue('rgba(255, 255, 255, 0.6)', 'rgba(74, 85, 104, 0.6)'),
                    backdropFilter: "blur(10px)",
                    transform: 'translateY(-1px)',
                    boxShadow: useColorModeValue(
                      '0 8px 25px rgba(0, 0, 0, 0.05)',
                      '0 8px 25px rgba(0, 0, 0, 0.15)'
                    )
                  }}
                  _focus={{
                    bg: useColorModeValue('rgba(255, 255, 255, 0.7)', 'rgba(74, 85, 104, 0.7)'),
                    backdropFilter: "blur(10px)",
                    borderColor: useColorModeValue('purple.500', 'purple.300'),
                    boxShadow: useColorModeValue(
                      '0 0 0 3px rgba(128, 90, 213, 0.1), 0 8px 25px rgba(0, 0, 0, 0.05)',
                      '0 0 0 3px rgba(183, 148, 246, 0.1), 0 8px 25px rgba(0, 0, 0, 0.15)'
                    ),
                    transform: 'translateY(-1px)'
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                />
              </InputGroup>
            </Box>

            {/* Right Section - Controls */}
            <HStack spacing={4} flex={1} justify="flex-end">
              {/* Mobile Menu Button */}
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                icon={<MenuIcon size={20} />}
                variant="ghost"
                onClick={onOpen}
                aria-label="Open menu"
                size="lg"
                borderRadius="xl"
                _hover={{
                  bg: useColorModeValue('rgba(237, 242, 247, 0.5)', 'rgba(74, 85, 104, 0.5)'),
                  transform: 'translateY(-1px)'
                }}
                transition="all 0.2s ease"
              />

              {/* Theme Toggle */}
              <Tooltip label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}>
                <IconButton
                  icon={colorMode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                  variant="ghost"
                  onClick={toggleColorMode}
                  aria-label="Toggle color mode"
                  size="lg"
                  borderRadius="xl"
                  _hover={{
                    bg: useColorModeValue('rgba(237, 242, 247, 0.5)', 'rgba(74, 85, 104, 0.5)'),
                    transform: 'translateY(-1px)'
                  }}
                  transition="all 0.2s ease"
                />
              </Tooltip>

              {/* Notifications */}
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={
                    <Box position="relative">
                      <Bell size={18} />
                      {unreadCount > 0 && (
                        <Badge
                          position="absolute"
                          top="-8px"
                          right="-8px"
                          colorScheme="red"
                          borderRadius="full"
                          fontSize="xs"
                          minW="20px"
                          h="20px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </Box>
                  }
                  variant="ghost"
                  size="lg"
                  borderRadius="xl"
                  _hover={{
                    bg: useColorModeValue('rgba(237, 242, 247, 0.5)', 'rgba(74, 85, 104, 0.5)'),
                    transform: 'translateY(-1px)'
                  }}
                  transition="all 0.2s ease"
                />
                <MenuList
                  bg={navBg} // Use the same background as navbar
                  backdropFilter="blur(12px) saturate(150%)"
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="xl"
                  boxShadow={useColorModeValue(
                    '0 20px 40px rgba(0, 0, 0, 0.05)',
                    '0 20px 40px rgba(0, 0, 0, 0.15)'
                  )}
                  minW="300px"
                >
                  <Text px={4} py={2} fontSize="sm" fontWeight="600" color={mutedTextColor}>
                    Notifications
                  </Text>
                  <MenuDivider />
                  {notifications.map((notification) => (
                    <MenuItem
                      key={notification.id}
                      _hover={{ 
                        bg: useColorModeValue('rgba(247, 250, 252, 0.4)', 'rgba(74, 85, 104, 0.4)'),
                      }}
                      _focus={{ 
                        bg: useColorModeValue('rgba(247, 250, 252, 0.4)', 'rgba(74, 85, 104, 0.4)'),
                      }}
                      borderRadius="md"
                      mx={2}
                      mb={1}
                    >
                      <VStack align="start" spacing={1} flex={1}>
                        <HStack justify="space-between" w="full">
                          <Text fontSize="sm" fontWeight="500">
                            {notification.title}
                          </Text>
                          {notification.unread && (
                            <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                          )}
                        </HStack>
                        <Text fontSize="xs" color={mutedTextColor}>
                          {notification.time}
                        </Text>
                      </VStack>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              {/* User Menu */}
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  size="lg"
                  borderRadius="xl"
                  _hover={{
                    bg: useColorModeValue('rgba(237, 242, 247, 0.5)', 'rgba(74, 85, 104, 0.5)'),
                    transform: 'translateY(-1px)'
                  }}
                  transition="all 0.2s ease"
                  leftIcon={
                    <Avatar
                      size="sm"
                      name={currentUser ? currentUser.displayName : 'Guest'}
                      bg="purple.500"
                      color="white"
                      fontWeight="600"
                    />
                  }
                >
                  <Text 
                    fontSize="sm" 
                    fontWeight="600" 
                    display={{ base: 'none', lg: 'block' }}
                  >
                    {currentUser ? currentUser.displayName : 'Guest'}
                  </Text>
                </MenuButton>
                <MenuList
                  bg={navBg} // Use the same background as navbar
                  backdropFilter="blur(12px) saturate(150%)"
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="xl"
                  boxShadow={useColorModeValue(
                    '0 20px 40px rgba(0, 0, 0, 0.05)',
                    '0 20px 40px rgba(0, 0, 0, 0.15)'
                  )}
                >
                  <MenuItem 
                    icon={<User size={16} />} 
                    borderRadius="md" 
                    mx={2} 
                    mb={1}
                    _hover={{ 
                      bg: useColorModeValue('rgba(247, 250, 252, 0.4)', 'rgba(74, 85, 104, 0.4)'),
                    }}
                  >
                    Profile Settings
                  </MenuItem>
                  <MenuItem 
                    icon={<Settings size={16} />} 
                    borderRadius="md" 
                    mx={2} 
                    mb={1}
                    _hover={{ 
                      bg: useColorModeValue('rgba(247, 250, 252, 0.4)', 'rgba(74, 85, 104, 0.4)'),
                    }}
                  >
                    Account Settings
                  </MenuItem>
                  <MenuItem 
                    icon={<Shield size={16} />} 
                    borderRadius="md" 
                    mx={2} 
                    mb={1}
                    _hover={{ 
                      bg: useColorModeValue('rgba(247, 250, 252, 0.4)', 'rgba(74, 85, 104, 0.4)'),
                    }}
                  >
                    Security
                  </MenuItem>
                  <MenuItem 
                    icon={<HelpCircle size={16} />} 
                    borderRadius="md" 
                    mx={2} 
                    mb={1}
                    _hover={{ 
                      bg: useColorModeValue('rgba(247, 250, 252, 0.4)', 'rgba(74, 85, 104, 0.4)'),
                    }}
                  >
                    Help & Support
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem 
                    icon={<LogOut size={16} />} 
                    color="red.500" 
                    onClick={handleLogout}
                    borderRadius="md" 
                    mx={2} 
                    mb={1}
                    _hover={{ 
                      bg: 'rgba(254, 226, 226, 0.4)',
                    }}
                  >
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay backdropFilter="blur(8px)" />
        <DrawerContent 
          bg={navBg} // Use the same background as navbar
          backdropFilter="blur(12px) saturate(150%)"
        >
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            Navigation
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              <InputGroup>
                <InputLeftElement>
                  <Search size={18} color={mutedTextColor} />
                </InputLeftElement>
                <Input 
                  placeholder="Search..." 
                  borderRadius="lg" 
                  bg={searchBg}
                  backdropFilter="blur(8px)"
                />
              </InputGroup>
              
              <Button 
                leftIcon={<User size={18} />} 
                variant="ghost" 
                justifyContent="start"
                _hover={{
                  bg: useColorModeValue('rgba(247, 250, 252, 0.4)', 'rgba(74, 85, 104, 0.4)'),
                }}
              >
                Profile
              </Button>
              <Button 
                leftIcon={<Settings size={18} />} 
                variant="ghost" 
                justifyContent="start"
                _hover={{
                  bg: useColorModeValue('rgba(247, 250, 252, 0.4)', 'rgba(74, 85, 104, 0.4)'),
                }}
              >
                Settings
              </Button>
              <Button 
                leftIcon={<HelpCircle size={18} />} 
                variant="ghost" 
                justifyContent="start"
                _hover={{
                  bg: useColorModeValue('rgba(247, 250, 252, 0.4)', 'rgba(74, 85, 104, 0.4)'),
                }}
              >
                Help
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Box h="80px" />
    </>
  );
};

export default Navbar;