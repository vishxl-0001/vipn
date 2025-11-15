import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, CreditCard, ShoppingBag } from "lucide-react";
import { Product } from "../components/ProductCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface CheckoutPageProps {
  product: Product;
  onBack: () => void;
  onProceedToPayment: (userDetails: UserDetails, product: Product) => void;
}

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export function CheckoutPage({ product, onBack, onProceedToPayment }: CheckoutPageProps) {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [errors, setErrors] = useState<Partial<UserDetails>>({});

  const handleInputChange = (field: keyof UserDetails, value: string) => {
    setUserDetails(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserDetails> = {};

    if (!userDetails.name.trim()) newErrors.name = "Name is required";
    if (!userDetails.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(userDetails.email)) newErrors.email = "Email is invalid";
    if (!userDetails.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(userDetails.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!userDetails.address.trim()) newErrors.address = "Address is required";
    if (!userDetails.city.trim()) newErrors.city = "City is required";
    if (!userDetails.state.trim()) newErrors.state = "State is required";
    if (!userDetails.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(userDetails.pincode)) newErrors.pincode = "Pincode must be 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onProceedToPayment(userDetails, product);
    }
  };

  const shippingFee = product.price >= 999 ? 0 : 99;
  const totalAmount = product.price + shippingFee;

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
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Checkout Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={userDetails.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userDetails.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email"
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={userDetails.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter your phone number"
                          className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="mb-4">Shipping Address</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          value={userDetails.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Enter your address"
                          className={errors.address ? 'border-destructive' : ''}
                        />
                        {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={userDetails.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="City"
                            className={errors.city ? 'border-destructive' : ''}
                          />
                          {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={userDetails.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            placeholder="State"
                            className={errors.state ? 'border-destructive' : ''}
                          />
                          {errors.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
                        </div>
                        <div>
                          <Label htmlFor="pincode">Pincode *</Label>
                          <Input
                            id="pincode"
                            value={userDetails.pincode}
                            onChange={(e) => handleInputChange('pincode', e.target.value)}
                            placeholder="Pincode"
                            className={errors.pincode ? 'border-destructive' : ''}
                          />
                          {errors.pincode && <p className="text-sm text-destructive mt-1">{errors.pincode}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Proceed to Payment - ₹{totalAmount.toLocaleString()}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Product Details */}
                <div className="flex space-x-3">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-secondary">
                    <ImageWithFallback
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium line-clamp-2">{product.name}</h4>
                    <Badge variant="secondary" className="mt-1">
                      {product.category}
                    </Badge>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex justify-between">
                    <span>Product Price</span>
                    <span>₹{product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>
                  {shippingFee === 0 && (
                    <p className="text-sm text-green-600">Fast Delivery on orders above ₹999 !!</p>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between font-semibold text-lg pt-4 border-t border-border">
                  <span>Total</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>

                {/* Payment Methods */}
                <div className="pt-4 border-t border-border">
                  <h4 className="mb-3">Payment Methods</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Credit/Debit Cards
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      UPI & Net Banking
                    </div>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Digital Wallets
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Secure payment through Razorpay
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}