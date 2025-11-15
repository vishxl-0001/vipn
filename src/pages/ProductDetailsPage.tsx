import { useState } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Star, ArrowLeft, ShoppingCart, CreditCard } from "lucide-react";
import { Product } from "../components/ProductCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface ProductDetailsPageProps {
  product: Product;
  onBuyNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export function ProductDetailsPage({ product, onBuyNow, onAddToCart, onBack }: ProductDetailsPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock additional images - in real app these would come from product data
  const images = [
    product.image_url,
    product.image_url, // Placeholder for additional angles
    product.image_url,
  ];

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
              <ImageWithFallback
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square w-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-muted-foreground'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <Badge variant="secondary">{product.category}</Badge>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating} out of 5 stars
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </div>

            {/* Description */}
            <div>
              <h3 className="mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features (Mock data) */}
            <div>
              <h3 className="mb-3">Key Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Premium quality materials
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  1 year warranty included
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Free shipping and returns
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  24/7 customer support
                </li>
              </ul>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => onBuyNow(product)}
                size="lg"
                className="w-full"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Buy Now - ₹{(product.price * quantity).toLocaleString()}
              </Button>
              <Button
                onClick={() => onAddToCart(product)}
                variant="outline"
                size="lg"
                className="w-full"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="bg-secondary p-4 rounded-lg">
              <h4 className="mb-2">Shipping Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• ipping  above ₹999</li>
                <li>• Delivery in 2-5 business days</li>
                <li>• Cash on Delivery available</li>
                <li>• 30-day return policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}