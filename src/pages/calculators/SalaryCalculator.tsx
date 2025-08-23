import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calculator, Banknote, TrendingDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface SalaryFormData {
  basicSalary: number;
  hra: number;
  specialAllowance: number;
  pf: number;
  professionalTax: number;
  otherDeductions: number;
  isNewTaxRegime: boolean;
  standardDeduction: number;
  hraExemption: number;
}

const SalaryCalculator = () => {
  const [results, setResults] = useState<{
    grossSalary: number;
    totalDeductions: number;
    taxableIncome: number;
    incomeTax: number;
    netSalary: number;
    monthlyTakeHome: number;
    pfContribution: number;
  } | null>(null);

  const { register, handleSubmit, watch, setValue } = useForm<SalaryFormData>({
    defaultValues: {
      basicSalary: 50000,
      hra: 20000,
      specialAllowance: 10000,
      pf: 1800,
      professionalTax: 200,
      otherDeductions: 0,
      isNewTaxRegime: false,
      standardDeduction: 50000,
      hraExemption: 0,
    },
  });

  const watchedValues = watch();

  const calculateSalary = (data: SalaryFormData) => {
    // Gross Salary Calculation
    const grossSalary = (data.basicSalary + data.hra + data.specialAllowance) * 12;
    
    // PF Calculation (Employee + Employer)
    const pfContribution = data.pf * 12;
    
    // Total Deductions
    const totalDeductions = pfContribution + (data.professionalTax * 12) + (data.otherDeductions * 12);
    
    // Taxable Income Calculation
    let taxableIncome = grossSalary;
    
    if (!data.isNewTaxRegime) {
      // Old regime - apply standard deduction and HRA exemption
      taxableIncome = grossSalary - data.standardDeduction - data.hraExemption;
    }
    
    // Basic exemption
    const basicExemption = data.isNewTaxRegime ? 300000 : 250000;
    const finalTaxableIncome = Math.max(0, taxableIncome - basicExemption);
    
    // Income Tax Calculation
    let incomeTax = 0;
    
    if (data.isNewTaxRegime) {
      // New Tax Regime
      if (finalTaxableIncome > 0) {
        if (finalTaxableIncome <= 300000) incomeTax = 0;
        else if (finalTaxableIncome <= 600000) incomeTax = (finalTaxableIncome - 300000) * 0.05;
        else if (finalTaxableIncome <= 900000) incomeTax = 15000 + (finalTaxableIncome - 600000) * 0.10;
        else if (finalTaxableIncome <= 1200000) incomeTax = 45000 + (finalTaxableIncome - 900000) * 0.15;
        else if (finalTaxableIncome <= 1500000) incomeTax = 90000 + (finalTaxableIncome - 1200000) * 0.20;
        else incomeTax = 150000 + (finalTaxableIncome - 1500000) * 0.30;
      }
    } else {
      // Old Tax Regime
      if (finalTaxableIncome > 0) {
        if (finalTaxableIncome <= 250000) incomeTax = 0;
        else if (finalTaxableIncome <= 500000) incomeTax = (finalTaxableIncome - 250000) * 0.05;
        else if (finalTaxableIncome <= 1000000) incomeTax = 12500 + (finalTaxableIncome - 500000) * 0.20;
        else incomeTax = 112500 + (finalTaxableIncome - 1000000) * 0.30;
      }
    }
    
    // Add cess
    const cess = incomeTax * 0.04;
    const totalTax = incomeTax + cess;
    
    // Net Salary
    const netSalary = grossSalary - totalDeductions - totalTax;
    const monthlyTakeHome = netSalary / 12;

    setResults({
      grossSalary: Math.round(grossSalary),
      totalDeductions: Math.round(totalDeductions),
      taxableIncome: Math.round(taxableIncome),
      incomeTax: Math.round(totalTax),
      netSalary: Math.round(netSalary),
      monthlyTakeHome: Math.round(monthlyTakeHome),
      pfContribution: Math.round(pfContribution),
    });
  };

  const onSubmit = (data: SalaryFormData) => {
    calculateSalary(data);
  };

  // Auto-calculate on value changes
  useState(() => {
    if (watchedValues.basicSalary) {
      calculateSalary(watchedValues);
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Salary Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate your take-home salary after deductions and tax implications
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Calculator Form */}
            <Card className="card-gradient elegant-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Salary Components
                </CardTitle>
                <CardDescription>
                  Enter your salary details for calculation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Tax Regime Selection */}
                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div>
                      <Label htmlFor="taxRegime" className="text-sm font-medium">
                        {watchedValues.isNewTaxRegime ? 'New Tax Regime' : 'Old Tax Regime'}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {watchedValues.isNewTaxRegime 
                          ? 'Lower rates, fewer deductions' 
                          : 'Standard deductions allowed'
                        }
                      </p>
                    </div>
                    <Switch
                      id="taxRegime"
                      checked={watchedValues.isNewTaxRegime}
                      onCheckedChange={(checked) => setValue("isNewTaxRegime", checked)}
                    />
                  </div>

                  <Tabs defaultValue="salary" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="salary">Salary</TabsTrigger>
                      <TabsTrigger value="deductions">Deductions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="salary" className="space-y-4">
                      {/* Basic Salary */}
                      <div className="space-y-2">
                        <Label htmlFor="basicSalary">Basic Salary (Monthly) (₹)</Label>
                        <Input
                          id="basicSalary"
                          type="number"
                          {...register("basicSalary", { 
                            required: true, 
                            min: 0,
                            valueAsNumber: true 
                          })}
                          className="calculator-input"
                        />
                      </div>

                      {/* HRA */}
                      <div className="space-y-2">
                        <Label htmlFor="hra">HRA (Monthly) (₹)</Label>
                        <Input
                          id="hra"
                          type="number"
                          {...register("hra", { 
                            min: 0,
                            valueAsNumber: true 
                          })}
                          className="calculator-input"
                        />
                      </div>

                      {/* Special Allowance */}
                      <div className="space-y-2">
                        <Label htmlFor="specialAllowance">Special Allowance (Monthly) (₹)</Label>
                        <Input
                          id="specialAllowance"
                          type="number"
                          {...register("specialAllowance", { 
                            min: 0,
                            valueAsNumber: true 
                          })}
                          className="calculator-input"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="deductions" className="space-y-4">
                      {/* PF */}
                      <div className="space-y-2">
                        <Label htmlFor="pf">Employee PF (Monthly) (₹)</Label>
                        <Input
                          id="pf"
                          type="number"
                          {...register("pf", { 
                            min: 0,
                            valueAsNumber: true 
                          })}
                          className="calculator-input"
                        />
                        <p className="text-xs text-muted-foreground">
                          Usually 12% of basic salary (max ₹1,800)
                        </p>
                      </div>

                      {/* Professional Tax */}
                      <div className="space-y-2">
                        <Label htmlFor="professionalTax">Professional Tax (Monthly) (₹)</Label>
                        <Input
                          id="professionalTax"
                          type="number"
                          {...register("professionalTax", { 
                            min: 0,
                            valueAsNumber: true 
                          })}
                          className="calculator-input"
                        />
                        <p className="text-xs text-muted-foreground">
                          Varies by state (₹200 in Maharashtra, Karnataka)
                        </p>
                      </div>

                      {/* Other Deductions */}
                      <div className="space-y-2">
                        <Label htmlFor="otherDeductions">Other Deductions (Monthly) (₹)</Label>
                        <Input
                          id="otherDeductions"
                          type="number"
                          {...register("otherDeductions", { 
                            min: 0,
                            valueAsNumber: true 
                          })}
                          className="calculator-input"
                        />
                      </div>

                      {/* Exemptions (Old Regime Only) */}
                      {!watchedValues.isNewTaxRegime && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="standardDeduction">Standard Deduction (Annual) (₹)</Label>
                            <Input
                              id="standardDeduction"
                              type="number"
                              {...register("standardDeduction", { 
                                min: 0,
                                valueAsNumber: true 
                              })}
                              className="calculator-input"
                            />
                            <p className="text-xs text-muted-foreground">
                              Standard deduction: ₹50,000
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="hraExemption">HRA Exemption (Annual) (₹)</Label>
                            <Input
                              id="hraExemption"
                              type="number"
                              {...register("hraExemption", { 
                                min: 0,
                                valueAsNumber: true 
                              })}
                              className="calculator-input"
                            />
                          </div>
                        </>
                      )}
                    </TabsContent>
                  </Tabs>

                  <Button type="submit" className="w-full primary-gradient text-primary-foreground">
                    Calculate Salary
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            {results && (
              <Card className="card-gradient elegant-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-accent" />
                    Salary Breakdown
                  </CardTitle>
                  <CardDescription>
                    Your take-home salary calculation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Monthly Take-home */}
                    <div className="text-center p-6 primary-gradient rounded-lg text-primary-foreground">
                      <div className="text-sm opacity-90 mb-1">Monthly Take-home</div>
                      <div className="text-3xl font-bold">₹{results.monthlyTakeHome.toLocaleString('en-IN')}</div>
                      <div className="text-sm opacity-90 mt-1">
                        Annual: ₹{results.netSalary.toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* Salary Components */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Annual Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Gross Salary:</span>
                          <span>₹{results.grossSalary.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Employee PF:</span>
                          <span>₹{results.pfContribution.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Professional Tax:</span>
                          <span>₹{(watchedValues.professionalTax * 12).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Other Deductions:</span>
                          <span>₹{(watchedValues.otherDeductions * 12).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Income Tax & Cess:</span>
                          <span>₹{results.incomeTax.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium border-t pt-2">
                          <span>Total Deductions:</span>
                          <span>₹{(results.totalDeductions + results.incomeTax).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Monthly Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-secondary rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Monthly Gross</div>
                        <div className="text-xl font-semibold text-foreground">
                          ₹{Math.round(results.grossSalary / 12).toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="text-center p-4 success-gradient rounded-lg text-accent-foreground">
                        <div className="text-sm opacity-90 mb-1">Monthly Net</div>
                        <div className="text-xl font-semibold">
                          ₹{results.monthlyTakeHome.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Tax Efficiency */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-primary" />
                        Tax Efficiency
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Effective Tax Rate:</span>
                          <span>{((results.incomeTax / results.grossSalary) * 100).toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Take-home Percentage:</span>
                          <span>{((results.netSalary / results.grossSalary) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Deduction Rate:</span>
                          <span>{(((results.totalDeductions + results.incomeTax) / results.grossSalary) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* PF Benefits */}
                    <div className="p-4 bg-secondary rounded-lg">
                      <h5 className="font-medium text-foreground mb-2">PF Benefits</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Employee contribution: ₹{results.pfContribution.toLocaleString('en-IN')}/year</li>
                        <li>• Employer contribution: ₹{results.pfContribution.toLocaleString('en-IN')}/year</li>
                        <li>• Total PF corpus: ₹{(results.pfContribution * 2).toLocaleString('en-IN')}/year</li>
                        <li>• Tax-free interest (currently 8.5% p.a.)</li>
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

export default SalaryCalculator;
