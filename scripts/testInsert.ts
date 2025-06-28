import { connectToDatabase } from "../lib/database";
import Order from "../lib/database/models/order.model";

const test = async () => {
    try {
      await connectToDatabase();
  
      const newOrder = await Order.create({
        // Sample data according to your schema
        stripeId: 'test_stripe_001',
        totalAmount: '199.99',
        event: '6650644f0c9b3b2dfd45c111', 
        buyer: '6650659b7d2a3e0ae03f9222',
      });
  
      console.log('Inserted order:', newOrder);
    } catch (error) {
      console.error('Error inserting order:', error);
    } finally {
      process.exit();
    }

    console.log('from env:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  };
  
  test();