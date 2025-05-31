/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Flex,
  useColorModeValue,
  useDisclosure,
  IconButton,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Slide,
  useMediaQuery,
} from '@chakra-ui/react';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isTablet] = useMediaQuery('(max-width: 1024px)');
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const sidebarBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Responsive sidebar width
  const sidebarWidth = useBreakpointValue({
    base: '280px',
    md: isCollapsed ? '80px' : '280px',
    lg: isCollapsed ? '80px' : '300px',
  });
  
  const collapsedWidth = useBreakpointValue({
    base: '0px',
    md: '80px',
    lg: '80px',
  });

  // Auto-collapse on tablet
  useEffect(() => {
    if (isTablet && !isMobile) {
      setIsCollapsed(true);
    } else if (!isTablet) {
      setIsCollapsed(false);
    }
  }, [isTablet, isMobile]);

  // Sidebar Toggle Handler
  const toggleSidebar = () => {
    if (isMobile) {
      onOpen();
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Enhanced Sidebar Component with responsive props
  const SidebarContent = ({ onClose, isCollapsed: collapsed }) => (
    <Sidebar 
      onClose={onClose}
      isCollapsed={collapsed}
      isMobile={isMobile}
    />
  );

  return (
    <Flex minHeight="100vh" bg={bgColor} position="relative">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box
          position="fixed"
          left="0"
          top="0"
          height="100vh"
          width={isCollapsed ? collapsedWidth : sidebarWidth}
          bg={sidebarBg}
          borderRight="1px solid"
          borderColor={borderColor}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          zIndex="sticky"
          boxShadow={useColorModeValue(
            '0 4px 12px rgba(0, 0, 0, 0.05)',
            '0 4px 12px rgba(0, 0, 0, 0.3)'
          )}
        >
          <SidebarContent isCollapsed={isCollapsed} />
          
          {/* Collapse Toggle Button */}
          <IconButton
            aria-label="Toggle sidebar"
            icon={isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            size="sm"
            position="absolute"
            right="-12px"
            top="20px"
            bg={sidebarBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="full"
            boxShadow="md"
            onClick={() => setIsCollapsed(!isCollapsed)}
            transition="all 0.2s"
            _hover={{
              transform: 'scale(1.1)',
              boxShadow: 'lg',
            }}
            zIndex="tooltip"
          />
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="sm"
      >
        <DrawerOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
        <DrawerContent bg={sidebarBg} maxW="280px">
          <DrawerCloseButton
            top="20px"
            right="20px"
            size="md"
            borderRadius="full"
            bg={useColorModeValue('gray.100', 'gray.700')}
          />
          <DrawerBody p="0">
            <SidebarContent onClose={onClose} isCollapsed={false} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content Area */}
      <Box
        flex="1"
        ml={isMobile ? "0" : (isCollapsed ? collapsedWidth : sidebarWidth)}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        minHeight="100vh"
        position="relative"
      >
        {/* Enhanced Navbar */}
        <Box
          position="sticky"
          top="0"
          zIndex="banner"
          bg={useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')}
          backdropFilter="blur(20px)"
          borderBottom="1px solid"
          borderColor={borderColor}
        >
          <Flex
            align="center"
            justify="space-between"
            px={{ base: 4, md: 6, lg: 8 }}
            py={4}
          >
            {/* Mobile Menu Button */}
            <IconButton
              aria-label="Open menu"
              icon={<Menu size={20} />}
              display={{ base: 'flex', md: 'none' }}
              onClick={onOpen}
              variant="ghost"
              size="md"
            />
            
            {/* Desktop Collapse Button */}
            <IconButton
              aria-label="Toggle sidebar"
              icon={isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
              display={{ base: 'none', md: 'flex' }}
              onClick={toggleSidebar}
              variant="ghost"
              size="md"
              transition="all 0.2s"
              _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
            />
            
            {/* Navbar Content */}
            <Navbar />
          </Flex>
        </Box>

        {/* Dashboard Content with Responsive Padding */}
        <Box
          px={{ base: 4, md: 6, lg: 8 }}
          py={{ base: 4, md: 6, lg: 8 }}
          maxW="full"
          mx="auto"
        >
          <Slide
            direction="top"
            in={true}
            style={{ zIndex: 1 }}
          >
            <Box
              transition="all 0.3s ease-in-out"
              transform="translateY(0)"
            >
              <Outlet />
            </Box>
          </Slide>
        </Box>
      </Box>
    </Flex>
  );
};

export default Dashboard;