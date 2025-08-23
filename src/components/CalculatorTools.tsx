import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Calculator, 
  Receipt, 
  PiggyBank, 
  CreditCard, 
  TrendingUp, 
  FileText,
  ArrowRight 
} from "lucide-react";

const CalculatorTools = () => {
  const calculators = [
    {
      icon: Calculator,
      title: "EMI Calculator",
      description: "Calculate your monthly EMI for home loans, car loans, and personal loans instantly.",
      features: ["Home Loan EMI", "Car Loan EMI", "Personal Loan EMI"],
      popular: true,
      link: "/calculators/emi",
    },
    {
      icon: Receipt,
      title: "GST Calculator",
      description: "Quickly calculate GST inclusive and exclusive prices for your business needs.",
      features: ["GST Inclusive", "GST Exclusive", "Reverse GST"],
      popular: false,
      link: "/calculators/gst",
    },
    {
      icon: PiggyBank,
      title: "Tax Calculator",
      description: "Calculate your income tax liability and plan your tax savings effectively.",
      features: ["Income Tax", "Tax Savings", "Deductions"],
      popular: true,
      link: "/calculators/tax",
    },
    {
      icon: CreditCard,
      title: "Loan Calculator",
      description: "Compare different loan options and find the best interest rates for you.",
      features: ["Interest Rates", "Loan Comparison", "Eligibility"],
      popular: false,
      link: "/calculators/loan",
    },
    {
      icon: TrendingUp,
      title: "SIP Calculator",
      description: "Plan your mutual fund investments with systematic investment planning.",
      features: ["SIP Returns", "Goal Planning", "Investment Growth"],
      popular: false,
      link: "/calculators/sip",
    },
    {
      icon: FileText,
      title: "Salary Calculator",
      description: "Calculate your take-home salary after deductions and tax implications.",
      features: ["Take Home", "CTC Breakdown", "Tax Deductions"],
      popular: false,
      link: "/calculators/salary",
    },
  ];

  return (
    <section id="calculators" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Financial Calculators
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional tools to help you make informed financial decisions
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calc, index) => (
            <Card 
              key={index} 
              className={`calculator-card group relative ${
                calc.popular ? 'ring-2 ring-primary ring-opacity-50' : ''
              }`}
            >
              {calc.popular && (
                <div className="absolute -top-3 left-6">
                  <span className="primary-gradient text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`financial-icon ${calc.popular ? 'primary-gradient' : 'success-gradient'}`}>
                    <calc.icon className="w-6 h-6" />
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-card-foreground">
                  {calc.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {calc.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {calc.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to={calc.link}>
                  <Button 
                    className={`w-full group-hover:shadow-lg transition-all ${
                      calc.popular 
                        ? 'primary-gradient text-primary-foreground' 
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    Use Calculator
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="card-gradient rounded-2xl p-8 elegant-shadow">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Need Custom Calculations?
            </h3>
            <p className="text-muted-foreground mb-6">
              Can't find the calculator you need? We're constantly adding new tools based on user requests.
            </p>
            <Button className="primary-gradient text-primary-foreground">
              Request New Calculator
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorTools;