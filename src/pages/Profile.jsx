/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Button,
  Card,
  CardBody,
  Divider,
  useColorModeValue,
  IconButton,
  Badge,
  Container,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  useToast,
  Tooltip,
  ScaleFade
} from '@chakra-ui/react';
import {
  Settings,
  LogOut,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Shield,
  Camera,
  Edit3
} from 'lucide-react';

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [hoveredAction, setHoveredAction] = useState(null);
  
  const { isOpen: isPasswordOpen, onOpen: onPasswordOpen, onClose: onPasswordClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isNameOpen, onOpen: onNameOpen, onClose: onNameClose } = useDisclosure();
  const { isOpen: isEmailOpen, onOpen: onEmailOpen, onClose: onEmailClose } = useDisclosure();
  
  const toast = useToast();
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  // Mock user data
  const [user, setUser] = useState({
    name: 'Alexandra Chen',
    email: 'alexandra.chen@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c8f1?w=150&h=150&fit=crop&crop=face',
    joinDate: 'March 2022'
  });

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Please ensure both passwords match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: 'Password Too Short',
        description: 'Password must be at least 6 characters.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    toast({
      title: 'Password Updated',
      description: 'Your password has been successfully changed.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setNewPassword('');
    setConfirmPassword('');
    onPasswordClose();
  };

  const handleLogout = () => {
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: 'Account Deletion',
      description: 'Account deletion process initiated.',
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });
    onDeleteClose();
  };

  const handleNameChange = () => {
    if (!editName.trim()) {
      toast({
        title: 'Invalid Name',
        description: 'Please enter a valid name.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setUser(prev => ({ ...prev, name: editName.trim() }));
    toast({
      title: 'Name Updated',
      description: 'Your name has been successfully changed.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setEditName('');
    onNameClose();
  };

  const handleEmailChange = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editEmail)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setUser(prev => ({ ...prev, email: editEmail.trim() }));
    toast({
      title: 'Email Updated',
      description: 'Your email has been successfully changed.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setEditEmail('');
    onEmailClose();
  };

  const openNameModal = () => {
    setEditName(user.name);
    onNameOpen();
  };

  const openEmailModal = () => {
    setEditEmail(user.email);
    onEmailOpen();
  };

  const ActionButton = ({ icon: Icon, label, color, hoverColor, onClick, variant = 'outline' }) => (
    <Tooltip label={label} placement="top" hasArrow>
      <Button
        variant={variant}
        colorScheme={color}
        size="lg"
        leftIcon={<Icon size={20} />}
        onClick={onClick}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
          bg: hoverColor
        }}
        transition="all 0.3s ease"
        onMouseEnter={() => setHoveredAction(label)}
        onMouseLeave={() => setHoveredAction(null)}
        width="full"
        justifyContent="flex-start"
        px={6}
        py={6}
        h="auto"
        borderWidth={2}
      >
        {label}
      </Button>
    </Tooltip>
  );

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="4xl">
        <ScaleFade initialScale={0.9} in={true}>
          <VStack spacing={8} align="stretch">
            {/* Header Section */}
            <Box textAlign="center" mb={4}>
              <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={2}>
                Profile Settings
              </Text>
              <Text color={mutedColor} fontSize="lg">
                Manage your account preferences and security
              </Text>
            </Box>

            {/* Main Profile Card */}
            <Card bg={cardBg} shadow="2xl" borderRadius="2xl" overflow="hidden">
              <CardBody p={0}>
                {/* Profile Header with Gradient */}
                <Box
                  bgGradient="linear(135deg, blue.400, purple.500, pink.400)"
                  h="120px"
                  position="relative"
                />
                
                {/* Profile Content */}
                <Box px={8} pb={8} pt={4}>
                  <VStack spacing={6} align="center" mt={-12}>
                    {/* Avatar Section */}
                    <Box position="relative">
                      <Avatar
                        size="2xl"
                        src={user.avatar}
                        name={user.name}
                        border="6px solid"
                        borderColor={cardBg}
                        shadow="xl"
                      />
                      <IconButton
                        icon={<Camera size={16} />}
                        size="sm"
                        colorScheme="blue"
                        borderRadius="full"
                        position="absolute"
                        bottom={2}
                        right={2}
                        shadow="md"
                        _hover={{ transform: 'scale(1.1)' }}
                        transition="all 0.2s"
                        aria-label="Change avatar"
                      />
                    </Box>

                    {/* User Info */}
                    <VStack spacing={2} textAlign="center">
                      <HStack>
                        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                          {user.name}
                        </Text>
                        <IconButton
                          icon={<Edit3 size={14} />}
                          size="xs"
                          variant="ghost"
                          onClick={openNameModal}
                          _hover={{ bg: hoverBg }}
                          borderRadius="full"
                          aria-label="Edit name"
                        />
                        <Badge colorScheme="green" borderRadius="full" px={3}>
                          Active
                        </Badge>
                      </HStack>
                      
                      <HStack color={mutedColor} fontSize="md">
                        <Mail size={16} />
                        <Text>{user.email}</Text>
                        <IconButton
                          icon={<Edit3 size={12} />}
                          size="xs"
                          variant="ghost"
                          onClick={openEmailModal}
                          _hover={{ bg: hoverBg }}
                          borderRadius="full"
                          aria-label="Edit email"
                        />
                      </HStack>
                      
                      <HStack color={mutedColor} fontSize="sm">
                        <User size={14} />
                        <Text>Member since {user.joinDate}</Text>
                      </HStack>
                    </VStack>

                    <Divider borderColor={borderColor} />

                    {/* Action Buttons */}
                    <VStack spacing={4} width="full" maxW="md">
                      <Text fontSize="lg" fontWeight="semibold" color={textColor} alignSelf="flex-start">
                        Account Actions
                      </Text>
                      
                      <ActionButton
                        icon={Lock}
                        label="Change Password"
                        color="blue"
                        hoverColor="blue.50"
                        onClick={onPasswordOpen}
                      />
                      
                      <ActionButton
                        icon={LogOut}
                        label="Logout"
                        color="orange"
                        hoverColor="orange.50"
                        onClick={handleLogout}
                      />
                      
                      <ActionButton
                        icon={Trash2}
                        label="Delete Account"
                        color="red"
                        hoverColor="red.50"
                        onClick={onDeleteOpen}
                      />
                    </VStack>
                  </VStack>
                </Box>
              </CardBody>
            </Card>

            {/* Security Badge */}
            <Card bg={cardBg} borderRadius="xl" border="1px" borderColor={borderColor}>
              <CardBody>
                <HStack justify="space-between">
                  <HStack>
                    <Shield size={20} color="green" />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="semibold" color={textColor}>
                        Account Security
                      </Text>
                      <Text fontSize="sm" color={mutedColor}>
                        Your account is secured with 2FA
                      </Text>
                    </VStack>
                  </HStack>
                  <Badge colorScheme="green" size="lg" borderRadius="full">
                        Verified
                      </Badge>
                    </HStack>
                  </CardBody>
                </Card>
              </VStack>
            </ScaleFade>

            {/* Change Password Modal */}
            <Modal isOpen={isPasswordOpen} onClose={onPasswordClose} size="md">
              <ModalOverlay backdropFilter="blur(10px)" />
              <ModalContent borderRadius="xl">
                <ModalHeader>
                  <HStack>
                    <Lock size={20} />
                    <Text>Change Password</Text>
                  </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>New Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          borderRadius="lg"
                        />
                        <InputRightElement>
                          <IconButton
                            icon={showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            onClick={() => setShowPassword(!showPassword)}
                            variant="ghost"
                            size="sm"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        borderRadius="lg"
                      />
                    </FormControl>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onPasswordClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={handlePasswordChange}
                    isDisabled={!newPassword || !confirmPassword}
                  >
                    Update Password
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* Delete Account Modal */}
            <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} size="md">
              <ModalOverlay backdropFilter="blur(10px)" />
              <ModalContent borderRadius="xl">
                <ModalHeader color="red.500">
                  <HStack>
                    <Trash2 size={20} />
                    <Text>Delete Account</Text>
                  </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <VStack spacing={4} align="start">
                    <Text>
                      Are you sure you want to delete your account? This action cannot be undone.
                    </Text>
                    <Box bg="red.50" p={4} borderRadius="lg" borderLeft="4px" borderColor="red.400">
                      <Text fontSize="sm" color="red.700">
                        <strong>Warning:</strong> All your data will be permanently deleted.
                      </Text>
                    </Box>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onDeleteClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* Change Name Modal */}
            <Modal isOpen={isNameOpen} onClose={onNameClose} size="md">
              <ModalOverlay backdropFilter="blur(10px)" />
              <ModalContent borderRadius="xl">
                <ModalHeader>
                  <HStack>
                    <User size={20} />
                    <Text>Change Name</Text>
                  </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Enter your full name"
                      borderRadius="lg"
                      fontSize="md"
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onNameClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={handleNameChange}
                    isDisabled={!editName.trim() || editName.trim() === user.name}
                  >
                    Update Name
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* Change Email Modal */}
            <Modal isOpen={isEmailOpen} onClose={onEmailClose} size="md">
              <ModalOverlay backdropFilter="blur(10px)" />
              <ModalContent borderRadius="xl">
                <ModalHeader>
                  <HStack>
                    <Mail size={20} />
                    <Text>Change Email</Text>
                  </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Email Address</FormLabel>
                      <Input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="Enter your email address"
                        borderRadius="lg"
                        fontSize="md"
                      />
                    </FormControl>
                    <Box bg="blue.50" p={3} borderRadius="lg" w="full">
                      <Text fontSize="sm" color="blue.700">
                        <strong>Note:</strong> You may need to verify your new email address.
                      </Text>
                    </Box>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onEmailClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={handleEmailChange}
                    isDisabled={!editEmail.trim() || editEmail.trim() === user.email}
                  >
                    Update Email
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Container>
        </Box>
  );
}