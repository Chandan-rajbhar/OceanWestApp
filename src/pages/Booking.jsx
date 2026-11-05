import React from 'react';
import { BookingStepper } from '../components/booking/BookingStepper';
import { EventDetailsForm } from '../components/booking/EventDetailsForm';
import { CateringPreferences } from '../components/booking/CateringPreferences';
import { CustomerInformation } from '../components/booking/CustomerInformation';
import { BookingReview } from '../components/booking/BookingReview';
import { BookingConfirmation } from '../components/booking/BookingConfirmation';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/common/Button';
import { ArrowLeft, ArrowRight, Send, Sparkles } from 'lucide-react';

export const Booking = () => {
  const {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    submitInquiry,
    isSubmitting,
    submittedBooking,
    resetSubmittedBooking
  } = useBooking();

  // If already submitted in this session, show confirmation
  if (submittedBooking) {
    return <BookingConfirmation booking={submittedBooking} onReset={resetSubmittedBooking} />;
  }

  const stepMeta = {
    1: {
      title: 'Event Details & Schedule',
      desc: 'Set date, guest count & venue location'
    },
    2: {
      title: 'Catering & Service Format',
      desc: 'Select service style & dietary requirements'
    },
    3: {
      title: 'Coordinator Contact Info',
      desc: 'Where Chef Michael will deliver your proposal'
    },
    4: {
      title: 'Review & Submit Request',
      desc: 'Verify event logistics before sending'
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-28">
      {/* Modern Stepper Header */}
      <BookingStepper currentStep={currentStep} onStepClick={goToStep} />

      {/* Clean Step Title Header */}
      <div className="bg-white/95 px-4 py-3 border-b border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-sm font-black text-slate-900 leading-tight">
            {stepMeta[currentStep].title}
          </h2>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            {stepMeta[currentStep].desc}
          </p>
        </div>
        <span className="text-[10px] font-extrabold text-[#4A2373] bg-[#4A2373]/10 px-2.5 py-1 rounded-full shrink-0">
          Step {currentStep} of 4
        </span>
      </div>

      {/* Step Form Body */}
      <div className="p-3.5 flex-1">
        {currentStep === 1 && <EventDetailsForm />}
        {currentStep === 2 && <CateringPreferences />}
        {currentStep === 3 && <CustomerInformation />}
        {currentStep === 4 && <BookingReview />}
      </div>

      {/* Sticky Bottom Wizard Controls - Docked right above bottom navigation */}
      <div className="sticky bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_-8px_20px_rgba(0,0,0,0.04)] z-30">
        {currentStep > 1 ? (
          <Button
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            onClick={prevStep}
            className="text-xs py-2 px-4 rounded-xl border-slate-200 text-slate-700 font-bold"
          >
            Back
          </Button>
        ) : (
          <div className="w-16" />
        )}

        {currentStep < 4 ? (
          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={nextStep}
            className="text-xs py-2 px-5 rounded-xl font-bold shadow-md shadow-[#4A2373]/25"
          >
            Continue
          </Button>
        ) : (
          <Button
            variant="accent"
            size="md"
            icon={Send}
            iconPosition="right"
            loading={isSubmitting}
            onClick={submitInquiry}
            className="text-xs py-2.5 px-6 rounded-xl shadow-lg shadow-[#FE8500]/40 font-black"
          >
            Submit Quote Request
          </Button>
        )}
      </div>
    </div>
  );
};
