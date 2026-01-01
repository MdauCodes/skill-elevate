import { useState, useEffect } from 'react';
import { X, Phone, CheckCircle, Loader2, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Course } from '@/data/mockData';

interface MpesaPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onSuccess: () => void;
}

type PaymentStep = 'phone' | 'processing' | 'stk-push' | 'success';

export function MpesaPaymentModal({ isOpen, onClose, course, onSuccess }: MpesaPaymentModalProps) {
  const [step, setStep] = useState<PaymentStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('phone');
      setPhoneNumber('');
      setError('');
    }
  }, [isOpen]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const validatePhone = (phone: string) => {
    // Kenyan phone number validation
    const cleaned = phone.replace(/\D/g, '');
    return /^(254|0)?7\d{8}$/.test(cleaned);
  };

  const handleSubmit = async () => {
    if (!validatePhone(phoneNumber)) {
      setError('Please enter a valid Kenyan phone number');
      return;
    }

    setError('');
    setStep('processing');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStep('stk-push');

    // Simulate STK push waiting
    await new Promise(resolve => setTimeout(resolve, 3000));
    setStep('success');

    // Auto close after success
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-card rounded-2xl border border-border shadow-elevated overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            {/* M-Pesa Logo */}
            <div className="w-12 h-12 rounded-xl bg-[#00a651] flex items-center justify-center">
              <span className="text-foreground font-bold text-sm">M-PESA</span>
            </div>
            <div>
              <h3 className="font-semibold">Pay with M-Pesa</h3>
              <p className="text-sm text-muted-foreground">Secure mobile payment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'phone' && (
            <div className="space-y-6">
              {/* Course Summary */}
              <div className="flex gap-4 p-4 rounded-xl bg-muted/50">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-20 h-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium line-clamp-2 text-sm">{course.title}</h4>
                  <p className="text-lg font-bold text-primary mt-1">
                    {formatPrice(course.price)}
                  </p>
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  M-Pesa Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="0712 345 678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-12 h-12 text-lg"
                  />
                </div>
                {error && <p className="text-destructive text-sm mt-2">{error}</p>}
                <p className="text-xs text-muted-foreground mt-2">
                  You will receive an STK push to complete the payment
                </p>
              </div>

              <Button onClick={handleSubmit} className="w-full h-12 btn-primary">
                Pay {formatPrice(course.price)}
              </Button>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 text-center">
              <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
              <h4 className="font-semibold text-lg mt-6">Initiating Payment</h4>
              <p className="text-muted-foreground mt-2">
                Please wait while we connect to M-Pesa...
              </p>
            </div>
          )}

          {step === 'stk-push' && (
            <div className="py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-[#00a651]/20 flex items-center justify-center mx-auto animate-pulse-glow">
                <Smartphone className="w-10 h-10 text-[#00a651]" />
              </div>
              <h4 className="font-semibold text-lg mt-6">Check Your Phone</h4>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                An M-Pesa prompt has been sent to your phone. Enter your PIN to complete the payment.
              </p>
              <div className="flex items-center justify-center gap-2 mt-6">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Waiting for confirmation...</span>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-success" />
              </div>
              <h4 className="font-semibold text-lg mt-6">Payment Successful!</h4>
              <p className="text-muted-foreground mt-2">
                You are now enrolled in this course.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/30 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            Secured by Safaricom M-Pesa. Your payment details are encrypted.
          </p>
        </div>
      </div>
    </div>
  );
}
