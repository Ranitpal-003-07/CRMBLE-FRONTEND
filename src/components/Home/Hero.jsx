import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  IconButton,
  useColorMode,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { 
  ArrowRight,
  Play,
  Sun,
  Moon,
} from 'lucide-react';
import { keyframes } from '@emotion/react';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const rotate3D = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse3D = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;


const Hero = () =>{
    const { colorMode, toggleColorMode } = useColorMode();
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        setIsVisible(true);
    }, []);
    
    
    const bgGradient = useColorModeValue(
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #553c9a 100%)'
    );
      

return (
    <Box
      minH="100vh"
      bg={bgGradient}
      position="relative"
      overflow="hidden"
    >
      {/* Theme Toggle */}
      <IconButton
        aria-label="Toggle theme"
        icon={<Icon as={colorMode === 'light' ? Moon : Sun} />}
        onClick={toggleColorMode}
        position="absolute"
        top={6}
        right={6}
        zIndex={50}
        bg={useColorModeValue('whiteAlpha.200', 'gray.800')}
        color={useColorModeValue('white', 'yellow.400')}
        _hover={{
          bg: useColorModeValue('whiteAlpha.300', 'gray.700'),
          transform: 'scale(1.1)'
        }}
        transition="all 0.3s ease"
        size="lg"
        borderRadius="full"
      />

      {/* Animated background elements */}
      <Box
        position="absolute"
        top="20%"
        right="20%"
        w="300px"
        h="300px"
        bg="whiteAlpha.200"
        borderRadius="50%"
        animation={`${float} 6s ease-in-out infinite`}
      />
      <Box
        position="absolute"
        bottom="25%"
        left="15%"
        w="200px"
        h="200px"
        bg="whiteAlpha.100"
        borderRadius="3xl"
        animation={`${rotate3D} 20s linear infinite`}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        w="400px"
        h="400px"
        bg="whiteAlpha.50"
        borderRadius="50%"
        transform="translate(-50%, -50%)"
        animation={`${pulse3D} 4s ease-in-out infinite`}
      />
      
      <Container maxW="7xl" pt={20} pb={16}>
        <VStack spacing={8} align="center" textAlign="center">
          <Box
            transform={isVisible ? "translateY(0)" : "translateY(50px)"}
            opacity={isVisible ? 1 : 0}
            transition="all 1s ease-out"
          >
            <Heading
              fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
              fontWeight="black"
              color="white"
              lineHeight="0.9"
              mb={6}
            >
              Welcome to{" "}
              <Text
                as="span"
                bgGradient="linear(to-r, #FFD700, #FFA500, #FF6B6B)"
                bgClip="text"
                animation={`${pulse3D} 3s ease-in-out infinite`}
                display="inline-block"
              >
                Crmble
              </Text>
            </Heading>
            <Text
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              color="whiteAlpha.900"
              maxW="4xl"
              mb={8}
              fontWeight="medium"
            >
              Transform your customer relationships with our next-generation CRM platform. 
              Built for scale, designed for success, powered by AI.
            </Text>
          </Box>
          
          <HStack spacing={6} flexWrap="wrap" justify="center">
            <Button
              size="xl"
              bg="white"
              color="purple.700"
              fontSize="lg"
              px={10}
              py={6}
              h="auto"
              fontWeight="bold"
              _hover={{ 
                transform: "translateY(-4px) scale(1.05)",
                boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                bg: "gray.50"
              }}
              transition="all 0.3s ease"
              rightIcon={<Icon as={ArrowRight} />}
              borderRadius="2xl"
            >
              Get Started Free
            </Button>
            <Button
              size="xl"
              variant="outline"
              color="white"
              borderColor="white"
              borderWidth="2px"
              fontSize="lg"
              px={10}
              py={6}
              h="auto"
              fontWeight="bold"
              _hover={{ 
                bg: "whiteAlpha.200",
                transform: "translateY(-4px) scale(1.05)",
                boxShadow: "0 15px 35px rgba(255,255,255,0.1)"
              }}
              transition="all 0.3s ease"
              leftIcon={<Icon as={Play} />}
              borderRadius="2xl"
            >
              Watch Demo
            </Button>
          </HStack>
          
          <SimpleGrid columns={3} spacing={8} pt={12} w="full" maxW="2xl">
            <VStack>
              <Text fontSize="4xl" fontWeight="black" color="white">50K+</Text>
              <Text color="whiteAlpha.800" fontSize="lg">Active Users</Text>
            </VStack>
            <VStack>
              <Text fontSize="4xl" fontWeight="black" color="white">99.9%</Text>
              <Text color="whiteAlpha.800" fontSize="lg">Uptime</Text>
            </VStack>
            <VStack>
              <Text fontSize="4xl" fontWeight="black" color="white">150+</Text>
              <Text color="whiteAlpha.800" fontSize="lg">Countries</Text>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}

export default Hero;