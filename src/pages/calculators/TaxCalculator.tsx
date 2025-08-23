import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PiggyBank, Calculator, TrendingDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface TaxFormData {
  annualIncome: number;
  age: 'below60' | '60to80' | 'above80';
  deductions80C: number;
  deductions80D: number;
  houseRentAllowance: number;
  isNewRegime: boolean;
}

const TaxCalculator = () => {
  const [results, setResults] = useState<{
    grossIncome: number;
    totalDeductions: number;
    taxableIncome: number;
    incomeTax: number;
    cess: number;
    totalTax: number;
    netIncome: number;
    effectiveRate: number;
  } | null>(null);

  const { register, handleSubmit, watch, setValue } = useForm<TaxFormData>({
    defaultValues: {
      annualIncome: 800000,
      age: 'below60',
      deductions80C: 150000,
      deductions80D: 25000,
      houseRentAllowance: 0,
      isNewRegime: false,
    },
  });

  const watchedValues = watch();

  const calculateTax = (data: TaxFormData) => {
    let standardDeduction = 50000;
    let basicExemption = 250000;
    
    // Age-based exemption limits (Old Regime)
    if (!data.isNewRegime) {
      if (data.age === '60to80') {
        basicExemption = 300000;
      } else if (data.age === 'above80') {
        basicExemption = 500000;
      }
    } else {
      // New regime exemption
      basicExemption = 300000;
      standardDeduction = 0; // No standard deduction in new regime
    }

    const grossIncome = data.annualIncome;
    let totalDeductions = standardDeduction;
    
    // Add deductions only for old regime
    if (!data.isNewRegime) {
      totalDeductions += data.deductions80C + data.deductions80D + data.houseRentAllowance;
    }

    const taxableIncome = Math.max(0, grossIncome - totalDeductions - basicExemption);
    
    let incomeTax = 0;
    
    if (data.isNewRegime) {
      // New Tax Regime (FY 2023-24)
      if (taxableIncome > 0) {
        if (taxableIncome <= 300000) incomeTax = 0;
        else if (taxableIncome <= 600000) incomeTax = (taxableIncome - 300000) * 0.05;
        else if (taxableIncome <= 900000) incomeTax = 15000 + (taxableIncome - 600000) * 0.10;
        else if (taxableIncome <= 1200000) incomeTax = 45000 + (taxableIncome - 900000) * 0.15;
        else if (taxableIncome <= 1500000) incomeTax = 90000 + (taxableIncome - 1200000) * 0.20;
        else incomeTax = 150000 + (taxableIncome - 1500000) * 0.30;
      }
    } else {
      // Old Tax Regime
      if (taxableIncome > 0) {
        if (taxableIncome <= 250000) incomeTax = 0;
        else if (taxableIncome <= 500000) incomeTax = (taxableIncome - 250000) * 0.05;
        else if (taxableIncome <= 1000000) incomeTax = 12500 + (taxableIncome - 500000) * 0.20;
        else incomeTax = 112500 + (taxableIncome - 1000000) * 0.30;
      }
    }

    const cess = incomeTax * 0.04; // 4% Health and Education Cess
    const totalTax = incomeTax + cess;
    const netIncome = grossIncome - totalTax;
    const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

    setResults({
      grossIncome,
      totalDeductions,
      taxableIncome,
      incomeTax: Math.round(incomeTax),
      cess: Math.round(cess),
      totalTax: Math.round(totalTax),
      netIncome: Math.round(netIncome),
      effectiveRate: Math.round(effectiveRate * 100) / 100,
    });
  };

  const onSubmit = (data: TaxFormData) => {
    calculateTax(data);
  };

  // Auto-calculate on value changes
  useState(() => {
    if (watchedValues.annualIncome) {
      calculateTax(watchedValues);
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Income Tax Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate your income tax liability and plan your tax savings for FY 2023-24
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Calculator Form */}
            <Card className="card-gradient elegant-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-primary" />
                  Tax Calculation
                </CardTitle>
                <CardDescription>
                  Enter your income details to calculate tax
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Tax Regime Selection */}
                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div>
                      <Label htmlFor="taxRegime" className="text-sm font-medium">
                        {watchedValues.isNewRegime ? 'New Tax Regime' : 'Old Tax Regime'}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {watchedValues.isNewRegime 
                          ? 'Lower rates, no deductions' 
                          : 'Higher rates, deductions allowed'
                        }
                      </p>
                    </div>
                    <Switch
                      id="taxRegime"
                      checked={watchedValues.isNewRegime}
                      onCheckedChange={(checked) => setValue("isNewRegime", checked)}
                    />
                  </div>

                  {/* Annual Income */}
                  <div className="space-y-2">
                    <Label htmlFor="annualIncome">Annual Income (₹)</Label>
                    <Input
                      id="annualIncome"
                      type="number"
                      {...register("annualIncome", { 
                        required: true, 
                        min: 0,
                        valueAsNumber: true 
                      })}
                      className="calculator-input"
                    />
                  </div>

                  {/* Age Group */}
                  <div className="space-y-2">
                    <Label htmlFor="age">Age Group</Label>
                    <Select 
                      value={watchedValues.age} 
                      onValueChange={(value) => setValue("age", value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below60">Below 60 years</SelectItem>
                        <SelectItem value="60to80">60 to 80 years (Senior Citizen)</SelectItem>
                        <SelectItem value="above80">Above 80 years (Super Senior)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Deductions (Only for Old Regime) */}
                  {!watchedValues.isNewRegime && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="deductions80C">80C Deductions (₹)</Label>
                        <Input
                          id="deductions80C"
                          type="number"
                          max="150000"
                          {...register("deductions80C", { 
                            min: 0,
                            max: 150000,
                            valueAsNumber: true 
                          })}
                          className="calculator-input"
                        />
                        <p className="text-xs text-muted-foreground">
                          Max limit: ₹1,50,000 (EPF, PPF, ELSS, etc.)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deductions80D">80D Deductions (₹)</Label>
                        <Input
                          id="deductions80D"
                          type="number"
                          max="75000"
                          {...register("deductions80D", { 
                            min: 0,
                            max: 75000,
                            valueAsNumber: true 
                          })}
                          className="calculator-input"
                        />
                        <p className="text-xs text-muted-foreground">
                          Health insurance premiums
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="houseRentAllowance">HRA Exemption (₹)</Label>
                        <Input
                          id="houseRentAllowance"
                          type="number"
                          {...register("houseRentAllowance", { 
                            min: 0,
                            valueAsNumber: true 
                          })}
                          className="calculator-input"
                        />
                      </div>
                    </>
                  )}

                  <Button type="submit" className="w-full primary-gradient text-primary-foreground">
                    Calculate Tax
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
                    Tax Breakdown
                  </CardTitle>
                  <CardDescription>
                    Your income tax calculation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Tax Summary */}
                    <div className="text-center p-6 primary-gradient rounded-lg text-primary-foreground">
                      <div className="text-sm opacity-90 mb-1">Total Tax Payable</div>
                      <div className="text-3xl font-bold">₹{results.totalTax.toLocaleString('en-IN')}</div>
                      <div className="text-sm opacity-90 mt-1">
                        Effective Rate: {results.effectiveRate}%
                      </div>
                    </div>

                    {/* Income Breakdown */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Income Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Gross Income:</span>
                          <span>₹{results.grossIncome.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Deductions:</span>
                          <span>₹{results.totalDeductions.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium border-t pt-2">
                          <span>Taxable Income:</span>
                          <span>₹{results.taxableIncome.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tax Breakdown */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Tax Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Income Tax:</span>
                          <span>₹{results.incomeTax.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Health & Education Cess (4%):</span>
                          <span>₹{results.cess.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium border-t pt-2">
                          <span>Total Tax:</span>
                          <span>₹{results.totalTax.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Net Income */}
                    <div className="text-center p-4 success-gradient rounded-lg text-accent-foreground">
                      <div className="text-sm opacity-90 mb-1">Net Take-home</div>
                      <div className="text-2xl font-bold">₹{results.netIncome.toLocaleString('en-IN')}</div>
                    </div>

                    {/* Tax Saving Tips */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-primary" />
                        Tax Saving Tips
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {!watchedValues.isNewRegime ? (
                          <>
                            <li>• Maximize 80C deductions up to ₹1.5L (EPF, PPF, ELSS)</li>
                            <li>• Claim health insurance under 80D (up to ₹75k)</li>
                            <li>• Consider NPS for additional deduction under 80CCD(1B)</li>
                          </>
                        ) : (
                          <>
                            <li>• New regime offers lower tax rates</li>
                            <li>• No deductions allowed, but simpler calculation</li>
                            <li>• Compare both regimes to choose the better option</li>
                          </>
                        )}
                        <li>• Plan investments early in the financial year</li>
                      </ul>
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

export default TaxCalculator;