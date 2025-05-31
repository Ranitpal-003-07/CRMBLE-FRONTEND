/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  useColorModeValue,
  IconButton,
  Tooltip,
  Divider,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  LayoutDashboard,
  Users,
  Target,
  Megaphone,
  UserCircle,
  LogOut,
  Menu
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  
  const bg = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');
  const hoverBg = useColorModeValue('gray.50', 'gray.800');
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const activeColor = useColorModeValue('blue.600', 'blue.300');
  
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Main Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      path: '/dashboard/customers'
    },
    {
      id: 'segments',
      label: 'Segments',
      icon: Target,
      path: '/dashboard/segments'
    },
    {
      id: 'campaigns',
      label: 'Campaigns',
      icon: Megaphone,
      path: '/dashboard/campaigns'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: UserCircle,
      path: '/dashboard/profile'
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const SidebarContent = () => (
    <Box
      w={isMobile ? "full" : "280px"}
      h="100vh"
      bg={bg}
      borderRight={!isMobile ? "1px solid" : "none"}
      borderColor={borderColor}
      position={isMobile ? "relative" : "fixed"}
      left={0}
      top={0}
      zIndex={1000}
      boxShadow={!isMobile ? "xl" : "none"}
    >
      <VStack spacing={0} align="stretch" h="full">
        {/* Header */}
        <Box p={6} pb={4}>
          <HStack spacing={3} mb={6}>
            <Box
              w={10}
              h={10}
              bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="lg"
            >
              <Text
                fontSize="lg"
                fontWeight="bold"
                color="white"
                fontFamily="system-ui"
              >
                C
              </Text>
            </Box>
            <VStack align="start" spacing={0}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color={textColor}
                letterSpacing="tight"
                fontFamily="system-ui"
              >
                CRMble
              </Text>
              <Text
                fontSize="xs"
                color={mutedTextColor}
                fontWeight="medium"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Customer Platform
              </Text>
            </VStack>
          </HStack>
          
          <Divider borderColor={borderColor} />
        </Box>

        {/* Navigation */}
        <Box flex={1} px={4}>
          <VStack spacing={1} align="stretch">
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(item.path);
              return (
                <Button
                  key={item.id}
                  leftIcon={
                    <Icon
                      as={item.icon}
                      w={5}
                      h={5}
                      color={isActive ? activeColor : mutedTextColor}
                    />
                  }
                  justifyContent="flex-start"
                  variant="ghost"
                  bg={isActive ? activeBg : 'transparent'}
                  color={isActive ? activeColor : textColor}
                  fontWeight={isActive ? 'semibold' : 'medium'}
                  borderRadius="xl"
                  h={12}
                  px={4}
                  fontSize="sm"
                  _hover={{
                    bg: isActive ? activeBg : hoverBg,
                    transform: 'translateX(2px)',
                    boxShadow: isActive ? 'md' : 'sm'
                  }}
                  _active={{
                    transform: 'translateX(1px)'
                  }}
                  transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                  onClick={() => handleNavigation(item.path)}
                  position="relative"
                  _before={isActive ? {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    w: '3px',
                    h: '60%',
                    bg: 'linear-gradient(to bottom, #667eea, #764ba2)',
                    borderRadius: 'full'
                  } : {}}
                >
                  {item.label}
                </Button>
              );
            })}
          </VStack>
        </Box>

        {/* Footer */}
        <Box p={4} pt={0}>
          <Divider borderColor={borderColor} mb={4} />
          
          <HStack spacing={2} justify="space-between">
            <Tooltip label="Logout" placement="top">
              <IconButton
                aria-label="Logout"
                icon={<LogOut size={18} />}
                variant="ghost"
                size="sm"
                borderRadius="lg"
                color={mutedTextColor}
                _hover={{
                  bg: 'red.50',
                  color: 'red.500'
                }}
              />
            </Tooltip>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <IconButton
          icon={<Menu />}
          onClick={onOpen}
          variant="ghost"
          position="fixed"
          top={4}
          left={4}
          zIndex={1000}
          bg={useColorModeValue("whiteAlpha.900", "blackAlpha.800")}
          backdropFilter="blur(16px)"
          borderRadius="16px"
          shadow="xl"
          border="1px solid"
          borderColor={useColorModeValue("whiteAlpha.400", "whiteAlpha.200")}
          _hover={{
            bg: useColorModeValue("whiteAlpha.800", "blackAlpha.700"),
            transform: 'scale(1.1) rotate(5deg)',
            borderColor: useColorModeValue("blue.300", "blue.400"),
          }}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        />
        
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          size="sm"
        >
          <DrawerOverlay backdropFilter="blur(8px)" />
          <DrawerContent bg="transparent" shadow="none">
            <DrawerCloseButton
              color={textColor}
              size="lg"
              _hover={{ 
                bg: useColorModeValue('gray.100', 'gray.700'),
                transform: 'scale(1.1)',
              }}
              transition="all 0.2s ease"
            />
            <DrawerBody p={0}>
              <SidebarContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return <SidebarContent />;
};

export default Sidebar;