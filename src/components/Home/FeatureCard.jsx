/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Card,
  CardBody,
  useColorMode,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const slideInUp = keyframes`
  0% { transform: translateY(100px); opacity: 0; }
  100% { transform: translateY(0px); opacity: 1; }
`;



const FeatureCard = ({ icon, title, description, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        setIsVisible(true);
    }, []);
    
    
    const cardBg = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');
    const mutedColor = useColorModeValue('gray.600', 'gray.400');
    const borderColor = useColorModeValue('gray.100', 'gray.700');
    
    
    return (
      <Card
        h="350px"
        cursor="pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transform={isHovered ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)"}
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        boxShadow={isHovered ? 
          (colorMode === 'dark' ? "0 25px 50px rgba(0,0,0,0.5)" : "0 25px 50px rgba(0,0,0,0.15)") : 
          (colorMode === 'dark' ? "0 8px 25px rgba(0,0,0,0.3)" : "0 8px 25px rgba(0,0,0,0.08)")
        }
        animation={`${slideInUp} 0.8s ease-out ${delay}s both`}
        bg={cardBg}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="2xl"
        overflow="hidden"
        position="relative"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          h="4px"
          bgGradient="linear(to-r, purple.400, blue.400, pink.400)"
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.3s ease"
        />
        <CardBody p={8} textAlign="center">
          <Box
            display="inline-flex"
            p={5}
            bg={useColorModeValue('purple.100', 'purple.900')}
            borderRadius="2xl"
            mb={6}
            transform={isHovered ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)"}
            transition="all 0.3s ease"
          >
            <Icon as={icon} w={10} h={10} color={useColorModeValue('purple.600', 'purple.300')} />
          </Box>
          <Heading size="lg" mb={4} color={textColor} fontWeight="bold">
            {title}
          </Heading>
          <Text color={mutedColor} lineHeight="1.7" fontSize="md">
            {description}
          </Text>
        </CardBody>
      </Card>
    );
  };

export default FeatureCard;