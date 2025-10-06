import React, { useState } from "react";
import Input from "components/ui/input";
import Button from "components/ui/button";
import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";

const RegistrationForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    preferredName: "",
    ageRange: "",
    gender: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const ageRangeOptions = [
    { value: "65-70", label: "65-70 years" },
    { value: "71-75", label: "71-75 years" },
    { value: "76-80", label: "76-80 years" },
    { value: "81-85", label: "81-85 years" },
    { value: "86+", label: "86+ years" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer-not-to-say", label: "Prefer not to say" },
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[a-z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData?.password) {
      newErrors.password = "Password is required";
    } else if (formData?.password?.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData?.preferredName) {
      newErrors.preferredName = "Preferred name is required";
    }

    if (!formData?.ageRange) {
      newErrors.ageRange = "Please select your age range";
    }

    if (!formData?.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms of service";
    }

    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = "You must agree to the privacy policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "bg-error";
    if (passwordStrength < 50) return "bg-warning";
    if (passwordStrength < 75) return "bg-accent";
    return "bg-success";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Weak";
    if (passwordStrength < 50) return "Fair";
    if (passwordStrength < 75) return "Good";
    return "Strong";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Email Field */}
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        value={formData?.email}
        onChange={(e) => handleInputChange("email", e?.target?.value)}
        error={errors?.email}
        required
        className="text-lg"
      />
      {/* Password Field */}
      <div className="space-y-3">
        <Input
          label="Password"
          type="password"
          placeholder="Create a secure password"
          value={formData?.password}
          onChange={(e) => handleInputChange("password", e?.target?.value)}
          error={errors?.password}
          required
          className="text-lg"
        />

        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">
                Password Strength:
              </span>
              <span
                className={`text-sm font-medium ${passwordStrength < 50 ? "text-error" : "text-success"
                  }`}
              >
                {getPasswordStrengthText()}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
          </div>
        )}
      </div>
      {/* Confirm Password Field */}
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Re-enter your password"
        value={formData?.confirmPassword}
        onChange={(e) => handleInputChange("confirmPassword", e?.target?.value)}
        error={errors?.confirmPassword}
        required
        className="text-lg"
      />
      {/* Preferred Name Field */}
      <Input
        label="Preferred Name"
        type="text"
        placeholder="What would you like to be called?"
        value={formData?.preferredName}
        onChange={(e) => handleInputChange("preferredName", e?.target?.value)}
        error={errors?.preferredName}
        description="This is how we'll address you during the assessment"
        required
        className="text-lg"
      />
      {/* Age Range Selection */}
      <Select
        label="Age Range"
        placeholder="Select your age range"
        options={ageRangeOptions}
        value={formData?.ageRange}
        onChange={(value) => handleInputChange("ageRange", value)}
        error={errors?.ageRange}
        required
        className="text-lg"
      />
      {/* Gender Selection */}
      <Select
        label="Gender"
        placeholder="Select your gender"
        options={genderOptions}
        value={formData?.gender}
        onChange={(value) => handleInputChange("gender", value)}
        error={errors?.gender}
        required
        className="text-lg"
      />
      {/* Terms and Privacy Checkboxes */}
      <div className="space-y-4 pt-4 border-t border-border">
        <Checkbox
          label="I agree to the Terms of Service"
          checked={formData?.agreeToTerms}
          onChange={(e) =>
            handleInputChange("agreeToTerms", e?.target?.checked)
          }
          error={errors?.agreeToTerms}
          required
          className="text-lg"
        />

        <Checkbox
          label="I agree to the Privacy Policy and HIPAA Notice"
          checked={formData?.agreeToPrivacy}
          onChange={(e) =>
            handleInputChange("agreeToPrivacy", e?.target?.checked)
          }
          error={errors?.agreeToPrivacy}
          required
          className="text-lg"
        />
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="xl"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
        className="mt-8 min-h-[80px] text-xl font-semibold"
      >
        Create My Account
      </Button>
    </form>
  );
};

export default RegistrationForm;
