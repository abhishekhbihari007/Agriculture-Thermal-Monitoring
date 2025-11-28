import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Camera, Users, Bell, Crop, Settings as SettingsIcon, Save, Plus, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Settings = () => {
  // Sample camera data
  const cameras = [
    { id: 1, name: "Thermal Camera 1", location: "Layer 1", status: "online", resolution: "640x480", temperature: "28.5°C" },
    { id: 2, name: "Thermal Camera 2", location: "Layer 2", status: "online", resolution: "640x480", temperature: "31.2°C" },
    { id: 3, name: "Thermal Camera 3", location: "Layer 3", status: "offline", resolution: "640x480", temperature: "N/A" },
    { id: 4, name: "Thermal Camera 4", location: "Layer 4", status: "online", resolution: "640x480", temperature: "26.9°C" },
  ];

  // Sample crop profiles
  const cropProfiles = [
    { name: "Turmeric", optimalTemp: "25-30°C", cwsiThreshold: 0.4, waterStress: "moderate" },
    { name: "Leafy Vegetables", optimalTemp: "20-25°C", cwsiThreshold: 0.3, waterStress: "high" },
    { name: "Cucumber", optimalTemp: "22-28°C", cwsiThreshold: 0.35, waterStress: "moderate" },
    { name: "Brinjal", optimalTemp: "24-30°C", cwsiThreshold: 0.45, waterStress: "low" },
    { name: "Papaya", optimalTemp: "26-32°C", cwsiThreshold: 0.5, waterStress: "low" },
    { name: "Spinach (Palak)", optimalTemp: "18-25°C", cwsiThreshold: 0.3, waterStress: "high" },
  ];

  // Sample users
  const users = [
    { id: 1, name: "Admin User", email: "admin@thermofarm.com", role: "Administrator", status: "active" },
    { id: 2, name: "Farm Manager", email: "manager@thermofarm.com", role: "Manager", status: "active" },
    { id: 3, name: "Technician", email: "tech@thermofarm.com", role: "Technician", status: "inactive" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">System Settings</h1>
            <p className="text-muted-foreground">
              Configure your thermal monitoring system settings and preferences
            </p>
          </div>

          <Tabs defaultValue="cameras" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cameras">Camera Management</TabsTrigger>
              <TabsTrigger value="crops">Crop Profiles</TabsTrigger>
              <TabsTrigger value="alerts">Alert Settings</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
            </TabsList>

            <TabsContent value="cameras" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Thermal Camera Management
                  </CardTitle>
                  <CardDescription>
                    Manage your thermal cameras and their settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cameras.map((camera) => (
                      <div key={camera.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Camera className="h-5 w-5 text-primary" />
                            <div>
                              <h3 className="font-semibold">{camera.name}</h3>
                              <p className="text-sm text-muted-foreground">{camera.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={camera.status === 'online' ? 'status-healthy' : 'status-critical'}>
                              {camera.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <SettingsIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Resolution:</span>
                            <p className="font-medium">{camera.resolution}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Temperature:</span>
                            <p className="font-medium">{camera.temperature}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Status:</span>
                            <p className="font-medium capitalize">{camera.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Camera
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Camera Configuration</CardTitle>
                  <CardDescription>Global camera settings and calibration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emissivity">Emissivity</Label>
                      <Input id="emissivity" type="number" step="0.01" defaultValue="0.95" />
                    </div>
                    <div>
                      <Label htmlFor="reflection">Reflection Temperature</Label>
                      <Input id="reflection" type="number" defaultValue="20" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="distance">Distance (m)</Label>
                      <Input id="distance" type="number" defaultValue="2.5" />
                    </div>
                    <div>
                      <Label htmlFor="humidity">Relative Humidity (%)</Label>
                      <Input id="humidity" type="number" defaultValue="65" />
                    </div>
                  </div>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Configuration
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="crops" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crop className="h-5 w-5" />
                    Crop Profiles
                  </CardTitle>
                  <CardDescription>
                    Define optimal parameters and thresholds for each crop type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cropProfiles.map((crop, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-lg">{crop.name}</h3>
                          <Button variant="outline" size="sm">
                            <SettingsIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Optimal Temperature:</span>
                            <p className="font-medium">{crop.optimalTemp}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">CWSI Threshold:</span>
                            <p className="font-medium">{crop.cwsiThreshold}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Water Stress Sensitivity:</span>
                            <p className="font-medium capitalize">{crop.waterStress}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Crop Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Default Thresholds</CardTitle>
                  <CardDescription>Global alert thresholds for all crops</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="temp-warning">Temperature Warning (°C)</Label>
                      <Input id="temp-warning" type="number" defaultValue="32" />
                    </div>
                    <div>
                      <Label htmlFor="temp-critical">Temperature Critical (°C)</Label>
                      <Input id="temp-critical" type="number" defaultValue="35" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cwsi-warning">CWSI Warning</Label>
                      <Input id="cwsi-warning" type="number" step="0.1" defaultValue="0.5" />
                    </div>
                    <div>
                      <Label htmlFor="cwsi-critical">CWSI Critical</Label>
                      <Input id="cwsi-critical" type="number" step="0.1" defaultValue="0.7" />
                    </div>
                  </div>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Thresholds
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Alert Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure alert thresholds and notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Browser push notifications</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Notification Email</Label>
                      <Input id="email" type="email" defaultValue="admin@thermofarm.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">SMS Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Alert Frequency</Label>
                      <Select defaultValue="immediate">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="hourly">Hourly Summary</SelectItem>
                          <SelectItem value="daily">Daily Summary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Alert Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>
                    Manage system users and their access levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={user.status === 'active' ? 'status-healthy' : 'status-warning'}>
                              {user.status}
                            </Badge>
                            <Badge variant="outline">{user.role}</Badge>
                            <Button variant="outline" size="sm">
                              <SettingsIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New User
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Role Permissions</CardTitle>
                  <CardDescription>Configure access levels for different user roles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>View Dashboard</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Manage Cameras</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Configure Alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Generate Reports</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>User Management</span>
                      <Switch />
                    </div>
                  </div>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Permissions
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;




