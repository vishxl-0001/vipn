import { useState, useCallback } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { CheckoutPage, UserDetails } from "./pages/CheckoutPage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";
import { OrdersPage } from "./pages/OrdersPage";
import { Product } from "./components/ProductCard";
import { mockProducts, mockOrders, Order } from "./data/mockData";
import { toast } from "sonner@2.0.3";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import { Mail, Phone, MapPin, ShoppingBag, Shield, Truck, CreditCard } from "lucide-react";

type PageType = 'home' | 'products' | 'product-details' | 'checkout' | 'payment-success' | 'orders' | 'about' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [lastOrderId, setLastOrderId] = useState<string>('');
  const [lastUserEmail, setLastUserEmail] = useState<string>('');
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleNavigate = useCallback((page: PageType) => {
    setCurrentPage(page);
  }, []);

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
  }, []);

  const handleBuyNow = useCallback((product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('checkout');
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems(prev => [...prev, product]);
    toast.success('Product added to cart!');
  }, []);

  const handleBackToProducts = useCallback(() => {
    setCurrentPage('products');
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentPage('home');
  }, []);

  const handleProceedToPayment = useCallback((userDetails: UserDetails, product: Product) => {
    // Razorpay Integration
    const options = {
      key: 'rzp_live_RZfRqaxQo1mJtf', // Replace with your Razorpay key
      amount: product.price * 100, // Amount in paise (multiply by 100)
      currency: 'INR',
      name: 'WDB',
      description: product.name,
      image: '/image/WDB-logo.png', // Your logo
      order_id: '', // This should be generated from your backend
      handler: function (response: any) {
        // Payment successful
        const orderId = `ORD${Date.now()}`;
        const newOrder: Order = {
          id: orderId,
          user_id: 'guest',
          product_id: product.id,
          product_name: product.name,
          amount: product.price,
          status: 'completed',
          payment_id: response.razorpay_payment_id,
          created_at: new Date().toISOString(),
          user_details: userDetails
        };

        setOrders(prev => [newOrder, ...prev]);
        setLastOrderId(orderId);
        setLastUserEmail(userDetails.email);
        setCurrentPage('payment-success');
        toast.success('Payment successful!');
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone
      },
      notes: {
        address: `${userDetails.address}, ${userDetails.city}, ${userDetails.state} - ${userDetails.pincode}`
      },
      theme: {
        color: '#030213'
      },
      modal: {
        ondismiss: function() {
          toast.error('Payment cancelled');
        }
      }
    };

    // Load Razorpay script and open checkout
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    };
    script.onerror = () => {
      toast.error('Failed to load payment gateway');
    };
    document.body.appendChild(script);
  }, []);

  const handleViewOrders = useCallback(() => {
    setCurrentPage('orders');
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            products={mockProducts}
            onNavigate={handleNavigate}
            onBuyNow={handleBuyNow}
            onViewDetails={handleProductSelect}
          />
        );

      case 'products':
        return (
          <ProductsPage
            products={mockProducts}
            onBuyNow={handleBuyNow}
            onViewDetails={handleProductSelect}
          />
        );

      case 'product-details':
        return selectedProduct ? (
          <ProductDetailsPage
            product={selectedProduct}
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
            onBack={handleBackToProducts}
          />
        ) : (
          <div>Product not found</div>
        );

      case 'checkout':
        return selectedProduct ? (
          <CheckoutPage
            product={selectedProduct}
            onBack={() => setCurrentPage('product-details')}
            onProceedToPayment={handleProceedToPayment}
          />
        ) : (
          <div>Product not found</div>
        );

      case 'payment-success':
        return (
          <PaymentSuccessPage
            orderId={lastOrderId}
            userEmail={lastUserEmail}
            onNavigateHome={handleBackToHome}
            onViewOrders={handleViewOrders}
          />
        );

      case 'orders':
        return (
          <OrdersPage
            orders={orders}
            onBack={handleBackToHome}
          />
        );

      case 'about':
        return (
          <div className="min-h-screen py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl mb-4">About WDB</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Your premier destination for modern products. Quality, style, and innovation in every purchase.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <ShoppingBag className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Wide Selection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Carefully curated products across multiple categories to meet all your needs.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Shield className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Quality Assured</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Every product is thoroughly checked to ensure the highest quality standards.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Truck className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Fast Delivery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Quick and reliable delivery service to get your products to you on time.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-12">
                <CardHeader>
                  <CardTitle>Our Story</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                  <p>
                    WDB was founded with a simple vision: to provide customers with access to high-quality products 
                    that enhance their lifestyle. We believe that everyone deserves access to premium products at fair prices.
                  </p>
                  <p>
                    Our team works tirelessly to source the best products from trusted manufacturers and bring them directly 
                    to your doorstep. We're committed to providing an exceptional shopping experience from browsing to delivery.
                  </p>
                  <p>
                    Customer satisfaction is at the heart of everything we do. We continually strive to improve our service 
                    and product offerings based on your feedback and needs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Terms and Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="general">
                      <AccordionTrigger>General Terms</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p>
                          By accessing and using WDB, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>
                        <p>
                          We reserve the right to modify these terms at any time. Your continued use of the website following any changes 
                          constitutes acceptance of those changes.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="payment">
                      <AccordionTrigger>Payment Terms</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p>
                          All payments are processed securely through Razorpay. We accept credit cards, debit cards, UPI, net banking, 
                          and digital wallets.
                        </p>
                        <p>
                          Prices are listed in Indian Rupees (INR) and include all applicable taxes. Payment must be made in full at 
                          the time of purchase.
                        </p>
                        <p>
                          Once payment is confirmed, you will receive an order confirmation via email with your order details and 
                          payment receipt.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="shipping">
                      <AccordionTrigger>Shipping & Delivery</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p>
                          We offer shipping across India. Delivery times vary based on your location and product availability.
                        </p>
                        <p>
                          Free shipping is available on orders above ₹999. Orders below this amount will incur a shipping fee of ₹99.
                        </p>
                        <p>
                          We will notify you or reach out to you with your given contact information for delivery updates and coordination.
                        </p>
                        <p>
                          Please ensure that the shipping address provided is accurate and complete. We are not responsible for 
                          delays caused by incorrect address information.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="returns">
                      <AccordionTrigger>Returns & Refunds Policy</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p className="font-medium text-foreground">
                          No Return Policy
                        </p>
                        <p>
                          At WDB, we maintain a strict no return policy. All sales are final and we do not accept returns 
                          or exchanges on any products once the order has been placed and payment has been processed.
                        </p>
                        <p>
                          We encourage customers to carefully review product descriptions, specifications, and images before making 
                          a purchase decision.
                        </p>
                        <p className="font-medium text-foreground">
                          Exceptions
                        </p>
                        <p>
                          In rare cases where you receive a damaged or defective product, please contact our customer support team 
                          within 12 hours of delivery with photographic evidence. We will review such cases on an individual basis 
                          and may offer a replacement at our discretion.
                        </p>
                        <p>
                          Refunds will not be issued under any circumstances except in cases of payment errors or technical issues 
                          that prevent order fulfillment.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="privacy">
                      <AccordionTrigger>Privacy & Data Protection</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p>
                          We take your privacy seriously. All personal information collected during the ordering process is used 
                          solely for order processing and delivery purposes.
                        </p>
                        <p>
                          Your payment information is processed securely through Razorpay and we do not store any payment card details 
                          on our servers.
                        </p>
                        <p>
                          We will not share your personal information with third parties except as necessary to fulfill your order 
                          (e.g., sharing shipping address with delivery partners).
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="liability">
                      <AccordionTrigger>Limitation of Liability</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p>
                          WDB shall not be liable for any indirect, incidental, special, or consequential damages arising 
                          out of or in connection with your use of our website or products.
                        </p>
                        <p>
                          Our total liability for any claims related to our products or services shall not exceed the purchase price 
                          of the product in question.
                        </p>
                        <p>
                          We are not responsible for delays or failures in performance resulting from causes beyond our reasonable 
                          control, including but not limited to natural disasters, strikes, or technical failures.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="contact">
                      <AccordionTrigger>Contact & Support</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p>
                          For any questions regarding these terms and conditions, please contact our customer support team.
                        </p>
                        <p>
                          Email: support@wedesignbrand.site
<br />
                          Phone: +91 8302619709<br />
                          Address: 5223/17 Kamla Market Street, Delhi, India
                        </p>
                        <p>
                          Our support team is available 24*7 Hours
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl mb-4">Contact Us</h1>
                <p className="text-lg text-muted-foreground">
                  Have questions? We'd love to hear from you. Get in touch with our team.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <Card>
                  <CardHeader className="text-center">
                    <Mail className="h-10 w-10 text-primary mx-auto mb-2" />
                    <CardTitle>Email Us</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-2">Send us an email anytime</p>
                    <a href="mailto:support@wedesignbrand.site
" className="text-primary hover:underline">
                      support@wedesignbrand.site

                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <Phone className="h-10 w-10 text-primary mx-auto mb-2" />
                    <CardTitle>Call Us</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-2">24*7 Hours Available</p>
                    <a href="tel:+918302619709" className="text-primary hover:underline">
                      +91 8302619709
                    </a>
                  </CardContent>
                </Card>

                {/* <Card>
                  <CardHeader className="text-center">
                    <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
                    <CardTitle>Visit Us</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      5223/17 Kamla Market Street<br />
                      Delhi, India
                    </p>
                  </CardContent>
                </Card> */}
              </div>

              {/* <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium text-foreground">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium text-foreground">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium text-destructive">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    For immediate assistance with your order, please have your order ID ready when contacting us.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-foreground mb-1">Order Status</p>
                      <p className="text-muted-foreground">Check your order status in the "My Orders" section</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Payment Issues</p>
                      <p className="text-muted-foreground">Contact us immediately for payment-related concerns</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Product Inquiries</p>
                      <p className="text-muted-foreground">Email us for detailed product information</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">General Questions</p>
                      <p className="text-muted-foreground">Call or email us during business hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return <HomePage products={mockProducts} onNavigate={handleNavigate} onBuyNow={handleBuyNow} onViewDetails={handleProductSelect} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartItemsCount={cartItems.length}
      />
      
      <main className="flex-1">
        {renderPage()}
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
