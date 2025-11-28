import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Thermometer, Droplets, AlertTriangle, TrendingUp, Play, Pause, RotateCcw, Maximize2, Flame, Snowflake } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThermalMapAnnotation from "@/components/ThermalMapAnnotation";

const Dashboard = () => {
  const [selectedLayer, setSelectedLayer] = useState(2);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Simple mock data
  const mockThermalData = {
    layer1: { temperature: 27.8, cwsi: 0.35, status: "healthy" },
    layer2: { temperature: 31.2, cwsi: 0.68, status: "warning" },
    layer3: { temperature: 29.4, cwsi: 0.42, status: "healthy" },
    layer4: { temperature: 26.9, cwsi: 0.28, status: "healthy" },
  };
  
  const systemMetrics = {
    avgTemperature: 28.8,
    activeAlerts: 1,
    healthScore: 75
  };

  // Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simple temperature data
  const temperatureData = [
    { time: "00:00", layer1: 27, layer2: 28, layer3: 26 },
    { time: "04:00", layer1: 26, layer2: 27, layer3: 25 },
    { time: "08:00", layer1: 28, layer2: 30, layer3: 27 },
    { time: "12:00", layer1: 31, layer2: 33, layer3: 30 },
    { time: "16:00", layer1: 30, layer2: 32, layer3: 29 },
    { time: "20:00", layer1: 28, layer2: 29, layer3: 27 },
  ];

  // Simple CWSI data
  const cwsiData = [
    { layer: "Layer 1", cwsi: 0.35, status: "Healthy" },
    { layer: "Layer 2", cwsi: 0.68, status: "Stress" },
    { layer: "Layer 3", cwsi: 0.42, status: "Healthy" },
    { layer: "Layer 4", cwsi: 0.28, status: "Healthy" },
  ];

  const layerStatus = [
    { layer: "Layer 1", temp: 27.8, cwsi: 0.35, status: "healthy" },
    { layer: "Layer 2", temp: 31.2, cwsi: 0.68, status: "warning" },
    { layer: "Layer 3", temp: 29.4, cwsi: 0.42, status: "healthy" },
    { layer: "Layer 4", temp: 26.9, cwsi: 0.28, status: "healthy" },
  ];

  // Simple alerts
  const activeAlerts = [
    { id: 1, message: "Water stress detected in Layer 2", severity: "warning", time: "10 min ago" },
    { id: 2, message: "Temperature spike in Layer 3", severity: "info", time: "25 min ago" },
    { id: 3, message: "Optimal conditions in Layer 1", severity: "success", time: "1 hour ago" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Monitoring Dashboard</h1>
            <p className="text-muted-foreground">Real-time thermal monitoring across all farming layers</p>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg Temperature</CardTitle>
                <Thermometer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28.8°C</div>
                <p className="text-xs text-muted-foreground">+2.1° from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Humidity</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">Optimal range</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">1 warning, 0 critical</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Health Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">+5% from last week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 mb-6">
            {/* Enhanced Thermal Feed */}
            <Card className="lg:col-span-2">
              <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Live Thermal Feed - Layer 2</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-muted-foreground">LIVE</span>
                    </div>
                  </div>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video bg-gradient-to-br from-red-900 via-orange-800 to-yellow-700 rounded-lg overflow-hidden">
                  {/* Simulated Thermal Image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-orange-400/20 to-yellow-300/10"></div>
                  
                  {/* Temperature Overlay */}
                  <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-mono">
                    Max: 32.4°C | Min: 26.1°C
                  </div>
                  
                  {/* Plant Zones */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 w-3/4 h-3/4">
                      {/* Plant 1 - Healthy */}
                      <div className="bg-green-500/20 border-2 border-green-400 rounded-lg flex items-center justify-center relative">
                        <div className="text-center text-white">
                          <div className="text-xs font-bold">Turmeric</div>
                          <div className="text-xs">28.5°C</div>
                        </div>
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full"></div>
                      </div>
                      
                      {/* Plant 2 - Warning */}
                      <div className="bg-orange-500/20 border-2 border-orange-400 rounded-lg flex items-center justify-center relative">
                        <div className="text-center text-white">
                          <div className="text-xs font-bold">Lettuce</div>
                          <div className="text-xs">31.2°C</div>
                        </div>
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-orange-400 rounded-full animate-pulse"></div>
                      </div>
                      
                      {/* Plant 3 - Healthy */}
                      <div className="bg-green-500/20 border-2 border-green-400 rounded-lg flex items-center justify-center relative">
                        <div className="text-center text-white">
                          <div className="text-xs font-bold">Cucumber</div>
                          <div className="text-xs">27.8°C</div>
                        </div>
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full"></div>
                      </div>
                      
                      {/* Plant 4 - Healthy (Spinach/Palak) */}
                      <div className="bg-green-500/20 border-2 border-green-400 rounded-lg flex items-center justify-center relative">
                        <div className="text-center text-white">
                          <div className="text-xs font-bold">Spinach (Palak)</div>
                          <div className="text-xs">28.2°C</div>
                        </div>
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hot/Cold Spot Annotations */}
                  <ThermalMapAnnotation showLabels={true} />
                  
                  {/* Temperature Scale */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="bg-black/70 rounded p-2">
                      <div className="text-white text-xs font-bold mb-1">Temperature Scale</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          <span className="text-white text-xs">Hot</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded"></div>
                          <span className="text-white text-xs">Warm</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                          <span className="text-white text-xs">Normal</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span className="text-white text-xs">Cool</span>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-white/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Flame className="h-3 w-3 text-red-500" />
                          <span className="text-white text-xs">Hot Spots</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Snowflake className="h-3 w-3 text-blue-400" />
                          <span className="text-white text-xs">Cold Spots</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Alerts Panel */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Real-time Alerts</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">ACTIVE</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeAlerts.map((alert) => (
                    <div key={alert.id} className={`border-l-4 pl-4 py-3 rounded-r-lg ${
                      alert.severity === "warning" ? "border-orange-500 bg-orange-50" :
                      alert.severity === "success" ? "border-green-500 bg-green-50" : 
                      "border-blue-500 bg-blue-50"
                    }`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {alert.severity === "warning" && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                            {alert.severity === "success" && <TrendingUp className="h-4 w-4 text-green-500" />}
                            {alert.severity === "info" && <Thermometer className="h-4 w-4 text-blue-500" />}
                            <p className="text-sm font-medium">{alert.message}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                        <Badge
                          variant={
                            alert.severity === "warning" ? "destructive" :
                            alert.severity === "success" ? "default" : "secondary"
                          }
                          className="shrink-0"
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Alert Summary */}
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-red-500">1</div>
                      <div className="text-xs text-muted-foreground">Critical</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-orange-500">1</div>
                      <div className="text-xs text-muted-foreground">Warning</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-500">1</div>
                      <div className="text-xs text-muted-foreground">Info</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Trends (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="layer1" stroke="hsl(var(--chart-1))" name="Layer 1" strokeWidth={2} />
                    <Line type="monotone" dataKey="layer2" stroke="hsl(var(--chart-2))" name="Layer 2" strokeWidth={2} />
                    <Line type="monotone" dataKey="layer3" stroke="hsl(var(--chart-3))" name="Layer 3" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crop Water Stress Index (CWSI)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cwsiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="layer" />
                    <YAxis domain={[0, 1]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cwsi" fill="hsl(var(--chart-2))" name="CWSI" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Layer Status Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {layerStatus.map((layer, index) => (
              <Card key={index} className={`border-2 ${
                layer.status === 'healthy' ? 'border-secondary/30' :
                layer.status === 'warning' ? 'border-accent/30' : 'border-destructive/30'
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{layer.layer}</CardTitle>
                    <Badge className={
                      layer.status === 'healthy' ? 'status-healthy' :
                      layer.status === 'warning' ? 'status-warning' : 'status-critical'
                    }>
                      {layer.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Temperature:</span>
                      <span className="font-medium">{layer.temp}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">CWSI:</span>
                      <span className="font-medium">{layer.cwsi}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
