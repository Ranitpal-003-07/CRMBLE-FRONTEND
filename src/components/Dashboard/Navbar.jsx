/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
  Badge,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  useColorMode,
  useColorModeValue,
  Grid,
  GridItem,
  Progress,
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Container,
  SimpleGrid
} from '@chakra-ui/react';
import {
  Home,
  ShoppingBag,
  BarChart3,
  User,
  Lock,
  Settings,
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  TrendingUp,
  Clock,
  Folder,
  DollarSign,
  Activity
} from 'lucide-react';

const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode();
      const [activeNav, setActiveNav] = useState('dashboard');
      
      // Color mode values
      const bgColor = useColorModeValue('gray.50', 'gray.900');
      const sidebarBg = useColorModeValue('white', 'gray.800');
      const cardBg = useColorModeValue('white', 'gray.800');
      const borderColor = useColorModeValue('gray.200', 'gray.700');
      const textColor = useColorModeValue('gray.800', 'white');
      const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
      const accentColor = useColorModeValue('blue.500', 'blue.300');
    

  return (
        <Box
          bg={cardBg}
          borderBottom={`1px solid ${borderColor}`}
          px={8}
          py={4}
          position="sticky"
          top="0"
          zIndex="10"
        >
          <Flex justify="space-between" align="center">
            <VStack align="flex-start" spacing={0}>
              <Text fontSize="sm" color={mutedTextColor}>
                Pages / Main Dashboard
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                Main Dashboard
              </Text>
            </VStack>
            
            <HStack spacing={4}>
              <InputGroup maxW="300px">
                <InputLeftElement>
                  <Icon as={Search} color={mutedTextColor} />
                </InputLeftElement>
                <Input
                  placeholder="Search..."
                  borderRadius="15px"
                  bg={bgColor}
                  border="none"
                />
              </InputGroup>
              
              <IconButton
                icon={<Icon as={Bell} />}
                borderRadius="12px"
                variant="ghost"
                aria-label="Notifications"
              />
              
              <IconButton
                icon={<Icon as={colorMode === 'light' ? Moon : Sun} />}
                borderRadius="12px"
                variant="ghost"
                onClick={toggleColorMode}
                aria-label="Toggle color mode"
              />
              
              <Menu>
                <MenuButton>
                  <HStack spacing={2}>
                    <Avatar size="sm" name="User" />
                    <Text fontWeight="medium" color={textColor}>AP</Text>
                    <Icon as={ChevronDown} color={mutedTextColor} />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Box>
  )
}

export default Navbar
