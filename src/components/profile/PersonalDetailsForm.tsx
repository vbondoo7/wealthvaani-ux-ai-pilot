import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import useUserStore from '@/lib/userStore';
import { PersonalDetails } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PersonalDetailsForm: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { currentUser, updatePersonalDetails } = useUserStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<PersonalDetails>({
    age: currentUser?.personalDetails?.age || 30,
    familySize: currentUser?.personalDetails?.familySize || 1,
    maritalStatus: currentUser?.personalDetails?.maritalStatus || 'single',
    dependents: currentUser?.personalDetails?.dependents || 0,
    riskTolerance: currentUser?.personalDetails?.riskTolerance || 'medium',
    financialChallenges: currentUser?.personalDetails?.financialChallenges || [],
    occupation: currentUser?.personalDetails?.occupation || '',
    phoneNumber: currentUser?.personalDetails?.phoneNumber || '',
    address: currentUser?.personalDetails?.address || '',
    firstName: currentUser?.personalDetails?.firstName || '',
    lastName: currentUser?.personalDetails?.lastName || '',
    dateOfBirth: currentUser?.personalDetails?.dateOfBirth || '',
    gender: currentUser?.personalDetails?.gender || '',
    income: currentUser?.personalDetails?.income || 0,
    location: currentUser?.personalDetails?.location || '',
    phone: currentUser?.personalDetails?.phone || ''
  });
  
  const [challengeText, setChallengeText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ["age", "familySize", "dependents"].includes(name) ? Number(value) : value,
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const addChallenge = () => {
    if (challengeText.trim()) {
      setFormData(prev => ({
        ...prev,
        financialChallenges: [...(prev.financialChallenges || []), challengeText.trim()],
      }));
      setChallengeText('');
    }
  };

  const removeChallenge = (index: number) => {
    setFormData(prev => ({
      ...prev,
      financialChallenges: (prev.financialChallenges || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      updatePersonalDetails(formData);
      setIsLoading(false);
      
      toast({
        title: "Personal details saved",
        description: "Your personal details have been updated successfully.",
        variant: "default",
      });
      
      onNext();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          min={18}
          max={100}
          required
        />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="maritalStatus">Marital Status</Label>
        <Select 
          value={formData.maritalStatus} 
          onValueChange={(value) => handleSelectChange('maritalStatus', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your marital status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="married">Married</SelectItem>
            <SelectItem value="divorced">Divorced</SelectItem>
            <SelectItem value="widowed">Widowed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="familySize">Family Size</Label>
        <Input
          id="familySize"
          name="familySize"
          type="number"
          value={formData.familySize}
          onChange={handleChange}
          min={1}
          max={15}
          required
        />
      </div>
      
      <div className="space-y-1.5">
        <Label htmlFor="dependents">Number of Dependents</Label>
        <Input
          id="dependents"
          name="dependents"
          type="number"
          value={formData.dependents}
          onChange={handleChange}
          min={0}
          max={10}
          required
        />
      </div>
      
      <div className="space-y-3">
        <Label>Risk Tolerance</Label>
        <RadioGroup 
          value={formData.riskTolerance} 
          onValueChange={(value) => handleSelectChange('riskTolerance', value as 'low' | 'medium' | 'high')}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="risk-low" />
            <Label htmlFor="risk-low" className="font-normal">
              Low (I prefer stable returns with minimal risk)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="risk-medium" />
            <Label htmlFor="risk-medium" className="font-normal">
              Medium (I can accept moderate fluctuations for better returns)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="risk-high" />
            <Label htmlFor="risk-high" className="font-normal">
              High (I'm comfortable with significant fluctuations for maximum returns)
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-3">
        <Label>Financial Challenges (Optional)</Label>
        <div className="flex gap-2">
          <Textarea 
            value={challengeText}
            onChange={(e) => setChallengeText(e.target.value)}
            placeholder="Describe any financial challenges you're facing..."
            className="flex-1"
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={addChallenge}
            disabled={!challengeText.trim()}
          >
            Add
          </Button>
        </div>
        
        {formData.financialChallenges && formData.financialChallenges.length > 0 && (
          <div className="mt-3 space-y-2">
            <Label>Current Challenges:</Label>
            <ul className="space-y-2">
              {formData.financialChallenges.map((challenge, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <span className="text-sm">{challenge}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeChallenge(index)}
                    className="h-6 w-6 p-0"
                  >
                    &times;
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <Button 
        type="submit" 
        className="w-full mt-6 bg-royal-blue hover:bg-royal-blue/90"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Continue"}
      </Button>
    </form>
  );
};

export default PersonalDetailsForm;
