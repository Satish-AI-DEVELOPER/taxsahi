import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Receipt, Calculator, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface GSTFormData {
  amount: number;
  gstRate: number;
  calculationType: 'inclusive' | 'exclusive';
}

const GSTCalculator = () => {
  const [results, setResults] = useState<{
    originalAmount: number;
    gstAmount: number;
    totalAmount: number;
    gstRate: number;
  } | null>(null);

  const { register, handleSubmit, watch, setValue } = useForm<GSTFormData>({
    defaultValues: {
      amount: 10000,
      gstRate: 18,
      calculationType: 'exclusive',
    },
  });

  const watchedValues = watch();

  const calculateGST = (data: GSTFormData) => {
    let originalAmount: number;
    let gstAmount: number;
    let totalAmount: number;

    if (data.calculationType === 'inclusive') {
      // GST Inclusive - Remove GST from the amount
      totalAmount = data.amount;
      originalAmount = data.amount / (1 + data.gstRate / 100);
      gstAmount = data.amount - originalAmount;
    } else {
      // GST Exclusive - Add GST to the amount
      originalAmount = data.amount;
      gstAmount = (data.amount * data.gstRate) / 100;
      totalAmount = data.amount + gstAmount;
    }

    setResults({
      originalAmount: Math.round(originalAmount * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      gstRate: data.gstRate,
    });
  };

  const onSubmit = (data: GSTFormData) => {
    calculateGST(data);
  };

  // Auto-calculate on value changes
  useState(() => {
    if (watchedValues.amount && watchedValues.gstRate) {
      calculateGST(watchedValues);
    }
  });

  const gstRates = [
    { value: 0, label: "0% (Exempt)" },
    { value: 5, label: "5% (Essential goods)" },
    { value: 12, label: "12% (Processed food)" },
    { value: 18, label: "18% (Most goods)" },
    { value: 28, label: "28% (Luxury items)" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              GST Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate GST inclusive and exclusive prices for your business transactions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Calculator Form */}
            <Card className="card-gradient elegant-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-primary" />
                  GST Calculation
                </CardTitle>
                <CardDescription>
                  Calculate GST for your business transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Calculation Type */}
                  <Tabs 
                    value={watchedValues.calculationType} 
                    onValueChange={(value) => setValue("calculationType", value as 'inclusive' | 'exclusive')}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="exclusive">Add GST</TabsTrigger>
                      <TabsTrigger value="inclusive">Remove GST</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="exclusive" className="mt-4">
                      <div className="text-sm text-muted-foreground bg-secondary p-3 rounded-lg">
                        <strong>GST Exclusive:</strong> Add GST to the base amount to get the final price
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="inclusive" className="mt-4">
                      <div className="text-sm text-muted-foreground bg-secondary p-3 rounded-lg">
                        <strong>GST Inclusive:</strong> Remove GST from the total amount to get the base price
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="amount">
                      {watchedValues.calculationType === 'inclusive' ? 'Total Amount (₹)' : 'Base Amount (₹)'}
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      {...register("amount", { 
                        required: true, 
                        min: 0.01,
                        valueAsNumber: true 
                      })}
                      className="calculator-input"
                    />
                  </div>

                  {/* GST Rate */}
                  <div className="space-y-2">
                    <Label htmlFor="gstRate">GST Rate (%)</Label>
                    <Select 
                      value={watchedValues.gstRate?.toString()} 
                      onValueChange={(value) => setValue("gstRate", parseFloat(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select GST Rate" />
                      </SelectTrigger>
                      <SelectContent>
                        {gstRates.map((rate) => (
                          <SelectItem key={rate.value} value={rate.value.toString()}>
                            {rate.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Custom GST Rate */}
                  <div className="space-y-2">
                    <Label htmlFor="customRate">Or enter custom rate (%)</Label>
                    <Input
                      id="customRate"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={watchedValues.gstRate}
                      onChange={(e) => setValue("gstRate", parseFloat(e.target.value) || 0)}
                      className="calculator-input"
                    />
                  </div>

                  <Button type="submit" className="w-full primary-gradient text-primary-foreground">
                    Calculate GST
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            {results && (
              <Card className="card-gradient elegant-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-accent" />
                    GST Breakdown
                  </CardTitle>
                  <CardDescription>
                    Detailed GST calculation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Calculation Flow */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                        <span className="text-sm text-muted-foreground">Base Amount</span>
                        <span className="text-lg font-semibold">₹{results.originalAmount.toLocaleString('en-IN')}</span>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 primary-gradient rounded-lg text-primary-foreground">
                        <span className="text-sm opacity-90">GST ({results.gstRate}%)</span>
                        <span className="text-lg font-semibold">₹{results.gstAmount.toLocaleString('en-IN')}</span>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 success-gradient rounded-lg text-accent-foreground">
                        <span className="text-sm opacity-90">Total Amount</span>
                        <span className="text-2xl font-bold">₹{results.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* GST Details */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">GST Breakdown</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {results.gstRate === 18 && (
                          <>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">CGST (9%):</span>
                              <span>₹{(results.gstAmount / 2).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">SGST (9%):</span>
                              <span>₹{(results.gstAmount / 2).toFixed(2)}</span>
                            </div>
                          </>
                        )}
                        {results.gstRate === 28 && (
                          <>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">CGST (14%):</span>
                              <span>₹{(results.gstAmount / 2).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">SGST (14%):</span>
                              <span>₹{(results.gstAmount / 2).toFixed(2)}</span>
                            </div>
                          </>
                        )}
                        <div className="border-t pt-2 flex justify-between text-sm font-medium">
                          <span>Total GST:</span>
                          <span>₹{results.gstAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setValue("calculationType", watchedValues.calculationType === 'inclusive' ? 'exclusive' : 'inclusive')}
                      >
                        Switch Mode
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setValue("amount", 0);
                          setResults(null);
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GSTCalculator;