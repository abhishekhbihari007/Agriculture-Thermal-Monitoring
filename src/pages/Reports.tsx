import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";
import { Download, Calendar, TrendingUp, AlertTriangle, Droplets, Thermometer, FileText, BarChart3, Filter, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Reports = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  
  // Sample data for reports
  const dailyReportData = [
    { date: "2024-01-01", avgTemp: 28.5, cwsi: 0.35, alerts: 2, healthScore: 92 },
    { date: "2024-01-02", avgTemp: 29.1, cwsi: 0.42, alerts: 1, healthScore: 88 },
    { date: "2024-01-03", avgTemp: 27.8, cwsi: 0.38, alerts: 0, healthScore: 95 },
    { date: "2024-01-04", avgTemp: 30.2, cwsi: 0.55, alerts: 3, healthScore: 82 },
    { date: "2024-01-05", avgTemp: 28.9, cwsi: 0.41, alerts: 1, healthScore: 90 },
    { date: "2024-01-06", avgTemp: 29.5, cwsi: 0.48, alerts: 2, healthScore: 87 },
    { date: "2024-01-07", avgTemp: 28.2, cwsi: 0.33, alerts: 0, healthScore: 94 },
  ];

  const performanceMetrics = [
    { metric: "Water Use Efficiency", value: "85%", trend: "+5%", status: "improving" },
    { metric: "Growth Rate", value: "2.3 cm/day", trend: "+0.2 cm/day", status: "improving" },
    { metric: "Yield Projection", value: "95%", trend: "+8%", status: "improving" },
    { metric: "Resource Optimization", value: "78%", trend: "+3%", status: "improving" },
  ];

  const anomalyInsights = [
    {
      id: 1,
      type: "Temperature Anomaly",
      description: "Unusual temperature spike detected in Layer 2 at 14:30",
      severity: "medium",
      recommendation: "Check ventilation system and consider increasing airflow",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "CWSI Pattern",
      description: "Consistent water stress pattern in Turmeric plants",
      severity: "low",
      recommendation: "Adjust irrigation schedule for Turmeric layer",
      timestamp: "1 day ago"
    },
    {
      id: 3,
      type: "Disease Risk",
      description: "Thermal signature suggests potential fungal infection in Leafy Vegetables",
      severity: "high",
      recommendation: "Immediate inspection and preventive treatment recommended",
      timestamp: "3 hours ago"
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const generateReport = (type: string) => {
    // Create a comprehensive report
    const reportData = {
      type,
      generatedAt: new Date().toISOString(),
      summary: {
        healthScore: 89.7,
        totalAlerts: 9,
        waterEfficiency: 85,
        avgTemperature: 28.9
      },
      dailyData: dailyReportData,
      performanceMetrics,
      anomalyInsights
    };

    // Generate PDF content
    const generatePDFContent = () => {
      const content = `
        THERMAL MONITORING SYSTEM REPORT
        ${type.toUpperCase()} REPORT
        
        Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
        
        EXECUTIVE SUMMARY
        ================
        Health Score: ${reportData.summary.healthScore}%
        Total Alerts: ${reportData.summary.totalAlerts}
        Water Efficiency: ${reportData.summary.waterEfficiency}%
        Average Temperature: ${reportData.summary.avgTemperature}°C
        
        PERFORMANCE METRICS
        ===================
        ${performanceMetrics.map(metric => 
          `• ${metric.metric}: ${metric.value} (${metric.trend})`
        ).join('\n')}
        
        ANOMALY DETECTION
        =================
        ${anomalyInsights.map(insight => 
          `• ${insight.type} (${insight.severity}): ${insight.description}
           Recommendation: ${insight.recommendation}`
        ).join('\n\n')}
        
        DAILY TRENDS
        ============
        ${dailyReportData.map(day => 
          `Date: ${day.date} | Health: ${day.healthScore}% | Alerts: ${day.alerts} | Temp: ${day.avgTemp}°C`
        ).join('\n')}
        
        RECOMMENDATIONS
        ===============
        1. Continue monitoring Layer 2 for water stress patterns
        2. Consider adjusting irrigation schedule for optimal CWSI levels
        3. Review ventilation system performance in Layer 3
        4. Implement preventive measures for potential fungal infections
        
        This report was generated automatically by the Thermal Monitoring System.
      `;
      return content;
    };

    // Create and download the report
    const content = generatePDFContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thermal-monitoring-${type.toLowerCase()}-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: `${type} Report Generated`,
      description: `Your ${type.toLowerCase()} report has been downloaded successfully.`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 print:p-0">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
              <p className="text-muted-foreground">
                Comprehensive analysis and reporting for your thermal monitoring system
              </p>
            </div>
            <Button onClick={handlePrint} variant="outline" className="print:hidden">
              <Printer className="mr-2 h-4 w-4" />
              Print Report
            </Button>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 print:hidden">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
              <TabsTrigger value="reports">Generate Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Summary Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Weekly Health Score</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-secondary">89.7%</div>
                    <p className="text-xs text-muted-foreground">+2.3% from last week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-accent">9</div>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Water Efficiency</CardTitle>
                    <Droplets className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">85%</div>
                    <p className="text-xs text-muted-foreground">+5% improvement</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avg Temperature</CardTitle>
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">28.9°C</div>
                    <p className="text-xs text-muted-foreground">Optimal range</p>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Trends */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Health Trends</CardTitle>
                    <CardDescription>Health score and alert trends over the past week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={dailyReportData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="healthScore" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} name="Health Score %" />
                        <Line type="monotone" dataKey="alerts" stroke="hsl(var(--chart-2))" name="Alerts" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Temperature & CWSI Trends</CardTitle>
                    <CardDescription>Daily average temperature and CWSI values</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={dailyReportData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="avgTemp" stroke="hsl(var(--chart-1))" name="Avg Temperature °C" strokeWidth={2} />
                        <Line type="monotone" dataKey="cwsi" stroke="hsl(var(--chart-2))" name="CWSI" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {performanceMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{metric.metric}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-primary">{metric.value}</div>
                          <p className="text-sm text-muted-foreground">{metric.trend}</p>
                        </div>
                        <Badge className={metric.status === 'improving' ? 'status-healthy' : 'status-warning'}>
                          {metric.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Key performance indicators over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={dailyReportData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="healthScore" fill="hsl(var(--chart-1))" name="Health Score %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="anomalies" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Driven Anomaly Detection</CardTitle>
                  <CardDescription>Automated insights and recommendations based on thermal pattern analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {anomalyInsights.map((insight) => (
                      <div key={insight.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className={
                              insight.severity === 'high' ? 'status-critical' :
                              insight.severity === 'medium' ? 'status-warning' : 'status-healthy'
                            }>
                              {insight.severity}
                            </Badge>
                            <span className="font-semibold">{insight.type}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{insight.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-sm font-medium text-primary">Recommendation:</p>
                          <p className="text-sm">{insight.recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6 print:hidden">
              {/* Date Range Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Report Configuration
                  </CardTitle>
                  <CardDescription>Select date range for your report</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Daily Report
                    </CardTitle>
                    <CardDescription>Comprehensive daily summary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => generateReport("Daily")} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Daily Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Weekly Report
                    </CardTitle>
                    <CardDescription>Weekly performance analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => generateReport("Weekly")} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Weekly Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Monthly Report
                    </CardTitle>
                    <CardDescription>Monthly trends and insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => generateReport("Monthly")} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Monthly Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Custom Report
                    </CardTitle>
                    <CardDescription>Custom date range analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => generateReport("Custom")} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Custom Report
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      {dateRange.start} to {dateRange.end}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Alert Summary
                    </CardTitle>
                    <CardDescription>Alert and anomaly report</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => generateReport("Alert Summary")} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Alert Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Performance Report
                    </CardTitle>
                    <CardDescription>Performance metrics analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => generateReport("Performance")} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Generate Performance Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reports;

