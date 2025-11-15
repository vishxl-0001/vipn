import { Button } from "../components/ui/button";
import { ProductCard, Product } from "../components/ProductCard";
import { ArrowRight, ShoppingBag, Star, Truck, Shield, CreditCard } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface HomePageProps {
  products: Product[];
  onNavigate: (page: string) => void;
  onBuyNow: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function HomePage({ products, onNavigate, onBuyNow, onViewDetails }: HomePageProps) {
  const featuredProducts = products.slice(0, 4);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('featured-products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16 lg:py-24">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Discover Amazing    
                <span className="block text-accent">Products</span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-md">
                Your premier destination for modern products. Quality, style, and innovation in every purchase.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={scrollToProducts}
                  className="group"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('products')}
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  View All Products
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm">
                <ImageWithFallback
                  src="/image/home.png"
                  alt="Shopping Experience"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-accent text-accent-foreground p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-6 w-6" />
                  <span>8286+ Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">Free shipping  above ₹999</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">100% secure payment processing</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="mb-2">Contact Support</h3>
              <p className="text-muted-foreground">24 x 7  Support Service Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium products. Each item is carefully chosen for quality, style, and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuyNow={onBuyNow}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => onNavigate('products')}
              variant="outline"
              size="lg"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">What Our Customers Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Vaani Yadav",
                rating: 5,
                comment: "Amazing quality products and fast delivery. Highly recommended!"
              },
              {
                name: "Raj Gupta",
                rating: 5,
                comment: "Great customer service and the products exceeded my expectations."
              },
              {
                name: "Nikhil Kumar",
                rating: 5,
                comment: "Love shopping here! The variety and quality are unmatched."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
                <p className="font-medium">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}