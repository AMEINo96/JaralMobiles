"use client";

import { useState, useEffect } from "react";
import { Wrench, CheckCircle2 } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface StoreSettings {
  repairBrands: string[];
  repairIssues: string[];
}

export default function BookRepairPage() {
  const [step, setStep] = useState(1);
  const [brands, setBrands] = useState<string[]>([]);
  const [issues, setIssues] = useState<string[]>([]);
  const [loadingSettings, setLoadingSettings] = useState(true);
  
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    issue: "",
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const query = `*[_type == "repairSettings"][0]{ repairBrands, repairIssues }`;
        const data = await client.fetch(query);
        
        // Use defaults if document doesn't exist yet or if arrays are empty
        setBrands(data?.repairBrands?.length > 0 ? data.repairBrands : [
          'Apple', 'Samsung', 'Google Pixel', 'OnePlus', 'Xiaomi', 'Oppo', 'Vivo'
        ]);
        
        setIssues(data?.repairIssues?.length > 0 ? data.repairIssues : [
          'Screen Replacement', 'Battery Replacement', 'Charging Port Repair', 
          'Water Damage Diagnostic', 'Camera Repair', 'Speaker / Microphone Repair', 
          'Software / Firmware Issue'
        ]);
      } catch (err) {
        console.error("Error fetching repair settings:", err);
        // Fallbacks on error
        setBrands(['Apple', 'Samsung', 'Google Pixel']);
        setIssues(['Screen Replacement', 'Battery Replacement']);
      } finally {
        setLoadingSettings(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    if (!formData.brand || !formData.model || !formData.issue) {
      setError("Please fill in all fields before continuing.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill in all required contact details.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const ticketID = `REP-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

      await addDoc(collection(db, "RepairTickets"), {
        ticketID,
        deviceDetails: {
          brand: formData.brand,
          model: formData.model,
          issueType: formData.issue,
          description: formData.details,
        },
        customerInfo: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        },
        status: "pending_dropoff",
        createdAt: serverTimestamp(),
      });

      await fetch("/api/send-repair-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketID,
          customerInfo: { name: formData.name, email: formData.email, phone: formData.phone },
          deviceDetails: { brand: formData.brand, model: formData.model, issueType: formData.issue },
        }),
      });

      setIsSuccess(true);
    } catch (err) {
      console.error("Error submitting repair:", err);
      setError("Failed to submit repair request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSuccess(false);
    setFormData({
      brand: "",
      model: "",
      issue: "",
      name: "",
      email: "",
      phone: "",
      details: "",
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="bg-blue-50 p-4 rounded-2xl mb-4">
            <Wrench className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Book a Repair
          </h1>
          <p className="text-slate-600">
            Tell us about your device issue and we'll get it fixed.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Request Submitted!
              </h2>
              <p className="text-slate-600 mb-8">
                We've received your repair request and will be in touch shortly.
              </p>
              <button
                onClick={resetForm}
                className="text-blue-600 font-medium hover:text-blue-700 underline"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <>
              {/* Progress Bar */}
              <div className="flex items-center justify-center mb-8">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= 1
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  1
                </div>
                <div
                  className={`h-1 w-16 mx-2 rounded ${
                    step >= 2 ? "bg-blue-600" : "bg-slate-200"
                  }`}
                ></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= 2
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  2
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Brand
                      </label>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        disabled={loadingSettings}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-slate-900"
                      >
                        <option value="">Select a brand</option>
                        {brands.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Model
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="e.g. iPhone 13 Pro"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Issue
                      </label>
                      <select
                        name="issue"
                        value={formData.issue}
                        onChange={handleChange}
                        disabled={loadingSettings}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-slate-900"
                      >
                        <option value="">Select an issue</option>
                        {issues.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full bg-slate-900 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Additional Details (Optional)
                      </label>
                      <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-slate-900 resize-none"
                      ></textarea>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-2/3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
