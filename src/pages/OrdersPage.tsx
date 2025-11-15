import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Package, Truck, CheckCircle } from "lucide-react";
import { Order } from "../data/mockData";

interface OrdersPageProps {
  orders: Order[];
  onBack: () => void;
}

export function OrdersPage({ orders, onBack }: OrdersPageProps) {

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Truck className="h-5 w-5 text-blue-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your orders
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Button onClick={onBack}>
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        Order #{order.id}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on {formatDate(order.created_at)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Order Details */}
                    <div>
                      <h4 className="font-medium mb-3">Order Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Product:</span>
                          <span className="font-medium">{order.product_name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-medium">₹{order.amount.toLocaleString()}</span>
                        </div>
                        {order.payment_id && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Payment ID:</span>
                            <span className="font-mono text-xs">{order.payment_id}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h4 className="font-medium mb-3">Shipping Address</h4>
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">{order.user_details.name}</p>
                        <p>{order.user_details.address}</p>
                        <p>{order.user_details.city}, {order.user_details.state} {order.user_details.pincode}</p>
                        <p className="mt-2">
                          <span className="text-foreground">Phone:</span> {order.user_details.phone}
                        </p>
                        <p>
                          <span className="text-foreground">Email:</span> {order.user_details.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Status Timeline */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-medium mb-3">Delivery Status</h4>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 text-blue-600 mr-2" />
                        <div>
                          <p className="font-medium text-blue-900">Your order is being processed</p>
                          <p className="text-sm text-blue-700 mt-1">
                            We will notify you or reach out to you with your given contact information for delivery updates.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {order.status === 'pending' && (
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
                    )}
                    {order.status === 'completed' && (
                      <>
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                        <Button variant="outline" size="sm">
                          Write Review
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">
                      Download Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}