import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Target, Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface SIPFormData {
  monthlyInvestment: number;
  expectedReturn: number;
  timePeriod: number;
}

const SIPCalculator = () => {
  const [results, setResults] = useState<{
    totalInvestment: number;
    totalReturns: number;
    maturityAmount: number;
  } | null>(null);

  const { register, handleSubmit, watch, setValue } = useForm<SIPFormData>({
    defaultValues: {
      monthlyInvestment: 5000,
      expectedReturn: 12,
      timePeriod: 10,
    },
  });

  const watchedValues = watch();

  const calculateSIP = (data: SIPFormData) => {
    const monthlyAmount = data.monthlyInvestment;
    const annualRate = data.expectedReturn / 100;
    const monthlyRate = annualRate / 12;
    const totalMonths = data.timePeriod * 12;

    // SIP Future Value Formula: FV = P * [((1 + r)^n - 1) / r] * (1 + r)
    const maturityAmount = monthlyAmount * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate * (1 + monthlyRate);
    const totalInvestment = monthlyAmount * totalMonths;
    const totalReturns = maturityAmount - totalInvestment;

    setResults({
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns),
      maturityAmount: Math.round(maturityAmount),
    });
  };

  const onSubmit = (data: SIPFormData) => {
    calculateSIP(data);
  };

  // Auto-calculate on value changes
  useState(() => {
    if (watchedValues.monthlyInvestment && watchedValues.expectedReturn && watchedValues.timePeriod) {
      calculateSIP(watchedValues);
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              SIP Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plan your mutual fund investments with Systematic Investment Planning
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Calculator Form */}
            <Card className="card-gradient elegant-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  SIP Investment Details
                </CardTitle>
                <CardDescription>
                  Enter your SIP investment parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Monthly Investment */}
                  <div className="space-y-3">
                    <Label htmlFor="monthlyInvestment">Monthly Investment (₹)</Label>
                    <Input
                      id="monthlyInvestment"
                      type="number"
                      {...register("monthlyInvestment", { 
                        required: true, 
                        min: 500,
                        valueAsNumber: true 
                      })}
                      className="calculator-input"
                    />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>₹500</span>
                        <span>₹50,000</span>
                      </div>
                      <Slider
                        value={[watchedValues.monthlyInvestment]}
                        onValueChange={(value) => setValue("monthlyInvestment", value[0])}
                        max={50000}
                        min={500}
                        step={500}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Expected Return */}
                  <div className="space-y-3">
                    <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                    <Input
                      id="expectedReturn"
                      type="number"
                      step="0.5"
                      {...register("expectedReturn", { 
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
                        value={[watchedValues.expectedReturn]}
                        onValueChange={(value) => setValue("expectedReturn", value[0])}
                        max={30}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Historical equity returns: 12-15% | Debt funds: 6-8%
                    </p>
                  </div>

                  {/* Time Period */}
                  <div className="space-y-3">
                    <Label htmlFor="timePeriod">Investment Period (Years)</Label>
                    <Input
                      id="timePeriod"
                      type="number"
                      {...register("timePeriod", { 
                        required: true, 
                        min: 1,
                        max: 40,
                        valueAsNumber: true 
                      })}
                      className="calculator-input"
                    />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>1 Year</span>
                        <span>40 Years</span>
                      </div>
                      <Slider
                        value={[watchedValues.timePeriod]}
                        onValueChange={(value) => setValue("timePeriod", value[0])}
                        max={40}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full primary-gradient text-primary-foreground">
                    Calculate SIP Returns
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            {results && (
              <Card className="card-gradient elegant-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    SIP Growth Projection
                  </CardTitle>
                  <CardDescription>
                    Your investment will grow to
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Maturity Amount */}
                    <div className="text-center p-6 primary-gradient rounded-lg text-primary-foreground">
                      <div className="text-sm opacity-90 mb-1">Maturity Amount</div>
                      <div className="text-3xl font-bold">₹{results.maturityAmount.toLocaleString('en-IN')}</div>
                      <div className="text-sm opacity-90 mt-1">
                        after {watchedValues.timePeriod} years
                      </div>
                    </div>

                    {/* Investment Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-secondary rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Total Investment</div>
                        <div className="text-xl font-semibold text-foreground">
                          ₹{results.totalInvestment.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="text-center p-4 success-gradient rounded-lg text-accent-foreground">
                        <div className="text-sm opacity-90 mb-1">Wealth Gained</div>
                        <div className="text-xl font-semibold">
                          ₹{results.totalReturns.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Investment Insights */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-primary" />
                        Investment Insights
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex justify-between">
                          <span>Monthly Investment:</span>
                          <span>₹{watchedValues.monthlyInvestment?.toLocaleString('en-IN')}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Investment Period:</span>
                          <span>{watchedValues.timePeriod} years ({watchedValues.timePeriod * 12} months)</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Expected Annual Return:</span>
                          <span>{watchedValues.expectedReturn}%</span>
                        </li>
                        <li className="flex justify-between border-t pt-2">
                          <span>Return Multiple:</span>
                          <span>{(results.maturityAmount / results.totalInvestment).toFixed(2)}x</span>
                        </li>
                      </ul>
                    </div>

                    {/* Goal-based calculations */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Popular Investment Goals</h4>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex justify-between p-2 bg-secondary rounded">
                          <span>₹50L (House Down Payment):</span>
                          <span className="font-medium">
                            {results.maturityAmount >= 5000000 ? '✅ Achieved' : 
                             `₹${Math.ceil((5000000 - results.maturityAmount) / (watchedValues.timePeriod * 12)).toLocaleString('en-IN')}/month more needed`}
                          </span>
                        </div>
                        <div className="flex justify-between p-2 bg-secondary rounded">
                          <span>₹1Cr (Retirement Fund):</span>
                          <span className="font-medium">
                            {results.maturityAmount >= 10000000 ? '✅ Achieved' : 
                             `₹${Math.ceil((10000000 - results.maturityAmount) / (watchedValues.timePeriod * 12)).toLocaleString('en-IN')}/month more needed`}
                          </span>
                        </div>
                        <div className="flex justify-between p-2 bg-secondary rounded">
                          <span>₹25L (Child Education):</span>
                          <span className="font-medium">
                            {results.maturityAmount >= 2500000 ? '✅ Achieved' : 
                             `₹${Math.ceil((2500000 - results.maturityAmount) / (watchedValues.timePeriod * 12)).toLocaleString('en-IN')}/month more needed`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* SIP Benefits */}
                    <div className="p-4 bg-secondary rounded-lg">
                      <h5 className="font-medium text-foreground mb-2">SIP Benefits</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Rupee Cost Averaging reduces market volatility impact</li>
                        <li>• Power of compounding grows your wealth exponentially</li>
                        <li>• Disciplined investing builds long-term wealth</li>
                        <li>• Tax benefits under ELSS funds (80C deduction)</li>
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

export default SIPCalculator;