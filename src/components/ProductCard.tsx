import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  rating: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onBuyNow: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onBuyNow, onViewDetails }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => onViewDetails(product)}
          />
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <div className="w-full">
          <h3 
            className="mb-2 cursor-pointer hover:text-primary transition-colors"
            onClick={() => onViewDetails(product)}
          >
            {product.name}
          </h3>
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              ({product.rating})
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">₹{product.price.toLocaleString()}</span>
            <Button
              onClick={() => onBuyNow(product)}
              size="sm"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}