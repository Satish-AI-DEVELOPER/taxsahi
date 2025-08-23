import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, PieChart, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface EMIFormData {
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
}

const EMICalculator = () => {
  const [results, setResults] = useState<{
    emi: number;
    totalInterest: number;
    totalAmount: number;
  } | null>(null);

  const { register, handleSubmit, watch, setValue } = useForm<EMIFormData>({
    defaultValues: {
      loanAmount: 1000000,
      interestRate: 8.5,
      loanTenure: 20,
    },
  });

  const watchedValues = watch();

  const calculateEMI = (data: EMIFormData) => {
    const principal = data.loanAmount;
    const rate = data.interestRate / 12 / 100;
    const tenure = data.loanTenure * 12;

    const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    setResults({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
    });
  };

  const onSubmit = (data: EMIFormData) => {
    calculateEMI(data);
  };

  // Auto-calculate on value changes
  useState(() => {
    if (watchedValues.loanAmount && watchedValues.interestRate && watchedValues.loanTenure) {
      calculateEMI(watchedValues);
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              EMI Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate your Equated Monthly Installment for home loans, car loans, and personal loans
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Calculator Form */}
            <Card className="card-gradient elegant-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Loan Details
                </CardTitle>
                <CardDescription>
                  Enter your loan details to calculate EMI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Loan Amount */}
                  <div className="space-y-3">
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
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>₹1L</span>
                        <span>₹1Cr</span>
                      </div>
                      <Slider
                        value={[watchedValues.loanAmount]}
                        onValueChange={(value) => setValue("loanAmount", value[0])}
                        max={10000000}
                        min={100000}
                        step={50000}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-3">
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
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>1%</span>
                        <span>30%</span>
                      </div>
                      <Slider
                        value={[watchedValues.interestRate]}
                        onValueChange={(value) => setValue("interestRate", value[0])}
                        max={30}
                        min={1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div className="space-y-3">
                    <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
                    <Input
                      id="loanTenure"
                      type="number"
                      {...register("loanTenure", { 
                        required: true, 
                        min: 1,
                        max: 30,
                        valueAsNumber: true 
                      })}
                      className="calculator-input"
                    />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>1 Year</span>
                        <span>30 Years</span>
                      </div>
                      <Slider
                        value={[watchedValues.loanTenure]}
                        onValueChange={(value) => setValue("loanTenure", value[0])}
                        max={30}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full primary-gradient text-primary-foreground">
                    Calculate EMI
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            {results && (
              <Card className="card-gradient elegant-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-accent" />
                    EMI Breakdown
                  </CardTitle>
                  <CardDescription>
                    Your monthly payment details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* EMI Amount */}
                    <div className="text-center p-6 primary-gradient rounded-lg text-primary-foreground">
                      <div className="text-sm opacity-90 mb-1">Monthly EMI</div>
                      <div className="text-3xl font-bold">₹{results.emi.toLocaleString('en-IN')}</div>
                    </div>

                    {/* Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-secondary rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Principal Amount</div>
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
                      <div className="text-sm opacity-90 mb-1">Total Amount Payable</div>
                      <div className="text-2xl font-bold">₹{results.totalAmount.toLocaleString('en-IN')}</div>
                    </div>

                    {/* Key Insights */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        Key Insights
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex justify-between">
                          <span>Interest vs Principal:</span>
                          <span>{((results.totalInterest / watchedValues.loanAmount) * 100).toFixed(1)}%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Monthly Income Required:</span>
                          <span>₹{Math.round(results.emi * 3).toLocaleString('en-IN')} (33% rule)</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Total Payments:</span>
                          <span>{watchedValues.loanTenure * 12} months</span>
                        </li>
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

export default EMICalculator;