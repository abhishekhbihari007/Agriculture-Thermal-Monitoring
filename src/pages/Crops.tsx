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
    },
    {
      name: "Leafy Vegetables",
      layer: "Layer 2",
      status: "warning",
      parameters: ["Water Stress", "Nutrient Deficiency", "Microclimate"],
      alert: "Water deficit detected",
      details: "CWSI elevated to 0.68. Schedule irrigation within 24 hours.",
    },
    {
      name: "Creepers (Cucumber)",
      layer: "Layer 3",
      status: "healthy",
      parameters: ["Disease Detection", "Stomatal Conductance", "Heat Stress"],
      alert: null,
      details: "Strong transpiration activity. Healthy growth patterns observed.",
    },
    {
      name: "Brinjal (Eggplant)",
      layer: "Layer 4",
      status: "healthy",
      parameters: ["Disease Detection", "Water Stress", "Pest Detection"],
      alert: null,
      details: "Early fungal detection system active. No concerns detected.",
    },
    {
      name: "Papaya",
      layer: "Layer 1",
      status: "healthy",
      parameters: ["Heat Stress", "Water Stress", "Microclimate"],
      alert: null,
      details: "Excellent thermal regulation. Growth proceeding as expected.",
    },
    {
      name: "Spinach (Palak)",
      layer: "Layer 2",
      status: "healthy",
      parameters: ["Water Stress", "Nutrient Deficiency", "Disease Detection", "Leaf Temperature"],
      alert: null,
      details: "Optimal thermal profile for leafy greens. Leaf temperature monitoring shows healthy transpiration rates.",
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
                    {/* Crop Image Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        {crop.status === 'healthy' ? (
                          <CheckCircle className="h-12 w-12 text-secondary mx-auto" />
                        ) : (
                          <AlertCircle className="h-12 w-12 text-accent mx-auto" />
                        )}
                      </div>
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
                <div className="text-3xl font-bold text-primary">6</div>
                <p className="text-sm text-muted-foreground mt-1">Across 4 layers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Healthy Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">83%</div>
                <p className="text-sm text-muted-foreground mt-1">5 of 6 crops optimal</p>
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
