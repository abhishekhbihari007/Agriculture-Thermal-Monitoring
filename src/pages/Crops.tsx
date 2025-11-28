import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Crops = () => {
  const crops = [
    {
      name: "Turmeric",
      layer: "Layer 1",
      status: "healthy",
      parameters: ["Water Stress", "Disease Detection", "Heat Stress"],
      alert: null,
      details: "Optimal thermal profile. No intervention required.",
      image: "https://images.unsplash.com/photo-1615485925511-48e5b0b6d0e2?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Lettuce",
      layer: "Layer 2",
      status: "healthy",
      parameters: ["Water Stress", "Nutrient Deficiency", "Microclimate"],
      alert: null,
      details: "Optimal growth conditions. Leaf temperature within normal range.",
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Kale",
      layer: "Layer 2",
      status: "healthy",
      parameters: ["Water Stress", "Nutrient Deficiency", "Leaf Temperature"],
      alert: null,
      details: "Healthy transpiration rates. No signs of stress detected.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Cabbage",
      layer: "Layer 2",
      status: "warning",
      parameters: ["Water Stress", "Nutrient Deficiency", "Microclimate"],
      alert: "Slight water deficit detected",
      details: "CWSI slightly elevated to 0.52. Monitor closely for next 24 hours.",
      image: "https://images.unsplash.com/photo-1593113616828-c4bca6c47502?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Arugula",
      layer: "Layer 2",
      status: "healthy",
      parameters: ["Water Stress", "Nutrient Deficiency", "Disease Detection"],
      alert: null,
      details: "Excellent thermal profile. Optimal growing conditions maintained.",
      image: "https://images.unsplash.com/photo-1576045057992-4c4c79a5b5b3?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Creepers (Cucumber)",
      layer: "Layer 3",
      status: "healthy",
      parameters: ["Disease Detection", "Stomatal Conductance", "Heat Stress"],
      alert: null,
      details: "Strong transpiration activity. Healthy growth patterns observed.",
      image: "https://images.unsplash.com/photo-1592841200221-a6898a8d0233?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Brinjal (Eggplant)",
      layer: "Layer 4",
      status: "healthy",
      parameters: ["Disease Detection", "Water Stress", "Pest Detection"],
      alert: null,
      details: "Early fungal detection system active. No concerns detected.",
      image: "https://images.unsplash.com/photo-1576045057992-4c4c79a5b5b3?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Papaya",
      layer: "Layer 1",
      status: "healthy",
      parameters: ["Heat Stress", "Water Stress", "Microclimate"],
      alert: null,
      details: "Excellent thermal regulation. Growth proceeding as expected.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Spinach (Palak)",
      layer: "Layer 2",
      status: "healthy",
      parameters: ["Water Stress", "Nutrient Deficiency", "Disease Detection", "Leaf Temperature"],
      alert: null,
      details: "Optimal thermal profile for leafy greens. Leaf temperature monitoring shows healthy transpiration rates.",
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&h=600&fit=crop&q=80",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Crop Monitoring</h1>
            <p className="text-muted-foreground">
              Real-time health status and thermal analysis for each crop variety
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {crops.map((crop, index) => (
              <Card key={index} className={`card-hover border-2 ${
                crop.status === 'healthy' ? 'border-secondary/30' :
                crop.status === 'warning' ? 'border-accent/30' : 'border-destructive/30'
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-xl">{crop.name}</CardTitle>
                      <CardDescription className="mt-1">{crop.layer}</CardDescription>
                    </div>
                    <Badge className={
                      crop.status === 'healthy' ? 'status-healthy' :
                      crop.status === 'warning' ? 'status-warning' : 'status-critical'
                    }>
                      {crop.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Crop Image */}
                    <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg overflow-hidden relative">
                      {crop.image ? (
                        <>
                          <img 
                            src={crop.image} 
                            alt={crop.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {/* Status Indicator Overlay */}
                          <div className="absolute top-2 right-2">
                            {crop.status === 'healthy' ? (
                              <div className="h-3 w-3 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
                            ) : crop.status === 'warning' ? (
                              <div className="h-3 w-3 bg-orange-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
                            ) : (
                              <div className="h-3 w-3 bg-red-400 rounded-full border-2 border-white shadow-lg"></div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {crop.status === 'healthy' ? (
                            <CheckCircle className="h-12 w-12 text-secondary" />
                          ) : (
                            <AlertCircle className="h-12 w-12 text-accent" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Alert Message */}
                    {crop.alert && (
                      <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-accent">{crop.alert}</span>
                        </div>
                      </div>
                    )}

                    {/* Monitored Parameters */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Monitored Parameters:</h4>
                      <div className="flex flex-wrap gap-2">
                        {crop.parameters.map((param, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {param}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <p className="text-sm text-muted-foreground border-t pt-3">
                      {crop.details}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Section */}
          <div className="grid gap-6 md:grid-cols-3 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Crops</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">9</div>
                <p className="text-sm text-muted-foreground mt-1">Across 4 layers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Healthy Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">89%</div>
                <p className="text-sm text-muted-foreground mt-1">8 of 9 crops optimal</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Interventions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">1</div>
                <p className="text-sm text-muted-foreground mt-1">Irrigation scheduled</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Crops;
