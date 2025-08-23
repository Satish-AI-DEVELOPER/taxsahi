import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Calculator, TrendingUp, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface LoanFormData {
  loanType: 'home' | 'car' | 'personal';
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
  monthlyIncome: number;
  existingEMI: number;
}

const LoanCalculator = () => {
  const [results, setResults] = useState<{
    emi: number;
    totalInterest: number;
    totalAmount: number;
    eligibleAmount: number;
    foir: number;
    isEligible: boolean;
  } | null>(null);

  const { register, handleSubmit, watch, setValue } = useForm<LoanFormData>({
    defaultValues: {
      loanType: 'home',
      loanAmount: 2000000,
      interestRate: 8.5,
      loanTenure: 20,
      monthlyIncome: 75000,
      existingEMI: 0,
    },
  });

  const watchedValues = watch();

  const loanTypeData = {
    home: {
      maxTenure: 30,
      maxFOIR: 60,
      interestRange: '8.5% - 10.5%',
      features: ['Tax benefits under 80C & 24(b)', 'Longer tenure available', 'Lower interest rates']
    },
    car: {
      maxTenure: 7,
      maxFOIR: 50,
      interestRange: '7.5% - 12%',
      features: ['Quick processing', 'No collateral needed', 'Up to 90% financing']
    },
    personal: {
      maxTenure: 5,
      maxFOIR: 50,
      interestRange: '10% - 24%',
      features: ['No collateral', 'Quick disbursal', 'Flexible end-use']
    }
  };

  const calculateLoan = (data: LoanFormData) => {
    const principal = data.loanAmount;
    const rate = data.interestRate / 12 / 100;
    const tenure = data.loanTenure * 12;

    // EMI Calculation
    const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    // Eligibility Calculation
    const maxFOIR = loanTypeData[data.loanType].maxFOIR;
    const maxAllowableEMI = (data.monthlyIncome * maxFOIR / 100) - data.existingEMI;
    const eligibleAmount = (maxAllowableEMI * Math.pow(1 + rate, tenure) - 1) / (rate * Math.pow(1 + rate, tenure));
    
    const currentFOIR = ((emi + data.existingEMI) / data.monthlyIncome) * 100;
    const isEligible = currentFOIR <= maxFOIR;

    setResults({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
      eligibleAmount: Math.round(eligibleAmount),
      foir: Math.round(currentFOIR * 100) / 100,
      isEligible,
    });
  };

  const onSubmit = (data: LoanFormData) => {
    calculateLoan(data);
  };

  // Auto-calculate on value changes
  useState(() => {
    if (watchedValues.loanAmount && watchedValues.interestRate && watchedValues.loanTenure && watchedValues.monthlyIncome) {
      calculateLoan(watchedValues);
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Loan Calculator & Eligibility
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate loan EMI and check your eligibility for different types of loans
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Calculator Form */}
            <Card className="card-gradient elegant-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Loan Details
                </CardTitle>
                <CardDescription>
                  Enter loan and income details for calculation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Loan Type */}
                  <div className="space-y-2">
                    <Label htmlFor="loanType">Loan Type</Label>
                    <Select 
                      value={watchedValues.loanType} 
                      onValueChange={(value) => setValue("loanType", value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home Loan</SelectItem>
                        <SelectItem value="car">Car Loan</SelectItem>
                        <SelectItem value="personal">Personal Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Loan Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      {...register("loanAmount", { 
                        required: true, 
                        min: 10000,
                        valueAsNumber: true 
                      })}
                      className="calculator-input"
                    />
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      {...register("interestRate", { 
                        required: true, 
                        min: 1,
                        max: 30,
                        valueAsNumber: true 
                      })}
                      className="calculator-input"
                    />
                    <p className="text-xs text-muted-foreground">
                      Typical range: {loanTypeData[watchedValues.loanType]?.interestRange}
                    </p>
                  </div>

                  {/* Loan Tenure */}
                  <div className="space-y-2">
                    <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
                    <Input
                      id="loanTenure"
                      type="number"
                      max={loanTypeData[watchedValues.loanType]?.maxTenure}
                      {...register("loanTenure", { 
                        required: true, 
                        min: 1,
                        max: loanTypeData[watchedValues.loanType]?.maxTenure,
                        valueAsNumber: true 
                      })}
                      className="calculator-input"
                    />
                    <p className="text-xs text-muted-foreground">
                      Max: {loanTypeData[watchedValues.loanType]?.maxTenure} years
                    </p>
                  </div>

                  {/* Monthly Income */}
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      {...register("monthlyIncome", { 
                        required: true, 
                        min: 10000,
                        valueAsNumber: true 
                      })}
                      className="calculator-input"
                    />
                  </div>

                  {/* Existing EMI */}
                  <div className="space-y-2">
                    <Label htmlFor="existingEMI">Existing EMI (₹)</Label>
                    <Input
                      id="existingEMI"
                      type="number"
                      {...register("existingEMI", { 
                        min: 0,
                        valueAsNumber: true 
                      })}
                      className="calculator-input"
                    />
                  </div>

                  <Button type="submit" className="w-full primary-gradient text-primary-foreground">
                    Calculate Loan
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
                    Loan Analysis
                  </CardTitle>
                  <CardDescription>
                    EMI calculation and eligibility status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="emi" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="emi">EMI Details</TabsTrigger>
                      <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                    </TabsList>

                    <TabsContent value="emi" className="space-y-6">
                      {/* EMI Amount */}
                      <div className="text-center p-6 primary-gradient rounded-lg text-primary-foreground">
                        <div className="text-sm opacity-90 mb-1">Monthly EMI</div>
                        <div className="text-3xl font-bold">₹{results.emi.toLocaleString('en-IN')}</div>
                      </div>

                      {/* EMI Breakdown */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-secondary rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Principal</div>
                          <div className="text-xl font-semibold text-foreground">
                            ₹{watchedValues.loanAmount?.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-secondary rounded-lg">
                          <div className="text-sm text-muted-foreground mb-1">Total Interest</div>
                          <div className="text-xl font-semibold text-foreground">
                            ₹{results.totalInterest.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      <div className="text-center p-4 success-gradient rounded-lg text-accent-foreground">
                        <div className="text-sm opacity-90 mb-1">Total Payable</div>
                        <div className="text-2xl font-bold">₹{results.totalAmount.toLocaleString('en-IN')}</div>
                      </div>

                      {/* Key Metrics */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Interest vs Principal:</span>
                          <span>{((results.totalInterest / watchedValues.loanAmount) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">EMI vs Income:</span>
                          <span>{((results.emi / watchedValues.monthlyIncome) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="eligibility" className="space-y-6">
                      {/* Eligibility Status */}
                      <div className={`text-center p-6 rounded-lg ${
                        results.isEligible 
                          ? 'success-gradient text-accent-foreground' 
                          : 'bg-destructive/10 border border-destructive/20'
                      }`}>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          {results.isEligible ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center">
                              <span className="text-destructive text-sm">!</span>
                            </div>
                          )}
                          <span className="text-lg font-semibold">
                            {results.isEligible ? 'Eligible' : 'Not Eligible'}
                          </span>
                        </div>
                        <div className="text-sm opacity-90">
                          Current FOIR: {results.foir}% 
                          (Max: {loanTypeData[watchedValues.loanType]?.maxFOIR}%)
                        </div>
                      </div>

                      {/* Eligible Amount */}
                      <div className="text-center p-4 bg-secondary rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Maximum Eligible Amount</div>
                        <div className="text-2xl font-bold text-foreground">
                          ₹{results.eligibleAmount.toLocaleString('en-IN')}
                        </div>
                        {results.eligibleAmount < watchedValues.loanAmount && (
                          <div className="text-xs text-destructive mt-1">
                            ₹{(watchedValues.loanAmount - results.eligibleAmount).toLocaleString('en-IN')} over limit
                          </div>
                        )}
                      </div>

                      {/* FOIR Breakdown */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground">FOIR Breakdown</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Monthly Income:</span>
                            <span>₹{watchedValues.monthlyIncome?.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Existing EMI:</span>
                            <span>₹{watchedValues.existingEMI?.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">New EMI:</span>
                            <span>₹{results.emi.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2 font-medium">
                            <span>Total EMI vs Income:</span>
                            <span>{results.foir}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Loan Features */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          {watchedValues.loanType.charAt(0).toUpperCase() + watchedValues.loanType.slice(1)} Loan Features
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {loanTypeData[watchedValues.loanType]?.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
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

export default LoanCalculator;
