import React, { useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from './AuthContext';
import axios from 'axios';
import Razorpay from 'react-razorpay/dist/razorpay';

const Container = styled(Box)`
  display: flex;
  justify-content: space-around;
  padding: 15px 20px;
  background-color: #0b0f19;
  min-height: 80vh;
  color: #fff;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PlanCard = styled(Card)`
  background-color: #131828;
  border-radius: 12px;
  width: 320px;
  padding: 20px;
  margin: 20px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(50, 50, 93, 0.5);
  }
`;

const PlanHeader = styled(Box)`
  background-color: #1d2d50;
  color: white;
  padding: 15px;
  border-radius: 12px 12px 0 0;
`;

const PriceTag = styled(Typography)`
  font-size: 36px;
  color: white;
  margin: 20px 0;
`;

const Features = styled(Typography)`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
`;

const PlanButton = styled(Button)`
  background-color: #e50914;
  color: white;
  margin-top: 20px;
  padding: 10px 30px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0px 0px 15px rgba(229, 9, 20, 0.7);
  
  &:hover {
    background-color: #b20710;
    box-shadow: 0px 0px 20px rgba(229, 9, 20, 0.9);
  }
`;

const Subscribe = ({ isPaidPlan, setPaidPlan }) => {
  const { currentUser, authToken } = useAuth();

  const options = {
    key: "rzp_test_eLX6WS61npcEPJ",
    amount: "39900",
    currency: "INR",
    name: "Moviz inc",
    description: "Test Transaction",
    order_id: "order_IluGWxBm9U8zJ8",
    handler: function (response) {
      authenticateOrder(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
      setPaidPlan(true)
    },
    prefill: {
      name: currentUser.username,
      email: currentUser.email,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const createOrder = async () => {
    try {
      const response = await axios.post('http://localhost:8081/account/create-order', null, {headers: {
        Authorization: `Bearer ${authToken}`
      }});
      const orderid = response.data.id;
      return orderid;
    } catch (error) {
      console.error('Error creating order:', error.response ? error.response.data : error.message);
    }
  };

  const authenticateOrder = async (paymentID, orderID, signature) => {
    try {
      const response = await axios.post('http://localhost:8081/account/authenticate-order', null, {
        params: {
          username: currentUser.username,
          paymentID,
          orderID,
          signature,
        },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    } catch (error) {
      console.error("Error authenticating order:", error);
    }
  };

  const subscribeToPaid = async (options) => {
    const id = await createOrder();
    options.order_id = id;
    const rzp1 = new Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
    });
  };

  const cancelSubscription = async () => {
    try {
      const response = await axios.get("http://localhost:8081/account/cancel-subscription", {
        params: {
          username: currentUser.username
        },
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setPaidPlan(false);
    } catch (error) {
      console.error("Error cancelling subscription:", error);
    }
  };
  

  const onClickSubscribe = () => {
    subscribeToPaid(options);
  };

  const onClickCancel = () => {
    cancelSubscription()
  };

  return (
    <Container>
      {/* Basic Plan */}
      {!isPaidPlan && (
        <PlanCard>
          <PlanHeader>
            <Typography variant="h6">Basic</Typography>
          </PlanHeader>
          <CardContent>
            <PriceTag>Free</PriceTag>
            <Features>Video Quality: Best</Features>
            <Features>Resolution: 1080p</Features>
            <Features>Devices: Mobile, Tablet</Features>
            <Features>Features: Limited Number of Movies</Features>
            <PlanButton variant="contained">
             Current Plan
          </PlanButton>
          </CardContent>
        </PlanCard>
      )}

      <PlanCard>
        <PlanHeader>
          <Typography variant="h6">Premium</Typography>
        </PlanHeader>
        <CardContent>
          <PriceTag>₹399/month</PriceTag>
          <Features>Video Quality: Best</Features>
          <Features>Resolution: 1080p</Features>
          <Features>Devices: TV, Mobile, Tablet</Features>
          <Features>Features: Popular Movies</Features>
          <PlanButton variant="contained" onClick={onClickSubscribe}>
            {isPaidPlan ? "Current Plan" : "Subscribe Now"}
          </PlanButton>
          {isPaidPlan && (<PlanButton variant="contained" onClick={onClickCancel}>
             Cancel Subscription
          </PlanButton>)}
        </CardContent>
      </PlanCard>
    </Container>
  );
};

export default Subscribe;
