import {
  Box,
  Card,
  CardHeader,
  CardBody,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';



const ChartCard = ({ title, children, height = "300px" }) =>{
    const cardBg = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');
    const glowColor = useColorModeValue('blue.200', 'blue.300');
      


    return(
    <Card
      bg={cardBg}
      backdropFilter="blur(20px)"
      border="1px solid"
      borderColor={useColorModeValue('whiteAlpha.200', 'whiteAlpha.100')}
      shadow="xl"
      _hover={{
        transform: 'translateY(-2px)',
        shadow: `0 15px 30px ${glowColor}30`
      }}
      transition="all 0.3s ease"
    >
      <CardHeader pb={2}>
        <Heading size="md" color={useColorModeValue('gray.700', 'white')}>
          {title}
        </Heading>
      </CardHeader>
      <CardBody pt={0}>
        <Box height={height}>
          {children}
        </Box>
      </CardBody>
    </Card>
  );
}

export default ChartCard;