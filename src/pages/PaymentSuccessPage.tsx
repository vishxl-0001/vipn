import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { CheckCircle, Home, Package } from "lucide-react";

interface PaymentSuccessPageProps {
  orderId: string;
  userEmail: string;
  onNavigateHome: () => void;
  onViewOrders: () => void;
}

export function PaymentSuccessPage({ orderId, userEmail, onNavigateHome, onViewOrders }: PaymentSuccessPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="text-center py-12">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-2xl mb-4 text-green-700">Payment Successful!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your order. Your payment has been processed successfully.
            </p>

            {/* Order Details */}
            <div className="bg-secondary p-4 rounded-lg mb-8 text-left">
              <h3 className="mb-3">Order Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-mono">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{userEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="text-green-600 font-medium">Confirmed</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 p-4 rounded-lg mb-8 text-left">
              <h4 className="text-blue-800 mb-2">What's Next?</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• You'll receive an order confirmation email shortly</li>
                <li>• We'll send shipping updates to your email</li>
                <li>• Expected delivery: 2-5 business days</li>
                <li>• Track your order in the "My Orders" section</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={onViewOrders}
                size="lg"
                className="w-full"
              >
                <Package className="h-5 w-5 mr-2" />
                View My Orders
              </Button>
              <Button
                onClick={onNavigateHome}
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Home className="h-5 w-5 mr-2" />
                Continue Shopping
              </Button>
            </div>

            {/* Support */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Need help? Contact our support team at{" "}
                <a href="mailto:support@wedesignbrand.site
" className="text-primary hover:underline">
                  support@wedesignbrand.site

                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}