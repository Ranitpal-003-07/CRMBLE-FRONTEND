/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  Users, 
  TrendingUp, 
  Target, 
  Zap, 
  Shield, 
  Globe,
} from 'lucide-react';
import { keyframes } from '@emotion/react';
import FeatureCard from './FeatureCard';


const pulse3D = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const Features = () => {
    
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      setIsVisible(true);
    }, []);
    
    const textColor = useColorModeValue('gray.800', 'white');
    const mutedColor = useColorModeValue('gray.600', 'gray.400');
    const featureBg = useColorModeValue('gray.50', 'gray.900');

    
    const features = [
      {
        icon: Users,
        title: "Smart Customer Management",
        description: "Centralize all customer data with advanced segmentation, 360-degree customer views, and AI-powered insights for deeper relationships."
      },
      {
        icon: TrendingUp,
        title: "Predictive Sales Analytics",
        description: "Real-time insights and machine learning-powered predictive analytics to forecast trends and boost your sales performance."
      },
      {
        icon: Target,
        title: "AI Lead Scoring",
        description: "Advanced AI algorithms analyze behavior patterns to score leads accurately and increase conversion rates by 300%."
      },
      {
        icon: Zap,
        title: "Intelligent Automation",
        description: "Streamline complex workflows with smart automation, reduce manual tasks, and boost team productivity exponentially."
      },
      {
        icon: Shield,
        title: "Enterprise Security",
        description: "Bank-grade security with advanced encryption, SOC2 compliance, and zero-trust architecture for ultimate protection."
      },
      {
        icon: Globe,
        title: "Global Scale",
        description: "Multi-language, multi-currency support with regional compliance and localization for seamless worldwide operations."
      }
    ];

    return (
      <Box py={24} bg={featureBg}>
        <Container maxW="7xl">
          <VStack spacing={16}>
            <VStack spacing={6} textAlign="center">
              <Badge 
                colorScheme="purple" 
                fontSize="sm" 
                px={4} 
                py={2} 
                borderRadius="full"
                textTransform="uppercase"
                letterSpacing="wider"
                fontWeight="bold"
              >
                Advanced Features
              </Badge>
              <Heading
                fontSize={{ base: "3xl", md: "4xl", lg: "6xl" }}
                color={textColor}
                textAlign="center"
                fontWeight="black"
                lineHeight="1.1"
              >
                Everything you need to{" "}
                <Text 
                  as="span" 
                  bgGradient="linear(to-r, purple.600, blue.500, pink.500)"
                  bgClip="text"
                  animation={`${pulse3D} 4s ease-in-out infinite`}
                >
                  dominate
                </Text>
              </Heading>
              <Text
                fontSize="xl"
                color={mutedColor}
                maxW="3xl"
                textAlign="center"
                lineHeight="1.7"
              >
                Cutting-edge features designed to revolutionize your customer relationships 
                and accelerate exponential business growth with AI-powered intelligence.
              </Text>
            </VStack>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.15}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    );
};

export default Features;