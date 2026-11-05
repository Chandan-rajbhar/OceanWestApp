import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { useMenu } from './MenuContext';
import { INITIAL_DEMO_BOOKINGS } from '../data/demoBookings';

const BookingContext = createContext();

const INITIAL_FORM_STATE = {
  // Step 1: Event Details
  eventType: 'Weddings & Receptions',
  serviceId: 'weddings',
  eventDate: '',
  eventTime: '17:00',
  guestCount: 75,
  city: 'Richmond',
  venueName: 'UBC Boathouse',
  venueSetting: 'Waterfront Deck & Indoor Hall',

  // Step 2: Catering Preferences
  cateringStyle: 'Buffet Style',
  selectedMenuItems: [],
  dietaryRequirements: ['Gluten-Free Option', 'Locally Sourced'],
  specialRequests: '',

  // Step 3: Customer Information
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  preferredContactMethod: 'Email'
};

export const BookingProvider = ({ children }) => {
  const { showToast, user } = useApp();
  const { selectedItems } = useMenu();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem('owc_draft_booking');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      ...INITIAL_FORM_STATE,
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      company: user?.company || '',
      selectedMenuItems: selectedItems.length > 0 ? selectedItems : []
    };
  });

  const [allBookings, setAllBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('owc_all_bookings');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_BOOKINGS;
    } catch {
      return INITIAL_DEMO_BOOKINGS;
    }
  });

  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync menu items if empty in form
  useEffect(() => {
    if (selectedItems.length > 0 && formData.selectedMenuItems.length === 0) {
      setFormData((prev) => ({ ...prev, selectedMenuItems: selectedItems }));
    }
  }, [selectedItems]);

  // Persist draft form
  useEffect(() => {
    try {
      localStorage.setItem('owc_draft_booking', JSON.stringify(formData));
    } catch (e) {
      console.error(e);
    }
  }, [formData]);

  // Persist all bookings
  useEffect(() => {
    try {
      localStorage.setItem('owc_all_bookings', JSON.stringify(allBookings));
    } catch (e) {
      console.error(e);
    }
  }, [allBookings]);

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const setVenue = (venueName, city) => {
    setFormData((prev) => ({
      ...prev,
      venueName,
      city: city || prev.city
    }));
    showToast(`Selected "${venueName}" for your inquiry!`, 'success');
  };

  const setService = (serviceId, serviceTitle) => {
    setFormData((prev) => ({
      ...prev,
      serviceId,
      eventType: serviceTitle
    }));
    showToast(`Selected "${serviceTitle}" for your event!`, 'success');
  };

  // Validation per step
  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.eventType) return { valid: false, error: 'Please choose an Event Type.' };
      if (!formData.eventDate) return { valid: false, error: 'Please select your Event Date.' };

      // Disallow past dates
      const selected = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        return { valid: false, error: 'Event date cannot be in the past.' };
      }

      // Minimum 25 guests
      const guests = parseInt(formData.guestCount, 10);
      if (isNaN(guests) || guests < 25) {
        return { valid: false, error: 'Minimum guest count is 25 guests for catering.' };
      }

      if (!formData.city) return { valid: false, error: 'Please specify the Event City/Service Area.' };
      if (!formData.venueName) return { valid: false, error: 'Please specify the Venue Name or "Private Residence".' };

      return { valid: true };
    }

    if (step === 2) {
      if (!formData.cateringStyle) return { valid: false, error: 'Please choose a Catering Style.' };
      return { valid: true };
    }

    if (step === 3) {
      if (!formData.firstName.trim()) return { valid: false, error: 'Please enter your First Name.' };
      if (!formData.lastName.trim()) return { valid: false, error: 'Please enter your Last Name.' };
      if (!formData.email.trim() || !formData.email.includes('@')) {
        return { valid: false, error: 'Please enter a valid Email address.' };
      }
      if (!formData.phone.trim() || formData.phone.length < 8) {
        return { valid: false, error: 'Please enter a valid Phone number.' };
      }
      return { valid: true };
    }

    return { valid: true };
  };

  const nextStep = () => {
    const check = validateStep(currentStep);
    if (!check.valid) {
      showToast(check.error, 'error');
      return false;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    return true;
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    if (step < currentStep || validateStep(currentStep).valid) {
      setCurrentStep(step);
    }
  };

  const submitInquiry = () => {
    const check = validateStep(3);
    if (!check.valid) {
      showToast(check.error, 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const referenceNumber = `OWC-2025-${randomNum}`;

      const newBooking = {
        id: referenceNumber,
        referenceNumber,
        eventType: formData.eventType,
        serviceId: formData.serviceId,
        eventDate: formData.eventDate,
        eventTime: formData.eventTime,
        guestCount: parseInt(formData.guestCount, 10),
        city: formData.city,
        venueName: formData.venueName,
        venueSetting: formData.venueSetting,
        cateringStyle: formData.cateringStyle,
        dietaryNotes: formData.dietaryRequirements.join(', ') || 'Standard dietary prep',
        specialRequests: formData.specialRequests || 'None provided',
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company
        },
        selectedMenuItems: formData.selectedMenuItems.length > 0 ? formData.selectedMenuItems : selectedItems,
        status: 'Submitted',
        createdAt: new Date().toISOString(),
        notesFromChef: 'Thank you! Executive Chef Michael Thomas has received your inquiry. A formal tailored quote proposal is being drafted.'
      };

      setAllBookings((prev) => [newBooking, ...prev]);
      setSubmittedBooking(newBooking);
      setIsSubmitting(false);

      // Clear draft form
      setFormData({
        ...INITIAL_FORM_STATE,
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || ''
      });
      localStorage.removeItem('owc_draft_booking');

      showToast(`Inquiry ${referenceNumber} submitted successfully!`, 'success');
    }, 900);
  };

  const cancelBooking = (id) => {
    setAllBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
    showToast(`Inquiry ${id} was marked as Cancelled.`, 'info');
  };

  const editDraftBooking = (booking) => {
    setFormData({
      eventType: booking.eventType,
      serviceId: booking.serviceId || 'weddings',
      eventDate: booking.eventDate,
      eventTime: booking.eventTime || '17:00',
      guestCount: booking.guestCount,
      city: booking.city,
      venueName: booking.venueName,
      venueSetting: booking.venueSetting || 'Indoor',
      cateringStyle: booking.cateringStyle,
      selectedMenuItems: booking.selectedMenuItems || [],
      dietaryRequirements: booking.dietaryNotes ? booking.dietaryNotes.split(', ') : [],
      specialRequests: booking.specialRequests || '',
      firstName: booking.customer.firstName,
      lastName: booking.customer.lastName,
      email: booking.customer.email,
      phone: booking.customer.phone,
      company: booking.customer.company || '',
      preferredContactMethod: 'Email'
    });
    setCurrentStep(1);
    showToast(`Loaded details for ${booking.referenceNumber}`, 'info');
  };

  const resetSubmittedBooking = () => {
    setSubmittedBooking(null);
    setCurrentStep(1);
  };

  return (
    <BookingContext.Provider
      value={{
        formData,
        currentStep,
        allBookings,
        submittedBooking,
        isSubmitting,
        updateFormData,
        validateStep,
        nextStep,
        prevStep,
        goToStep,
        submitInquiry,
        setVenue,
        setService,
        cancelBooking,
        editDraftBooking,
        resetSubmittedBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);

