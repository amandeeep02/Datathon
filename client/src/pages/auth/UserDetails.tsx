"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  experienceLevel: string;
  investmentTimeline: string;
  investmentBudget: string;
  tradingStrategy: string;
  rent: number;
  labour: number;
  transport: number;
  material: number;
  others: number;
  monthlyProfits: number;
  goals: string;
  riskTolerance: "low" | "medium" | "high";
}

export default function UserDetails() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    experienceLevel: "",
    investmentTimeline: "",
    investmentBudget: "",
    tradingStrategy: "",
    rent: 0,
    labour: 0,
    transport: 0,
    material: 0,
    others: 0,
    monthlyProfits: 0,
    goals: "",
    riskTolerance: "low",
  });

  useEffect(() => {
    if (currentUser) {
      // Split display name into first and last name
      const names = currentUser.displayName?.split(" ") || ["", ""];
      setFormData({
        firstname: names[0] || "",
        lastname: names.slice(1).join(" ") || "",
        email: currentUser.email || "",
        experienceLevel: "",
        investmentTimeline: "",
        investmentBudget: "",
        tradingStrategy: "",
        rent: 0,
        labour: 0,
        transport: 0,
        material: 0,
        others: 0,
        monthlyProfits: 0,
        goals: "",
        riskTolerance: "low",
      });
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/api/user`, {
        firstName: formData.firstname,
        lastName: formData.lastname,
        email: formData.email,
        experienceLevel: formData.experienceLevel,
        investmentTimeline: formData.investmentTimeline,
        investmentBudget: Number(formData.investmentBudget),
        tradingStrategy: formData.tradingStrategy,
        rent: formData.rent,
        labour: formData.labour,
        transport: formData.transport,
        material: formData.material,
        others: formData.others,
        monthlyProfits: formData.monthlyProfits,
        goals: formData.goals,
        riskTolerance: formData.riskTolerance,
      });

      if (response.data) {
        console.log("User details updated:", response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error updating user details:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white align-middle justify-center border md:border-2 border-gray-200">
        <h2 className="font-bold text-xl text-gray-800">
          Welcome to Datathon App
        </h2>
        <p className="text-gray-600 text-sm max-w-sm mt-2">
          Please fill in the form below to create an account
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                value={formData.firstname}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstname: e.target.value,
                  }))
                }
                placeholder="Tyler"
                type="text"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                value={formData.lastname}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastname: e.target.value }))
                }
                placeholder="Durden"
                type="text"
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="projectmayhem@fc.com"
              type="email"
              disabled
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="type">Experience Level</Label>
            <select
              id="type"
              name="type"
              value={formData.experienceLevel}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  experienceLevel: e.target.value,
                }))
              }
              className="w-full rounded-md border border-gray-300 p-2"
              required
            >
              <option value="">Select your level</option>
              <option value="beginner">Beginner</option>
              <option value="moderate">Moderate</option>
              <option value="pro">Pro</option>
            </select>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="intent">Investment Timeline</Label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="intent"
                  value="long-term"
                  checked={formData.investmentTimeline === "long-term"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      investmentTimeline: e.target.value,
                    }))
                  }
                  required
                  className="mr-2"
                />
                Long Term
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="intent"
                  value="short-term"
                  required
                  className="mr-2"
                />
                Short Term
              </label>
            </div>
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="budget">Investment Budget</Label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.investmentBudget}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  investmentBudget: e.target.value,
                }))
              }
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="strategy">Trading Strategy</Label>
            <textarea
              id="strategy"
              name="strategy"
              placeholder="I currently use a mix of technical and fundamental analysis to make my trades."
              value={formData.tradingStrategy}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  tradingStrategy: e.target.value,
                }))
              }
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />
          </LabelInputContainer>

          <h3 className="font-semibold text-lg mb-4">Business Information</h3>

          <div className="space-y-4">
            <LabelInputContainer>
              <Label htmlFor="rent">Monthly Rent</Label>
              <input
                type="number"
                id="rent"
                value={formData.rent}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    rent: Number(e.target.value),
                  }))
                }
                className="w-full rounded-md border p-2"
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="labour">Labour Cost</Label>
              <input
                type="number"
                id="labour"
                value={formData.labour}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    labour: Number(e.target.value),
                  }))
                }
                className="w-full rounded-md border p-2"
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="transport">Transport Cost</Label>
              <input
                type="number"
                id="transport"
                value={formData.transport}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    transport: Number(e.target.value),
                  }))
                }
                className="w-full rounded-md border p-2"
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="material">Material Cost</Label>
              <input
                type="number"
                id="material"
                value={formData.material}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    material: Number(e.target.value),
                  }))
                }
                className="w-full rounded-md border p-2"
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="others">Other Expenses</Label>
              <input
                type="number"
                id="others"
                value={formData.others}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    others: Number(e.target.value),
                  }))
                }
                className="w-full rounded-md border p-2"
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="monthlyProfits">Monthly Profits</Label>
              <input
                type="number"
                id="monthlyProfits"
                value={formData.monthlyProfits}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    monthlyProfits: Number(e.target.value),
                  }))
                }
                className="w-full rounded-md border p-2"
                required
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="goals">Business Goals</Label>
              <textarea
                placeholder="I want to increase my monthly profits by 20% in the next 6 months."
                id="goals"
                value={formData.goals}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, goals: e.target.value }))
                }
                className="w-full rounded-md border p-2"
                rows={4}
                required
              />
            </LabelInputContainer>

            <div>
              <Label>Risk Tolerance</Label>
              <div className="flex gap-4 mt-2">
                {["low", "medium", "high"].map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="riskTolerance"
                      value={level}
                      checked={formData.riskTolerance === level}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          riskTolerance: e.target.value as
                            | "low"
                            | "medium"
                            | "high",
                        }))
                      }
                      className="mr-2"
                      required
                    />
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Finish &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
