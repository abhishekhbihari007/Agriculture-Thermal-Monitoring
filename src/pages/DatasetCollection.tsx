import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DatasetCollection = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    image: null as File | null,
    crop: "",
    diseaseName: "",
    severity: "",
    notes: "",
    location: "",
    date: new Date().toISOString().split('T')[0],
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const crops = [
    "Turmeric",
    "Leafy Vegetables",
    "Creepers (Cucumber)",
    "Brinjal (Eggplant)",
    "Papaya",
    "Spinach (Palak)",
  ];

  const diseases = [
    "Downy Mildew",
    "Powdery Mildew",
    "Leaf Spot",
    "Bacterial Blight",
    "Fungal Infection",
    "Viral Disease",
    "Pest Infestation",
    "Nutrient Deficiency",
    "Water Stress",
    "Heat Stress",
    "Other",
  ];

  const severityLevels = [
    "Mild",
    "Moderate",
    "Severe",
    "Critical",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.image) {
      toast({
        title: "Image required",
        description: "Please upload a photo of the diseased plant",
        variant: "destructive",
      });
      return;
    }

    if (!formData.crop) {
      toast({
        title: "Crop required",
        description: "Please select the crop type",
        variant: "destructive",
      });
      return;
    }

    if (!formData.diseaseName) {
      toast({
        title: "Disease name required",
        description: "Please select or enter the disease name",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - In production, this would upload to your backend
    try {
      // Create form data for upload
      const uploadData = new FormData();
      uploadData.append('image', formData.image);
      uploadData.append('crop', formData.crop);
      uploadData.append('diseaseName', formData.diseaseName);
      uploadData.append('severity', formData.severity);
      uploadData.append('notes', formData.notes);
      uploadData.append('location', formData.location);
      uploadData.append('date', formData.date);

      // TODO: Replace with actual API endpoint
      // await fetch('/api/dataset/upload', {
      //   method: 'POST',
      //   body: uploadData,
      // });

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Dataset entry saved",
        description: "Your photo and metadata have been saved for future learning.",
      });

      // Reset form
      setFormData({
        image: null,
        crop: "",
        diseaseName: "",
        severity: "",
        notes: "",
        location: "",
        date: new Date().toISOString().split('T')[0],
      });
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save dataset entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dataset Collection</h1>
            <p className="text-muted-foreground">
              Upload photos of diseased plants with metadata to build your training dataset
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Image Upload Section */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Plant Photo Upload
                  </CardTitle>
                  <CardDescription>
                    Upload a photo of the diseased plant for analysis and dataset collection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!preview ? (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm font-medium mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </label>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-auto rounded-lg border border-border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Crop Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Crop Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="crop">Select Crop *</Label>
                    <Select
                      value={formData.crop}
                      onValueChange={(value) => handleInputChange('crop', value)}
                    >
                      <SelectTrigger id="crop">
                        <SelectValue placeholder="Choose crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        {crops.map((crop) => (
                          <SelectItem key={crop} value={crop}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Layer 2, Greenhouse A"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Disease Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Disease Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="disease">Disease Name *</Label>
                    <Select
                      value={formData.diseaseName}
                      onValueChange={(value) => handleInputChange('diseaseName', value)}
                    >
                      <SelectTrigger id="disease">
                        <SelectValue placeholder="Select disease" />
                      </SelectTrigger>
                      <SelectContent>
                        {diseases.map((disease) => (
                          <SelectItem key={disease} value={disease}>
                            {disease}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="severity">Severity Level (Optional)</Label>
                    <Select
                      value={formData.severity}
                      onValueChange={(value) => handleInputChange('severity', value)}
                    >
                      <SelectTrigger id="severity">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        {severityLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Notes */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                  <CardDescription>
                    Add any additional observations or context about this case
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter any additional observations, symptoms, or context about this diseased plant..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="md:col-span-2 flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      image: null,
                      crop: "",
                      diseaseName: "",
                      severity: "",
                      notes: "",
                      location: "",
                      date: new Date().toISOString().split('T')[0],
                    });
                    setPreview(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                >
                  Reset
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Save to Dataset
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Info Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>About Dataset Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This dataset collection tool helps you build a comprehensive database of plant diseases 
                for machine learning and analysis. Each uploaded photo with its metadata will be used 
                to improve disease detection algorithms and provide better insights for your farming operations.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DatasetCollection;

