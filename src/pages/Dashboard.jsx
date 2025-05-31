import { useState } from 'react';
import {
  Box,
  Flex,
  useColorModeValue
} from '@chakra-ui/react';
import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');


  return (
    <Box h="100vh" bg={bgColor}>
      <Flex h="full">
        {/* Sidebar */}
        <Box
          w={{ base: sidebarOpen ? "280px" : "0", lg: "280px" }}
          h="full"
          overflow="hidden"
          transition="width 0.3s ease"
          position={{ base: "fixed", lg: "relative" }}
          left={0}
          top={0}
          zIndex={{ base: 30, lg: "auto" }}
          bg={cardBg}
        >
          <Sidebar 
          />
        </Box>
        
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="blackAlpha.600"
            zIndex={20}
            display={{ base: "block", lg: "none" }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main Content */}
        <Box
          flex={1}
          h="full"
          display="flex"
          flexDirection="column"
          minW={0}
        >
          {/* Navbar */}
          <Box
            borderBottom="1px solid"
            borderColor={borderColor}
            flexShrink={0}
          >
            <Navbar 
              onMenuClick={() => setSidebarOpen(true)}
            />
          </Box>
          
          {/* Content */}
          <Box
            flex={1}
            overflow="auto"
            p={{ base: 4, md: 6 }}
            bg={bgColor}
          >
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;

