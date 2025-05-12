
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import useUserStore from '@/lib/userStore';
import { 
  PieChart, 
  BarChart, 
  LineChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Coins,
  TrendingUp,
  BadgeIndianRupee,
  Calendar
} from "lucide-react";
import {
  PieChart as RechartPieChart,
  Pie,
  Cell,
  BarChart as RechartBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartLineChart,
  Line,
  Legend
} from 'recharts';

const InvestmentIntelligence: React.FC = () => {
  const { currentUser } = useUserStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("portfolio");

  if (!currentUser) return null;
  
  const isPremiumUser = currentUser.subscription.plan === 'Premium';
  const isProUser = currentUser.subscription.plan === 'Pro';
  
  // Mock data for charts based on user subscription
  const assetAllocation = [
    { name: "Equity", value: isPremiumUser ? 60 : isProUser ? 50 : 40 },
    { name: "Debt", value: isPremiumUser ? 20 : isProUser ? 30 : 40 },
    { name: "Gold", value: isPremiumUser ? 5 : isProUser ? 10 : 10 },
    { name: "Real Estate", value: isPremiumUser ? 15 : isProUser ? 10 : 10 }
  ];
  
  const COLORS = ['#1A73E8', '#4CAF50', '#FFA726', '#9C27B0'];
  
  const monthlyReturns = [
    { name: 'Jan', equity: 1.8, debt: 0.5, gold: -0.2 },
    { name: 'Feb', equity: -0.7, debt: 0.6, gold: 1.0 },
    { name: 'Mar', equity: 2.1, debt: 0.4, gold: 0.5 },
    { name: 'Apr', equity: 1.5, debt: 0.5, gold: -0.3 },
    { name: 'May', equity: 2.3, debt: 0.6, gold: 0.8 }
  ];

  const goalContributions = [
    { name: currentUser.goals[0]?.name.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase()), value: 40 },
    { name: "Retirement", value: 30 },
    { name: "Children's Education", value: 20 },
    { name: "Other Goals", value: 10 }
  ];

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString()}`;
  };

  const handleStrategyChange = () => {
    toast({
      title: "Investment Strategy Updated",
      description: "Your investment strategy has been updated successfully",
    });
  };

  const handleUpgrade = () => {
    toast({
      title: "Premium Features",
      description: "Upgrade to Premium to access advanced investment intelligence features",
    });
  };

  return (
    <div className="wv-container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Investment Intelligence</h1>
          <p className="text-muted-foreground">
            {isPremiumUser 
              ? "Smart insights and recommendations for your investments" 
              : "Upgrade to unlock advanced investment insights"}
          </p>
        </div>
        
        {!isPremiumUser && (
          <Button 
            className="bg-wealthveda-teal hover:bg-wealthveda-teal/90"
            onClick={handleUpgrade}
          >
            Upgrade to Premium
          </Button>
        )}
      </div>
      
      {/* Investment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Investments</CardDescription>
            <CardTitle className="text-2xl">
              {formatCurrency(
                currentUser.financialDetails?.investments.reduce((total, inv) => total + inv.amount, 0) || 0
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span className="text-sm">+{isPremiumUser ? 14.5 : isProUser ? 10.2 : 8.4}% YTD</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly SIP</CardDescription>
            <CardTitle className="text-2xl">
              {formatCurrency(isPremiumUser ? 50000 : isProUser ? 30000 : 20000)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              Next SIP date: 5th June
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Risk Score</CardDescription>
            <CardTitle className="text-2xl">
              {isPremiumUser ? 8.5 : isProUser ? 7.2 : 5.8}/10
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={isPremiumUser ? 85 : isProUser ? 72 : 58} 
              className="h-2" 
            />
            <p className="text-xs mt-1 text-muted-foreground">
              {isPremiumUser ? 'Aggressive' : isProUser ? 'Moderate-Aggressive' : 'Moderate'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Diversification Score</CardDescription>
            <CardTitle className="text-2xl">
              {isPremiumUser ? 9.2 : isProUser ? 8.1 : 6.5}/10
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress 
              value={isPremiumUser ? 92 : isProUser ? 81 : 65} 
              className="h-2" 
            />
            <p className="text-xs mt-1 text-muted-foreground">
              {isPremiumUser ? 'Excellent' : isProUser ? 'Very Good' : 'Good'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="portfolio" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="recommendations" disabled={!isPremiumUser && !isProUser}>
            Recommendations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="portfolio" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Asset Allocation</CardTitle>
                <CardDescription>Current distribution of your investments</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartPieChart>
                    <Pie
                      data={assetAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {assetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                  </RechartPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Goal-wise Allocation</CardTitle>
                <CardDescription>How your investments support your goals</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartBarChart
                    data={goalContributions}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                    <Bar dataKey="value" fill="#1A73E8" />
                  </RechartBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Investment Details</CardTitle>
              <CardDescription>Breakdown of your investment portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentUser.financialDetails?.investments.map((investment, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-wealthveda-indigo/10 flex items-center justify-center mr-3">
                        {investment.type.includes('equity') ? (
                          <TrendingUp className="h-4 w-4 text-wealthveda-indigo" />
                        ) : investment.type.includes('gold') ? (
                          <Coins className="h-4 w-4 text-wealthveda-saffron" />
                        ) : (
                          <BadgeIndianRupee className="h-4 w-4 text-wealthveda-teal" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {investment.type.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {investment.type.includes('equity') 
                            ? 'High Risk • High Return' 
                            : investment.type.includes('fd') 
                              ? 'Low Risk • Low Return'
                              : 'Medium Risk • Medium Return'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{investment.amount.toLocaleString()}</p>
                      <p className="text-xs flex items-center justify-end gap-1">
                        {investment.type.includes('equity') ? (
                          <>
                            <ArrowUpRight className="h-3 w-3 text-green-600" />
                            <span className="text-green-600">+{isPremiumUser ? 15.2 : 12.8}%</span>
                          </>
                        ) : investment.type.includes('fd') ? (
                          <>
                            <ArrowUpRight className="h-3 w-3 text-green-600" />
                            <span className="text-green-600">+6.5%</span>
                          </>
                        ) : investment.type.includes('gold') ? (
                          <>
                            <ArrowUpRight className="h-3 w-3 text-green-600" />
                            <span className="text-green-600">+8.3%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="h-3 w-3 text-red-500" />
                            <span className="text-red-500">-2.1%</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Returns</CardTitle>
              <CardDescription>Performance of your investments over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartLineChart
                  data={monthlyReturns}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                  <Legend />
                  <Line type="monotone" dataKey="equity" stroke="#1A73E8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="debt" stroke="#4CAF50" />
                  <Line type="monotone" dataKey="gold" stroke="#FFA726" />
                </RechartLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">XIRR (Overall)</span>
                      <span className="font-medium text-green-600">
                        +{isPremiumUser ? 14.5 : isProUser ? 12.2 : 10.8}%
                      </span>
                    </div>
                    <Progress value={isPremiumUser ? 85 : isProUser ? 72 : 60} className="h-1.5" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Equity</span>
                      <span className="font-medium text-green-600">
                        +{isPremiumUser ? 18.3 : isProUser ? 16.5 : 14.2}%
                      </span>
                    </div>
                    <Progress value={isPremiumUser ? 92 : isProUser ? 85 : 70} className="h-1.5" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Debt</span>
                      <span className="font-medium text-green-600">+7.2%</span>
                    </div>
                    <Progress value={45} className="h-1.5" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Gold</span>
                      <span className="font-medium text-green-600">+8.5%</span>
                    </div>
                    <Progress value={55} className="h-1.5" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Real Estate</span>
                      <span className="font-medium text-green-600">
                        +{isPremiumUser ? 10.5 : 9.8}%
                      </span>
                    </div>
                    <Progress value={isPremiumUser ? 65 : 60} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Goal Tracking</CardTitle>
                <CardDescription>Progress towards your financial goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentUser.goals.slice(0, 3).map((goal, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{goal.name.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-1.5" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          Saved: ₹{goal.savedAmount.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Target: ₹{goal.cost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-4">
          {(isPremiumUser || isProUser) ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommended Asset Allocation</CardTitle>
                  <CardDescription>
                    Optimized asset allocation based on your risk profile and goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Equity</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">{isPremiumUser ? 60 : 55}%</p>
                        <p className="text-xs text-green-600">+{isPremiumUser ? 5 : 3}%</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Debt</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">{isPremiumUser ? 20 : 25}%</p>
                        <p className="text-xs text-red-500">-{isPremiumUser ? 5 : 3}%</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Gold</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">10%</p>
                        <p className="text-xs">=</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Real Estate</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">{isPremiumUser ? 10 : 10}%</p>
                        <p className="text-xs">=</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Rationale</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="min-w-4 h-4 rounded-full bg-wealthveda-indigo/20 flex items-center justify-center mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-wealthveda-indigo"></div>
                        </div>
                        <span>Increase equity exposure to capitalize on market growth potential</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="min-w-4 h-4 rounded-full bg-wealthveda-indigo/20 flex items-center justify-center mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-wealthveda-indigo"></div>
                        </div>
                        <span>Reduce debt allocation as interest rates are expected to remain stable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="min-w-4 h-4 rounded-full bg-wealthveda-indigo/20 flex items-center justify-center mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-wealthveda-indigo"></div>
                        </div>
                        <span>Maintain gold position as a hedge against market volatility</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-wealthveda-teal hover:bg-wealthveda-teal/90"
                    onClick={handleStrategyChange}
                  >
                    Apply Recommended Strategy
                  </Button>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Investment Opportunities</CardTitle>
                    <CardDescription>
                      Personalized investment opportunities based on your profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <h4 className="font-medium">HDFC Large Cap Fund</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">5Y Return</p>
                            <p className="text-green-600 font-medium">+14.2%</p>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Risk</p>
                            <p>Moderate</p>
                          </div>
                          <Button className="text-xs h-8" size="sm">Invest</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-muted rounded-lg">
                        <h4 className="font-medium">Axis Small Cap Fund</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">5Y Return</p>
                            <p className="text-green-600 font-medium">+18.5%</p>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Risk</p>
                            <p>High</p>
                          </div>
                          <Button className="text-xs h-8" size="sm">Invest</Button>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-muted rounded-lg">
                        <h4 className="font-medium">SBI Debt Fund</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">5Y Return</p>
                            <p className="text-green-600 font-medium">+7.8%</p>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">Risk</p>
                            <p>Low</p>
                          </div>
                          <Button className="text-xs h-8" size="sm">Invest</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {isPremiumUser && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tax Optimization</CardTitle>
                      <CardDescription>
                        Recommendations to optimize your tax liability
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="min-w-8 h-8 rounded-full bg-wealthveda-teal/20 flex items-center justify-center mt-0.5">
                            <BadgeIndianRupee className="h-4 w-4 text-wealthveda-teal" />
                          </div>
                          <div>
                            <h4 className="font-medium">ELSS Investment</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Invest ₹50,000 in ELSS funds to save up to ₹15,000 in taxes under Section 80C
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="min-w-8 h-8 rounded-full bg-wealthveda-teal/20 flex items-center justify-center mt-0.5">
                            <BadgeIndianRupee className="h-4 w-4 text-wealthveda-teal" />
                          </div>
                          <div>
                            <h4 className="font-medium">NPS Contribution</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Additional NPS contribution of ₹50,000 can save up to ₹15,000 under Section 80CCD(1B)
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="min-w-8 h-8 rounded-full bg-wealthveda-teal/20 flex items-center justify-center mt-0.5">
                            <BadgeIndianRupee className="h-4 w-4 text-wealthveda-teal" />
                          </div>
                          <div>
                            <h4 className="font-medium">Health Insurance Premium</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Pay ₹25,000 as health insurance premium to save up to ₹7,500 under Section 80D
                            </p>
                          </div>
                        </div>
                        
                        <Button className="w-full bg-wealthveda-teal hover:bg-wealthveda-teal/90">
                          Get Tax Saving Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              {isPremiumUser && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upcoming IPOs</CardTitle>
                    <CardDescription>
                      Track and participate in upcoming Initial Public Offerings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentUser.financialDetails?.investmentIntelligence?.upcomingIPOs?.map((ipo, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <div>
                            <h4 className="font-medium">{ipo.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Expected: {new Date(ipo.expectedDate).toLocaleDateString('en-IN')}
                            </p>
                          </div>
                          <Button 
                            variant={ipo.interestRegistered ? "outline" : "default"}
                            className={ipo.interestRegistered ? "" : "bg-wealthveda-teal hover:bg-wealthveda-teal/90"}
                          >
                            {ipo.interestRegistered ? "Interest Registered" : "Register Interest"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unlock Advanced Insights</h3>
              <p className="text-center text-muted-foreground max-w-sm mb-6">
                Upgrade to Pro or Premium to access personalized investment recommendations and tax optimization strategies.
              </p>
              <Button 
                className="bg-wealthveda-teal hover:bg-wealthveda-teal/90"
                onClick={handleUpgrade}
              >
                Upgrade Now
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentIntelligence;
