
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalDetailsForm from './PersonalDetailsForm';
import FinancialDetailsForm from './FinancialDetailsForm';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileCreationProps {
  onComplete: () => void;
}

const ProfileCreation: React.FC<ProfileCreationProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<string>('personal');
  const { t } = useLanguage();
  
  const handlePersonalComplete = () => {
    setCurrentStep('financial');
  };
  
  return (
    <div className="wv-container py-6">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold text-center">{t('complete-profile')}</h1>
        <p className="text-muted-foreground text-center">
          {t('personalize-journey')}
        </p>
      </div>
      
      <Tabs value={currentStep} className="w-full" onValueChange={setCurrentStep}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="personal">{t('personal-details')}</TabsTrigger>
          <TabsTrigger value="financial">{t('financial-details')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-4">
          <PersonalDetailsForm onNext={handlePersonalComplete} />
        </TabsContent>
        
        <TabsContent value="financial" className="space-y-4">
          <FinancialDetailsForm onComplete={onComplete} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileCreation;
